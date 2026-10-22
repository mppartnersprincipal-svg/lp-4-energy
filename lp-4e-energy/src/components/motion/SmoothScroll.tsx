"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Globals } from "@react-spring/web";

const HEADER_OFFSET = -88;
const SCROLL_LERP = 0.1;
const IDLE_FALLBACK_MS = 1200;

let lenisInstance: Lenis | null = null;

/** Acesso ao Lenis para pausar a rolagem (ex.: menu mobile aberto). */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/** Smooth scroll iniciado no tempo ocioso (fora do caminho da primeira pintura); desligado com reduced-motion. */
export function SmoothScroll(): null {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Respeita o sistema: desliga todas as molas do react-spring
    Globals.assign({ skipAnimation: prefersReducedMotion });
    if (prefersReducedMotion) return;

    let lenis: Lenis | null = null;
    let cancelled = false;
    function start() {
      if (cancelled) return;
      lenis = new Lenis({ autoRaf: true, lerp: SCROLL_LERP, anchors: { offset: HEADER_OFFSET } });
      lenisInstance = lenis;
    }
    const idle = "requestIdleCallback" in window ? window.requestIdleCallback(start, { timeout: IDLE_FALLBACK_MS }) : null;
    const timer = idle === null ? window.setTimeout(start, IDLE_FALLBACK_MS) : null;

    return () => {
      cancelled = true;
      if (idle !== null) window.cancelIdleCallback(idle);
      if (timer !== null) window.clearTimeout(timer);
      lenis?.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
