import { Reveal } from "@/components/motion/Reveal";
import { IconEscudo } from "@/components/ui/icons";
import { Seal } from "@/components/ui/Seal";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SECURITY } from "@/lib/content/home";

export function SecurityBlocks() {
  return (
    <section id="seguranca" aria-labelledby="seguranca-title" className="section-y cv-auto bg-ice text-ink">
      <div className="container-site">
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <SectionHeading
            id="seguranca-title"
            eyebrow={SECURITY.eyebrow}
            title={
              <>
                {SECURITY.title} <Highlight>{SECURITY.titleHighlight}</Highlight>
              </>
            }
          />
          <Seal text={SECURITY.seal} onLight />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {SECURITY.items.map((item, index) => (
            <Reveal key={item.question} delay={index * 140}>
              <article className="group flex h-full flex-col gap-5 rounded-[24px] border border-ice-dark bg-white p-7 shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-cyan/60 sm:p-8">
                <span className="text-display text-sm font-bold text-cyan-dark">0{index + 1}</span>
                <h3 className="text-display text-xl font-bold text-ink">{item.question}</h3>
                <p className="leading-relaxed text-ink-soft">{item.answer}</p>
                <p className="mt-auto flex items-start gap-2 border-t border-ice-dark pt-5 text-sm font-semibold text-cyan-dark">
                  <IconEscudo className="mt-0.5 size-4 shrink-0" />
                  {item.proof}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p className="max-w-xl text-ink-soft">
            Tem outra pergunta sobre risco, prazo ou regulamentação? Respondemos com as premissas do seu caso.
          </p>
          <WhatsAppButton ctaId="cta_whatsapp_seguranca" variant="navy" label="Tirar dúvidas no WhatsApp" />
        </Reveal>
      </div>
    </section>
  );
}
