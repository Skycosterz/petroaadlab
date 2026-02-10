import { useState, useEffect } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { routeByRole } from "@/lib/profile";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Si ya hay sesión, redirigir según rol
  useEffect(() => {
    if (!authLoading && user) {
      routeByRole(navigate);
    }
  }, [user, authLoading, navigate]);

  // Validación de email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones
    if (!email.trim()) {
      setError("El email es requerido");
      return;
    }
    if (!isValidEmail(email)) {
      setError("El formato del email no es válido");
      return;
    }
    if (!password) {
      setError("La contraseña es requerida");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      setSuccess("Sesión iniciada correctamente. Redirigiendo...");
      // Redirigir según rol
      await routeByRole(navigate);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      if (errorMessage.includes("Invalid login credentials")) {
        setError("Email o contraseña incorrectos");
      } else if (errorMessage.includes("Email not confirmed")) {
        setError("Por favor confirma tu email antes de iniciar sesión");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</Label>
              <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
      
      
          <div className="text-sm text-center text-gray-600 mt-6">
            ¿No tienes cuenta?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
