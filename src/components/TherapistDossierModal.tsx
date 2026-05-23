import { X, Mail, Linkedin, Calendar, BadgeCheck } from "lucide-react";
import { Therapist } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface TherapistDossierModalProps {
  therapist: Therapist | null;
  onClose: () => void;
  onBookWithTherapist: (therapistId: string) => void;
}

export default function TherapistDossierModal({
  therapist,
  onClose,
  onBookWithTherapist,
}: TherapistDossierModalProps) {
  if (!therapist) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-6 bg-coral-text/30 backdrop-blur-sm">
        {/* Backdrop overlay */}
        <div className="fixed inset-0 bg-transparent" onClick={onClose} />

        {/* Modal Main container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-coral-lowest w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-coral-outline-variant/20 flex flex-col max-h-[90vh] z-10"
        >
          {/* Header Colored Banner with X dismissal */}
          <div className="bg-coral-dark text-white px-8 py-5 flex justify-between items-center text-left">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-none">
                {therapist.name}
              </h3>
              <span className="text-xs text-coral-primary-fixed block font-sans font-semibold mt-1">
                {therapist.role}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-coral-primary-fixed p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal scroll contents */}
          <div className="p-8 overflow-y-auto space-y-6 text-left text-coral-text">
            
            {/* Master Photo / Bio Intro Box */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                alt={therapist.name}
                className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover border-2 border-coral-outline-variant/20 shadow-xs shrink-0"
                src={therapist.imageUrl}
              />
              <div className="space-y-3 font-sans">
                <p className="text-sm font-semibold text-coral-text-variant md:text-base leading-relaxed">
                  "{therapist.bio}"
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-coral-outline">
                  <a
                    href={`mailto:${therapist.email}`}
                    className="flex items-center gap-1.5 hover:text-coral-dark text-coral-outline transition-colors"
                  >
                    <Mail className="w-4 h-4 text-coral-light" />
                    <span>{therapist.email}</span>
                  </a>
                  <a
                    href={`https://${therapist.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-coral-dark text-coral-outline transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-coral-light" />
                    <span>Perfil Profesional</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Specialties certifications cards */}
            <div className="space-y-3 pt-2">
              <h4 className="font-display font-bold text-coral-dark text-sm uppercase tracking-wider">
                Especialidades y Áreas Clínicas
              </h4>
              <div className="flex flex-wrap gap-2">
                {therapist.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-coral-low text-coral-dark text-xs font-semibold rounded-full border border-coral-outline-variant/20 flex items-center gap-1.5"
                  >
                    <BadgeCheck className="w-4 h-4 text-coral-dark shrink-0" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Extended Long Detailed bio */}
            <div className="space-y-2 font-sans border-t border-coral-outline-variant/10 pt-5">
              <h4 className="font-display font-bold text-coral-text text-sm uppercase tracking-wider">Trayectoria académica</h4>
              <p className="text-xs md:text-sm text-coral-text-variant leading-relaxed">
                {therapist.detailedBio}
              </p>
            </div>

            {/* Availability schedules */}
            <div className="bg-coral-low p-5 rounded-2xl space-y-2 border border-coral-outline-variant/10">
              <h5 className="font-display font-bold text-coral-text text-xs uppercase tracking-wider flex items-center gap-1.5 text-coral-dark">
                <Calendar className="w-4 h-4 text-coral-light" />
                Horarios habituales de consulta
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {therapist.availability.map((av, idx) => (
                  <span
                    key={idx}
                    className="bg-white/80 border border-coral-outline-variant/10 rounded-xl px-3 py-1.5 text-[11px] font-sans text-center text-coral-text font-bold"
                  >
                    {av}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom CTA Actions */}
          <div className="border-t border-coral-outline-variant/10 p-6 bg-coral-bg flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-coral-outline text-coral-text hover:bg-coral-low font-bold text-sm rounded-full transition-colors duration-150 cursor-pointer text-center"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onBookWithTherapist(therapist.id);
                onClose();
              }}
              className="bg-coral-light hover:bg-coral-dark text-white font-bold text-sm px-6 py-3 rounded-full flex items-center justify-center gap-1.5 shadow-xs cursor-pointer hover:shadow-md transition-all duration-150 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar con {therapist.name.split(" ").slice(-1)[0]}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
