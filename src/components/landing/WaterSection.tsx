import { ArrowRight } from "lucide-react";

const waterServices = [
  {
    code: "NMX-AA-003-1980",
    title: "MUESTREO",
    description: "Aguas residuales - Muestreo.",
  },
  {
    code: "NMX-AA-006-SCFI-2010",
    title: "MATERIA FLOTANTE",
    description:
      "Análisis de agua - Determinación de materia flotante en aguas residuales y residuales tratadas - método de prueba.",
  },
  {
    code: "MX-AA-007-SCFI-2013",
    title: "TEMPERATURA",
    description:
      "Análisis de agua – Medición de la temperatura en aguas naturales, residuales y residuales tratadas - Método de prueba.",
  },
  {
    code: "NMX-AA-008-SCFI-2016",
    title: "pH",
    description:
      "Análisis de agua - Medición del pH en aguas naturales, residuales y residuales tratadas - Método de prueba.",
  },
  {
    code: "NMX-AA-034-SCFI-2015",
    title: "SÓLIDOS SUSPENDIDOS",
    description:
      "Análisis de agua - Medición de sólidos y sales disueltas en aguas naturales, residuales y residuales tratadas.",
  },
  {
    code: "NMX-AA-030/2-SCFI-2011",
    title: "DQO",
    description:
      "Análisis de agua - Determinación de la demanda química de oxígeno en aguas naturales, residuales y residuales tratadas.",
  },
  {
    code: "NMX-AA-028-SCFI-2001",
    title: "DBO₅",
    description:
      "Análisis de agua - Determinación de la demanda bioquímica de oxígeno en aguas naturales, residuales y tratadas.",
  },
  {
    code: "NMX-AA-051-SCFI-2016",
    title: "METALES PESADOS",
    description:
      "Análisis de agua - Medición de metales por absorción atómica en aguas naturales, potables, residuales y tratadas.",
  },
  {
    code: "NMX-AA-005-SCFI-2013",
    title: "GRASAS Y ACEITES",
    description:
      "Análisis de agua - Medición de grasas y aceites recuperables en aguas naturales, residuales y tratadas.",
  },
];

export default function WaterSection() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="water" className="py-20 md:py-28 bg-neutral-base">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Logo header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 80 80" className="w-10 h-10">
              <path d="M40 10 C40 10 28 30 28 45 C28 55 33 60 40 60 C47 60 52 55 52 45 C52 30 40 10 40 10Z" fill="#2B9FD8" />
              <path d="M32 45 L48 45 L48 55 C48 58 44 62 40 62 C36 62 32 58 32 55 Z" fill="#1A1A1A" />
              <circle cx="40" cy="50" r="3" fill="#2B9FD8" />
              <path d="M35 40 L45 40" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="font-syne text-xl font-bold text-neutral-charcoal">
            AQUA<span className="text-aqua-blue">AD</span>LAB
          </h3>
          <div className="w-16 h-0.5 bg-aqua-blue mt-2 mx-auto" />
        </div>

        {/* Blue banner */}
        <div className="bg-aqua-blue rounded-2xl p-8 md:p-12 text-center mb-10">
          <p className="font-manrope text-sm font-semibold text-white/80 tracking-wider uppercase mb-2">
            DIVISIÓN
          </p>
          <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-white mb-4">
            DE AGUAS RESIDUALES
          </h2>
          <p className="font-manrope text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            El laboratorio AQUAADLAB brinda servicios de pruebas en aguas, para una
            amplia gama de aplicaciones y requisitos analíticos de calidad.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {waterServices.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 border-l-4 border-aqua-blue group"
            >
              <p className="font-mono text-[11px] text-petro-red font-medium mb-2">
                {service.code}
              </p>
              <h4 className="font-syne text-lg font-bold text-neutral-charcoal mb-2 group-hover:text-aqua-blue transition-colors">
                {service.title}
              </h4>
              <p className="font-manrope text-xs text-neutral-text leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={scrollToContact}
            className="bg-aqua-blue hover:bg-aqua-blue-dark text-white font-manrope font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-2"
          >
            Solicitar Análisis de Aguas
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
