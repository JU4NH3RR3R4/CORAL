import { useState } from "react";
import { Lock } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("https://coral-7rhb.onrender.com/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    });
    const data = await res.json();
    if (data.ok) {
      sessionStorage.setItem("adminAuth", "true");
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-coral-bg flex items-center justify-center px-4">
      <div className="bg-coral-lowest border border-coral-outline-variant/20 rounded-2xl p-10 w-full max-w-sm shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-coral-primary-fixed rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5 text-coral-dark" />
          </div>
          <h1 className="font-display text-2xl font-bold text-coral-text">Panel Admin</h1>
          <p className="text-sm text-coral-text-variant">Coral Psicología</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={e => setUser(e.target.value)}
            className="w-full bg-coral-low border border-coral-outline-variant/30 rounded-full px-5 py-3 text-sm outline-none focus:border-coral-dark"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={e => setPass(e.target.value)}
            className="w-full bg-coral-low border border-coral-outline-variant/30 rounded-full px-5 py-3 text-sm outline-none focus:border-coral-dark"
          />
          {error && <p className="text-red-500 text-sm text-center">Credenciales incorrectas</p>}
          <button
            type="submit"
            className="w-full bg-coral-light hover:bg-coral-dark text-white font-semibold py-3 rounded-full transition-all"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}