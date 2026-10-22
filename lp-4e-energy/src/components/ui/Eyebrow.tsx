import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  /** true quando está sobre fundo navy */
  onDark?: boolean;
  className?: string;
}

/** Traço de escala em ciano + rótulo em caixa alta (eco das marcas do símbolo). */
export function Eyebrow({ children, onDark = false, className = "" }: EyebrowProps) {
  const color = onDark ? "text-cyan" : "text-cyan-dark";
  return (
    <p
      className={`inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] uppercase sm:text-xs ${color} ${className}`}
    >
      <span aria-hidden="true" className="flex items-center gap-1">
        <span className="h-px w-6 bg-cyan" />
        <span className="h-2 w-px bg-cyan" />
      </span>
      {children}
    </p>
  );
}
