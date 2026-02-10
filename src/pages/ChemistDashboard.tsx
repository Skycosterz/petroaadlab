import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import { getMyProfile, UserProfile } from "@/lib/profile";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingScreen } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const STATUS_OPTIONS = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'en_revision', label: 'En Revisión' },
  { value: 'en_proceso', label: 'En Proceso' },
  { value: 'completado', label: 'Completado' },
  { value: 'rechazado', label: 'Rechazado' },
];

export default function ChemistDashboard() {
  const navigate = useNavigate();
  
  // Estados de perfil y autorización
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Estados de solicitudes
  const [requests, setRequests] = useState<Request[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  // Estados de edición
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Verificar rol al montar
  useEffect(() => {
    async function checkRole() {
      try {
        const userProfile = await getMyProfile();
        
        if (userProfile.role !== 'quimico') {
          // Si no es químico, redirigir a /dashboard
          navigate('/dashboard', { replace: true });
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

  // Cargar todas las solicitudes
  useEffect(() => {
    if (!profile) return;
    
    async function fetchRequests() {
      try {
        const { data, error } = await supabase
          .from('requests')
          .select('*')
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

  // Iniciar edición
  function startEdit(request: Request) {
    setEditingId(request.id);
    setEditStatus(request.status);
    setEditNotes(request.chemist_notes || "");
    setUpdateError(null);
    setUpdateSuccess(false);
  }

  // Cancelar edición
  function cancelEdit() {
    setEditingId(null);
    setEditStatus("");
    setEditNotes("");
    setUpdateError(null);
  }

  // Guardar cambios
  async function saveChanges(requestId: string) {
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);
    
    try {
      const { error } = await supabase
        .from('requests')
        .update({
          status: editStatus,
          chemist_notes: editNotes.trim() || null
        })
        .eq('id', requestId);
      
      if (error) throw error;
      
      // Actualizar lista local
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, status: editStatus, chemist_notes: editNotes.trim() || null }
          : req
      ));
      
      setUpdateSuccess(true);
      
      // Cerrar edición después de 1 segundo
      setTimeout(() => {
        setEditingId(null);
        setEditStatus("");
        setEditNotes("");
        setUpdateSuccess(false);
      }, 1000);
      
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : "Error al actualizar");
    } finally {
      setUpdateLoading(false);
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
            <h1 className="text-xl font-bold text-gray-900">Panel de Químico</h1>
            <p className="text-sm text-gray-500">Bienvenido, {profile?.full_name || 'Químico'}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Lista de solicitudes */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Todas las Solicitudes</h2>
          
          {fetchLoading ? (
            <p className="text-gray-500">Cargando solicitudes...</p>
          ) : fetchError ? (
            <p className="text-red-500">{fetchError}</p>
          ) : requests.length === 0 ? (
            <p className="text-gray-500">No hay solicitudes aún.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div 
                  key={req.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-500">{formatDate(req.created_at)}</p>
                      <p className="font-medium">{req.service}</p>
                      {req.company && (
                        <p className="text-sm text-gray-600">Empresa: {req.company}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                      {req.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{req.message}</p>
                  
                  {editingId === req.id ? (
                    // Modo edición
                    <div className="border-t pt-4 space-y-4">
                      <div>
                        <Label htmlFor={`status-${req.id}`}>Estado</Label>
                        <Select value={editStatus} onValueChange={setEditStatus}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor={`notes-${req.id}`}>Notas del Químico</Label>
                        <Textarea
                          id={`notes-${req.id}`}
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Agregar notas sobre esta solicitud..."
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                      
                      {updateError && (
                        <p className="text-sm text-red-500">{updateError}</p>
                      )}
                      
                      {updateSuccess && (
                        <p className="text-sm text-green-600">✓ Actualizado correctamente</p>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => saveChanges(req.id)} 
                          disabled={updateLoading}
                          size="sm"
                        >
                          {updateLoading ? "Guardando..." : "Guardar"}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={cancelEdit}
                          disabled={updateLoading}
                          size="sm"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Modo visualización
                    <div className="border-t pt-4">
                      {req.chemist_notes && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-600">Notas:</p>
                          <p className="text-gray-700">{req.chemist_notes}</p>
                        </div>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => startEdit(req)}
                      >
                        Editar
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
