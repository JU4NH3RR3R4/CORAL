import { Mail, Link as LinkIcon, Compass, Eye, CheckCircle2, Phone, MapPin, Rocket } from "lucide-react";
import { THERAPISTS_DATA, Therapist } from "../types";
import { motion } from "motion/react";

interface NosotrosSectionProps {
  onSelectTherapist: (therapist: Therapist) => void;
}

export default function NosotrosSection({ onSelectTherapist }: NosotrosSectionProps) {
  const values = [
    { label: "Ética", id: "etica" },
    { label: "Compromiso", id: "compromiso" },
    { label: "Calidez", id: "calidez" }
  ];

  return (
    <div className="space-y-20 py-12">
      
      {/* 1. History Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-block px-4 py-1.5 bg-coral-primary-fixed text-coral-dark text-xs font-semibold uppercase tracking-wider rounded-full">
            Nuestra Historia
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-coral-text">
            Un espacio para el <span className="text-coral-light">bienestar humano</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-coral-text-variant leading-relaxed">
            Coral nació del deseo profundo de crear un refugio seguro donde la salud mental se trata con la dignidad y calidez que merece. A lo largo de los años, hemos evolucionado de ser una pequeña consulta a convertirnos en un centro integral de psicología, guiados siempre por la creencia de que cada individuo posee la fortaleza interna necesaria para sanar. Nuestra trayectoria está marcada por historias de transformación y el compromiso inquebrantable de acompañar a nuestros pacientes en su viaje hacia la plenitud emocional.
          </p>
        </motion.div>

        {/* Armchair room image illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-coral-secondary/10 rounded-full blur-3xl" />
          <img
            alt="Nuestra consultoría Coral"
            className="rounded-2xl object-cover w-full aspect-video md:aspect-square shadow-md transition-transform duration-500 group-hover:scale-101 border border-coral-outline-variant/10"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGqlGBnosuPO_1cus-EfL_A4YnwiOJ4nuOPjv8Xk-7ibjFFwnmGKIVYwLDo-NhdTRdbbf8f3wVkuOIOIKb55tTRt3JM8Ibb8r3bkHrdxNcRxa8xi8V-hGGor2J04ukf5pQ6TeLopR2sVTzD4xGM67KGR65JYPS3jSvadTxxHaNxCnbfo0rwbhW4FSezSvhctsf6Hkn1txrHOY5hz-zx2pu2alUqsKAVHzi2VaXQUEY8i22oSnSH1e24hWsxokslmtyfFMeBbym9WA"
          />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-coral-light/10 rounded-full blur-3xl" />
        </motion.div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {/* Mission box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-coral-low p-8 rounded-2xl border border-coral-outline-variant/20 space-y-4"
        >
          <div className="w-12 h-12 bg-coral-light flex items-center justify-center rounded-xl text-white">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-display text-2xl font-bold text-coral-text">Misión</h3>
          <p className="font-sans text-sm text-coral-text-variant leading-relaxed">
            Proporcionar servicios psicológicos de excelencia que integren la evidencia clínica con un trato profundamente humano, facilitando el crecimiento personal y el equilibrio emocional estable de nuestra comunidad.
          </p>
        </motion.div>

        {/* Vision box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-coral-highest p-8 rounded-2xl border border-coral-outline-variant/20 space-y-4"
        >
          <div className="w-12 h-12 bg-coral-secondary flex items-center justify-center rounded-xl text-white">
            <Eye className="w-6 h-6 text-white animate-pulse" />
          </div>
          <h3 className="font-display text-2xl font-bold text-coral-text">Visión</h3>
          <p className="font-sans text-sm text-coral-text-variant leading-relaxed">
            Ser el referente líder en salud mental integrativo, reconocidos por nuestra innovación clínica, ética inquebrantable, y por cultivar un entorno donde la empatía y la profesionalidad convergen para transformar vidas positivamente.
          </p>
        </motion.div>
      </section>

      {/* 3. Values Section */}
      <section className="py-12 text-center space-y-8 bg-coral-lowest rounded-2xl border border-coral-outline-variant/10 shadow-xs">
        <div className="max-w-xl mx-auto space-y-3">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-coral-text">Nuestros Valores</h3>
          <p className="font-sans text-sm text-coral-text-variant">
            Los pilares rectores que sostienen cada intervención clínica y orientan la relación con nuestros pacientes.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-12 pt-2">
          {values.map((v) => (
            <div key={v.id} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-coral-primary-fixed flex items-center justify-center text-coral-dark group-hover:bg-coral-light group-hover:text-white transition-all duration-300">
                <CheckCircle2 className="w-5 h-5 fill-current" />
              </div>
              <span className="font-display text-xl font-semibold text-coral-text group-hover:text-coral-dark transition-colors">
                {v.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Team Section */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div className="space-y-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-coral-text">Nuestro Equipo</h2>
            <p className="font-sans text-sm md:text-base text-coral-text-variant max-w-xl">
              Profesionales apasionados dedicados a tu salud mental con años de experiencia, posgrados y certificación activa.
            </p>
          </div>
          <div className="text-sm font-semibold text-coral-dark animate-pulse hidden sm:block">
            Haz clic en un terapeuta para ver su biografía completa
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {THERAPISTS_DATA.map((therapist, index) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onSelectTherapist(therapist)}
              className="group bg-coral-lowest rounded-2xl overflow-hidden shadow-xs border border-coral-outline-variant/10 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              {/* Grayscale on resting, turns colorful on hover effect as requested in images */}
              <div className="h-80 overflow-hidden relative">
                <img
                  alt={therapist.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  src={therapist.imageUrl}
                />
                <div className="absolute inset-0 bg-coral-dark/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-display text-xl font-bold text-coral-text group-hover:text-coral-dark transition-colors">
                    {therapist.name}
                  </h4>
                  <p className="font-sans text-xs font-semibold text-coral-light uppercase tracking-wide mt-1">
                    {therapist.role}
                  </p>
                </div>
                
                <p className="font-sans text-sm text-coral-text-variant leading-relaxed">
                  {therapist.bio}
                </p>

                <div className="flex gap-4 pt-2 text-coral-text-variant border-t border-coral-outline-variant/10">
                  <span className="text-xs font-medium text-coral-dark group-hover:underline flex items-center gap-1">
                    Ver perfil extendido →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Team Contact Cards Footer Overlay */}
      <section className="flex flex-col sm:flex-row justify-center items-center gap-8 py-8 border-y border-coral-outline-variant/20 pt-12">
        <div className="flex items-center gap-3 text-coral-text-variant shrink-0">
          <Phone className="w-5 h-5 text-coral-light" />
          <span className="font-sans text-sm font-semibold">+52 (55) 1234 5678</span>
        </div>
        <div className="flex items-center gap-3 text-coral-text-variant shrink-0">
          <Mail className="w-5 h-5 text-coral-light" />
          <span className="font-sans text-sm font-semibold">contacto@coral.com</span>
        </div>
        <div className="flex items-center gap-3 text-coral-text-variant shrink-0">
          <MapPin className="w-5 h-5 text-coral-light" />
          <span className="font-sans text-sm font-semibold">Ciudad de México, MX</span>
        </div>
      </section>

    </div>
  );
}
