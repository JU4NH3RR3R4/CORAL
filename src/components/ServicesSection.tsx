import * as LucideIcons from "lucide-react";
import { SERVICES_DATA, Service } from "../types";
import { motion } from "motion/react";

interface ServicesSectionProps {
  isFullGrid: boolean;
  onServiceSelect: (id: string) => void;
  onNavigateToServices?: () => void;
}

// Helper to resolve icon components from service string name
function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <LucideIcons.Heart className={className} />;
  return <IconComponent className={className} />;
}

export default function ServicesSection({
  isFullGrid,
  onServiceSelect,
  onNavigateToServices,
}: ServicesSectionProps) {
  // If not full grid (homepage), filter to just 3 services as in screenshot (Individual, Ansiedad, Orientación)
  const services = isFullGrid
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => ["individual", "ansiedad", "orientacion"].includes(s.id));

  return (
    <section className="py-20 px-6 md:px-16 bg-coral-lowest" id="services-section">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation / Header Layout */}
        {!isFullGrid ? (
          /* Landing homepage Header variant */
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
            <div className="space-y-3 text-left max-w-xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-coral-text">
                Nuestros Servicios
              </h2>
              <p className="font-sans text-sm text-coral-text-variant">
                Soluciones personalizadas para cada etapa de tu vida emocional.
              </p>
            </div>
            {onNavigateToServices && (
              <button
                onClick={onNavigateToServices}
                className="text-coral-dark hover:text-coral-light font-bold text-sm tracking-wide flex items-center gap-1 group transition-colors cursor-pointer"
              >
                Ver todos los servicios
                <LucideIcons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-200 transition-transform" />
              </button>
            )}
          </div>
        ) : (
          /* Full Services Page Header variant */
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-6">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-coral-text uppercase tracking-wider mb-2">
              NUESTROS SERVICIOS
            </h1>
            <p className="font-sans text-base text-coral-text-variant leading-relaxed">
              Acompañamiento profesional y humano para cultivar tu bienestar emocional en cada etapa de tu vida.
            </p>
          </div>
        )}

        {/* Services Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-coral-lowest p-8 rounded-2xl border border-coral-outline-variant/30 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 group"
            >
              {/* Service Icon */}
              <div className="mb-6 p-4 rounded-full bg-coral-primary-fixed/35 text-coral-dark group-hover:scale-105 duration-300 transition-transform">
                <ServiceIcon name={service.icon} className="w-10 h-10 text-coral-dark" />
              </div>

              {/* Service Details */}
              <h3 className="font-display text-xl font-bold text-coral-text mb-3">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-coral-text-variant mb-6 leading-relaxed flex-grow">
                {service.shortDescription}
              </p>

              {/* "Saber más" Action button */}
              <button
                onClick={() => onServiceSelect(service.id)}
                className="mt-auto px-6 py-2.5 border-2 border-coral-dark text-coral-dark font-semibold text-sm rounded-full bg-transparent group-hover:bg-coral-dark group-hover:text-white transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Saber más</span>
                <LucideIcons.Plus className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Extra Bottom Content Section for Full Page */}
        {isFullGrid && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Advantage Details */}
            <div className="space-y-8 text-left">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-coral-text">
                ¿Por qué elegir Coral?
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-coral-primary-fixed rounded-2xl text-coral-dark">
                    <LucideIcons.CheckCircle2 className="w-6 h-6 text-coral-dark" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-coral-text text-lg">Profesionales Certificados</h4>
                    <p className="text-sm text-coral-text-variant mt-1 leading-relaxed">
                      Nuestro equipo clínico cuenta con una sólida formación de posgrado, constante supervisión y amplia experiencia clínica en psicología basada en evidencia.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-coral-primary-fixed rounded-2xl text-coral-dark">
                    <LucideIcons.Clock className="w-6 h-6 text-coral-dark" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-coral-text text-lg">Flexibilidad de Horarios</h4>
                    <p className="text-sm text-coral-text-variant mt-1 leading-relaxed">
                      Ofrecemos modalidades de consulta tanto presenciales en consultorio como online a través de videollamadas seguras para adaptarnos plenamente a tu estilo de vida.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Advantage Visual Frame */}
            <div className="rounded-2xl overflow-hidden shadow-md h-80 relative group">
              <div className="absolute inset-0 bg-coral-dark/5 group-hover:bg-transparent duration-300 transition-colors z-10" />
              <img
                alt="Consultorio cálido Coral"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmNSe60KxXMd9KJRK-o95TmvTuDj-qy-aTpEiXkFbeSAouQcB6LikF0X0OGfnLlIQsqetcCIJoNA1wH-Ntj12ac3sldqUAHD1jtJTXXPhRhe3bpZdsT8U8IKaR0w4M0SrJP75VbxIqTHWmVoClR42GsMFvaFm_WZaM1MnPbd9VD9Z5OFwXdP7vY1XEfS-v473G_0ib2bvttfKvz64SPJ_U-IzrcFc2iCokTR0chdNrOc9vqT_CkfwWJDj9idNqhzYlK8MEWQfDEvA"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
