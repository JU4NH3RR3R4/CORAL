from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
CORS(app)

# Gmail OAuth
GMAIL_USER = os.environ.get("GMAIL_USER")
CLIENT_ID = os.environ.get("GMAIL_CLIENT_ID")
CLIENT_SECRET = os.environ.get("GMAIL_CLIENT_SECRET")
REFRESH_TOKEN = os.environ.get("GMAIL_REFRESH_TOKEN")
CORREO_CLINICA = os.environ.get("CORREO_CLINICA")

# Firebase
import json
firebase_creds = json.loads(os.environ.get("FIREBASE_CREDENTIALS"))
cred = credentials.Certificate(firebase_creds)
firebase_admin.initialize_app(cred)
db = firestore.client()

def get_gmail_service():
    creds = Credentials(
        token=None,
        refresh_token=REFRESH_TOKEN,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        scopes=["https://www.googleapis.com/auth/gmail.send"]
    )
    return build("gmail", "v1", credentials=creds)

def enviar_correo(destinatario, asunto, cuerpo):
    service = get_gmail_service()
    msg = MIMEText(cuerpo)
    msg["to"] = destinatario
    msg["from"] = GMAIL_USER
    msg["subject"] = asunto
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    service.users().messages().send(userId="me", body={"raw": raw}).execute()

@app.route("/enviar-cita", methods=["POST"])
def enviar_cita():
    d = request.get_json()

    # Guardar en Firestore
    db.collection("citas").add({
        "nombre": d.get("nombre"),
        "email": d.get("email"),
        "telefono": d.get("telefono"),
        "servicio": d.get("servicio"),
        "terapeuta": d.get("terapeuta"),
        "fecha": d.get("fecha"),
        "hora": d.get("hora"),
        "notas": d.get("notas") or "",
    })

    cuerpo = f"""
Nueva cita agendada — Coral Clínica

Paciente:   {d.get('nombre')}
Correo:     {d.get('email')}
Teléfono:   {d.get('telefono')}
Servicio:   {d.get('servicio')}
Terapeuta:  {d.get('terapeuta')}
Fecha:      {d.get('fecha')}
Hora:       {d.get('hora')}
Notas:      {d.get('notas') or 'Sin notas'}
    """

    enviar_correo(d.get('email'), f"Confirmación de cita - {d.get('fecha')}", cuerpo)
    enviar_correo(CORREO_CLINICA, f"Nueva cita - {d.get('nombre')} - {d.get('fecha')}", cuerpo)

    return jsonify({"ok": True})

@app.route("/citas-ocupadas", methods=["GET"])
def citas_ocupadas():
    citas = db.collection("citas").stream()
    ocupadas = [{"fecha": c.to_dict()["fecha"], "hora": c.to_dict()["hora"], "terapeuta": c.to_dict()["terapeuta"]} for c in citas]
    return jsonify(ocupadas)

if __name__ == "__main__":
    app.run(debug=True)
    