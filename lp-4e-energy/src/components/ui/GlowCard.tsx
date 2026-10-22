"use client";

import type { PointerEvent, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

/** Card com borda em ciano que acompanha o cursor (só mouse; no toque fica a borda sutil). */
export function GlowCard({ children, className = "" }: GlowCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div onPointerMove={handlePointerMove} className={`glow-card ${className}`}>
      {children}
    </div>
  );
}
