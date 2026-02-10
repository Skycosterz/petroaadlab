import { Calendar, MessageSquare, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=500&q=80",
    date: "JULIO 01, 2022",
    author: "PETROAADLAB",
    title: "¿CÓMO ES EL PROCESO DE OBTENCIÓN, TRANSPORTE Y RESGUARDO DE UNA MUESTRA?",
  },
  {
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=80",
    date: "JULIO 01, 2022",
    author: "PETROAADLAB",
    title: "¿CÓMO SE REALIZA EL ANÁLISIS DE COMBUSTIBLE?",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 md:py-28 bg-neutral-off-white">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-neutral-charcoal">
            ÚLTIMAS NOTICIAS{" "}
            <span className="text-petro-red">&amp; BLOGS</span>
          </h2>
          <p className="font-manrope text-base text-neutral-text mt-3">
            Nuestras últimas actualizaciones.
          </p>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <article
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-petro-red text-white text-[10px] font-manrope font-semibold px-3 py-1 rounded-md mb-3">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-manrope text-neutral-text mb-3">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Comentarios
                      </span>
                      <span>
                        Por <span className="font-semibold">{post.author}</span>
                      </span>
                    </div>
                    <h3 className="font-syne text-base font-bold text-neutral-charcoal leading-tight group-hover:text-petro-red transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <button className="mt-4 font-manrope text-sm font-semibold text-petro-red flex items-center gap-1 hover:gap-2 transition-all">
                    LEER MÁS <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
