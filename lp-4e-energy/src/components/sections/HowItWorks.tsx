"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HOW_IT_WORKS } from "@/lib/content/home";
import { photo } from "@/lib/images";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useScrollProgress } from "@/lib/useScrollProgress";

const STEPS = HOW_IT_WORKS.steps;
const PINNED_HEIGHT = "h-[380svh]";

/**
 * Scrollytelling: a seção fica presa e, conforme o visitante rola, a etapa ativa
 * acende e a foto do painel troca. No celular e com movimento reduzido vira uma lista.
 */
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = usePrefersReducedMotion();
  const stepRef = useRef(0);
  const [step, setStep] = useState(0);

  useScrollProgress(
    sectionRef,
    (progress) => {
      sectionRef.current?.style.setProperty("--p", progress.toFixed(4));
      const next = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      if (next !== stepRef.current) {
        stepRef.current = next;
        setStep(next);
      }
    },
    "pin",
    !isReduced,
  );

  return (
    <section
      ref={sectionRef}
      id="modelo"
      aria-labelledby="modelo-title"
      className={`relative bg-navy ${isReduced ? "section-y" : `${PINNED_HEIGHT} max-lg:h-auto max-lg:py-20`}`}
      style={{ ["--p" as string]: 0 }}
    >
      <div className={isReduced ? "container-site" : "lg:sticky lg:top-0 lg:h-[100svh] lg:overflow-hidden"}>
        <div className={`container-site ${isReduced ? "" : "lg:flex lg:h-full lg:items-center lg:gap-16"}`}>
          {/* Texto e etapas */}
          <div className="relative z-10 lg:flex-1">
            <Eyebrow onDark>{HOW_IT_WORKS.eyebrow}</Eyebrow>
            <h2 id="modelo-title" className="text-display mt-4 max-w-[16ch] text-[clamp(2rem,1.2rem+3vw,3.6rem)] leading-[1.04] font-bold text-balance text-white">
              {HOW_IT_WORKS.title} <Highlight onDark>{HOW_IT_WORKS.titleHighlight}</Highlight>
            </h2>
            <p className="mt-5 max-w-[32rem] leading-relaxed text-mist">{HOW_IT_WORKS.description}</p>

            <ol className="relative mt-10 space-y-1 pl-9">
              <span aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] w-px bg-white/10">
                <span className="absolute inset-x-0 top-0 h-full origin-top bg-cyan max-lg:hidden" style={{ scale: "1 var(--p)" }} />
              </span>
              {STEPS.map(({ icon: Icon, title, description, investor, photo: name, photoAlt }, index) => {
                const isOpen = isReduced || index === step;
                const picture = photo(name);
                return (
                  <li key={title} aria-current={index === step ? "step" : undefined} className="relative py-3">
                    <span
                      aria-hidden="true"
                      className={`absolute top-[18px] -left-9 size-[15px] rounded-full border-2 transition-all duration-500 ${
                        index <= step || isReduced ? "border-cyan bg-cyan shadow-[0_0_18px_rgb(40_199_242/0.8)]" : "border-navy-line bg-navy"
                      } max-lg:border-cyan max-lg:bg-cyan`}
                    />
                    <p className={`flex items-center gap-3 transition-colors duration-500 ${isOpen ? "text-white" : "text-mist/70"} max-lg:text-white`}>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-cyan/40 text-cyan">
                        <Icon className="size-[18px]" />
                      </span>
                      <span className="text-xs font-semibold text-cyan">0{index + 1}</span>
                      <span className="text-display text-[1.3rem] font-bold">{title}</span>
                    </p>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-4e) max-lg:grid-rows-[1fr] max-lg:opacity-100 ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-2 pl-12 leading-relaxed text-mist">{description}</p>
                        <p className="mt-2 ml-12 inline-flex items-center gap-2 rounded-full border border-cyan/30 px-3 py-1 text-xs font-semibold text-cyan">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan" />
                          {investor}
                        </p>
                        {/* Celular: a foto da etapa entra na lista */}
                        <figure className="relative mt-4 ml-12 aspect-[4/3] overflow-hidden rounded-2xl lg:hidden">
                          <Image src={picture.src} alt={photoAlt} fill sizes="100vw" placeholder="blur" blurDataURL={picture.blurDataURL} className="object-cover" />
                          <div aria-hidden="true" className="vinheta absolute inset-0 opacity-70" />
                        </figure>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 lg:mt-12">
              <WhatsAppButton ctaId="cta_whatsapp_modelo" label="Falar com um especialista" />
            </div>
          </div>

          {/* Painel de fotos (desktop): a foto troca por etapa */}
          <div className="hidden lg:block lg:shrink-0">
            <div className="relative h-[min(78svh,720px)] w-[min(38vw,520px)] overflow-hidden rounded-[28px] border border-cyan/25 bg-navy-deep shadow-cyan">
              {STEPS.map(({ photo: name, photoAlt }, index) => {
                const picture = photo(name);
                const isActive = isReduced ? index === 0 : index === step;
                return (
                  <Image
                    key={name}
                    src={picture.src}
                    alt={isActive ? photoAlt : ""}
                    fill
                    sizes="(min-width: 1024px) 38vw, 1px"
                    placeholder="blur"
                    blurDataURL={picture.blurDataURL}
                    className={`object-cover transition-[opacity,transform] duration-700 ease-(--ease-4e) ${isActive ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                  />
                );
              })}
              <div aria-hidden="true" className="grao absolute inset-0 bg-[linear-gradient(180deg,rgb(4_15_42/0.55)_0%,transparent_35%,transparent_60%,rgb(4_15_42/0.85)_100%)]" />

              {/* HUD */}
              <div aria-hidden="true" className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-[11px] font-semibold tracking-[0.14em] text-white/85 uppercase">
                <span className="flex items-center gap-2">
                  <span className="size-2 animate-blink rounded-full bg-cyan" />
                  Etapa 0{step + 1}/0{STEPS.length}
                </span>
                <span className="text-mist">Imagem ilustrativa</span>
              </div>
              <div aria-hidden="true" className="absolute inset-x-5 bottom-5">
                <p className="text-display text-xl font-bold text-white">{STEPS[step].title}</p>
                <div className="relative mt-3 h-[3px] overflow-hidden rounded-full bg-white/15">
                  <span className="absolute inset-0 origin-left bg-cyan" style={{ scale: "var(--p) 1" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
