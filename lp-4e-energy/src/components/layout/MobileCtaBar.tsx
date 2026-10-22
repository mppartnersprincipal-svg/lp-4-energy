"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/icons";
import { anchorHref, DIAGNOSTIC_ANCHOR } from "@/lib/site";
import { useScrolledPast } from "@/lib/useScrolledPast";
import { buildWhatsAppUrl, buildWhatsAppUrlWithOrigin } from "@/lib/whatsapp";

const SHOW_AFTER_PX = 320;

/** Barra fixa de conversão no mobile: aparece depois que o visitante começa a rolar. */
export function MobileCtaBar() {
  const pathname = usePathname();
  const isVisible = useScrolledPast(SHOW_AFTER_PX);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-deep/95 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] backdrop-blur-lg transition-transform duration-500 ease-out lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      inert={!isVisible}
      data-section="barra-mobile"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={anchorHref(pathname, DIAGNOSTIC_ANCHOR)}
          data-track="click_cta"
          data-cta-id="cta_diagnostico_barra_mobile"
          className="flex min-h-12 items-center justify-center rounded-full border border-white/25 text-[15px] font-semibold text-white active:scale-[0.98]"
        >
          Diagnóstico
        </a>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="cta_whatsapp_barra_mobile"
          onClick={(event) => {
            event.currentTarget.href = buildWhatsAppUrlWithOrigin();
          }}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-wa text-[15px] font-semibold text-navy-deep active:scale-[0.98]"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
