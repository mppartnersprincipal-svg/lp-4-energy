"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ROOT_MARGIN = "0px 0px -8% 0px";
// A rota nova pode terminar de renderizar depois: procura elementos de novo por alguns instantes
const RESCAN_MS = [300, 1200];

/** Liga `data-visible` em todo `[data-reveal]` que entra na tela (uma vez por elemento). */
export function RevealObserver(): null {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.setAttribute("data-visible", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-visible", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: ROOT_MARGIN },
    );
    const observed = new WeakSet<Element>();
    function scan() {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        observer.observe(el);
      });
    }
    scan();
    const timers = RESCAN_MS.map((delay) => window.setTimeout(scan, delay));
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
