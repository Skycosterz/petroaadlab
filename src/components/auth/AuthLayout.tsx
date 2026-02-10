import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-off-white font-manrope text-neutral-charcoal">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-syne text-2xl font-bold text-neutral-charcoal tracking-tight">
              PETRO<span className="text-petro-red">AAD</span>LAB
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-7 text-sm font-manrope">
            <Link to="/" className="text-neutral-text hover:text-petro-red transition-colors">Inicio</Link>
          </nav>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-md w-full px-4">
          <div className="text-center mb-8">
            <h2 className="font-syne text-3xl font-extrabold text-neutral-charcoal tracking-tight">
              Portal de Acceso
            </h2>
            <p className="font-manrope text-base text-neutral-text mt-2">
              Inicie sesión para acceder a su cuenta
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
