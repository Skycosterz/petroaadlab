import { useState, useEffect } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { toast } from "sonner";
import { routeByRole } from "@/lib/profile";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, user, loading: authLoading } = useAuth();
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
    if (!fullName.trim()) {
      setError("El nombre completo es requerido");
      return;
    }
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
      await signUp(email, password, fullName);
      setSuccess("Cuenta creada correctamente. Por favor revisa tu email para verificar tu cuenta.");
      toast(
        "Cuenta creada exitosamente",
        {
          description: "Por favor revisa tu email para verificar tu cuenta.",
          duration: 5000,
        }
      );
      // Esperar un momento y redirigir a login
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      if (errorMessage.includes("User already registered")) {
        setError("Este email ya está registrado. Intenta iniciar sesión.");
      } else if (errorMessage.includes("Password should be")) {
        setError("La contraseña no cumple los requisitos mínimos");
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
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Nombre Completo</Label>
            <Input
              id="fullName"
              placeholder="Juan Pérez"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Crear cuenta"}
          </Button>
          
          
          <div className="text-xs text-center text-gray-500 mt-6">
            Al crear una cuenta, aceptas nuestros{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Política de Privacidad
            </Link>
          </div>
          
          <div className="text-sm text-center text-gray-600 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
