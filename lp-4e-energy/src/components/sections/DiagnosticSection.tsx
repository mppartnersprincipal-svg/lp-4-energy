import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { DiagnosticForm } from "@/components/sections/DiagnosticForm";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { DIAGNOSTIC } from "@/lib/content/home";
import { photo } from "@/lib/images";

export function DiagnosticSection() {
  const picture = photo(DIAGNOSTIC.photo);
  return (
    <section id="diagnostico" aria-labelledby="diagnostico-title" className="section-y cv-auto grao relative isolate overflow-hidden scroll-mt-20 bg-navy-deep">
      <Image src={picture.src} alt="" fill sizes="100vw" placeholder="blur" blurDataURL={picture.blurDataURL} className="-z-20 object-cover opacity-40" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(4_15_42/0.97)_0%,rgb(4_15_42/0.85)_50%,rgb(4_15_42/0.6)_100%)]" />
      <div aria-hidden="true" className="tick-grid absolute -top-20 right-[-8%] -z-10 h-[520px] w-[640px] opacity-40" />

      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="diagnostico-title"
            onDark
            eyebrow={DIAGNOSTIC.eyebrow}
            title={
              <>
                {DIAGNOSTIC.title} <Highlight onDark>{DIAGNOSTIC.titleHighlight}</Highlight>
              </>
            }
            description={DIAGNOSTIC.description}
          />
          <Reveal delay={140}>
            <ol className="flex flex-col gap-5 border-l border-cyan/30 pl-6">
              {DIAGNOSTIC.nextSteps.map(({ icon: Icon, title, description }, index) => (
                <li key={title} className="relative flex flex-col gap-1">
                  <span aria-hidden="true" className="absolute top-1.5 -left-[31px] size-2.5 rounded-full bg-cyan shadow-[0_0_14px_rgb(40_199_242/0.8)]" />
                  <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-cyan uppercase">
                    <Icon className="size-4" />
                    Depois {index + 1}
                  </span>
                  <span className="text-display font-bold text-white">{title}</span>
                  <span className="text-sm text-mist">{description}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <DiagnosticForm />
        </Reveal>
      </div>
    </section>
  );
}
