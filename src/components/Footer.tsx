import { Globe, Phone, Mail, Share2, Instagram } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full pt-16 pb-8 bg-[#273140] text-coral-container">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        {/* Brand Information */}
        <div className="space-y-4">
          <div className="font-display text-2xl font-bold text-coral-lowest">Coral</div>
          <p className="text-sm text-coral-highest/75 font-sans leading-relaxed">
            Dedicados a tu salud mental con un enfoque humanista, empático y profundamente cálido. Tu seguridad emocional es nuestro norte.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.coralpsicologia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-coral-container/20 flex items-center justify-center hover:bg-coral-light hover:text-white transition-all cursor-pointer"
              title="Sitio Web"
            >
              <Globe className="w-5 h-5 text-coral-highest" />
            </a>
            <a
              href="tel:+525512345678"
              className="w-10 h-10 rounded-full border border-coral-container/20 flex items-center justify-center hover:bg-coral-light hover:text-white transition-all cursor-pointer"
              title="Llamar"
            >
              <Phone className="w-5 h-5 text-coral-highest" />
            </a>
            <a
              href="mailto:hola@coralpsicologia.com"
              className="w-10 h-10 rounded-full border border-coral-container/20 flex items-center justify-center hover:bg-coral-light hover:text-white transition-all cursor-pointer"
              title="Correo"
            >
              <Mail className="w-5 h-5 text-coral-highest" />
            </a>
          </div>
        </div>

        {/* Quick NavLinks */}
        <div className="space-y-4">
          <h6 className="font-display text-xs font-bold text-coral-light uppercase tracking-wider">Navegación</h6>
          <ul className="space-y-2.5 font-sans text-sm">
            <li>
              <button
                onClick={() => handleNavClick("inicio")}
                className="text-coral-highest/80 hover:text-coral-lowest transition-colors cursor-pointer text-left focus:outline-none"
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("servicios")}
                className="text-coral-highest/80 hover:text-coral-lowest transition-colors cursor-pointer text-left focus:outline-none"
              >
                Servicios
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("nosotros")}
                className="text-coral-highest/80 hover:text-coral-lowest transition-colors cursor-pointer text-left focus:outline-none"
              >
                Nosotros
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("contacto")}
                className="text-coral-highest/80 hover:text-coral-lowest transition-colors cursor-pointer text-left focus:outline-none"
              >
                Contacto
              </button>
            </li>
          </ul>
        </div>

        {/* Custom Core Services Links */}
        <div className="space-y-4">
          <h6 className="font-display text-xs font-bold text-coral-light uppercase tracking-wider">Servicios principales</h6>
          <ul className="space-y-2.5 font-sans text-sm text-coral-highest/80">
            <li>
              <button
                onClick={() => handleNavClick("servicios")}
                className="hover:text-coral-lowest transition-all cursor-pointer text-left"
              >
                Terapia Individual
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("servicios")}
                className="hover:text-coral-lowest transition-all cursor-pointer text-left"
              >
                Terapia de Pareja
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("servicios")}
                className="hover:text-coral-lowest transition-all cursor-pointer text-left"
              >
                Manejo de Ansiedad
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("servicios")}
                className="hover:text-coral-lowest transition-all cursor-pointer text-left"
              >
                Psicología Juvenil
              </button>
            </li>
          </ul>
        </div>

        {/* Privacy / Terms Legal Policies */}
        <div className="space-y-4">
          <h6 className="font-display text-xs font-bold text-coral-light uppercase tracking-wider">Información Legal</h6>
          <ul className="space-y-2.5 font-sans text-sm text-coral-highest/80">
            <li>
              <a href="#aviso-privacidad" className="hover:text-coral-lowest transition-all hover:underline block cursor-pointer">
                Aviso de Privacidad
              </a>
            </li>
            <li>
              <a href="#terminos" className="hover:text-coral-lowest transition-all hover:underline block cursor-pointer">
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a href="#cookies" className="hover:text-coral-lowest transition-all hover:underline block cursor-pointer">
                Política de Cookies
              </a>
            </li>
            <li className="pt-2 text-xs opacity-70">
              Dirección: Av. Bienestar 123, Piso 4, CDMX.
            </li>
          </ul>
        </div>
      </div>

      {/* Copywrite Section bottom lines */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-12 pt-8 border-t border-coral-container/10 text-center text-xs text-coral-highest/60 font-sans">
        <p>© {new Date().getFullYear()} Coral Psicología. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
