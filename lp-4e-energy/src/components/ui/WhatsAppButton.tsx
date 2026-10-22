"use client";

import { Button, type ButtonVariant } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppUrl, buildWhatsAppUrlWithOrigin, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  /** ID único do botão para o GTM (ex.: cta_whatsapp_hero) */
  ctaId: string;
  message?: string;
  label?: string;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
}

/**
 * Botão de WhatsApp. O href renderizado no servidor leva só a mensagem; no clique,
 * a URL ganha a origem da visita (UTMs) sem precisar re-renderizar.
 */
export function WhatsAppButton({
  ctaId,
  message = DEFAULT_WHATSAPP_MESSAGE,
  label = "Falar com um especialista",
  variant = "cyan",
  size = "md",
  className,
}: WhatsAppButtonProps) {
  return (
    <Button
      href={buildWhatsAppUrl(message)}
      variant={variant}
      size={size}
      className={className}
      icon={<WhatsAppIcon className="size-5" />}
      iconPosition="start"
      data-cta={ctaId}
      aria-label={`${label} pelo WhatsApp (abre em nova aba)`}
      onClick={(event) => {
        event.currentTarget.href = buildWhatsAppUrlWithOrigin(message);
      }}
    >
      {label}
    </Button>
  );
}
