import { SITE } from "@/lib/site";
import { getUtms } from "@/lib/tracking";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, vim pela página da 4E Energy e quero entender o investimento em usina solar gerida.";

/** Sufixo com a origem da visita (UTMs), para o comercial saber de onde o lead veio. */
export function originSuffix(utms: Record<string, string | undefined> = {}): string {
  const source = utms.utm_source;
  const campaign = utms.utm_campaign;
  if (!source && !campaign) return "";
  return ` (origem: ${[source, campaign].filter(Boolean).join(" / ")})`;
}

export function buildWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Mensagem padrão + origem da sessão (só no navegador). */
export function buildWhatsAppUrlWithOrigin(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const utms = typeof window === "undefined" ? {} : getUtms();
  return buildWhatsAppUrl(`${message}${originSuffix(utms)}`);
}

/**
 * Abre o WhatsApp numa nova aba; se o navegador bloquear o pop-up,
 * navega na mesma aba para não perder o lead.
 */
export function openWhatsApp(url: string): void {
  const win = window.open(url, "_blank");
  if (win) {
    win.opener = null;
    return;
  }
  window.location.href = url;
}
