"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { IconEscudo, IconSeta } from "@/components/ui/icons";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { REVENUE } from "@/lib/content/home";
import { smoothstep, useScrollProgress } from "@/lib/useScrollProgress";

// Alturas relativas das barras do gráfico ilustrativo (carteira alocada: receita estável)
const BARS = [0.62, 0.7, 0.68, 0.74, 0.78, 0.76, 0.8, 0.82, 0.8, 0.84, 0.86, 0.88];
const MANAGEMENT_SHARE = 0.22;
const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** Fluxo da energia com traços animados + gráfico que cresce com a rolagem (sem valores). */
export function RevenueModel() {
  const chartRef = useRef<HTMLDivElement>(null);
  useScrollProgress(
    chartRef,
    (progress) => chartRef.current?.style.setProperty("--g", smoothstep(0.12, 0.6, progress).toFixed(4)),
    "pass",
  );

  return (
    <section id="rentabilidade" aria-labelledby="rentabilidade-title" className="section-y cv-auto bg-ice text-ink">
      <div className="container-site">
        <SectionHeading
          id="rentabilidade-title"
          eyebrow={REVENUE.eyebrow}
          title={
            <>
              {REVENUE.title} <Highlight>{REVENUE.titleHighlight}</Highlight>
            </>
          }
          description={REVENUE.description}
          className="mb-12 lg:mb-16"
        />

        {/* Fluxo: usina → rede → carteira → investidor */}
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <svg aria-hidden="true" className="absolute inset-x-0 top-11 -z-0 hidden h-1 w-full lg:block" preserveAspectRatio="none" viewBox="0 0 100 4">
            <line x1="0" y1="2" x2="100" y2="2" stroke="rgb(40 199 242 / 0.35)" strokeWidth="2" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" className="animate-fluir motion-reduce:animate-none" />
          </svg>
          {REVENUE.flow.map(({ icon: Icon, title, description }, index) => (
            <Reveal as="li" key={title} delay={index * 120} className="relative">
              <article className="flex h-full flex-col gap-5 rounded-[20px] border border-ice-dark bg-white p-6 shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-cyan/60">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full bg-navy text-cyan">
                    <Icon className="size-6" />
                  </span>
                  <span className="text-display text-sm font-bold text-cyan-dark">0{index + 1}</span>
                </div>
                <h3 className="text-display text-lg font-bold text-ink">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
              </article>
              {index < REVENUE.flow.length - 1 && (
                <span aria-hidden="true" className="absolute top-9 -right-[14px] z-10 hidden size-7 place-items-center rounded-full border border-ice-dark bg-ice text-cyan-dark lg:grid">
                  <IconSeta className="size-4" />
                </span>
              )}
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Gráfico ilustrativo */}
          <Reveal delay={100}>
            <figure
              ref={chartRef}
              className="flex h-full flex-col rounded-[24px] bg-navy p-7 text-white shadow-lift sm:p-8"
              style={{ ["--g" as string]: 0 }}
              aria-label="Gráfico ilustrativo: mensalidades da carteira mês a mês, com a parcela de custos de gestão destacada"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-display text-lg font-bold">{REVENUE.chart.title}</p>
                  <p className="mt-1 text-xs text-mist">{REVENUE.chart.caption}</p>
                </div>
                <span className="shrink-0 rounded-full border border-cyan/40 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cyan uppercase">
                  Exemplo
                </span>
              </div>
              <div aria-hidden="true" className="mt-6 flex h-44 items-end gap-1.5 border-b border-white/10 sm:gap-2">
                {BARS.map((height, index) => (
                  <span key={MONTHS[index]} className="relative flex-1 origin-bottom overflow-hidden rounded-t-[4px] bg-cyan" style={{ height: `${height * 100}%`, scale: `1 var(--g)`, transitionDelay: `${index * 40}ms` }}>
                    <span className="absolute inset-x-0 top-0 bg-navy-soft" style={{ height: `${MANAGEMENT_SHARE * 100}%` }} />
                  </span>
                ))}
              </div>
              <div aria-hidden="true" className="mt-2 flex justify-between text-[10px] tracking-[0.1em] text-mist uppercase">
                {MONTHS.filter((_, index) => index % 2 === 0).map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
              <figcaption className="mt-5 flex flex-wrap gap-5 text-xs text-mist">
                <span className="flex items-center gap-2">
                  <span className="size-3 rounded-sm bg-cyan" />
                  {REVENUE.chart.legend[0]}
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-3 rounded-sm bg-navy-soft ring-1 ring-white/20" />
                  {REVENUE.chart.legend[1]}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Projeção caso a caso */}
          <Reveal delay={200}>
            <div className="flex h-full flex-col gap-6 rounded-[24px] border border-cyan/40 bg-white p-7 shadow-card sm:p-8">
              <span className="grid size-12 place-items-center rounded-full border border-cyan/50 text-cyan-dark">
                <IconEscudo className="size-6" />
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-display text-xl font-bold text-ink sm:text-2xl">{REVENUE.projection.title}</h3>
                <p className="leading-relaxed text-ink-soft">{REVENUE.projection.description}</p>
              </div>
              <WhatsAppButton ctaId="cta_whatsapp_rentabilidade" label="Pedir uma projeção" variant="liquid-light" className="mt-auto self-start" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
