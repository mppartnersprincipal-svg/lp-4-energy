import { Reveal } from "@/components/motion/Reveal";
import { buildFaqSchema, JsonLd } from "@/components/seo/JsonLd";
import { Accordion, type FaqItem } from "@/components/ui/Accordion";
import { IconPergunta } from "@/components/ui/icons";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SOURCES } from "@/lib/content/home";

interface FaqSectionProps {
  items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section id="perguntas-frequentes" aria-labelledby="faq-title" className="section-y cv-auto bg-white text-ink">
      <JsonLd data={buildFaqSchema(items)} />
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="Perguntas frequentes"
            title={
              <>
                Perguntas frequentes sobre <Highlight>investir em usina solar</Highlight>
              </>
            }
            description="Respostas curtas e diretas sobre capital, terreno, consumidores, prazos, acompanhamento e regulamentação."

          />
          <Reveal delay={120}>
            <div className="flex flex-col gap-4 rounded-[20px] bg-navy p-6 text-white sm:p-7">
              <span className="flex items-center gap-3 font-semibold">
                <IconPergunta className="size-5 text-cyan" />
                Não encontrou a sua resposta?
              </span>
              <p className="text-sm leading-relaxed text-mist">
                Pergunte direto para um especialista da 4E Energy. Respondemos pelo WhatsApp, sem compromisso.
              </p>
              <WhatsAppButton ctaId="cta_whatsapp_faq" label="Perguntar no WhatsApp" className="self-start" />
            </div>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <Accordion items={items} />
          <p className="mt-6 text-sm leading-relaxed text-ink-soft">
            Fontes oficiais:{" "}
            <a href={SOURCES.lei14300.url} target="_blank" rel="noopener noreferrer" className="underline decoration-cyan/60 underline-offset-4 hover:text-ink">
              {SOURCES.lei14300.label}
            </a>{" "}
            e{" "}
            <a href={SOURCES.aneel.url} target="_blank" rel="noopener noreferrer" className="underline decoration-cyan/60 underline-offset-4 hover:text-ink">
              {SOURCES.aneel.label}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
