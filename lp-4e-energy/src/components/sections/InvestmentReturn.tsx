import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { IconSeta } from "@/components/ui/icons";
import { Highlight, SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { INVESTMENT } from "@/lib/content/home";

const BRL = new Intl.NumberFormat("pt-BR");
const MAX_INCOME = Math.max(...INVESTMENT.tiers.map((tier) => tier.monthlyIncome));

/** Faixas de investimento x renda mensal estimada, com o aviso legal colado nos valores. */
export function InvestmentReturn() {
  return (
    <section id="investimento" aria-labelledby="investimento-title" className="section-y cv-auto grao relative isolate overflow-hidden bg-navy-deep">
      <div aria-hidden="true" className="telemetry-line absolute inset-x-0 top-0 h-px" />
      <div aria-hidden="true" className="tick-grid absolute -top-16 right-[-8%] -z-10 h-[480px] w-[600px] opacity-40" />
      <div className="container-site">
        <SectionHeading
          id="investimento-title"
          onDark
          eyebrow={INVESTMENT.eyebrow}
          title={
            <>
              {INVESTMENT.title} <Highlight onDark>{INVESTMENT.titleHighlight}</Highlight>
            </>
          }
          description={INVESTMENT.description}
          className="mb-12 lg:mb-16"
        />

        <ol className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {INVESTMENT.tiers.map(({ investment, monthlyIncome }, index) => (
            <Reveal as="li" key={investment} delay={index * 120}>
              <article className="flex h-full flex-col gap-6 rounded-[24px] border border-white/10 bg-navy-soft/70 p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-cyan/60 sm:p-8">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-mist uppercase">Investimento</p>
                  <p className="text-display mt-2 text-2xl font-bold text-white sm:text-3xl">R$ {BRL.format(investment / 1000)} mil</p>
                </div>
                <span aria-hidden="true" className="flex items-center gap-3 text-cyan">
                  <span className="h-px flex-1 bg-white/15" />
                  <IconSeta className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-mist uppercase">Renda mensal estimada de até</p>
                  <p className="text-display mt-2 flex items-baseline gap-1 leading-none font-bold whitespace-nowrap">
                    <Counter to={monthlyIncome} prefix="R$ " durationMs={2000} className="text-[clamp(2.2rem,1.5rem+2.4vw,3.4rem)] text-cyan" />
                    <span className="text-lg text-mist">/mês*</span>
                  </p>
                </div>
                <span aria-hidden="true" className="mt-auto block h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full rounded-full bg-cyan" style={{ width: `${(monthlyIncome / MAX_INCOME) * 100}%` }} />
                </span>
              </article>
            </Reveal>
          ))}
        </ol>
        <p className="mt-5 text-sm leading-relaxed text-mist">{INVESTMENT.notice}</p>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12">
          {INVESTMENT.benefits.map(({ icon: Icon, title, description }, index) => (
            <Reveal as="li" key={title} delay={index * 120}>
              <div className="flex h-full items-start gap-5 rounded-[20px] border border-white/10 p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-cyan/50 text-cyan">
                  <Icon className="size-6" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-display text-lg font-bold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-mist">{description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col items-start gap-6 border-t border-white/10 pt-10 lg:mt-12 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-display max-w-2xl text-xl leading-snug font-bold text-balance text-white sm:text-2xl">{INVESTMENT.closing}</p>
          <WhatsAppButton ctaId="cta_whatsapp_investimento" label="Conhecer essa oportunidade" message={INVESTMENT.ctaMessage} size="lg" className="shrink-0" />
        </Reveal>
      </div>
    </section>
  );
}
