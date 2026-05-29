import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowLeft, ArrowRight, Check, Calendar, UserCheck, Clock, Contact, FileText, CheckCircle } from "lucide-react";
import { SERVICES_DATA, THERAPISTS_DATA, Service, Therapist } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface AgendarCitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string | null;
}

// Pre-calculated forthcoming dates (stable layout list starting from tomorrow)
const generateDates = () => {
  const dates = [];
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  
  const today = new Date();
  
  for (let i = 1; i <= 10; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    // Skip sundays by default for psychological consulting schedules
    if (nextDate.getDay() === 0) continue;
    
    dates.push({
      isoString: nextDate.toISOString().slice(0, 10),
      dayName: daysOfWeek[nextDate.getDay()],
      dayNumber: nextDate.getDate(),
      monthName: months[nextDate.getMonth()],
      fullFormatted: `${daysOfWeek[nextDate.getDay()]} ${nextDate.getDate()} de ${months[nextDate.getMonth()]}`
    });
  }
  return dates;
};

const TIME_SLOTS = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "06:30 PM"];

export default function AgendarCitaModal({ isOpen, onClose, initialServiceId }: AgendarCitaModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedTherapistId, setSelectedTherapistId] = useState(""); // empty string means "cualquier especialista"
  const [selectedDate, setSelectedDate] = useState(""); // isoString
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  
  const [clientDetails, setClientDetails] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const [isSuccess, setIsSuccess] = useState(false);
 const [datesList] = useState(() => generateDates());
const [citasOcupadas, setCitasOcupadas] = useState<{fecha: string, fechaISO: string, hora: string, terapeuta: string}[]>([]);
useEffect(() => {
  fetch("https://coral-7rhb.onrender.com/citas-ocupadas")
    .then(r => r.json())
    .then(data => setCitasOcupadas(data))
    .catch(() => {});
}, []);

const isSlotOcupado = (fecha: string, hora: string) => {
  if (selectedTherapistId === "") return false;
 return citasOcupadas.some(c =>
  c.fechaISO === fecha &&
  c.hora === hora &&
  c.terapeuta === currentTherapist?.name
  );
};
  // Set the pre-selected service if provided
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      setStep(2); // Skip Step 1 since service is already specified
    } else {
      setSelectedServiceId("");
      setStep(1);
    }
    // Deep resets
    setSelectedTherapistId("");
    setSelectedDate("");
    setSelectedTimeSlot("");
    setClientDetails({ name: "", email: "", phone: "", notes: "" });
    setIsSuccess(false);
  }, [isOpen, initialServiceId]);

  if (!isOpen) return null;

  const currentService = SERVICES_DATA.find((s) => s.id === selectedServiceId);
  const currentTherapist = THERAPISTS_DATA.find((t) => t.id === selectedTherapistId);
  const selectedDateObject = datesList.find((d) => d.isoString === selectedDate);

  const handleNextStep = () => {
    if (step === 1 && !selectedServiceId) return;
    if (step === 3 && (!selectedDate || !selectedTimeSlot)) return;
    if (step === 4 && (!clientDetails.name || !clientDetails.email || !clientDetails.phone)) return;
    
    setStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    if (step === 2 && initialServiceId) {
      // If we jumped to step 2 directly from initialServiceId, cancel calendar dismisses straight
      onClose();
    } else if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

const handleConfirmReservation = async () => {
    try {
      await fetch("https://coral-7rhb.onrender.com/enviar-cita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:    clientDetails.name,
          email:     clientDetails.email,
          telefono:  clientDetails.phone,
          notas:     clientDetails.notes,
          servicio:  currentService?.title,
          terapeuta: currentTherapist ? currentTherapist.name : "Cualquier especialista",
          fecha:     selectedDateObject?.fullFormatted,
          fechaISO: selectedDate,
          hora:      selectedTimeSlot,
        }),
      });
    } catch (error) {
      console.error("Error al enviar correo:", error);
    }
    navigate("/confirmacion", { state: { cita: {
  nombre: clientDetails.name,
  servicio: currentService?.title,
  terapeuta: currentTherapist ? currentTherapist.name : "Cualquier especialista",
  fecha: selectedDateObject?.fullFormatted,
  hora: selectedTimeSlot,
}}});
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-6 bg-coral-text/40 backdrop-blur-xs">
      
      {/* Backdrop click dismisser */}
      <div className="fixed inset-0 bg-transparent" onClick={onClose} />

      {/* Main Reservation Card container */}
      <div className="relative bg-coral-lowest w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-coral-outline-variant/20 flex flex-col max-h-[90vh] z-10">
        
        {/* Header indicator row */}
        <div className="bg-coral-low/60 border-b border-coral-outline-variant/15 px-6 md:px-8 py-5 flex justify-between items-center text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold text-coral-outline uppercase tracking-wider font-display">
              Asistente de Reservaciones
            </span>
            <h3 className="font-display font-bold text-coral-text text-lg md:text-xl">
              {isSuccess ? "Confirmación de cita" : `Paso ${step} de 5: ${
                step === 1 ? "Selecciona el servicio" :
                step === 2 ? "Elige el especialista" :
                step === 3 ? "Fecha y hora" :
                step === 4 ? "Tus datos" : "Revisión final"
              }`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-coral-text hover:text-coral-dark p-1.5 rounded-full hover:bg-coral-container/50 duration-150 transition-all cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic step rendering panel */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow text-coral-text">
          <AnimatePresence mode="wait">
            
            {/* If completely completed and approved */}
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-55/10 rounded-full text-green-600 mb-2">
                  <CheckCircle className="w-12 h-12 stroke-[1.5]" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display text-2xl font-bold text-coral-text">
                    ¡Tu cita ha sido agendada!
                  </h4>
                  <p className="font-sans text-sm text-coral-text-variant max-w-sm mx-auto leading-relaxed">
                    Hemos registrado tu reserva de forma segura. Un correo de confirmación automática con las ligas de videoconferencia e instrucciones de pago se desvió a tu buzón.
                  </p>
                </div>

                {/* Ticket outline */}
                <div className="bg-coral-low p-6 rounded-2xl max-w-md mx-auto border border-coral-outline-variant/20 text-left space-y-3 font-sans text-sm">
                  <h5 className="font-display font-bold text-coral-dark text-xs uppercase tracking-wider border-b border-coral-outline-variant/10 pb-2">
                    Resumen de Reservación
                  </h5>
                  <div className="flex justify-between">
                    <span className="text-coral-outline">Servicio:</span>
                    <span className="font-bold text-coral-text">{currentService?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coral-outline">Terapeuta:</span>
                    <span className="font-bold text-coral-text">
                      {currentTherapist ? currentTherapist.name : "Cualquier especialista seleccionado"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coral-outline">Fecha:</span>
                    <span className="font-bold text-coral-text">{selectedDateObject?.fullFormatted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coral-outline">Hora:</span>
                    <span className="font-bold text-coral-text">{selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between border-t border-coral-outline-variant/10 pt-2 text-xs opacity-80">
                    <span>Paciente:</span>
                    <span>{clientDetails.name}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href="https://wa.me/+573239233344"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Llamar al consultorio (WhatsApp)</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-coral-dark text-white font-bold text-sm rounded-full cursor-pointer hover:bg-coral-light transition-colors"
                  >
                    Listo, cerrar ventana
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Steps Content */
              <div className="text-left font-sans">
                
                {/* STEP 1: SELECT SERVICE */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <p className="text-sm font-semibold text-coral-outline mb-1">
                      Selecciona la opción de apoyo que requieres hoy:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SERVICES_DATA.map((service) => {
                        const isSelect = selectedServiceId === service.id;
                        return (
                          <button
                            key={service.id}
                            onClick={() => setSelectedServiceId(service.id)}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                              isSelect
                                ? "border-coral-dark bg-coral-primary-fixed/30 ring-1 ring-coral-dark"
                                : "border-coral-outline-variant/30 bg-coral-lowest hover:border-coral-outline hover:bg-coral-low/40"
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="font-display font-bold text-coral-text block">{service.title}</span>
                              <span className="text-xs text-coral-text-variant line-clamp-2 leading-relaxed">
                                {service.shortDescription}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-coral-dark mt-3 block">
                              Inversión: {service.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: CHOOSE THERAPIST */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <p className="text-sm font-semibold text-coral-outline">
                      ¿Tienes preferencia por algún terapeuta en específico?
                    </p>

                    <div className="space-y-3">
                      {/* Anyone option */}
                      <button
                        onClick={() => setSelectedTherapistId("")}
                        className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          selectedTherapistId === ""
                            ? "border-coral-dark bg-coral-primary-fixed/30 ring-1 ring-coral-dark"
                            : "border-coral-outline-variant/30 bg-coral-lowest hover:border-coral-outline hover:bg-coral-low/40"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="font-display font-bold text-coral-text block">Cualquier especialista</span>
                          <span className="text-xs text-coral-text-variant">Se te asignará el profesional con mayor holgura de agenda.</span>
                        </div>
                        {selectedTherapistId === "" && (
                          <div className="w-5 h-5 bg-coral-dark rounded-full flex items-center justify-center text-white shrink-0">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </button>

                      {/* Specialist individual list entries */}
                      {THERAPISTS_DATA.map((therapist) => {
                        const isSelect = selectedTherapistId === therapist.id;
                        return (
                          <button
                            key={therapist.id}
                            onClick={() => setSelectedTherapistId(therapist.id)}
                            className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-4 cursor-pointer ${
                              isSelect
                                ? "border-coral-dark bg-coral-primary-fixed/30 ring-1 ring-coral-dark"
                                : "border-coral-outline-variant/30 bg-coral-lowest hover:border-coral-outline hover:bg-coral-low/40"
                            }`}
                          >
                            <img
                              alt={therapist.name}
                              className="w-12 h-12 rounded-full object-cover shrink-0 border border-coral-outline-variant/30"
                              src={therapist.imageUrl}
                            />
                            <div className="space-y-0.5 flex-grow">
                              <span className="font-display font-bold text-coral-text block">{therapist.name}</span>
                              <span className="text-xs text-coral-text-variant">{therapist.role}</span>
                            </div>
                            {isSelect && (
                              <div className="w-5 h-5 bg-coral-dark rounded-full flex items-center justify-center text-white shrink-0">
                                <Check className="w-3.5 h-3.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: SCHEDULE SELECT */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {/* Calendar grid select */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-coral-outline uppercase tracking-wider flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-coral-light" />
                        1. Elegir fecha
                      </span>
                      
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {datesList.map((dt) => {
                          const isSelect = selectedDate === dt.isoString;
                          return (
                            <button
                              key={dt.isoString}
                              onClick={() => setSelectedDate(dt.isoString)}
                              className={`w-full px-4 py-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-colors ${
                                isSelect
                                  ? "bg-coral-dark text-white border-coral-dark"
                                  : "bg-coral-lowest hover:bg-coral-low border-coral-outline-variant/20"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold uppercase rounded p-1 w-10 text-center ${isSelect ? "bg-white/10 text-white" : "bg-coral-low text-coral-dark"}`}>
                                  {dt.dayName}
                                </span>
                                <span className="font-sans text-sm font-bold">
                                  {dt.dayNumber} {dt.monthName}
                                </span>
                              </div>
                              {isSelect && <Check className="w-4 h-4 text-white" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time selection slots */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-coral-outline uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-4 h-4 text-coral-light" />
                        2. Horarios disponibles
                      </span>
                      
                      {!selectedDate ? (
                        <div className="flex items-center justify-center border border-dashed border-coral-outline-variant/30 rounded-2xl h-[220px] p-6 text-center text-xs text-coral-text-variant">
                          Por favor, selecciona una fecha primero para habilitar horarios de consulta.
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                          {TIME_SLOTS.map((time) => {
  const isSelect = selectedTimeSlot === time;
  const ocupado = isSlotOcupado(selectedDate, time);
  return (
    <button
      key={time}
      onClick={() => !ocupado && setSelectedTimeSlot(time)}
      disabled={ocupado}
      className={`py-2.5 rounded-xl border text-center font-bold text-sm transition-all duration-150 ${
        ocupado
          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through"
          : isSelect
          ? "bg-coral-dark border-coral-dark text-white shadow-xs cursor-pointer"
          : "bg-coral-lowest hover:border-coral-outline border-coral-outline-variant/20 hover:bg-coral-low/40 cursor-pointer"
      }`}
    >
      {time}
    </button>
  );
})}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: CONTACT INFORMATION */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <p className="text-sm font-semibold text-coral-outline mb-2">
                      Proporciona tus datos de contacto para formalizar el registro:
                    </p>

                    <div className="space-y-3">
                      <div className="space-y-0.5">
                        <label htmlFor="client-name" className="text-xs font-bold text-coral-outline uppercase tracking-wider">
                          Nombre completo *
                        </label>
                        <input
                          id="client-name"
                          required
                          type="text"
                          value={clientDetails.name}
                          onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
                          className="w-full bg-coral-low/40 border border-coral-outline-variant/30 rounded-full px-5 py-2.5 text-sm outline-none focus:border-coral-dark focus:bg-white"
                          placeholder="Ej. Carmen Luna"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-0.5">
                          <label htmlFor="client-email" className="text-xs font-bold text-coral-outline uppercase tracking-wider">
                            Correo electrónico *
                          </label>
                          <input
                            id="client-email"
                            required
                            type="email"
                            value={clientDetails.email}
                            onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                            className="w-full bg-coral-low/40 border border-coral-outline-variant/30 rounded-full px-5 py-2.5 text-sm outline-none focus:border-coral-dark focus:bg-white"
                            placeholder="carmen@ejemplo.com"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <label htmlFor="client-phone" className="text-xs font-bold text-coral-outline uppercase tracking-wider">
                            Teléfono celular *
                          </label>
                          <input
                            id="client-phone"
                            required
                            type="tel"
                            value={clientDetails.phone}
                            onChange={(e) => setClientDetails({ ...clientDetails, phone: e.target.value })}
                            className="w-full bg-coral-low/40 border border-coral-outline-variant/30 rounded-full px-5 py-2.5 text-sm outline-none focus:border-coral-dark focus:bg-white"
                            placeholder="Ej. +52 55 9876 5432"
                          />
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <label htmlFor="client-notes" className="text-xs font-bold text-coral-outline uppercase tracking-wider">
                          Notas opcionales / Motivo de consulta
                        </label>
                        <textarea
                          id="client-notes"
                          rows={2}
                          value={clientDetails.notes}
                          onChange={(e) => setClientDetails({ ...clientDetails, notes: e.target.value })}
                          className="w-full bg-coral-low/40 border border-coral-outline-variant/30 rounded-xl px-5 py-2.5 text-sm outline-none focus:border-coral-dark focus:bg-white resize-none"
                          placeholder="Ej. Quisiera trabajar dilemas de agobio laboral y estrés crónico..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: BOOKING DOCUMENT BILL PREVIEW */}
                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 text-left"
                  >
                    <p className="text-sm font-semibold text-coral-outline">
                      Por favor, verifica detalladamente que los parámetros sean correctos:
                    </p>

                    <div className="overflow-hidden border border-coral-outline-variant/20 rounded-2xl bg-coral-low divide-y divide-coral-outline-variant/10 text-sm font-sans">
                      <div className="p-4 flex justify-between items-center bg-coral-outline-variant/5">
                        <span className="font-bold font-display text-coral-dark">Servicio:</span>
                        <div className="text-right">
                          <span className="font-bold text-coral-text">{currentService?.title}</span>
                          <span className="block text-xs text-coral-dark font-semibold font-mono">{currentService?.price}</span>
                        </div>
                      </div>

                      <div className="p-4 flex justify-between">
                        <span className="text-coral-outline">Especialista asistencial:</span>
                        <span className="font-bold text-coral-text">
                          {currentTherapist ? currentTherapist.name : "Cualquier especialista (Sugerido)"}
                        </span>
                      </div>

                      <div className="p-4 flex justify-between">
                        <span className="text-coral-outline">Horario pactado:</span>
                        <span className="font-bold text-coral-text">
                          {selectedDateObject?.fullFormatted} a las {selectedTimeSlot}
                        </span>
                      </div>

                      <div className="p-4 flex justify-between">
                        <span className="text-coral-outline">Datos de paciente:</span>
                        <span className="font-bold text-coral-text text-right">
                          {clientDetails.name} <br />
                          <span className="text-xs opacity-75 font-normal">{clientDetails.email} • {clientDetails.phone}</span>
                        </span>
                      </div>
                    </div>

                    {/* Clinical confidentiality reassurance note */}
                    <div className="p-4 bg-coral-primary-fixed/30 rounded-xl border border-coral-outline-variant/10 text-xs text-coral-text-variant leading-relaxed">
                      <strong>Compromiso ético de confidencialidad:</strong> Al agendar tu sesión, tu terapeuta garantiza un espacio de total reserva y secreto oficial. Podrás reprogramar o cancelar esta cita hasta con 24 horas de anticipación sin cargo alguno.
                    </div>
                  </motion.div>
                )}

              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Wizard Bottom navigation bar */}
        {!isSuccess && (
          <div className="border-t border-coral-outline-variant/15 px-6 md:px-8 py-5 bg-coral-bg flex justify-between">
            {/* Back button */}
            <button
              onClick={handleBackStep}
              className={`px-5 py-2.5 border border-coral-outline text-coral-text font-bold text-sm rounded-full cursor-pointer flex items-center gap-1 transition-all ${
                step === 1 ? "opacity-30 pointer-events-none" : "hover:bg-coral-low"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>

            {/* Next or Confirm button click */}
            {step === 5 ? (
              <button
                onClick={handleConfirmReservation}
                className="px-6 py-2.5 bg-coral-light hover:bg-coral-dark text-white font-bold text-sm rounded-full transition-all flex items-center gap-1 cursor-pointer hover:shadow-md animate-pulse"
              >
                <span>Confirmar cita</span>
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={
                  (step === 1 && !selectedServiceId) ||
                  (step === 3 && (!selectedDate || !selectedTimeSlot)) ||
                  (step === 4 && (!clientDetails.name || !clientDetails.email || !clientDetails.phone))
                }
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-coral-dark text-white hover:bg-coral-light disabled:opacity-50 font-bold text-sm rounded-full transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
