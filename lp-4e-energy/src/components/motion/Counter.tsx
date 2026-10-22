"use client";

import { animated, easings, useInView, useSpring } from "@react-spring/web";

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Casas decimais exibidas (formatação pt-BR) */
  decimals?: number;
  durationMs?: number;
  className?: string;
}

const formatter = (decimals: number) =>
  new Intl.NumberFormat("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Número que conta de 0 até o valor quando aparece na tela. */
export function Counter({ to, prefix = "", suffix = "", decimals = 0, durationMs = 2000, className }: CounterProps) {
  const [ref, isInView] = useInView({ once: true, rootMargin: "0px 0px -10% 0px" });
  const { value } = useSpring({
    value: isInView ? to : 0,
    config: { duration: durationMs, easing: easings.easeOutCubic },
  });
  const format = formatter(decimals);
  const finalLabel = `${prefix}${format.format(to)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{finalLabel}</span>
      <animated.span aria-hidden="true" className="tabular-nums">
        {value.to((current) => `${prefix}${format.format(current)}${suffix}`)}
      </animated.span>
    </span>
  );
}
