interface SealProps {
  text: string;
  className?: string;
  /** true quando está sobre fundo claro */
  onLight?: boolean;
}

/** Selo circular girando: o anel da marca com marcas de escala como carimbo. */
export function Seal({ text, className = "", onLight = false }: SealProps) {
  const textColor = onLight ? "fill-ink-soft" : "fill-mist";
  return (
    <div aria-hidden="true" className={`relative size-36 shrink-0 md:size-44 ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-girar motion-reduce:animate-none">
        <defs>
          <path id="selo-circulo" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
        </defs>
        <text className={`${textColor} font-sans text-[12.5px] font-semibold tracking-[0.3em]`}>
          <textPath href="#selo-circulo">{text}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full text-cyan">
        <circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" opacity="0.6" />
        <path d="M100 40v8M100 152v8M40 100h8M152 100h8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="100" r="12" fill="currentColor" />
      </svg>
    </div>
  );
}
