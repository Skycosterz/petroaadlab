import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
}

function Counter({ end, label, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-syne text-4xl md:text-5xl font-extrabold text-white">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="font-manrope text-xs md:text-sm font-medium text-white/80 mt-2 tracking-wider uppercase">
        {label}
      </p>
    </div>
  );
}

export default function MetricsBar() {
  return (
    <section className="bg-petro-red py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <Counter end={10212} label="Muestras Analizadas" />
          <Counter end={32700} label="Capacidad Instalada para Muestras" />
          <Counter end={2500} label="Estaciones Atendidas" />
          <div className="text-center">
            <p className="font-syne text-3xl md:text-4xl font-extrabold text-white">
              1ER SEMESTRE
            </p>
            <p className="font-syne text-3xl md:text-4xl font-extrabold text-white">
              2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
