import Image from "next/image";
import { RingMark } from "@/components/layout/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconSeta } from "@/components/ui/icons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FINAL_CTA } from "@/lib/content/home";
import { photo } from "@/lib/images";

export function FinalCta() {
  const picture = photo(FINAL_CTA.photo);
  return (
    <section id="cta-final" aria-labelledby="cta-final-title" className="grao relative isolate overflow-hidden bg-navy-deep">
      <div className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[58%]">
        <Image src={picture.src} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" placeholder="blur" blurDataURL={picture.blurDataURL} className="object-cover object-[60%_center]" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-deep/85 lg:bg-transparent lg:bg-[linear-gradient(90deg,var(--cor-primaria-profunda)_40%,rgb(4_15_42/0.7)_62%,rgb(4_15_42/0.15)_100%)]" />
      <RingMark className="absolute top-1/2 right-[-8rem] -z-10 w-[480px] -translate-y-1/2 text-cyan opacity-[0.08] lg:hidden" />
      <div aria-hidden="true" className="telemetry-line absolute inset-x-0 top-0 -z-10 h-px" />
      <div className="container-site section-y">
        <Reveal className="flex max-w-2xl flex-col gap-6">
          <Eyebrow onDark>{FINAL_CTA.eyebrow}</Eyebrow>
          <h2 id="cta-final-title" className="text-display text-[clamp(2rem,1.3rem+2.8vw,3.4rem)] leading-[1.06] font-bold text-balance text-white">
            {FINAL_CTA.title}
          </h2>
          <p className="text-lg leading-relaxed text-mist">{FINAL_CTA.description}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <WhatsAppButton ctaId="cta_whatsapp_final" size="lg" />
            <Button href="#diagnostico" variant="outline-light" size="lg" icon={<IconSeta className="size-5" />} data-track="click_cta" data-cta-id="cta_diagnostico_final">
              Fazer o diagnóstico
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
