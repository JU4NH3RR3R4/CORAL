from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

GMAIL_USER = os.environ.get("GMAIL_USER")
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD")
CORREO_CLINICA = os.environ.get("CORREO_CLINICA")

def enviar_correo(destinatario, asunto, cuerpo):
    msg = MIMEMultipart()
    msg["From"] = GMAIL_USER
    msg["To"] = destinatario
    msg["Subject"] = asunto
    msg.attach(MIMEText(cuerpo, "plain"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.sendmail(GMAIL_USER, destinatario, msg.as_string())

@app.route("/enviar-cita", methods=["POST"])
def enviar_cita():
    d = request.get_json()

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

    enviar_correo(
        d.get('email'),
        f"Confirmación de cita - {d.get('fecha')}",
        cuerpo
    )
    enviar_correo(
        CORREO_CLINICA,
        f"Nueva cita - {d.get('nombre')} - {d.get('fecha')}",
        cuerpo
    )

    return jsonify({"ok": True})

if __name__ == "__main__":
    app.run(debug=True)