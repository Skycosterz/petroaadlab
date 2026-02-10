import { supabase } from "../../supabase/supabase";
import { NavigateFunction } from "react-router-dom";

export type UserRole = 'usuario' | 'quimico';

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string | null;
}

/**
 * Obtiene el perfil del usuario autenticado actual
 */
export async function getMyProfile(): Promise<UserProfile> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error("No hay sesión activa");
  }
  
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, role, full_name')
    .eq('id', user.id)
    .single();
  
  if (profileError || !profile) {
    throw new Error("No se encontró el perfil del usuario");
  }
  
  return profile as UserProfile;
}

/**
 * Verifica si el usuario tiene uno de los roles permitidos
 */
export async function requireRole(allowed: UserRole[]): Promise<{ ok: boolean; profile?: UserProfile; error?: string }> {
  try {
    const profile = await getMyProfile();
    
    if (!allowed.includes(profile.role)) {
      return { ok: false, error: `Acceso denegado. Se requiere rol: ${allowed.join(' o ')}` };
    }
    
    return { ok: true, profile };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error desconocido" };
  }
}

/**
 * Redirige al usuario según su rol
 */
export async function routeByRole(navigate: NavigateFunction): Promise<void> {
  try {
    const profile = await getMyProfile();
    
    if (profile.role === 'usuario') {
      navigate('/dashboard');
    } else if (profile.role === 'quimico') {
      navigate('/lab');
    } else {
      // Fallback por si hay un rol no manejado
      navigate('/dashboard');
    }
  } catch (error) {
    // Si hay error obteniendo el perfil, ir al dashboard por defecto
    console.error("Error obteniendo perfil para redirección:", error);
    navigate('/dashboard');
  }
}
