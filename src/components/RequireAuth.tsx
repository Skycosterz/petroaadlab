import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import { LoadingScreen } from "@/components/ui/loading-spinner";

interface RequireAuthProps {
  children: React.ReactNode;
}

/**
 * Componente wrapper para proteger rutas que requieren autenticación.
 * Redirige a /login si no hay sesión activa.
 */
export default function RequireAuth({ children }: RequireAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login", { replace: true });
      } else {
        setIsAuthenticated(true);
      }
    });

    // Escuchar cambios de estado de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Mientras se verifica la sesión, mostrar loading
  if (isAuthenticated === null) {
    return <LoadingScreen text="Verificando sesión..." />;
  }

  // Si no está autenticado, no renderizar nada (ya redirigió)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
