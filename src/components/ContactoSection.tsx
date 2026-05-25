import React, { useState } from "react";
import { Mail, Phone, Globe, MapPin, Send, HelpCircle, Check } from "lucide-react";
import { motion } from "motion/react";

export default function ContactoSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "informacion",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Por favor, completa los campos requeridos.");
      return;
    }

    setStatus("sending");
    // Simulate real communication channel pipeline
    setTimeout(() => {
      setStatus("success");
      // Reset form on success
      setFormData({ name: "", email: "", subject: "informacion", message: "" });
    }, 1500);
  };

  return (
    <div className="space-y-16 py-12">
      {/* 1. Header Hero section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-coral-text uppercase tracking-wider mb-2">
          CONTACTO
        </h1>
        <p className="font-sans text-base text-coral-text-variant leading-relaxed">
          Estamos aquí para escucharte y guiarte en cada inquietud. Dá el primer paso hacia tu bienestar emocional hoy mismo.
        </p>
      </div>

      {/* 2. Direct Contact cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Telephone phone card */}
        <a
         
         href="tel:+573239233344"
          className="bg-coral-lowest p-6 rounded-2xl border border-coral-outline-variant/20 hover:border-coral-light hover:shadow-sm text-center flex flex-col items-center gap-3 group transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-coral-primary-fixed flex items-center justify-center text-coral-dark group-hover:scale-110 transition-transform">
            <Phone className="w-5 h-5" />
          </div>
          <span className="font-display text-xs font-bold text-coral-outline uppercase tracking-wider">Teléfono</span>
          <span className="font-sans text-lg font-bold text-coral-text group-hover:text-coral-dark transition-colors">
             +57 323 9233344
          </span>
        </a>

        {/* Mail contact card */}
        <a
          href="mailto:clinicapsicologicacoral@gmail.com"
          className="bg-coral-lowest p-6 rounded-2xl border border-coral-outline-variant/20 hover:border-coral-light hover:shadow-sm text-center flex flex-col items-center gap-3 group transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-coral-primary-fixed flex items-center justify-center text-coral-dark group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <span className="font-display text-xs font-bold text-coral-outline uppercase tracking-wider">Correo electrónico</span>
          <span className="font-sans text-lg font-bold text-coral-text group-hover:text-coral-dark transition-colors">
            clinicapsicologicacoral@gmail.com
          </span>
        </a>

        {/* Website link card */}
        <a
         href="https://coral-ten-plum.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-coral-lowest p-6 rounded-2xl border border-coral-outline-variant/20 hover:border-coral-light hover:shadow-sm text-center flex flex-col items-center gap-3 group transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-coral-primary-fixed flex items-center justify-center text-coral-dark group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5" />
          </div>
          <span className="font-display text-xs font-bold text-coral-outline uppercase tracking-wider">Sitio web</span>
          <span className="font-sans text-lg font-bold text-coral-text group-hover:text-coral-dark transition-colors">
            coral-ten-plum.vercel.app
          </span>
        </a>
      </section>

      {/* 3. Form & Beautiful Custom Map Frame */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
        {/* Contact Form Element */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-coral-lowest p-8 md:p-10 rounded-3xl border border-coral-outline-variant/20 shadow-xs space-y-6"
        >
          <h3 className="font-display text-2xl font-bold text-coral-text">
            Permítenos acompañarte
          </h3>
          <p className="font-sans text-sm text-coral-text-variant">
            Llena este formulario y nos pondremos en contacto contigo en un plazo no mayor a 24 horas hábiles.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="form-name" className="text-xs font-bold text-coral-outline uppercase font-display">
                Nombre completo *
              </label>
              <input
                id="form-name"
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-coral-low/60 border border-coral-outline-variant/30 rounded-full px-5 py-3 text-sm focus:border-coral-dark focus:bg-white outline-none font-sans duration-200 transition-colors"
                placeholder="Ej. Sofía Ramos"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="form-email" className="text-xs font-bold text-coral-outline uppercase font-display">
                Correo electrónico *
              </label>
              <input
                id="form-email"
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-coral-low/60 border border-coral-outline-variant/30 rounded-full px-5 py-3 text-sm focus:border-coral-dark focus:bg-white outline-none font-sans duration-200 transition-colors"
                placeholder="Ej. sofia@ejemplo.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="form-subject" className="text-xs font-bold text-coral-outline uppercase font-display">
                Interés / Consulta
              </label>
              <select
                id="form-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-coral-low/60 border border-coral-outline-variant/30 rounded-full px-5 py-3 text-sm focus:border-coral-dark focus:bg-white outline-none font-sans duration-200 transition-colors"
              >
                <option value="informacion">Información General</option>
                <option value="terapia-individual">Terapia Individual</option>
                <option value="terapia-pareja">Terapia de Pareja</option>
                <option value="ansiedad">Manejo de Ansiedad</option>
                <option value="juvenil">Terapia Juvenil</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="form-message" className="text-xs font-bold text-coral-outline uppercase font-display">
                Mensaje *
              </label>
              <textarea
                id="form-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-coral-low/60 border border-coral-outline-variant/30 rounded-2xl px-5 py-3 text-sm focus:border-coral-dark focus:bg-white outline-none font-sans duration-200 transition-colors resize-none"
                placeholder="Cuéntanos brevemente cómo podemos apoyarte..."
              />
            </div>

            {/* Status alerts */}
            {status === "success" && (
              <div className="p-3.5 bg-green-55/15 text-green-700 border border-green-200 rounded-xl flex items-center gap-2 text-sm font-sans animate-fade-in">
                <Check className="w-5 h-5 text-green-600 shrink-0" />
                <span>¡Mensaje enviado con éxito! Nos comunicaremos muy pronto.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="w-full bg-coral-light hover:bg-coral-dark text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/45 border-t-white rounded-full animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : status === "success" ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Mensaje Recibido</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar mensaje</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Map, address context and WhatsApp action */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          {/* Beautiful styled Vector Map panel */}
          <div className="border border-coral-outline-variant/20 rounded-3xl bg-coral-low overflow-hidden h-72 relative flex flex-col items-center justify-center text-center p-8 shadow-sm group">
            {/* Soft gray grid pattern mock vector map background */}
            <div className="absolute inset-0 bg-[radial-gradient(#b0a09c_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
            
            <MapPin className="w-16 h-16 text-coral-dark mb-4 drop-shadow-sm group-hover:bounce transition-all duration-500" />
            <h4 className="font-display font-bold text-coral-text text-xl">Nuestras Oficinas</h4>
            <p className="font-sans text-sm text-coral-text-variant max-w-sm mt-2 leading-relaxed">
              Barranquilla, Colombia.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-coral-lowest hover:bg-coral-dark hover:text-white border border-coral-outline-variant text-coral-dark font-semibold text-sm rounded-full transition-all duration-200 shadow-xs cursor-pointer z-20"
            >
              Ver en Google Maps
            </a>
          </div>

          {/* Quick Instant Messaging (WhatsApp) connection launcher */}
          <div className="bg-emerald-50 border border-emerald-250 p-6 md:p-8 rounded-3xl text-left space-y-4">
            <h4 className="font-display font-extrabold text-emerald-900 text-lg flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
              ¿Prefieres WhatsApp?
            </h4>
            <p className="font-sans text-sm text-emerald-800 leading-relaxed">
              Recibe atención personalizada inmediata. Coordina agendas, consulta dudas generales o coordina citas directas por mensajería.
            </p>
            <a
              href="https://wa.me/+573239233344"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer text-sm"
              id="whatsapp-connector-link"
            >
              {/* Simplified Phone Icon representing chat */}
              <Phone className="w-4 h-4 animate-bounce" />
              Escríbenos por WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
