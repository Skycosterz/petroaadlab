import { supabase } from "../../supabase/supabase";
import { NavigateFunction } from "react-router-dom";

export type UserRole = "usuario" | "quimico";

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string | null;
}

/**
 * Obtiene el usuario autenticado actual o lanza error si no hay sesión
 */
async function getAuthUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) throw new Error("No hay sesión activa");
  return data.user;
}

/**
 * Obtiene el perfil del usuario autenticado actual.
 * Usa maybeSingle() para evitar errores cuando aún no existe el perfil.
 */
export async function getMyProfile(): Promise<UserProfile> {
  const user = await getAuthUser();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) throw profileError;
  if (!profile) throw new Error("No se encontró el perfil del usuario");

  return profile as UserProfile;
}

/**
 * Asegura que exista el perfil del usuario.
 * Si no existe, lo crea con role default = 'usuario'.
 */
export async function ensureMyProfileExists(
  defaults?: { role?: UserRole; full_name?: string | null }
): Promise<UserProfile> {
  const user = await getAuthUser();

  // 1) Intentar leer perfil
  const { data: existing, error: readErr } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (readErr) throw readErr;
  if (existing) return existing as UserProfile;

  // 2) Si no existe, crearlo
  const payload = {
    id: user.id,
    role: defaults?.role ?? "usuario",
    full_name: defaults?.full_name ?? (user.user_metadata?.full_name ?? null),
  };

  const { data: created, error: insErr } = await supabase
    .from("profiles")
    .insert(payload)
    .select("id, role, full_name")
    .single();

  if (insErr) throw insErr;

  return created as UserProfile;
}

/**
 * Verifica si el usuario tiene uno de los roles permitidos.
 * Si no existe perfil, lo crea (default usuario) para no bloquear el flujo en dev.
 */
export async function requireRole(
  allowed: UserRole[]
): Promise<{ ok: boolean; profile?: UserProfile; error?: string }> {
  try {
    const profile = await ensureMyProfileExists({ role: "usuario" });

    if (!allowed.includes(profile.role)) {
      return {
        ok: false,
        error: `Acceso denegado. Se requiere rol: ${allowed.join(" o ")}`,
      };
    }

    return { ok: true, profile };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

/**
 * Redirige al usuario según su rol.
 * Si no existe perfil, lo crea y luego enruta.
 */
export async function routeByRole(navigate: NavigateFunction): Promise<void> {
  try {
    const profile = await ensureMyProfileExists({ role: "usuario" });

    if (profile.role === "quimico") {
      navigate("/lab");
    } else {
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Error obteniendo/creando perfil para redirección:", error);
    navigate("/auth");
  }
}
