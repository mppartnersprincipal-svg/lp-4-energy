import { RingMark } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { IconSeta } from "@/components/ui/icons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function NotFound() {
  return (
    <section
      id="nao-encontrada"
      aria-labelledby="erro-title"
      className="navy-glow relative isolate flex min-h-[80svh] items-center overflow-hidden pt-(--header-h)"
    >
      <RingMark className="absolute top-1/2 right-[-6rem] -z-10 w-96 -translate-y-1/2 text-cyan opacity-[0.08] lg:right-[8%]" />
      <div className="container-site flex max-w-2xl flex-col gap-6 py-20">
        <p className="text-sm font-semibold tracking-[0.18em] text-cyan uppercase">Erro 404</p>
        <h1 id="erro-title" className="text-display text-[clamp(2.2rem,1.5rem+3vw,3.6rem)] leading-tight font-bold text-white">
          Esta página não existe, mas a sua usina pode.
        </h1>
        <p className="text-lg text-mist">
          O endereço pode ter mudado. Volte para o início ou fale com um especialista pelo WhatsApp.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/" icon={<IconSeta className="size-4 rotate-180" />} iconPosition="start">
            Voltar ao início
          </Button>
          <WhatsAppButton ctaId="cta_whatsapp_404" variant="liquid-clear" />
        </div>
      </div>
    </section>
  );
}
