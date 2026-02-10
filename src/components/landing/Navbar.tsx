import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import { useAuth } from "../../../supabase/auth";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
      setIsServicesOpen(false);
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-neutral-charcoal text-white text-xs font-manrope py-2">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🇲🇽</span>
            <span className="font-semibold tracking-wider">PETROAADLAB MÉXICO</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="font-bold tracking-wide text-petro-red">PETRO<span className="text-white">AAD</span>LAB</span>
            <span className="font-bold tracking-wide text-aqua-blue">AQUA<span className="text-white">AD</span>LAB</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="border border-white/30 px-4 py-1 rounded hover:bg-white/10 transition-colors"
              >
                PORTAL
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 border border-white/30 px-4 py-1 rounded hover:bg-white/10 transition-colors"
              >
                <LogIn className="h-3 w-3" />
                ACCESO
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 flex h-16 items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-1">
            <span className="font-syne text-2xl font-bold text-neutral-charcoal tracking-tight">
              PETRO<span className="text-petro-red">AAD</span>LAB
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollTo("hero")}
              className="font-manrope text-sm font-medium text-neutral-charcoal hover:text-petro-red transition-colors border-b-2 border-petro-red pb-1"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="font-manrope text-sm font-medium text-neutral-text hover:text-petro-red transition-colors"
            >
              Nosotros
            </button>
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="font-manrope text-sm font-medium text-neutral-text hover:text-petro-red transition-colors flex items-center gap-1"
              >
                Servicios
                <ChevronDown className={`h-3 w-3 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-border py-2 min-w-[200px] z-50">
                  <button
                    onClick={() => scrollTo("petroleum")}
                    className="w-full text-left px-4 py-2 text-sm font-manrope text-neutral-text hover:bg-red-50 hover:text-petro-red transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-4 bg-petro-red rounded-full" />
                    Petrolíferos
                  </button>
                  <button
                    onClick={() => scrollTo("water")}
                    className="w-full text-left px-4 py-2 text-sm font-manrope text-neutral-text hover:bg-blue-50 hover:text-aqua-blue transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-4 bg-aqua-blue rounded-full" />
                    Aguas Residuales
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => scrollTo("blog")}
              className="font-manrope text-sm font-medium text-neutral-text hover:text-petro-red transition-colors"
            >
              Blog
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="font-manrope text-sm font-medium text-neutral-text hover:text-petro-red transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* Desktop social */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-text hover:text-petro-red transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-neutral-text hover:text-petro-red transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-text hover:text-petro-red transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-text hover:text-petro-red transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0z"/></svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-neutral-charcoal"
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-lg lg:hidden">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsMobileOpen(false)}>
              <X className="h-6 w-6 text-neutral-charcoal" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-8 pt-12">
            <button onClick={() => scrollTo("hero")} className="font-syne text-2xl font-bold text-neutral-charcoal">Inicio</button>
            <button onClick={() => scrollTo("about")} className="font-syne text-2xl font-bold text-neutral-charcoal">Nosotros</button>
            <button onClick={() => scrollTo("petroleum")} className="font-syne text-2xl font-bold text-petro-red">Petrolíferos</button>
            <button onClick={() => scrollTo("water")} className="font-syne text-2xl font-bold text-aqua-blue">Aguas Residuales</button>
            <button onClick={() => scrollTo("blog")} className="font-syne text-2xl font-bold text-neutral-charcoal">Blog</button>
            <button onClick={() => scrollTo("contact")} className="font-syne text-2xl font-bold text-neutral-charcoal">Contacto</button>
            <div className="flex gap-4 mt-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-petro-red text-white font-manrope font-semibold px-8 py-3 rounded-lg"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Portal Cliente
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-petro-red text-white font-manrope font-semibold px-8 py-3 rounded-lg"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
