from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

import os
GMAIL_USER = os.environ.get("Clinicapsicologicacoral@gmail.com")
GMAIL_PASS = os.environ.get("eenm obdg rpjx ycdt")

@app.route("/enviar-cita", methods=["POST"])
def enviar_cita():
    d = request.get_json()
    CORREO_DESTINO = d.get('email')

    cuerpo = f"""
Nueva cita agendada — Coral Clínica
─────────────────────────────────────
Paciente:   {d.get('nombre')}
Correo:     {d.get('email')}
Teléfono:   {d.get('telefono')}
Servicio:   {d.get('servicio')}
Terapeuta:  {d.get('terapeuta')}
Fecha:      {d.get('fecha')}
Hora:       {d.get('hora')}
Notas:      {d.get('notas') or 'Sin notas'}
    """

    msg = MIMEMultipart()
    msg["Subject"] = f"Nueva cita - {d.get('nombre')} - {d.get('fecha')}"
    msg["From"]    = GMAIL_USER
    msg["To"]      = CORREO_DESTINO
    msg.attach(MIMEText(cuerpo, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(GMAIL_USER, GMAIL_PASS)
            server.sendmail(GMAIL_USER, CORREO_DESTINO, msg.as_string())
        return jsonify({"ok": True})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
