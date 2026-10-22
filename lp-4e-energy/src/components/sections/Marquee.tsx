import { MARQUEE } from "@/lib/content/home";

function RingDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="shrink-0">
      <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="7" r="1.6" fill="currentColor" />
    </svg>
  );
}

function Track({ reverse = false }: { reverse?: boolean }) {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee-track flex w-max motion-reduce:animate-none" style={reverse ? { animationDirection: "reverse" } : undefined}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-6 pr-6 whitespace-nowrap">
          {item}
          <RingDot />
        </span>
      ))}
    </div>
  );
}

/** Duas faixas cruzadas, em sentidos opostos: ritmo entre o hero e o conteúdo. */
export function Marquee() {
  return (
    <div aria-hidden="true" className="relative z-10 -my-6 overflow-hidden bg-navy-deep py-10">
      <div className="text-display -rotate-[1.6deg] scale-x-105 border-y border-navy-line bg-navy py-4 text-xl font-bold text-mist md:text-2xl">
        <Track reverse />
      </div>
      <div className="text-display absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-[1.4deg] scale-x-105 bg-cyan py-4 text-xl font-bold text-navy-deep shadow-[0_20px_60px_-20px_rgb(40_199_242/0.6)] md:text-2xl">
        <Track />
      </div>
    </div>
  );
}
