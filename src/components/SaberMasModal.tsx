import { X, Check, Clock, CreditCard, Sparkles, CalendarRange, ArrowRight } from "lucide-react";
import { Service } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface SaberMasModalProps {
  service: Service | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export default function SaberMasModal({ service, onClose, onBookService }: SaberMasModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-6 bg-coral-text/30 backdrop-blur-sm">
        {/* Backdrop dismiss trigger overlay */}
        <div className="fixed inset-0 bg-transparent" onClick={onClose} />

        {/* Modal Main Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative bg-coral-lowest w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-coral-outline-variant/20 flex flex-col max-h-[90vh] z-10"
        >
          {/* Header Colored Ribbon */}
          <div className="bg-coral-dark text-white px-8 py-5 flex justify-between items-center">
            <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white">
              {service.title}
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-coral-primary-fixed p-1.5 rounded-full transition-colors hover:bg-white/10 cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal scrollable payload */}
          <div className="p-8 overflow-y-auto space-y-6 text-left text-coral-text">
            
            {/* Extended Description */}
            <p className="font-sans text-sm md:text-base text-coral-text-variant leading-relaxed">
              {service.longDescription}
            </p>

            {/* Price & Duration badges flex box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="bg-coral-low p-4 rounded-xl flex items-center gap-3">
                <div className="p-2.5 bg-coral-primary-fixed rounded-lg text-coral-dark">
                  <Clock className="w-5 h-5 text-coral-dark" />
                </div>
                <div>
                  <span className="block text-xs text-coral-outline font-bold uppercase tracking-wider">Duración</span>
                  <span className="font-sans text-sm font-bold text-coral-text">{service.duration}</span>
                </div>
              </div>

              <div className="bg-coral-low p-4 rounded-xl flex items-center gap-3">
                <div className="p-2.5 bg-coral-primary-fixed rounded-lg text-coral-dark">
                  <CreditCard className="w-5 h-5 text-coral-dark" />
                </div>
                <div>
                  <span className="block text-xs text-coral-outline font-bold uppercase tracking-wider">Inversión / Costo</span>
                  <span className="font-sans text-sm font-bold text-coral-text">{service.price} por sesión</span>
                </div>
              </div>
            </div>

            {/* Benefits checks */}
            <div className="space-y-3 pt-2">
              <h4 className="font-display font-bold text-coral-dark flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-coral-light animate-pulse" />
                Beneficios terapéuticos clave
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <div className="w-5 h-5 rounded-full bg-green-55/10 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-600 stroke-[3]" />
                    </div>
                    <span className="font-sans text-xs text-coral-text-variant leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Methodology specifics */}
            <div className="space-y-2 border-t border-coral-outline-variant/10 pt-5 text-left">
              <h4 className="font-display font-bold text-coral-text text-sm uppercase tracking-wider">Metodología clínica</h4>
              <p className="font-sans text-xs text-coral-text-variant leading-relaxed">
                {service.methodology}
              </p>
            </div>

          </div>

          {/* Modal bottom actions bar */}
          <div className="border-t border-coral-outline-variant/10 p-6 bg-coral-bg flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-coral-outline text-coral-text hover:bg-coral-low font-bold text-sm rounded-full transition-colors duration-150 cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onBookService(service.id);
                onClose();
              }}
              className="bg-coral-light hover:bg-coral-dark text-white font-bold text-sm px-6 py-3 rounded-full flex items-center justify-center gap-2 shadow-xs cursor-pointer hover:shadow-md transition-all duration-150 active:scale-95"
            >
              <CalendarRange className="w-4 h-4" />
              <span>Agendar este servicio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
