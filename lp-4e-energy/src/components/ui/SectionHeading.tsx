import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  /** id do h2, para aria-labelledby da seção */
  id?: string;
  className?: string;
}

interface HighlightProps {
  children: ReactNode;
  onDark?: boolean;
}

/**
 * Destaque dentro de títulos. No navy vira ciano; sobre fundo claro o ciano
 * não tem contraste, então o destaque vira um sublinhado ciano.
 */
export function Highlight({ children, onDark = false }: HighlightProps) {
  if (onDark) return <span className="text-cyan">{children}</span>;
  return (
    <span className="bg-[linear-gradient(transparent_64%,rgb(40_199_242/0.45)_64%,rgb(40_199_242/0.45)_92%,transparent_92%)] box-decoration-clone">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  id,
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start text-left";
  const titleColor = onDark ? "text-white" : "text-ink";
  const descriptionColor = onDark ? "text-mist" : "text-ink-soft";

  return (
    <Reveal className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={`text-display text-[clamp(1.9rem,1.25rem+2.4vw,3rem)] leading-[1.08] font-bold text-balance ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base leading-relaxed text-pretty sm:text-lg ${descriptionColor}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
