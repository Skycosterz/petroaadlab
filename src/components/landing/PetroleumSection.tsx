import { useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";

const petroleumTabs = [
  {
    id: "gasolinas",
    label: "ANÁLISIS DE GASOLINAS",
    title: "ANÁLISIS DE GASOLINA",
    services: [
      "Muestreo de petrolíferos, ASTM D 4057-12",
      "Determinación de presión de vapor, ASTM D 5191-15",
      "Determinación de destilación, ASTM D 86-12",
      "Determinación de contenido de azufre, ASTM D 5453-12",
      "Determinación de contenido de gomas, ASTM D 381-12",
      "Determinación de densidad, ASTM D 4052-11",
      "Determinación de octanaje (RON), ASTM D 2699-12",
      "Determinación de octanaje (MON), ASTM D 2700-14",
    ],
  },
  {
    id: "diesel",
    label: "ANÁLISIS DE DIÉSEL",
    title: "ANÁLISIS DE DIÉSEL",
    services: [
      "Muestreo de petrolíferos, ASTM D 4057-12",
      "Determinación de viscosidad cinemática, ASTM D 445-12",
      "Determinación de punto de inflamación, ASTM D 93-13",
      "Determinación de contenido de azufre, ASTM D 5453-12",
      "Determinación de índice de cetano, ASTM D 4737-10",
      "Determinación de contenido de agua, ASTM D 6304-07",
      "Determinación de densidad, ASTM D 4052-11",
      "Determinación de destilación, ASTM D 86-12",
    ],
  },
  {
    id: "turbosina",
    label: "ANÁLISIS DE TURBOSINA",
    title: "ANÁLISIS DE TURBOSINA",
    services: [
      "Muestreo de petrolíferos, ASTM D 4057-12",
      "Determinación de punto de inflamación, ASTM D 56",
      "Determinación de densidad, ASTM D 4052-11",
      "Determinación de viscosidad cinemática, ASTM D 445-12",
      "Determinación de destilación, ASTM D 86-12",
      "Determinación de contenido de azufre, ASTM D 5453-12",
    ],
  },
  {
    id: "gaslp",
    label: "ANÁLISIS DE GAS LP",
    title: "ANÁLISIS DE GAS LP",
    services: [
      "Muestreo de Gas LP",
      "Determinación de presión de vapor, ASTM D 1267",
      "Determinación de densidad relativa, ASTM D 1657",
      "Determinación de corrosión a la lámina de cobre, ASTM D 1838",
      "Determinación de contenido de azufre, ASTM D 6667",
    ],
  },
  {
    id: "alcance",
    label: "ALCANCE DEL LABORATORIO",
    title: "ALCANCE DEL LABORATORIO",
    services: [
      "Diploma de acreditación NMX-EC-17025-IMNC-2018",
      "Resolución RES-1813-2019-1",
      "Acreditación Petroaadlab con alcance ref 22LP0863 2022",
    ],
  },
];

export default function PetroleumSection() {
  const [activeTab, setActiveTab] = useState(0);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="petroleum" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-manrope text-sm font-semibold text-petro-red tracking-wider uppercase mb-2">
            DIVISIÓN
          </p>
          <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-petro-red">
            DE PETROLÍFEROS
          </h2>
        </div>

        {/* Tabs */}
        <div className="overflow-x-auto scrollbar-hide mb-10">
          <div className="flex min-w-max border border-neutral-border rounded-lg overflow-hidden">
            {petroleumTabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-4 text-xs font-manrope font-semibold tracking-wider transition-all duration-200 flex-1 min-w-[160px] text-center border-b-2 ${
                  activeTab === index
                    ? "border-petro-red text-petro-red bg-red-50/50"
                    : "border-transparent text-neutral-text hover:text-neutral-charcoal hover:bg-neutral-base"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Logo / visual */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <svg viewBox="0 0 80 80" className="w-16 h-16">
                <path d="M40 10 C40 10 28 30 28 45 C28 55 33 60 40 60 C47 60 52 55 52 45 C52 30 40 10 40 10Z" fill="#E31E24" />
                <path d="M32 45 L48 45 L48 55 C48 58 44 62 40 62 C36 62 32 58 32 55 Z" fill="#1A1A1A" />
                <circle cx="40" cy="50" r="3" fill="#E31E24" />
                <rect x="36" y="38" width="8" height="2" rx="1" fill="white" />
              </svg>
            </div>
            <h3 className="font-syne text-xl font-bold text-neutral-charcoal text-center">
              PETRO<span className="text-petro-red">AAD</span>LAB
            </h3>
            <div className="w-16 h-0.5 bg-petro-red mt-2" />
          </div>

          {/* Service list */}
          <div className="lg:col-span-2">
            <h3 className="font-syne text-2xl font-bold text-neutral-charcoal mb-6">
              {petroleumTabs[activeTab].title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {petroleumTabs[activeTab].services.map((service, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-red-50/50 transition-colors group"
                >
                  <ChevronRight className="h-4 w-4 text-petro-red mt-0.5 flex-shrink-0" />
                  <span className="font-manrope text-sm text-neutral-text group-hover:text-neutral-charcoal transition-colors">
                    {service}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={scrollToContact}
              className="mt-8 bg-petro-red hover:bg-petro-red-dark text-white font-manrope font-semibold px-6 py-3 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
            >
              Solicitar Análisis
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
