import { Compass, Handshake, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Benefits() {
  const benefits = [
    {
      id: "paz_mental",
      title: "Paz Mental",
      description: "Espacios diseñados para reducir el estrés y fomentar la introspección profunda con total privacidad.",
      icon: Compass,
    },
    {
      id: "acompanamiento",
      title: "Acompañamiento",
      description: "No estás solo. Caminamos a tu lado de forma comprensiva en cada etapa de tu proceso de sanación.",
      icon: Handshake,
    },
    {
      id: "profesionalismo",
      title: "Profesionalismo",
      description: "Expertos certificados con años de experiencia clínica especializada en diversas áreas de la psicología.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-coral-low py-20 px-6 md:px-16" id="benefits-section">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-coral-text">
            Por qué elegir Coral
          </h2>
          <p className="text-sm text-coral-text-variant font-sans">
            Garantizamos una experiencia terapéutica enriquecida con calidez humana y estricto rigor clínico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-coral-lowest p-8 rounded-2xl shadow-xs border border-coral-outline-variant/20 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
                id={`benefit-card-${benefit.id}`}
              >
                {/* Outlined Rounded Icon */}
                <div className="w-16 h-16 rounded-full bg-coral-primary-fixed flex items-center justify-center mb-6 text-coral-dark group-hover:scale-105 duration-300 transition-all">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-coral-text mb-3">
                  {benefit.title}
                </h3>
                <p className="font-sans text-sm text-coral-text-variant leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
