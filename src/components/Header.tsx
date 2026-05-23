import { useState } from "react";
import { Menu, X, Calendar } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Header({ currentTab, setCurrentTab, onOpenBooking }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "inicio", label: "Inicio" },
    { id: "servicios", label: "Servicios" },
    { id: "nosotros", label: "Nosotros" },
    { id: "contacto", label: "Contacto" },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="w-full sticky top-0 z-40 bg-coral-bg/90 backdrop-blur-md border-b border-coral-outline-variant/10 shadow-xs">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-16 py-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick("inicio")}
          className="font-display text-2xl font-bold text-coral-dark hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
          id="logo-brand"
        >
          Coral
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-sm font-medium transition-all duration-200 py-1 border-b-2 hover:text-coral-dark cursor-pointer ${
                  isActive
                    ? "text-coral-dark border-coral-dark font-semibold"
                    : "text-coral-text-variant border-transparent"
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Book Appointment CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="bg-coral-light hover:bg-coral-dark text-coral-lowest font-medium text-sm px-6 py-2.5 rounded-full shadow-sm hover:shadow-md hover:-translate-y-[1px] active:scale-95 duration-150 transition-all flex items-center gap-2 cursor-pointer"
            id="book-appointment-btn"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Agendar cita</span>
            <span className="sm:hidden">Agendar</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-coral-text hover:text-coral-dark p-1.5 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-coral-bg border-b border-coral-outline-variant/30 px-6 py-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-sans text-base py-2 transition-colors cursor-pointer ${
                    isActive ? "text-coral-dark font-bold pl-2 border-l-4 border-coral-dark" : "text-coral-text-variant pl-0"
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
