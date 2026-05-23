from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

GMAIL_USER = "Clinicapsicologicacoral@gmail.com"       # tu correo
GMAIL_PASS = "eenm obdg rpjx ycdt"      # contraseña de aplicación de Gmail

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
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_USER, GMAIL_PASS)
            server.sendmail(GMAIL_USER, CORREO_DESTINO, msg.as_string())
        return jsonify({"ok": True})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
