"use client";

import { useEffect, useRef } from "react";
import { animated, useTrail, useTransition } from "@react-spring/web";
import { getLenis } from "@/components/motion/SmoothScroll";
import { Button } from "@/components/ui/Button";
import { IconSeta, InstagramIcon } from "@/components/ui/icons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { anchorHref, DIAGNOSTIC_ANCHOR, NAV_ITEMS, SITE } from "@/lib/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: "translate3d(0, -12px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -12px, 0)" },
    config: { tension: 260, friction: 28 },
  });

  const trail = useTrail(NAV_ITEMS.length, {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translate3d(0, 0px, 0)" : "translate3d(0, 16px, 0)",
    delay: isOpen ? 80 : 0,
    config: { tension: 240, friction: 26 },
  });

  // Trava a rolagem, isola o conteúdo de trás (inert), fecha no Esc e cuida do foco
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const background = [document.getElementById("conteudo"), document.querySelector("footer")];

    root.style.overflow = "hidden";
    background.forEach((element) => element?.setAttribute("inert", ""));
    getLenis()?.stop();
    firstLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      root.style.overflow = previousOverflow;
      background.forEach((element) => element?.removeAttribute("inert"));
      getLenis()?.start();
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  return transitions(
    (style, isVisible) =>
      isVisible && (
        <animated.div
          id="menu-mobile"
          style={style}
          className="fixed inset-x-0 top-(--header-h) bottom-0 overflow-y-auto bg-navy-deep lg:hidden"
          data-lenis-prevent=""
          data-section="menu"
        >
          <nav aria-label="Menu mobile" className="container-site flex min-h-full flex-col gap-10 pt-8 pb-12">
            <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
              {trail.map((itemStyle, index) => {
                const item = NAV_ITEMS[index];
                return (
                  <animated.li key={item.sectionId} style={itemStyle}>
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={anchorHref(pathname, item.sectionId)}
                      onClick={onClose}
                      className="flex min-h-16 items-center justify-between text-2xl font-semibold text-white"
                    >
                      {item.label}
                      <IconSeta className="size-5 text-cyan" />
                    </a>
                  </animated.li>
                );
              })}
            </ul>

            <div className="flex flex-col gap-3">
              <Button
                href={anchorHref(pathname, DIAGNOSTIC_ANCHOR)}
                variant="white"
                size="lg"
                onClick={onClose}
                data-track="click_cta"
                data-cta-id="cta_diagnostico_menu"
              >
                Fazer o diagnóstico
              </Button>
              <WhatsAppButton ctaId="cta_whatsapp_menu" size="lg" />
            </div>

            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_instagram"
              className="mt-auto flex items-center gap-2 text-sm text-mist"
            >
              <InstagramIcon className="size-4 text-cyan" aria-hidden="true" />
              {SITE.instagramHandle}
            </a>
          </nav>
        </animated.div>
      ),
  );
}
