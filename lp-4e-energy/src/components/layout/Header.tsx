"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { IconMenu, IconX } from "@/components/ui/icons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { anchorHref, NAV_ITEMS } from "@/lib/site";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useScrolledPast } from "@/lib/useScrolledPast";

const SCROLL_THRESHOLD = 24;

export function Header() {
  const pathname = usePathname();
  const isScrolled = useScrolledPast(SCROLL_THRESHOLD);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // Guarda a página em que o menu abriu: navegar ou virar para desktop fecha o menu
  const [menuOpenedAt, setMenuOpenedAt] = useState<string | null>(null);
  const isMenuOpen = menuOpenedAt === pathname && !isDesktop;
  const closeMenu = useCallback(() => setMenuOpenedAt(null), []);
  const isSolid = isScrolled || isMenuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,box-shadow,border-color] duration-500 ${
          isSolid
            ? "border-b border-navy-line/60 bg-navy-deep/85 shadow-[0_12px_32px_-16px_rgb(0_0_0/0.6)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-site flex h-(--header-h) items-center justify-between gap-6">
          <Link href="/" aria-label="4E Energy, página inicial" className="shrink-0">
            <Logo size={44} priority />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.sectionId}>
                  <a
                    href={anchorHref(pathname, item.sectionId)}
                    className="relative px-4 py-2 text-[15px] font-medium text-white/80 transition-colors after:absolute after:inset-x-4 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-cyan after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* No mobile a MobileCtaBar já oferece o WhatsApp */}
            <div className="hidden sm:block">
              <WhatsAppButton ctaId="cta_whatsapp_navbar" label="Falar com especialista" />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpenedAt(isMenuOpen ? null : pathname)}
              aria-expanded={isMenuOpen}
              aria-controls="menu-mobile"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              className="grid size-12 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan hover:text-cyan lg:hidden"
            >
              {isMenuOpen ? <IconX className="size-5" /> : <IconMenu className="size-5" />}
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} pathname={pathname} />
    </header>
  );
}
