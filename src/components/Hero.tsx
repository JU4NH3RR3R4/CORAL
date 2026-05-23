import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-coral-bg py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column Text & CTAs */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 space-y-8 text-left"
        >
          <span className="inline-block px-4 py-1.5 bg-coral-primary-fixed text-coral-dark text-xs font-semibold uppercase tracking-wider rounded-full">
            Centro de Salud Mental
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-coral-text leading-tight tracking-tight">
            Tu bienestar emocional es nuestra <span className="text-coral-light">prioridad</span>
          </h1>
          <p className="font-sans text-lg text-coral-text-variant max-w-lg leading-relaxed">
            Encuentra un espacio seguro para sanar, crecer y redescubrir tu equilibrio interior acompañado por un equipo de profesionales altamente comprometidos con tu salud mental.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={onOpenBooking}
              className="bg-coral-light hover:bg-coral-dark text-coral-lowest font-medium text-lg px-8 py-4 rounded-full shadow-md hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              id="hero-cta-btn"
            >
              Comenzar hoy
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Right Column Consultation Room Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="order-1 md:order-2"
        >
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-4/3 relative group">
            <div className="absolute inset-0 bg-coral-dark/5 group-hover:bg-transparent duration-300 transition-colors z-10" />
            <img
              alt="Consultorio de atención psicológica Coral"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4LRCuvPdABmvtIPJpfL33h5ay9ucxrUslwOmizUrN51ehclKOEexUNEbrEnqgaRxKkL8gYmmHilhWvawN5BVuN6AQ40aykIMkwiDONUvimz1rGbsTqc4wGRLDUIQBOPsV_N8o9kF-EcdKBOqtoHoyn9UnMMwmju37s9PHv2FxH8SInSuEpiQW0a3zxaYXyNk4_op9Fstji3VKGv5f6NCxeoikdN5Lgr7k-okEzEXtSaOOvaXOoYdRmYfo8qh9-k1RdGTj3MY_D3Q"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
