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

def enviar_correo(destinatario, asunto, cuerpo_html):
    service = get_gmail_service()
    msg = MIMEText(cuerpo_html, "html")
    msg["to"] = destinatario
    msg["from"] = GMAIL_USER
    msg["subject"] = asunto
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    service.users().messages().send(userId="me", body={"raw": raw}).execute()

@app.route("/enviar-cita", methods=["POST"])
def enviar_cita():
    d = request.get_json()
    cita_ref = db.collection("citas").add({
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
    cita_id = cita_ref[1].id
    cuerpo_paciente = f"""
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f7ff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7ff;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#a13e2a,#e8735a);padding:40px 40px 32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:28px;margin:0;letter-spacing:1px;">Coral Psicología</h1>
          <p style="color:#ffdad3;font-size:14px;margin:8px 0 0;">Centro de Salud Mental</p>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:40px 40px 24px;">
          <h2 style="color:#121c2a;font-size:22px;margin:0 0 12px;">¡Hola, {d.get('nombre')}! 🌿</h2>
          <p style="color:#56423e;font-size:15px;line-height:1.7;margin:0;">
            Tu cita ha sido confirmada con éxito. Estamos muy contentos de acompañarte en este camino hacia tu bienestar emocional.
          </p>
        </td></tr>

        <!-- Cita details -->
        <tr><td style="padding:0 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9ff;border-radius:12px;overflow:hidden;">
            <tr><td style="padding:20px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;letter-spacing:1px;">Servicio</p>
              <p style="margin:6px 0 0;font-size:16px;font-weight:600;color:#121c2a;">{d.get('servicio')}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;letter-spacing:1px;">Terapeuta</p>
              <p style="margin:6px 0 0;font-size:16px;font-weight:600;color:#121c2a;">{d.get('terapeuta')}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;letter-spacing:1px;">Fecha</p>
              <p style="margin:6px 0 0;font-size:16px;font-weight:600;color:#121c2a;">{d.get('fecha')}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;letter-spacing:1px;">Hora</p>
              <p style="margin:6px 0 0;font-size:16px;font-weight:600;color:#121c2a;">{d.get('hora')}</p>
            </td></tr>
          </table>
        </td></tr>
<!-- Botones acción -->
        <tr><td style="padding:0 40px 32px;text-align:center;">
          <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              <td style="padding-right:12px;">
                <a href="https://coral-7rhb.onrender.com/cita/{cita_id}/reagendar" style="display:inline-block;background:#f9f9ff;border:2px solid #e8735a;color:#a13e2a;font-size:14px;font-weight:600;padding:12px 24px;border-radius:50px;text-decoration:none;">
                  Reagendar
                </a>
              </td>
              <td>
                <a href="https://coral-7rhb.onrender.com/cita/{cita_id}/cancelar" style="display:inline-block;background:#fff5f5;border:2px solid #fca5a5;color:#dc2626;font-size:14px;font-weight:600;padding:12px 24px;border-radius:50px;text-decoration:none;">
                  Cancelar cita
                </a>
              </td>
            </tr>
          </table>
        </td></tr>
        <!-- Motivational -->
        <tr><td style="padding:0 40px 32px;">
          <div style="background:linear-gradient(135deg,#ffdad3,#f9f9ff);border-radius:12px;padding:24px;border-left:4px solid #e8735a;">
            <p style="margin:0;font-size:15px;color:#56423e;line-height:1.7;font-style:italic;">
              "Pedir ayuda es un acto de valentía. Cada sesión es un paso hacia una versión más plena de ti mismo."
            </p>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9f9ff;padding:24px 40px;text-align:center;border-top:1px solid #e6eeff;">
          <p style="margin:0;font-size:13px;color:#8a726c;">Coral Psicología · Barranquilla, Colombia</p>
          <p style="margin:6px 0 0;font-size:13px;color:#8a726c;">clinicapsicologicacoral@gmail.com · +57 323 9233344</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""
    
    cuerpo_clinica = f"""
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f7ff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7ff;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#121c2a,#326572);padding:32px 40px;text-align:center;">
          <h1 style="color:#ffffff;font-size:22px;margin:0;">Nueva Cita Agendada</h1>
          <p style="color:#94a3b8;font-size:13px;margin:8px 0 0;">Coral Psicología · Sistema de Reservas</p>
        </td></tr>

        <!-- Patient info -->
        <tr><td style="padding:32px 40px 24px;">
          <h3 style="color:#121c2a;font-size:16px;margin:0 0 20px;text-transform:uppercase;letter-spacing:1px;">Datos del Paciente</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9ff;border-radius:12px;overflow:hidden;">
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Nombre</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#121c2a;">{d.get('nombre')}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Correo</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#121c2a;">{d.get('email')}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Teléfono</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#121c2a;">{d.get('telefono')}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Notas</p>
              <p style="margin:4px 0 0;font-size:15px;color:#121c2a;">{d.get('notas') or 'Sin notas'}</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Appointment info -->
        <tr><td style="padding:0 40px 32px;">
          <h3 style="color:#121c2a;font-size:16px;margin:0 0 20px;text-transform:uppercase;letter-spacing:1px;">Detalles de la Cita</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9ff;border-radius:12px;overflow:hidden;">
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Servicio</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#121c2a;">{d.get('servicio')}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Terapeuta</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#121c2a;">{d.get('terapeuta')}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Fecha</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#121c2a;">{d.get('fecha')}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Hora</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#121c2a;">{d.get('hora')}</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9f9ff;padding:20px 40px;text-align:center;border-top:1px solid #e6eeff;">
          <p style="margin:0;font-size:12px;color:#8a726c;">Sistema automático · Coral Psicología</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""
    enviar_correo(d.get('email'), f"Confirmación de cita - {d.get('fecha')}", cuerpo_paciente)
    enviar_correo(CORREO_CLINICA, f"Nueva cita - {d.get('nombre')} - {d.get('fecha')}", cuerpo_clinica)
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
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f7ff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7ff;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#a13e2a,#e8735a);padding:40px 40px 32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:28px;margin:0;letter-spacing:1px;">Coral Psicología</h1>
          <p style="color:#ffdad3;font-size:14px;margin:8px 0 0;">Centro de Salud Mental</p>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:40px 40px 24px;">
          <h2 style="color:#121c2a;font-size:22px;margin:0 0 12px;">¡Hola, {nombre}! 🌿</h2>
          <p style="color:#56423e;font-size:15px;line-height:1.7;margin:0;">
            Gracias por contactarte con nosotros. Recibimos tu mensaje y nuestro equipo se pondrá en contacto contigo en las próximas <strong>24 horas hábiles</strong>.
          </p>
        </td></tr>

        <!-- Horarios -->
        <tr><td style="padding:0 40px 32px;">
          <h3 style="color:#121c2a;font-size:15px;margin:0 0 16px;text-transform:uppercase;letter-spacing:1px;">Horarios disponibles esta semana</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9ff;border-radius:12px;overflow:hidden;">
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Terapeutas</p>
              <p style="margin:6px 0 0;font-size:14px;color:#121c2a;">Dr. Julián Rivas &nbsp;·&nbsp; Lic. Elena Marín &nbsp;·&nbsp; Sofia Peña</p>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Días</p>
              <p style="margin:6px 0 0;font-size:14px;color:#121c2a;">Lunes a Viernes</p>
            </td></tr>
            <tr><td style="padding:16px 24px;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Horarios</p>
              <p style="margin:6px 0 0;font-size:14px;color:#121c2a;">09:00 AM &nbsp;·&nbsp; 11:00 AM &nbsp;·&nbsp; 01:00 PM &nbsp;·&nbsp; 03:00 PM</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:0 40px 32px;text-align:center;">
          <a href="https://coral-ten-plum.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#a13e2a,#e8735a);color:#ffffff;font-size:15px;font-weight:600;padding:14px 32px;border-radius:50px;text-decoration:none;">
            Agendar mi cita ahora
          </a>
        </td></tr>

        <!-- Motivational -->
        <tr><td style="padding:0 40px 32px;">
          <div style="background:linear-gradient(135deg,#ffdad3,#f9f9ff);border-radius:12px;padding:24px;border-left:4px solid #e8735a;">
            <p style="margin:0;font-size:15px;color:#56423e;line-height:1.7;font-style:italic;">
              "Pedir ayuda es un acto de valentía. Estamos aquí para acompañarte en cada paso del camino." 💙
            </p>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9f9ff;padding:24px 40px;text-align:center;border-top:1px solid #e6eeff;">
          <p style="margin:0;font-size:13px;color:#8a726c;">Coral Psicología · Barranquilla, Colombia</p>
          <p style="margin:6px 0 0;font-size:13px;color:#8a726c;">clinicapsicologicacoral@gmail.com · +57 323 9233344</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""
    cuerpo_clinica = f"""
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f7ff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7ff;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#121c2a,#326572);padding:32px 40px;text-align:center;">
          <h1 style="color:#ffffff;font-size:22px;margin:0;">Nuevo Mensaje de Contacto</h1>
          <p style="color:#94a3b8;font-size:13px;margin:8px 0 0;">Coral Psicología · Formulario Web</p>
        </td></tr>

        <!-- Data -->
        <tr><td style="padding:32px 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9ff;border-radius:12px;overflow:hidden;">
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Nombre</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#121c2a;">{nombre}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Correo</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#121c2a;">{email}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Interés</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#121c2a;">{asunto}</p>
            </td></tr>
            <tr><td style="padding:16px 24px;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Mensaje</p>
              <p style="margin:4px 0 0;font-size:15px;color:#121c2a;line-height:1.6;">{mensaje}</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9f9ff;padding:20px 40px;text-align:center;border-top:1px solid #e6eeff;">
          <p style="margin:0;font-size:12px;color:#8a726c;">Sistema automático · Coral Psicología</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""
    enviar_correo(email, "Coral Psicología — Recibimos tu mensaje 🌿", cuerpo_paciente)
    enviar_correo(CORREO_CLINICA, f"Nuevo contacto — {nombre}", cuerpo_clinica)

    return jsonify({"ok": True})
ADMIN_USER = os.environ.get("ADMIN_USER")
ADMIN_PASS = os.environ.get("ADMIN_PASS")

@app.route("/admin/login", methods=["POST"])
def admin_login():
    d = request.get_json()
    if d.get("user") == ADMIN_USER and d.get("pass") == ADMIN_PASS:
        return jsonify({"ok": True})
    return jsonify({"ok": False}), 401

@app.route("/admin/citas", methods=["GET"])
def admin_citas():
    if request.headers.get("x-admin-auth") != "true":
        return jsonify({"error": "No autorizado"}), 401
    citas = db.collection("citas").stream()
    result = []
    for c in citas:
        data = c.to_dict()
        data["id"] = c.id
        result.append(data)
    return jsonify(result)

@app.route("/admin/citas/<cita_id>", methods=["DELETE"])
def admin_eliminar_cita(cita_id):
    if request.headers.get("x-admin-auth") != "true":
        return jsonify({"error": "No autorizado"}), 401
    db.collection("citas").document(cita_id).delete()
    return jsonify({"ok": True})

@app.route("/admin/citas/<cita_id>/atendida", methods=["PATCH"])
def admin_marcar_atendida(cita_id):
    if request.headers.get("x-admin-auth") != "true":
        return jsonify({"error": "No autorizado"}), 401
    db.collection("citas").document(cita_id).update({"atendida": True})
    return jsonify({"ok": True})
@app.route("/recordatorios", methods=["GET"])
def enviar_recordatorios():
    from datetime import datetime, timedelta
    
    manana = datetime.now() + timedelta(days=1)
    manana_iso = manana.strftime("%Y-%m-%d")
    
    citas = db.collection("citas").stream()
    enviados = 0
    
    for c in citas:
        data = c.to_dict()
        if data.get("recordatorio_enviado"):
            continue
        if data.get("fechaISO") != manana_iso:
            continue
        
        nombre = data.get("nombre")
        email = data.get("email")
        fecha = data.get("fecha")
        hora = data.get("hora")
        terapeuta = data.get("terapeuta")
        servicio = data.get("servicio")
        
        cuerpo = f"""
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f7ff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7ff;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#a13e2a,#e8735a);padding:40px 40px 32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:28px;margin:0;">Coral Psicología</h1>
          <p style="color:#ffdad3;font-size:14px;margin:8px 0 0;">Recordatorio de Cita</p>
        </td></tr>
        <tr><td style="padding:40px 40px 24px;">
          <h2 style="color:#121c2a;font-size:22px;margin:0 0 12px;">¡Hola, {nombre}! 🌿</h2>
          <p style="color:#56423e;font-size:15px;line-height:1.7;margin:0;">
            Te recordamos que <strong>mañana tienes una cita</strong> con nosotros.
          </p>
        </td></tr>
        <tr><td style="padding:0 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9ff;border-radius:12px;overflow:hidden;">
            <tr><td style="padding:20px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Servicio</p>
              <p style="margin:6px 0 0;font-size:16px;font-weight:600;color:#121c2a;">{servicio}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Terapeuta</p>
              <p style="margin:6px 0 0;font-size:16px;font-weight:600;color:#121c2a;">{terapeuta}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;border-bottom:1px solid #e6eeff;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Fecha</p>
              <p style="margin:6px 0 0;font-size:16px;font-weight:600;color:#121c2a;">{fecha}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;">
              <p style="margin:0;font-size:12px;color:#8a726c;text-transform:uppercase;">Hora</p>
              <p style="margin:6px 0 0;font-size:16px;font-weight:600;color:#121c2a;">{hora}</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 40px 32px;">
          <div style="background:linear-gradient(135deg,#ffdad3,#f9f9ff);border-radius:12px;padding:24px;border-left:4px solid #e8735a;">
            <p style="margin:0;font-size:15px;color:#56423e;line-height:1.7;font-style:italic;">
              "Cada sesión es un paso hacia una versión más plena de ti mismo. ¡Nos vemos mañana!" 💙
            </p>
          </div>
        </td></tr>
        <tr><td style="background:#f9f9ff;padding:24px 40px;text-align:center;border-top:1px solid #e6eeff;">
          <p style="margin:0;font-size:13px;color:#8a726c;">Coral Psicología · Barranquilla, Colombia</p>
          <p style="margin:6px 0 0;font-size:13px;color:#8a726c;">clinicapsicologicacoral@gmail.com · +57 323 9233344</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
"""
        enviar_correo(email, f"Recordatorio: Tu cita es mañana — {fecha}", cuerpo)
        db.collection("citas").document(c.id).update({"recordatorio_enviado": True})
        enviados += 1
    
    return jsonify({"ok": True, "enviados": enviados})
@app.route("/cita/<cita_id>/cancelar", methods=["GET"])
def cancelar_cita_paciente(cita_id):
    db.collection("citas").document(cita_id).update({"cancelada": True})
    return """
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f7ff;font-family:'Segoe UI',Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="background:#ffffff;border-radius:16px;padding:48px;max-width:480px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="font-size:48px;margin-bottom:16px;">😔</div>
    <h1 style="color:#121c2a;font-size:24px;margin:0 0 12px;">Cita cancelada</h1>
    <p style="color:#56423e;font-size:15px;line-height:1.7;margin:0 0 24px;">Tu cita ha sido cancelada exitosamente. Si deseas reagendar, puedes hacerlo en nuestro sitio web.</p>
    <a href="https://coral-ten-plum.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#a13e2a,#e8735a);color:#ffffff;font-size:15px;font-weight:600;padding:14px 32px;border-radius:50px;text-decoration:none;">
      Reagendar cita
    </a>
  </div>
</body>
</html>
"""

@app.route("/cita/<cita_id>/reagendar", methods=["GET"])
def reagendar_cita_paciente(cita_id):
    db.collection("citas").document(cita_id).update({"reagendar": True})
    return """
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f7ff;font-family:'Segoe UI',Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="background:#ffffff;border-radius:16px;padding:48px;max-width:480px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="font-size:48px;margin-bottom:16px;">📅</div>
    <h1 style="color:#121c2a;font-size:24px;margin:0 0 12px;">Reagendar cita</h1>
    <p style="color:#56423e;font-size:15px;line-height:1.7;margin:0 0 24px;">Hemos recibido tu solicitud. Agenda tu nueva cita directamente en nuestro sitio web.</p>
    <a href="https://coral-ten-plum.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#a13e2a,#e8735a);color:#ffffff;font-size:15px;font-weight:600;padding:14px 32px;border-radius:50px;text-decoration:none;">
      Agendar nueva cita
    </a>
  </div>
</body>
</html>
"""
if __name__ == "__main__":
    app.run(debug=True)