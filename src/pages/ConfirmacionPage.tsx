import { useLocation } from "react-router-dom";

export default function ConfirmacionPage() {
  const location = useLocation();
  const { cita } = location.state || {};

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-coral-lowest p-8">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg text-center">
        <h1 className="text-2xl font-display font-bold text-coral-dark mb-4">
          ¡Tu cita ha sido confirmada!
        </h1>
        {cita && (
          <div className="space-y-2 text-coral-text">
            <p><strong>Servicio:</strong> {cita.servicio}</p>
            <p><strong>Terapeuta:</strong> {cita.terapeuta}</p>
            <p><strong>Fecha:</strong> {cita.fecha}</p>
            <p><strong>Hora:</strong> {cita.hora}</p>
            <p><strong>Paciente:</strong> {cita.nombre}</p>
          </div>
        )}
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={`https://wa.me/573239233344?text=Hola,%20quiero%20confirmar%20mi%20cita`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
          >
            Contactar por WhatsApp
          </a>
          <a
            href="/"
            className="text-coral-dark underline hover:text-coral-light"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </section>
  );
}
