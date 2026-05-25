import { Phone, Mail } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  isDark: boolean;
}

export default function Footer({ setCurrentTab, isDark }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const textMuted = isDark ? "text-slate-400" : "text-slate-400";
  const textHover = isDark ? "hover:text-white" : "hover:text-white";
  const bg = isDark ? "bg-[#0f1a24]" : "bg-[#273140]";

  return (
    <footer className={`w-full pt-16 pb-8 ${bg} text-slate-300`}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">

        {/* Brand */}
        <div className="space-y-4">
          <div className="font-display text-2xl font-bold text-white">Coral</div>
          <p className={`text-sm font-sans leading-relaxed ${textMuted}`}>
            Dedicados a tu salud mental con un enfoque humanista, empático y profundamente cálido. Tu seguridad emocional es nuestro norte.
          </p>
          <div className="flex gap-4">
            <a href="tel:+573239233344" className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center hover:bg-coral-light hover:text-white transition-all cursor-pointer" title="Llamar">
              <Phone className="w-5 h-5 text-slate-400" />
            </a>
            <a href="mailto:clinicapsicologicacoral@gmail.com" className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center hover:bg-coral-light hover:text-white transition-all cursor-pointer" title="Correo">
              <Mail className="w-5 h-5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Navegación */}
        <div className="space-y-4">
          <h6 className="font-display text-xs font-bold text-coral-light uppercase tracking-wider">Navegación</h6>
          <ul className="space-y-2.5 font-sans text-sm">
            {["inicio", "servicios", "nosotros", "contacto"].map((tab) => (
              <li key={tab}>
                <button onClick={() => handleNavClick(tab)} className={`${textMuted} ${textHover} transition-colors cursor-pointer text-left focus:outline-none capitalize`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Servicios */}
        <div className="space-y-4">
          <h6 className="font-display text-xs font-bold text-coral-light uppercase tracking-wider">Servicios principales</h6>
          <ul className={`space-y-2.5 font-sans text-sm ${textMuted}`}>
            {["Terapia Individual", "Terapia de Pareja", "Manejo de Ansiedad", "Psicología Juvenil"].map((s) => (
              <li key={s}>
                <button onClick={() => handleNavClick("servicios")} className={`${textHover} transition-all cursor-pointer text-left`}>
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h6 className="font-display text-xs font-bold text-coral-light uppercase tracking-wider">Información Legal</h6>
          <ul className={`space-y-2.5 font-sans text-sm ${textMuted}`}>
            <li><a href="#aviso-privacidad" className={`${textHover} transition-all hover:underline block cursor-pointer`}>Aviso de Privacidad</a></li>
            <li><a href="#terminos" className={`${textHover} transition-all hover:underline block cursor-pointer`}>Términos y Condiciones</a></li>
            <li><a href="#cookies" className={`${textHover} transition-all hover:underline block cursor-pointer`}>Política de Cookies</a></li>
            <li className="pt-2 text-xs opacity-70">Dirección: Av. Bienestar 123, Piso 4, CDMX.</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-12 pt-8 border-t border-slate-700 text-center text-xs text-slate-500 font-sans">
        <p>© {new Date().getFullYear()} Coral Psicología. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}