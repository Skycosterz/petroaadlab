import { ArrowRight, Beaker, Droplets } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Hero image */}
      <div className="relative h-[500px] md:h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1600&q=80"
          alt="Puerto petrolífero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1200px] mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <h1 className="font-syne text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                Análisis de{" "}
                <span className="text-petro-red">Petrolíferos</span> y{" "}
                <span className="text-aqua-blue">Aguas Residuales</span>
              </h1>
              <p className="font-manrope text-base md:text-lg text-white/90 mb-8 max-w-lg">
                Laboratorio acreditado de última generación. Precisión, cumplimiento
                normativo y resultados confiables para la industria mexicana.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollTo("contact")}
                  className="bg-petro-red hover:bg-petro-red-dark text-white font-manrope font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-petro-red/25"
                >
                  Solicitar Cotización
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollTo("petroleum")}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-manrope font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 border border-white/30"
                >
                  Explorar Servicios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service division cards */}
      <div className="max-w-[1200px] mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => scrollTo("petroleum")}
            className="group bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 border-t-4 border-petro-red text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                <Beaker className="h-6 w-6 text-petro-red" />
              </div>
              <div>
                <span className="font-mono text-xs text-neutral-text">01</span>
                <h3 className="font-syne text-xl font-bold text-neutral-charcoal">PETROLÍFEROS</h3>
              </div>
            </div>
            <p className="font-manrope text-sm text-neutral-text">
              Análisis bajo NOM-016-CRE-2016. Gasolinas, diésel, turbosina y gas LP.
            </p>
            <span className="font-manrope text-sm font-semibold text-petro-red mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
              Ver servicios <ArrowRight className="h-3 w-3" />
            </span>
          </button>

          <button
            onClick={() => scrollTo("water")}
            className="group bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 border-t-4 border-aqua-blue text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Droplets className="h-6 w-6 text-aqua-blue" />
              </div>
              <div>
                <span className="font-mono text-xs text-neutral-text">02</span>
                <h3 className="font-syne text-xl font-bold text-neutral-charcoal">AGUAS RESIDUALES</h3>
              </div>
            </div>
            <p className="font-manrope text-sm text-neutral-text">
              Pruebas bajo NOM-001, NOM-002 y NOM-003 SEMARNAT para descargas y aguas tratadas.
            </p>
            <span className="font-manrope text-sm font-semibold text-aqua-blue mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
              Ver servicios <ArrowRight className="h-3 w-3" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
