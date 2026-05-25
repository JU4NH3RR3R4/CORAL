from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
import json
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
CORS(app)

GMAIL_USER = os.environ.get("GMAIL_USER")
CLIENT_ID = os.environ.get("GMAIL_CLIENT_ID")
CLIENT_SECRET = os.environ.get("GMAIL_CLIENT_SECRET")
REFRESH_TOKEN = os.environ.get("GMAIL_REFRESH_TOKEN")
CORREO_CLINICA = os.environ.get("CORREO_CLINICA")

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
    db.collection("citas").add({
        "nombre": d.get("nombre"),
        "email": d.get("email"),
        "telefono": d.get("telefono"),
        "servicio": d.get("servicio"),
        "terapeuta": d.get("terapeuta"),
        "fecha": d.get("fecha"),
        "fechaISO": d.get("fechaISO"),
        "hora": d.get("hora"),
        "notas": d.get("notas") or "",
    })
    cuerpo = f"""
Nueva cita agendada - Coral Clinica

Paciente:   {d.get('nombre')}
Correo:     {d.get('email')}
Telefono:   {d.get('telefono')}
Servicio:   {d.get('servicio')}
Terapeuta:  {d.get('terapeuta')}
Fecha:      {d.get('fecha')}
Hora:       {d.get('hora')}
Notas:      {d.get('notas') or 'Sin notas'}
    """
    enviar_correo(d.get('email'), f"Confirmacion de cita - {d.get('fecha')}", cuerpo)
    enviar_correo(CORREO_CLINICA, f"Nueva cita - {d.get('nombre')} - {d.get('fecha')}", cuerpo)
    return jsonify({"ok": True})

@app.route("/citas-ocupadas", methods=["GET"])
def citas_ocupadas():
    citas = db.collection("citas").stream()
    ocupadas = [
        {
            "fecha": c.to_dict().get("fecha", ""),
            "fechaISO": c.to_dict().get("fechaISO", ""),
            "hora": c.to_dict().get("hora", ""),
            "terapeuta": c.to_dict().get("terapeuta", "")
        }
        for c in citas
    ]
    return jsonify(ocupadas)
@app.route("/contacto", methods=["POST"])
def contacto():
    d = request.get_json()
    nombre = d.get("name")
    email = d.get("email")
    asunto = d.get("subject")
    mensaje = d.get("message")

    dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    horarios = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "06:30 PM"]
    terapeutas = ["Dr. Julián Rivas", "Lic. Elena Marín", "Sofia Peña"]

    slots_texto = ""
    for dia in dias[:5]:
        slots_texto += f"\n  {dia}: {', '.join(horarios[:4])}"

    cuerpo_paciente = f"""
Hola {nombre},

Gracias por contactarte con Coral Clínica de Psicología. 🌿

Recibimos tu mensaje y nos alegra que hayas dado este primer paso hacia tu bienestar emocional. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas hábiles.

Mientras tanto, te compartimos los horarios disponibles esta semana con nuestros especialistas:

Terapeutas disponibles:
  • Dr. Julián Rivas
  • Lic. Elena Marín
  • Sofia Peña

Horarios disponibles (Lunes a Viernes):{slots_texto}

Si deseas agendar tu cita de inmediato, puedes hacerlo directamente en nuestro sitio web:
https://coral-ten-plum.vercel.app

Recuerda: pedir ayuda es un acto de valentía. Estamos aquí para acompañarte. 💙

Con cariño,
Equipo Coral Psicología
clinicapsicologicacoral@gmail.com
+57 323 9233344
    """

    cuerpo_clinica = f"""
Nuevo mensaje de contacto — Coral Clínica

Nombre:   {nombre}
Correo:   {email}
Interés:  {asunto}
Mensaje:  {mensaje}
    """

    enviar_correo(email, "Coral Psicología — Recibimos tu mensaje 🌿", cuerpo_paciente)
    enviar_correo(CORREO_CLINICA, f"Nuevo contacto — {nombre}", cuerpo_clinica)

    return jsonify({"ok": True})

if __name__ == "__main__":
    app.run(debug=True)