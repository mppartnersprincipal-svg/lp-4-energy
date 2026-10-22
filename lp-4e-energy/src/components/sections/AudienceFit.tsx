import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { IconCheck, IconX } from "@/components/ui/icons";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { AUDIENCE } from "@/lib/content/home";
import { photo } from "@/lib/images";

export function AudienceFit() {
  const picture = photo(AUDIENCE.photo);
  return (
    <section id="para-quem" aria-labelledby="para-quem-title" className="section-y cv-auto bg-ice text-ink">
      <div className="container-site">
        <SectionHeading
          id="para-quem-title"
          eyebrow={AUDIENCE.eyebrow}
          title={
            <>
              {AUDIENCE.title} <Highlight>{AUDIENCE.titleHighlight}</Highlight>
            </>
          }
          description={AUDIENCE.description}
          className="mb-12 lg:mb-16"
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={80}>
            <article className="grao relative flex h-full min-h-[460px] flex-col justify-end overflow-hidden rounded-[24px] bg-navy p-7 text-white shadow-lift sm:p-9">
              <Image
                src={picture.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                placeholder="blur"
                blurDataURL={picture.blurDataURL}
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_15_42/0.25)_0%,rgb(4_15_42/0.85)_55%,rgb(4_15_42/0.97)_100%)]" />
              <div aria-hidden="true" className="absolute top-6 right-6 rounded-full border border-cyan/40 bg-navy-deep/60 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cyan uppercase backdrop-blur-sm">
                Investidor
              </div>
              <div className="relative">
                <h3 className="text-display text-2xl font-bold sm:text-3xl">É para você se</h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {AUDIENCE.fit.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-cyan text-navy-deep">
                        <IconCheck className="size-3.5" strokeWidth={2.6} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
          <Reveal delay={180}>
            <article className="flex h-full flex-col gap-6 rounded-[24px] border border-ice-dark bg-white p-7 shadow-card sm:p-9">
              <h3 className="text-display text-2xl font-bold text-ink">Não é para você se</h3>
              <ul className="flex flex-col gap-4">
                {AUDIENCE.unfit.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-relaxed text-ink-soft">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ice-dark text-ink-soft">
                      <IconX className="size-3.5" strokeWidth={2.4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-ice-dark pt-5 text-sm text-ink-soft">{AUDIENCE.unfitNote}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
