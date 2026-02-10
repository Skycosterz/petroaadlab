import { CheckCircle, ArrowRight, Shield } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-neutral-off-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-neutral-charcoal leading-tight mb-6">
              LABORATORIO{" "}
              <span className="text-petro-red">LÍDER EN ANÁLISIS</span> DE
              PETROLÍFEROS Y AGUAS RESIDUALES.
            </h2>
            <p className="font-manrope text-base md:text-lg text-neutral-text leading-relaxed mb-8">
              Somos un laboratorio de última generación con personal profesional
              altamente capacitado y una infraestructura de primer nivel. Nuestro
              objetivo es ofrecerle el mejor análisis de calidad sobre productos
              petrolíferos y descargas de aguas residuales, cumpliendo siempre con
              las normas y leyes aplicables bajo los más altos estándares de
              calidad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-petro-red" />
                  <span className="font-manrope font-semibold text-neutral-charcoal">
                    PETROLÍFEROS
                  </span>
                </div>
                <p className="font-mono text-xs text-neutral-text">
                  bajo la NOM-016-CRE-2016.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-petro-red" />
                  <span className="font-manrope font-semibold text-neutral-charcoal">
                    AGUAS RESIDUALES
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-xs text-neutral-text">
                    bajo la NOM-001-SEMARNAT-1996 (2021)
                  </p>
                  <p className="font-mono text-xs text-neutral-text">
                    NOM-002-SEMARNAT-1996
                  </p>
                  <p className="font-mono text-xs text-neutral-text">
                    NOM-003-SEMARNAT-1997
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById("petroleum");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-petro-red hover:bg-petro-red-dark text-white font-manrope font-semibold px-6 py-3 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
            >
              ALCANCE
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Accreditation badges */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-neutral-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-manrope text-xs font-semibold text-green-700">ema</p>
                  <p className="font-manrope text-[10px] text-neutral-text">LABORATORIO DE ENSAYO</p>
                  <p className="font-mono text-xs font-bold text-neutral-charcoal">
                    ACREDITADO Q-0941-124/18
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-manrope text-xs font-semibold text-green-700">ema</p>
                  <p className="font-manrope text-[10px] text-neutral-text">LABORATORIO DE ENSAYO</p>
                  <p className="font-mono text-xs font-bold text-neutral-charcoal">
                    ACREDITADO AG-1745-134/24
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image grid */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80"
                  alt="Técnico de laboratorio"
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=600&q=80"
                  alt="Equipo de laboratorio"
                  className="w-full h-[250px] object-cover"
                />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10">
              <div className="grid grid-cols-6 gap-1">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-petro-red rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
