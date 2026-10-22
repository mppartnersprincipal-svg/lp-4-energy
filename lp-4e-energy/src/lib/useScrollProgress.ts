"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Progresso de rolagem (0 → 1) de um elemento, num único loop rAF compartilhado
 * (modelo da Visão Solar). Mede todos os inscritos antes de aplicar (sem layout thrashing)
 * e só roda quando o scroll ou o tamanho da janela mudam.
 * - "pin": seção alta com filho sticky: 0 quando o topo encosta no topo da tela,
 *          1 quando o fim da seção encosta no fim da tela.
 * - "pass": 0 quando o elemento entra por baixo, 1 quando sai por cima.
 */
type Mode = "pin" | "pass";

interface Subscriber {
  measure: () => number;
  apply: (progress: number) => void;
  last: number;
}

const subscribers = new Set<Subscriber>();
const MIN_DELTA = 0.0002;
let rafId = 0;
let lastY = Number.NaN;
let lastHeight = Number.NaN;

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

function frame() {
  const y = window.scrollY;
  const height = window.innerHeight;
  if (y !== lastY || height !== lastHeight) {
    lastY = y;
    lastHeight = height;
    const measured = Array.from(subscribers, (sub) => [sub, sub.measure()] as const);
    for (const [sub, progress] of measured) {
      if (Math.abs(progress - sub.last) > MIN_DELTA) {
        sub.last = progress;
        sub.apply(progress);
      }
    }
  }
  rafId = requestAnimationFrame(frame);
}

function forceNextFrame() {
  lastY = Number.NaN;
}

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  mode: Mode = "pin",
  isEnabled = true,
) {
  const callback = useRef(onProgress);
  useEffect(() => {
    callback.current = onProgress;
  });

  useEffect(() => {
    if (!isEnabled) return;
    const sub: Subscriber = {
      last: -1,
      measure: () => {
        const element = ref.current;
        if (!element) return 0;
        const rect = element.getBoundingClientRect();
        const viewport = window.innerHeight;
        if (mode === "pin") {
          const distance = rect.height - viewport;
          return distance <= 0 ? (rect.top < 0 ? 1 : 0) : clamp01(-rect.top / distance);
        }
        return clamp01((viewport - rect.top) / (viewport + rect.height));
      },
      apply: (progress) => callback.current(progress),
    };
    subscribers.add(sub);
    forceNextFrame();
    if (subscribers.size === 1) rafId = requestAnimationFrame(frame);
    return () => {
      subscribers.delete(sub);
      if (subscribers.size === 0) cancelAnimationFrame(rafId);
    };
  }, [ref, mode, isEnabled]);
}

/** Interpolação suave entre dois limites de progresso. */
export function smoothstep(start: number, end: number, progress: number): number {
  const t = clamp01((progress - start) / (end - start));
  return t * t * (3 - 2 * t);
}
