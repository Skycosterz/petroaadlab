import { Suspense } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";

import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Success from "./components/pages/success";
import Home from "./components/pages/home";

import UserDashboard from "./pages/UserDashboard";
import ChemistDashboard from "./pages/ChemistDashboard";
import DashboardLayout from "./components/pages/dashboard";


import RequireAuth from "./components/RequireAuth";
import { AuthProvider, useAuth } from "../supabase/auth";

import { Toaster } from "./components/ui/sonner";
import { LoadingScreen } from "./components/ui/loading-spinner";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/auth" element={<LoginForm />} />

        {/* Dashboard usuario */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UserDashboard />
              </DashboardLayout>
            </RequireAuth>
          }
        />

        {/* Dashboard químico */}
        <Route
          path="/lab"
          element={
            <RequireAuth>
              <DashboardLayout>
                <ChemistDashboard />
              </DashboardLayout>
            </RequireAuth>
          }
        />

        {/* Success */}
        <Route path="/success" element={<Success />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Tempo routes (solo cuando VITE_TEMPO=true) */}
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
