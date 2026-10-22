import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { OTHER_SOLUTIONS } from "@/lib/content/home";
import { photo } from "@/lib/images";

/** Seção compacta: não dilui a oferta principal, mas dá caminho para empresas e consumidores. */
export function OtherSolutions() {
  return (
    <section id="outras-solucoes" aria-labelledby="outras-title" className="cv-auto bg-ice py-16 text-ink lg:py-20">
      <div className="container-site">
        <SectionHeading id="outras-title" eyebrow={OTHER_SOLUTIONS.eyebrow} title={OTHER_SOLUTIONS.title} className="mb-10" />
        <ul className="grid gap-4 md:grid-cols-3">
          {OTHER_SOLUTIONS.items.map(({ icon: Icon, title, description, ctaId, message, photo: name }, index) => {
            const picture = name ? photo(name) : null;
            return (
              <Reveal as="li" key={title} delay={index * 100}>
                <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-ice-dark bg-white shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-cyan/60">
                  <div className="relative h-36 bg-navy">
                    {picture ? (
                      <Image src={picture.src} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" placeholder="blur" blurDataURL={picture.blurDataURL} className="object-cover opacity-80" />
                    ) : (
                      <div aria-hidden="true" className="tick-grid absolute inset-0 opacity-70" />
                    )}
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgb(6_24_62/0.9)_100%)]" />
                    <span className="absolute bottom-4 left-5 grid size-11 place-items-center rounded-full border border-cyan/50 bg-navy-deep/70 text-cyan backdrop-blur-sm">
                      <Icon className="size-[22px]" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="text-display font-bold text-ink">{title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
                    <WhatsAppButton ctaId={ctaId} message={message} label="Saber mais" variant="liquid-light" className="mt-auto self-start" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
