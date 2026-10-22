/**
 * Dados institucionais da 4E Energy: ÚNICO lugar para trocar contatos e dados legais.
 * Itens marcados com PLACEHOLDER ainda não foram enviados pelo cliente (ver docs/PENDENCIAS.md).
 */

export interface NavItem {
  label: string;
  /** id da seção na página inicial (sem #) */
  sectionId: string;
}

// PLACEHOLDER: WhatsApp comercial da 4E (DDI + DDD + número, só dígitos). Enquanto começar com 5500 é fictício.
const PLACEHOLDER_PHONE_PREFIX = "5500";
const DEFAULT_WHATSAPP = "5500000000000";

export const SITE = {
  name: "4E Energy",
  legalName: "4E Energy",
  tagline: "Usinas fotovoltaicas para investidores",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lp-4e-energy.vercel.app",
  // PLACEHOLDER: e-mail institucional
  email: "contato@4eenergy.com.br",
  instagramUrl: "https://www.instagram.com/4eenergy/",
  instagramHandle: "@4eenergy",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP,
  // PLACEHOLDER: CNPJ e endereço (null esconde o bloco)
  cnpj: null as null | string,
  address: null as null | {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  },
  // PLACEHOLDER: horário de atendimento a confirmar
  hours: "Segunda a sexta, das 8h às 18h",
  areaServed: "Goiás",
  foundedYear: 2022,
  director: "Marcos Lamounier",
  partners: ["HES HUB", "SEBRAE", "Xper", "Ubantec"],
} as const;

export function hasRealPhone(): boolean {
  return !SITE.whatsappNumber.startsWith(PLACEHOLDER_PHONE_PREFIX);
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Como funciona", sectionId: "modelo" },
  { label: "Rentabilidade", sectionId: "rentabilidade" },
  { label: "Gestão", sectionId: "gestao" },
  { label: "Segurança", sectionId: "seguranca" },
  { label: "Dúvidas", sectionId: "perguntas-frequentes" },
];

export const DIAGNOSTIC_ANCHOR = "diagnostico";

/** Âncora para uma seção da página inicial, a partir de qualquer rota. */
export function anchorHref(pathname: string, sectionId: string): string {
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
}
