"use client";

import { useRef } from "react";
import Image from "next/image";
import { RingMark } from "@/components/layout/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT } from "@/lib/content/home";
import { photo } from "@/lib/images";
import { SITE } from "@/lib/site";
import { useScrollProgress } from "@/lib/useScrollProgress";

const PARALLAX_PX = 60;

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function About() {
  const figureRef = useRef<HTMLDivElement>(null);
  const picture = photo(ABOUT.photo);
  useScrollProgress(
    figureRef,
    (progress) => figureRef.current?.style.setProperty("--py", `${((progress - 0.5) * -PARALLAX_PX).toFixed(1)}px`),
    "pass",
  );

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="section-y cv-auto relative isolate overflow-hidden bg-navy">
      <RingMark className="absolute -right-32 -bottom-40 -z-10 w-[520px] text-cyan opacity-[0.05]" />
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="sobre-title"
            onDark
            eyebrow={ABOUT.eyebrow}
            title={
              <>
                {ABOUT.title} <Highlight onDark>{ABOUT.titleHighlight}</Highlight>
              </>
            }
          />
          <Reveal delay={120} className="flex flex-col gap-5 leading-relaxed text-mist">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal delay={160}>
            {/* PLACEHOLDER: trocar as iniciais pela foto real do diretor (docs/PENDENCIAS.md) */}
            <div className="flex items-center gap-5 rounded-[20px] border border-navy-line bg-navy-soft/60 p-5">
              <span className="text-display grid size-14 shrink-0 place-items-center rounded-full border border-cyan/50 text-lg font-bold text-cyan">
                {initialsOf(SITE.director)}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-display font-bold text-white">{SITE.director}</span>
                <span className="text-sm text-mist">Diretor da 4E Energy</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200} className="flex flex-col gap-3 border-t border-white/10 pt-6">
            <span className="text-xs font-semibold tracking-[0.14em] text-cyan uppercase">Projetos e parcerias</span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-white">
              {SITE.partners.map((partner) => (
                <li key={partner}>{partner}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal>
            <div ref={figureRef} className="grao relative aspect-[4/3] overflow-hidden rounded-[24px] bg-navy-deep" style={{ ["--py" as string]: "0px" }}>
              <Image
                src={picture.src}
                alt={ABOUT.photoAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                blurDataURL={picture.blurDataURL}
                className="object-cover"
                style={{ scale: "1.18", translate: "0 var(--py)" }}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgb(4_15_42/0.9)_100%)]" />
              <span className="absolute bottom-5 left-5 rounded-full border border-cyan/40 bg-navy-deep/60 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cyan uppercase backdrop-blur-sm">
                Imagem ilustrativa
              </span>
            </div>
          </Reveal>

          <ol className="relative grid gap-5 border-l border-cyan/30 pl-6">
            {ABOUT.timeline.map((item, index) => (
              <Reveal as="li" key={item.year} delay={120 + index * 90} className="relative">
                <span aria-hidden="true" className="absolute top-1.5 -left-[31px] size-2.5 rounded-full bg-cyan shadow-[0_0_14px_rgb(40_199_242/0.8)]" />
                <span className="text-display text-sm font-bold text-cyan">{item.year}</span>
                <p className="text-display font-bold text-white">{item.title}</p>
                <p className="text-sm text-mist">{item.description}</p>
              </Reveal>
            ))}
          </ol>

          <ul className="grid grid-cols-2 gap-3">
            {ABOUT.pillars.map((pillar, index) => (
              <Reveal as="li" key={pillar.title} delay={220 + index * 60}>
                <article className="flex h-full flex-col gap-1 rounded-[16px] border border-navy-line p-4">
                  <h3 className="text-[11px] font-semibold tracking-[0.14em] text-cyan uppercase">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-white/90">{pillar.description}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
