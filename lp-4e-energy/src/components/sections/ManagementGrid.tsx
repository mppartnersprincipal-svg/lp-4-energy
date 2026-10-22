import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { MANAGEMENT } from "@/lib/content/home";
import { photo } from "@/lib/images";

export function ManagementGrid() {
  const picture = photo(MANAGEMENT.photo);
  return (
    <section id="gestao" aria-labelledby="gestao-title" className="section-y cv-auto navy-glow relative isolate overflow-hidden">
      <div aria-hidden="true" className="tick-grid absolute top-0 left-[-10%] -z-10 h-[480px] w-[560px] opacity-50" />
      <div className="container-site">
        <SectionHeading
          id="gestao-title"
          onDark
          eyebrow={MANAGEMENT.eyebrow}
          title={
            <>
              {MANAGEMENT.title} <Highlight onDark>{MANAGEMENT.titleHighlight}</Highlight>
            </>
          }
          description={MANAGEMENT.description}
          className="mb-12 lg:mb-16"
        />

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
          {/* Foto de campo com legenda */}
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-[24px] lg:row-span-2 lg:min-h-0">
            <Image
              src={picture.src}
              alt="Técnico realizando manutenção em um módulo fotovoltaico (imagem ilustrativa)"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              placeholder="blur"
              blurDataURL={picture.blurDataURL}
              className="object-cover"
            />
            <div aria-hidden="true" className="grao absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgb(4_15_42/0.92)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="rounded-full border border-cyan/40 bg-navy-deep/60 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cyan uppercase backdrop-blur-sm">
                Manutenção mensal
              </span>
              <p className="text-display mt-3 text-xl font-bold text-white">Equipe em campo, você no relatório.</p>
            </div>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2 lg:row-span-2 lg:gap-5">
            {MANAGEMENT.items.map(({ icon: Icon, title, description }, index) => (
              <Reveal as="li" key={title} delay={index * 80}>
                <GlowCard className="flex h-full flex-col gap-4 p-6">
                  <span className="grid size-11 place-items-center rounded-full border border-cyan/40 bg-navy-deep text-cyan">
                    <Icon className="size-[22px]" />
                  </span>
                  <h3 className="text-display text-base font-bold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-mist">{description}</p>
                </GlowCard>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={240} className="mt-12 lg:mt-16">
          <p className="text-display max-w-3xl text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-tight font-bold text-balance text-white">
            {MANAGEMENT.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
