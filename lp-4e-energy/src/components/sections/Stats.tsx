import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { STATS } from "@/lib/content/home";

export function Stats() {
  return (
    <section id="numeros" aria-labelledby="numeros-title" className="section-y cv-auto relative isolate overflow-hidden bg-navy-deep">
      <div aria-hidden="true" className="telemetry-line absolute inset-x-0 top-0 h-px" />
      <div className="container-site">
        <Reveal>
          <Eyebrow onDark>{STATS.eyebrow}</Eyebrow>
          <h2 id="numeros-title" className="text-display mt-4 max-w-[20ch] text-[clamp(2rem,1.2rem+3.4vw,4rem)] leading-[1.02] font-bold text-balance text-white">
            {STATS.title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-pretty text-white/90">{STATS.definition}</p>
          <p className="text-display mt-4 text-xl font-bold text-mist">{STATS.titleMuted}</p>
        </Reveal>

        <dl className="mt-14 grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
          {STATS.items.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 80}
              className={`flex flex-col-reverse gap-3 border-b border-white/10 py-8 pr-4 lg:border-b-0 lg:py-12 ${
                index % 2 === 1 ? "border-l pl-5 lg:pl-8" : "lg:pl-8"
              } ${index > 0 ? "lg:border-l" : "lg:pl-0"}`}
            >
              <dt>
                <span className="block font-semibold text-white">{stat.label}</span>
                <span className="text-sm text-mist">{stat.detail}</span>
              </dt>
              <dd className="text-display text-[clamp(2.4rem,1.4rem+3.4vw,4.8rem)] leading-none font-bold whitespace-nowrap text-cyan">
                {stat.value === null ? (
                  stat.text
                ) : (
                  <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} durationMs={2200} />
                )}
                <span aria-hidden="true" className="mt-4 block h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full w-full origin-left bg-cyan" />
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
