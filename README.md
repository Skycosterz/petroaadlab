# Petroaadlab – Plataforma de Gestión de Solicitudes

## Descripción General

Petroaadlab es una aplicación web desarrollada como prueba técnica para la gestión de solicitudes de análisis especializados (combustibles, aguas residuales, entre otros).

La plataforma incluye:

- Landing pública con formulario de contacto.
- Sistema de autenticación con roles.
- Panel de usuario.
- Panel de químico.
- Gestión de solicitudes.
- Control de acceso mediante Row Level Security (RLS).
- Despliegue en producción mediante Vercel.

---

# Tecnologías Utilizadas

## Frontend
- React
- TypeScript
- Vite
- TailwindCSS
- Radix UI
- React Router DOM

## Backend / Base de Datos
- Supabase
  - PostgreSQL
  - Autenticación
  - Row Level Security (RLS)
  - API REST automática

## Despliegue
- Vercel

---

# Herramientas de IA Utilizadas

Durante el desarrollo se utilizaron herramientas de inteligencia artificial en especifico TEMPO como apoyo técnico y de documentación.

Se emplearon para:

- Asistencia en diseño de arquitectura frontend.
- Configuración de autenticación con Supabase.
- Implementación de políticas RLS.
- Estructuración del sistema de roles.
- Validación de formularios.
- Optimización y revisión de código.

Las herramientas de IA se utilizaron como soporte técnico y no sustituyen la implementación manual ni la comprensión del sistema.

---

# Arquitectura del Proyecto

## Roles del sistema

Existen dos roles principales:

- `usuario`
- `quimico`

La redirección se realiza según el rol autenticado:

- Usuario → `/dashboard`
- Químico → `/lab`

La seguridad se aplica tanto en frontend como en base de datos mediante políticas RLS.

---

# Base de Datos (Supabase)

## Tablas principales

### profiles
Contiene información del usuario autenticado:

- id (uuid)
- role (usuario | quimico)
- full_name

### requests
Solicitudes creadas por usuarios autenticados:

- id
- user_id
- company
- service
- message
- status
- chemist_notes

### leads
Solicitudes públicas enviadas desde la landing page.

---

# Seguridad – Row Level Security (RLS)

Se implementaron políticas para garantizar:

- Cada usuario solo puede ver su propio perfil.
- Cada usuario solo puede ver sus propias solicitudes.
- Inserciones restringidas por `auth.uid()`.

# Instalación en Local

## 1. Clonar repositorio

```bash
git clone https://github.com/Skycosterz/petroaadlab.git
cd petroaadlab
2. Instalar dependencias
npm install

3. Configurar variables de entorno

Crear un archivo .env en la raíz del proyecto:

VITE_SUPABASE_URL=https://TU_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=TU_PUBLICABLE_KEY

Importante

Utilizar la Publishable Key de Supabase.

No utilizar la Secret Key en el frontend.

Las variables deben comenzar con VITE_ para que Vite las exponga correctamente.

4. Ejecutar en desarrollo
npm run dev


Disponible en:

http://localhost:5173

Despliegue en Producción (Vercel)
1. Conectar repositorio

Importar el proyecto desde GitHub.

Seleccionar el preset: Vite.

2. Configurar variables de entorno en Vercel

Agregar las siguientes variables:

VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY


Con los valores correspondientes desde Supabase.

3. Deploy

Vercel detecta automáticamente:

Build Command: npm run build

Output Directory: dist

Flujo del Sistema
Registro

El usuario crea una cuenta.

Se genera automáticamente un registro en la tabla profiles.

El rol por defecto asignado es: usuario.

Acceso por Rol

Rol usuario → Acceso al panel /dashboard

Rol quimico → Acceso al panel /lab

La redirección se realiza automáticamente después de la autenticación.

Landing Pública

El formulario guarda la información en la tabla leads.

No requiere autenticación.

Permite capturar prospectos externos.

Estructura del Proyecto
src/
 ├── components/
 ├── pages/
 ├── lib/
 ├── supabase/
 └── App.tsx
