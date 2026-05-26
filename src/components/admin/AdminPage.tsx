import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

export default function AdminPage() {
  const [authed, setAuthed] = useState(
    sessionStorage.getItem("adminAuth") === "true"
  );

  const handleLogin = () => setAuthed(true);
  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setAuthed(false);
  };

  return authed ? (
    <AdminPanel onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}