import type { CSSProperties, ReactNode } from "react";

type RevealTag = "div" | "li" | "article" | "span";

interface RevealProps {
  children: ReactNode;
  as?: RevealTag;
  /** Atraso em ms, para escalonar itens de uma lista */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Entrada padrão (fade + deslize) feita em CSS: o elemento nasce com `data-reveal` e o
 * `RevealObserver` (um único IntersectionObserver no layout) liga `data-visible` quando
 * ele entra na tela. Sem molas por elemento: não pesa na hidratação (lição da Visão Solar).
 * Sem JavaScript, o <noscript> do layout mostra tudo direto.
 */
export function Reveal({ children, as: Tag = "div", delay = 0, className, style }: RevealProps) {
  return (
    <Tag className={className} style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }} data-reveal="">
      {children}
    </Tag>
  );
}
