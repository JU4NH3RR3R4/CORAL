from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import resend

app = Flask(__name__)
CORS(app)

resend.api_key = os.environ.get("RESEND_API_KEY")

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

    try:
        resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": CORREO_DESTINO,
            "subject": f"Nueva cita - {d.get('nombre')} - {d.get('fecha')}",
            "text": cuerpo
        })
        return jsonify({"ok": True})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)