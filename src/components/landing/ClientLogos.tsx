const clients = [
  "PEMEX",
  "Mobil",
  "Gulf",
  "GEMMA",
  "G500",
  "Repsol",
  "Shell",
  "TotalEnergies",
];

export default function ClientLogos() {
  return (
    <section className="py-12 md:py-16 bg-neutral-base overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        <p className="font-manrope text-xs font-semibold text-neutral-text tracking-wider uppercase text-center mb-8">
          CONFÍAN EN NOSOTROS
        </p>
      </div>
      {/* Infinite scroll carousel */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-left gap-16 items-center">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center min-w-[140px] h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <span className="font-syne text-xl md:text-2xl font-bold text-neutral-charcoal tracking-tight">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
