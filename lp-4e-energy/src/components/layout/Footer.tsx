import Link from "next/link";
import { Logo, RingMark } from "@/components/layout/Logo";
import { IconMail, IconPino, IconRelogio, InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { LEGAL_NOTICE } from "@/lib/content/home";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const SOCIAL_LINK =
  "grid size-11 place-items-center rounded-full border border-white/15 text-white transition-[transform,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-cyan hover:text-cyan";

// Cache Components: valores do relógio precisam ser cacheados no prerender
async function getCopyrightYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="relative isolate overflow-hidden bg-navy-deep text-mist">
      <RingMark className="absolute -right-24 -bottom-32 -z-10 w-[420px] text-cyan opacity-[0.05] lg:w-[560px]" />

      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.3fr] lg:py-20">
        <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
          <Logo size={48} className="self-start" />
          <p className="max-w-xs leading-relaxed">
            Usinas fotovoltaicas para investidores, com gestão completa da carteira de consumidores. Energia
            inteligente, economia e sustentabilidade.
          </p>
          <div className="flex gap-3">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${SITE.instagramHandle} (abre em nova aba)`}
              data-track="click_instagram"
              className={SOCIAL_LINK}
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da 4E Energy (abre em nova aba)"
              data-cta="cta_whatsapp_footer"
              className={SOCIAL_LINK}
            >
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Seções da página">
          <h2 className="mb-5 text-xs font-semibold tracking-[0.18em] text-cyan uppercase">Navegação</h2>
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.sectionId}>
                <a href={`/#${item.sectionId}`} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/politica-de-privacidade" className="transition-colors hover:text-white">
                Política de privacidade
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-5 text-xs font-semibold tracking-[0.18em] text-cyan uppercase">Atendimento</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="cta_whatsapp_footer_contato"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="size-4 shrink-0 text-cyan" />
                Falar pelo WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                data-track="click_email"
                className="flex items-center gap-3 break-all transition-colors hover:text-white"
              >
                <IconMail className="size-4 shrink-0 text-cyan" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <IconRelogio className="size-4 shrink-0 text-cyan" />
              {SITE.hours}
            </li>
            <li className="flex items-center gap-3">
              <IconPino className="size-4 shrink-0 text-cyan" />
              {SITE.address ? `${SITE.address.street}, ${SITE.address.city}/${SITE.address.state}` : "Goiás"}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 pt-6 pb-28 text-xs leading-relaxed sm:pb-24 lg:pb-6">
          <p className="max-w-4xl text-mist/80">{LEGAL_NOTICE}</p>
          <p>
            © {year} {SITE.legalName}
            {SITE.cnpj ? ` · CNPJ ${SITE.cnpj}` : ""} · Energia Inteligente · Economia · Sustentabilidade
          </p>
        </div>
      </div>
    </footer>
  );
}
