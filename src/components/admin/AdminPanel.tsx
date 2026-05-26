import { useState, useEffect } from "react";
import { LogOut, Trash2, CheckCircle, Filter } from "lucide-react";

interface Cita {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  terapeuta: string;
  fecha: string;
  hora: string;
  notas: string;
  atendida?: boolean;
}

interface AdminPanelProps {
  onLogout: () => void;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTerapeuta, setFiltroTerapeuta] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  const fetchCitas = async () => {
    setLoading(true);
    const res = await fetch("https://coral-7rhb.onrender.com/admin/citas", {
      headers: { "x-admin-auth": "true" }
    });
    const data = await res.json();
    setCitas(data);
    setLoading(false);
  };

  useEffect(() => { fetchCitas(); }, []);

  const cancelarCita = async (id: string) => {
    if (!confirm("¿Eliminar esta cita?")) return;
    await fetch(`https://coral-7rhb.onrender.com/admin/citas/${id}`, {
      method: "DELETE",
      headers: { "x-admin-auth": "true" }
    });
    setCitas(prev => prev.filter(c => c.id !== id));
  };

  const marcarAtendida = async (id: string) => {
    await fetch(`https://coral-7rhb.onrender.com/admin/citas/${id}/atendida`, {
      method: "PATCH",
      headers: { "x-admin-auth": "true" }
    });
    setCitas(prev => prev.map(c => c.id === id ? { ...c, atendida: true } : c));
  };

  const citasFiltradas = citas.filter(c => {
    const matchTerapeuta = filtroTerapeuta ? c.terapeuta === filtroTerapeuta : true;
    const matchFecha = filtroFecha ? c.fecha.includes(filtroFecha) : true;
    return matchTerapeuta && matchFecha;
  });

  const terapeutas = [...new Set(citas.map(c => c.terapeuta))];

  return (
    <div className="min-h-screen bg-coral-bg">
      {/* Header */}
      <div className="bg-coral-lowest border-b border-coral-outline-variant/20 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-display text-xl font-bold text-coral-text">Panel de Administración</h1>
          <p className="text-sm text-coral-text-variant">Coral Psicología</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-coral-text-variant hover:text-coral-dark transition-colors cursor-pointer">
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Salir</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-coral-lowest rounded-2xl p-5 border border-coral-outline-variant/20">
            <p className="text-xs text-coral-text-variant uppercase tracking-wider">Total citas</p>
            <p className="text-3xl font-bold text-coral-text mt-1">{citas.length}</p>
          </div>
          <div className="bg-coral-lowest rounded-2xl p-5 border border-coral-outline-variant/20">
            <p className="text-xs text-coral-text-variant uppercase tracking-wider">Pendientes</p>
            <p className="text-3xl font-bold text-coral-dark mt-1">{citas.filter(c => !c.atendida).length}</p>
          </div>
          <div className="bg-coral-lowest rounded-2xl p-5 border border-coral-outline-variant/20">
            <p className="text-xs text-coral-text-variant uppercase tracking-wider">Atendidas</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{citas.filter(c => c.atendida).length}</p>
          </div>
          <div className="bg-coral-lowest rounded-2xl p-5 border border-coral-outline-variant/20">
            <p className="text-xs text-coral-text-variant uppercase tracking-wider">Terapeutas</p>
            <p className="text-3xl font-bold text-coral-secondary mt-1">{terapeutas.length}</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="w-4 h-4 text-coral-text-variant" />
          <select
            value={filtroTerapeuta}
            onChange={e => setFiltroTerapeuta(e.target.value)}
            className="bg-coral-lowest border border-coral-outline-variant/30 rounded-full px-4 py-2 text-sm outline-none"
          >
            <option value="">Todos los terapeutas</option>
            {terapeutas.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input
            type="text"
            placeholder="Filtrar por fecha (ej: May)"
            value={filtroFecha}
            onChange={e => setFiltroFecha(e.target.value)}
            className="bg-coral-lowest border border-coral-outline-variant/30 rounded-full px-4 py-2 text-sm outline-none"
          />
          {(filtroTerapeuta || filtroFecha) && (
            <button onClick={() => { setFiltroTerapeuta(""); setFiltroFecha(""); }} className="text-sm text-coral-dark hover:underline cursor-pointer">
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Tabla */}
        {loading ? (
          <div className="text-center py-20 text-coral-text-variant">Cargando citas...</div>
        ) : citasFiltradas.length === 0 ? (
          <div className="text-center py-20 text-coral-text-variant">No hay citas registradas.</div>
        ) : (
          <div className="space-y-3">
            {citasFiltradas.map(cita => (
              <div key={cita.id} className={`bg-coral-lowest rounded-2xl border p-5 flex flex-col md:flex-row md:items-center gap-4 ${cita.atendida ? "border-green-200 opacity-70" : "border-coral-outline-variant/20"}`}>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs text-coral-text-variant uppercase tracking-wider">Paciente</p>
                    <p className="font-semibold text-coral-text text-sm mt-0.5">{cita.nombre}</p>
                    <p className="text-xs text-coral-text-variant">{cita.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-coral-text-variant uppercase tracking-wider">Terapeuta</p>
                    <p className="font-semibold text-coral-text text-sm mt-0.5">{cita.terapeuta}</p>
                    <p className="text-xs text-coral-text-variant">{cita.servicio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-coral-text-variant uppercase tracking-wider">Fecha y hora</p>
                    <p className="font-semibold text-coral-text text-sm mt-0.5">{cita.fecha}</p>
                    <p className="text-xs text-coral-text-variant">{cita.hora}</p>
                  </div>
                  <div>
                    <p className="text-xs text-coral-text-variant uppercase tracking-wider">Teléfono</p>
                    <p className="font-semibold text-coral-text text-sm mt-0.5">{cita.telefono}</p>
                    {cita.notas && <p className="text-xs text-coral-text-variant">{cita.notas}</p>}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!cita.atendida && (
                    <button onClick={() => marcarAtendida(cita.id)} className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-medium px-4 py-2 rounded-full transition-all cursor-pointer">
                      <CheckCircle className="w-4 h-4" />
                      Atendida
                    </button>
                  )}
                  <button onClick={() => cancelarCita(cita.id)} className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium px-4 py-2 rounded-full transition-all cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}