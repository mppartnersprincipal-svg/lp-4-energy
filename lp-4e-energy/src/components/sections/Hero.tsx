"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconSetaBaixo } from "@/components/ui/icons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HERO, TELEMETRY } from "@/lib/content/home";
import { photo } from "@/lib/images";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { smoothstep, useScrollProgress } from "@/lib/useScrollProgress";

const HERO_PHOTO = photo("usina-solo-nuvens");
const DECIMALS = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
// Posição dos rótulos de telemetria sobre a foto, em % do quadro
const HUD_POSITIONS = [
  { left: "6%", top: "16%" },
  { left: "68%", top: "12%" },
  { left: "76%", top: "46%" },
  { left: "64%", top: "84%" },
];

/**
 * A foto é "eager" sem preload: no celular só uma calota do anel aparece na primeira dobra,
 * então o LCP é o título e a fonte não disputa banda com a imagem.
 * Assinatura da marca: o anel do logo vira uma janela com a usina dentro. Ao rolar,
 * o anel se abre até cobrir a tela (clip-path), a foto é revelada e os rótulos de
 * telemetria acendem. Com movimento reduzido fica estático (--e = 0).
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = usePrefersReducedMotion();

  useScrollProgress(
    sectionRef,
    (progress) => {
      sectionRef.current?.style.setProperty("--e", smoothstep(0.04, 0.72, progress).toFixed(4));
    },
    "pin",
    !isReduced,
  );

  return (
    <section ref={sectionRef} id="topo" aria-labelledby="hero-title" className="hero-scroll relative bg-navy-deep">
      <div className="grao sticky top-0 h-[100svh] overflow-hidden">
        <div aria-hidden="true" className="tick-grid absolute -top-10 left-[-10%] h-[70%] w-[70%] opacity-50" />

        {/* Brilho atrás do anel */}
        <div
          aria-hidden="true"
          className="hero-anel pointer-events-none absolute animate-respirar rounded-full motion-reduce:animate-none"
          style={{
            background: "radial-gradient(circle, rgb(40 199 242 / 0.4) 0%, rgb(40 199 242 / 0.08) 45%, transparent 70%)",
            scale: "2.2",
            opacity: "calc(1 - var(--e) * 1.6)",
          }}
        />

        {/* Anel com marcas de escala (eco do símbolo), girando devagar */}
        <div aria-hidden="true" className="hero-anel pointer-events-none absolute" style={{ opacity: "calc(0.95 - var(--e) * 3)" }}>
          <div
            className="absolute inset-0 animate-girar rounded-full motion-reduce:animate-none"
            style={{
              scale: "1.24",
              background: "repeating-conic-gradient(from 0deg, rgb(40 199 242 / 0.7) 0deg 0.5deg, transparent 0.5deg 5deg)",
              mask: "radial-gradient(circle, transparent 72%, #000 73%, #000 76%, transparent 77%)",
              WebkitMask: "radial-gradient(circle, transparent 72%, #000 73%, #000 76%, transparent 77%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{ scale: "1.08", border: "3px solid rgb(40 199 242 / 0.85)", boxShadow: "0 0 60px -10px rgb(40 199 242 / 0.6)" }}
          />
          {/* Os quatro traços do símbolo */}
          <div className="absolute inset-0" style={{ scale: "1.42" }}>
            <span className="absolute top-0 left-1/2 h-4 w-[3px] -translate-x-1/2 rounded-full bg-cyan" />
            <span className="absolute bottom-0 left-1/2 h-4 w-[3px] -translate-x-1/2 rounded-full bg-cyan" />
            <span className="absolute top-1/2 left-0 h-[3px] w-4 -translate-y-1/2 rounded-full bg-cyan" />
            <span className="absolute top-1/2 right-0 h-[3px] w-4 -translate-y-1/2 rounded-full bg-cyan" />
          </div>
        </div>

        {/* Janela com a usina */}
        <div className="hero-janela absolute inset-0">
          <Image
            src={HERO_PHOTO.src}
            alt="Usina solar de solo sob céu com nuvens (imagem ilustrativa)"
            fill
            loading="eager"
            quality={62}
            sizes="(min-width: 1024px) 62vw, 100vw"
            placeholder="blur"
            blurDataURL={HERO_PHOTO.blurDataURL}
            className="object-cover object-[60%_center]"
            style={{ scale: "calc(1.16 - var(--e) * 0.16)", translate: "0 calc((1 - var(--e)) * var(--shift) * -1)" }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-cyan mix-blend-soft-light" style={{ opacity: "calc(0.25 - var(--e) * 0.25)" }} />
          <div aria-hidden="true" className="absolute inset-0 bg-navy-deep" style={{ opacity: "calc(0.15 + var(--e) * 0.5)" }} />
          <div aria-hidden="true" className="vinheta absolute inset-0" style={{ opacity: "var(--e)" }} />

          {/* Rótulos de telemetria sobre a usina revelada */}
          {TELEMETRY.map((metric, index) => (
            <div
              key={metric.label}
              aria-hidden="true"
              className="absolute hidden items-center gap-2 rounded-full border border-cyan/40 bg-navy-deep/70 px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white uppercase backdrop-blur-sm sm:flex"
              style={{
                ...HUD_POSITIONS[index],
                opacity: `clamp(0, calc((var(--e) - ${(0.45 + index * 0.1).toFixed(2)}) * 6), 1)`,
                transform: "translate3d(0, calc((1 - var(--e)) * 24px), 0)",
              }}
            >
              <span className="size-1.5 animate-blink rounded-full bg-cyan" />
              {metric.label}
              <span className="text-cyan">
                {DECIMALS.format(metric.value)}
                {metric.suffix}
              </span>
            </div>
          ))}
        </div>

        {/* Texto principal */}
        <div
          className="relative z-10 flex h-full items-start pt-[calc(var(--header-h)+4svh)] lg:items-center lg:pt-[calc(var(--header-h)+16px)] lg:pb-10"
          style={{ opacity: "calc(1 - var(--e) * 2.4)", transform: "translate3d(0, calc(var(--e) * -16vh), 0)" }}
        >
          <div className="container-site">
            <div className="max-w-[640px] lg:max-w-[54%]">
              <div className="enter" style={{ animationDelay: "0ms" }}>
                <Eyebrow onDark>{HERO.eyebrow}</Eyebrow>
              </div>
              <h1
                id="hero-title"
                className="enter text-display mt-5 text-[clamp(2.3rem,1.2rem+4vw,4.2rem)] leading-[1.02] font-bold text-balance text-white [@media(max-height:700px)]:text-[2.1rem] lg:[@media(max-height:860px)]:text-[3.6rem]"
                style={{ animationDelay: "80ms" }}
              >
                {HERO.title} <span className="text-cyan">{HERO.titleHighlight}</span>
              </h1>
              <p
                className="enter mt-6 max-w-[34rem] text-[clamp(1.02rem,0.95rem+0.4vw,1.2rem)] leading-relaxed text-pretty text-mist"
                style={{ animationDelay: "160ms" }}
              >
                {HERO.description}
              </p>
              <div className="enter mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
                <WhatsAppButton ctaId="cta_whatsapp_hero" label={HERO.primaryCta} size="lg" />
                <Button
                  href="#modelo"
                  variant="liquid-clear"
                  size="lg"
                  icon={<IconSetaBaixo className="size-5" />}
                  data-track="click_cta"
                  data-cta-id="cta_ver_modelo_hero"
                  className="hidden sm:inline-flex"
                >
                  {HERO.secondaryCta}
                </Button>
              </div>
              <dl className="enter mt-8 hidden gap-8 border-t border-white/10 pt-5 sm:flex lg:[@media(max-height:760px)]:hidden" style={{ animationDelay: "320ms" }}>
                {HERO.proof.map((item) => (
                  <div key={item.label}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="text-display block text-2xl font-bold text-cyan">{item.value}</span>
                      <span className="text-sm text-mist">{item.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Declaração final, sobre a usina revelada */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-end pb-[14svh] lg:items-center lg:pb-0"
          style={{
            opacity: "clamp(0, calc((var(--e) - 0.78) * 5), 1)",
            transform: "translate3d(0, calc((1 - var(--e)) * 60px), 0)",
          }}
        >
          <div className="container-site">
            <Eyebrow onDark>{HERO.revealEyebrow}</Eyebrow>
            <p className="text-display mt-4 max-w-[16ch] text-[clamp(2.2rem,1.2rem+4.6vw,5.4rem)] leading-[1.02] font-bold text-white">
              {HERO.revealTitle} <span className="text-cyan">{HERO.revealTitleHighlight}</span>
            </p>
          </div>
        </div>

        {/* Dica de rolagem */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-mist uppercase lg:flex"
          style={{ opacity: "calc(1 - var(--e) * 4)" }}
        >
          <span className="h-8 w-px overflow-hidden bg-white/15">
            <span className="block h-full w-full animate-sweep bg-cyan" style={{ animationDuration: "2.2s" }} />
          </span>
          Role para ver a usina
        </div>
      </div>
    </section>
  );
}
