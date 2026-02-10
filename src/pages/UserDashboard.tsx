import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import { getMyProfile, UserProfile } from "@/lib/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingScreen } from "@/components/ui/loading-spinner";

interface Request {
  id: string;
  created_at: string;
  company: string | null;
  service: string;
  message: string;
  status: string;
  chemist_notes: string | null;
  user_id: string;
}

export default function UserDashboard() {
  const navigate = useNavigate();
  
  // Estados de perfil y autorización
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Estados del formulario
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Estados de solicitudes
  const [requests, setRequests] = useState<Request[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Verificar rol al montar
  useEffect(() => {
    async function checkRole() {
      try {
        const userProfile = await getMyProfile();
        
        if (userProfile.role !== 'usuario') {
          // Si no es usuario, redirigir a /lab
          navigate('/lab', { replace: true });
          return;
        }
        
        setProfile(userProfile);
      } catch (error) {
        setAuthError(error instanceof Error ? error.message : "Error de autorización");
      } finally {
        setAuthLoading(false);
      }
    }
    
    checkRole();
  }, [navigate]);

  // Cargar solicitudes del usuario
  useEffect(() => {
    if (!profile) return;
    
    async function fetchRequests() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No hay sesión");
        
        const { data, error } = await supabase
          .from('requests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setRequests(data || []);
      } catch (error) {
        setFetchError(error instanceof Error ? error.message : "Error cargando solicitudes");
      } finally {
        setFetchLoading(false);
      }
    }
    
    fetchRequests();
  }, [profile]);

  // Crear nueva solicitud
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    
    if (!service.trim()) {
      setSubmitError("El servicio es requerido");
      return;
    }
    
    if (!message.trim()) {
      setSubmitError("El mensaje es requerido");
      return;
    }
    
    setSubmitLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión");
      
      const { data, error } = await supabase
        .from('requests')
        .insert({
          user_id: user.id,
          company: company.trim() || null,
          service: service.trim(),
          message: message.trim()
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Limpiar formulario
      setCompany("");
      setService("");
      setMessage("");
      setSubmitSuccess(true);
      
      // Agregar nueva solicitud al inicio de la lista
      if (data) {
        setRequests(prev => [data, ...prev]);
      }
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSubmitSuccess(false), 3000);
      
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Error al enviar solicitud");
    } finally {
      setSubmitLoading(false);
    }
  }

  // Cerrar sesión
  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  }

  // Formatear fecha
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Obtener color del estado
  function getStatusColor(status: string) {
    const colors: Record<string, string> = {
      nuevo: 'bg-blue-100 text-blue-800',
      en_revision: 'bg-yellow-100 text-yellow-800',
      en_proceso: 'bg-orange-100 text-orange-800',
      completado: 'bg-green-100 text-green-800',
      rechazado: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  // Loading de autorización
  if (authLoading) {
    return <LoadingScreen text="Verificando permisos..." />;
  }

  // Error de autorización
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">No autorizado</h1>
          <p className="text-gray-600 mb-4">{authError}</p>
          <Button onClick={() => navigate('/login')}>Ir a iniciar sesión</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Panel de Usuario</h1>
            <p className="text-sm text-gray-500">Bienvenido, {profile?.full_name || 'Usuario'}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Formulario de nueva solicitud */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Nueva Solicitud</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Empresa (opcional)</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Nombre de la empresa"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="service">Servicio *</Label>
                <Input
                  id="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="Tipo de análisis o servicio"
                  required
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="message">Mensaje *</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe tu solicitud en detalle..."
                required
                rows={4}
                className="mt-1"
              />
            </div>
            
            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}
            
            {submitSuccess && (
              <p className="text-sm text-green-600">✓ Solicitud enviada correctamente</p>
            )}
            
            <Button type="submit" disabled={submitLoading}>
              {submitLoading ? "Enviando..." : "Enviar Solicitud"}
            </Button>
          </form>
        </section>

        {/* Lista de solicitudes */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Mis Solicitudes</h2>
          
          {fetchLoading ? (
            <p className="text-gray-500">Cargando solicitudes...</p>
          ) : fetchError ? (
            <p className="text-red-500">{fetchError}</p>
          ) : requests.length === 0 ? (
            <p className="text-gray-500">No tienes solicitudes aún.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-3">Fecha</th>
                    <th className="text-left p-3">Servicio</th>
                    <th className="text-left p-3">Estado</th>
                    <th className="text-left p-3">Mensaje</th>
                    <th className="text-left p-3">Notas del Químico</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="p-3 whitespace-nowrap">
                        {formatDate(req.created_at)}
                      </td>
                      <td className="p-3">{req.service}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                          {req.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 max-w-xs truncate" title={req.message}>
                        {req.message.substring(0, 50)}{req.message.length > 50 ? '...' : ''}
                      </td>
                      <td className="p-3 text-gray-600">
                        {req.chemist_notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
