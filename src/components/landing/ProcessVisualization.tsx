import { ArrowRight } from "lucide-react";

const labImages = [
  {
    src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&q=80",
    alt: "Técnico con equipo de análisis",
  },
  {
    src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80",
    alt: "Microscopio de laboratorio",
  },
  {
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80",
    alt: "Análisis químico",
  },
  {
    src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=400&q=80",
    alt: "Equipos de laboratorio modernos",
  },
  {
    src: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&q=80",
    alt: "Equipo profesional trabajando",
  },
];

export default function ProcessVisualization() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-white">
      {/* Image grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
        {labImages.map((img, i) => (
          <div key={i} className="relative overflow-hidden group aspect-[4/3]">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Red banner */}
      <div className="bg-petro-red py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-white mb-2">
              UN EQUIPO MUY PROFESIONAL
            </h2>
            <p className="font-manrope text-sm md:text-base text-white/90 max-w-xl">
              Dentro de los laboratorios especializados se encuentran equipos
              analíticos muy sofisticados a cargo de personas altamente capacitadas
              en procesos.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="bg-white/10 border border-white/30 hover:bg-white/20 text-white font-manrope font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center gap-2 flex-shrink-0"
          >
            CONTÁCTENOS
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
