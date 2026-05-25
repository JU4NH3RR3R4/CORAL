import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES_DATA, Service, Therapist } from "./types";

// Import custom styled components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import ServicesSection from "./components/ServicesSection";
import TestimonialSection from "./components/TestimonialSection";
import NosotrosSection from "./components/NosotrosSection";
import ContactoSection from "./components/ContactoSection";
import SaberMasModal from "./components/SaberMasModal";
import AgendarCitaModal from "./components/AgendarCitaModal";
import TherapistDossierModal from "./components/TherapistDossierModal";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("inicio");
 const [isDark, setIsDark] = useState(() =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
);

useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [isDark]);

const toggleDark = () => setIsDark(prev => !prev);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  
  // Detail overlays states
  const [detailService, setDetailService] = useState<Service | null>(null);
  const [detailTherapist, setDetailTherapist] = useState<Therapist | null>(null);

  const handleOpenBooking = () => {
    setSelectedServiceId(null);
    setIsBookingModalOpen(true);
  };

  const handleInitiateServiceBooking = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleInitiateTherapistBooking = () => {
    // Open booking modal with therapist selected inside
    setIsBookingModalOpen(true);
  };

  const handleServiceSelect = (serviceId: string) => {
    const sObj = SERVICES_DATA.find((s) => s.id === serviceId);
    if (sObj) {
      setDetailService(sObj);
    }
  };

  return (
<div className="min-h-screen bg-coral-bg flex flex-col justify-between selection:bg-coral-primary-fixed selection:text-coral-dark">
      {/* 1. Header Sticky Nav element */}
      <Header
  currentTab={currentTab}
  setCurrentTab={setCurrentTab}
  onOpenBooking={handleOpenBooking}
  isDark={isDark}
  onToggleDark={toggleDark}
/>
      

      {/* 2. Main Page Stage Container */}
      <main className="w-full flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full"
          >
            {/* INICIO TAB SCREEN */}
            {currentTab === "inicio" && (
              <div className="w-full">
                <Hero onOpenBooking={handleOpenBooking} />
                <Benefits />
                <ServicesSection
                  isFullGrid={false}
                  onServiceSelect={handleServiceSelect}
                  onNavigateToServices={() => setCurrentTab("servicios")}
                />
                <TestimonialSection />
              </div>
            )}

            {/* SERVICIOS TAB SCREEN */}
            {currentTab === "servicios" && (
              <div className="w-full max-w-7xl mx-auto">
                <ServicesSection
                  isFullGrid={true}
                  onServiceSelect={handleServiceSelect}
                />
              </div>
            )}

            {/* NOSOTROS TAB SCREEN */}
            {currentTab === "nosotros" && (
              <div className="w-full max-w-7xl mx-auto px-6 md:px-16">
                <NosotrosSection onSelectTherapist={setDetailTherapist} />
              </div>
            )}

            {/* CONTACTO TAB SCREEN */}
            {currentTab === "contacto" && (
              <div className="w-full max-w-7xl mx-auto px-6 md:px-16">
                <ContactoSection />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer banner */}
     <Footer setCurrentTab={setCurrentTab} isDark={isDark} />

      {/* 4. OVERLAY DETAILED MODALS */}
      {/* Service Details popup summary */}
      <SaberMasModal
        service={detailService}
        onClose={() => setDetailService(null)}
        onBookService={handleInitiateServiceBooking}
      />

      {/* Psychologist dossier profile summary */}
      <TherapistDossierModal
        therapist={detailTherapist}
        onClose={() => setDetailTherapist(null)}
        onBookWithTherapist={handleInitiateTherapistBooking}
      />

      {/* Multi-step appointment reservation registration wizard */}
      <AgendarCitaModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialServiceId={selectedServiceId}
      />
    </div>
  );
}
