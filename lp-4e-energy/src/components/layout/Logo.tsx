import Image from "next/image";

interface LogoProps {
  /** Tamanho do círculo em px */
  size?: number;
  /** Mostra o nome ao lado do símbolo (texto, não recria o logotipo) */
  withWordmark?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * Logo circular da 4E Energy (raster recortado do JPEG original; vetor pendente com o cliente).
 * O manual pede largura mínima de 160px para a arte completa: no header usamos o símbolo
 * menor acompanhado do nome em texto, sem alterar a arte.
 */
export function Logo({ size = 44, withWordmark = true, priority = false, className = "" }: LogoProps) {
  const src = size > 128 ? "/brand/logo-4e-512.png" : "/brand/logo-4e-256.webp";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={src}
        alt="4E Energy"
        width={size}
        height={size}
        priority={priority}
        className="shrink-0 rounded-full"
        style={{ width: size, height: size }}
      />
      {withWordmark && (
        <span className="text-display text-lg leading-none font-bold tracking-[-0.01em] text-white">
          4E <span className="font-semibold text-cyan">Energy</span>
        </span>
      )}
    </span>
  );
}

interface RingMarkProps {
  className?: string;
}

/** Anel com marcas de escala (eco do símbolo), usado como marca d'água decorativa. */
export function RingMark({ className = "" }: RingMarkProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <circle cx="200" cy="200" r="190" strokeWidth="6" />
      <circle cx="200" cy="200" r="150" strokeWidth="2" strokeDasharray="4 18" />
      <path d="M200 40v26M200 334v26M40 200h26M334 200h26" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
