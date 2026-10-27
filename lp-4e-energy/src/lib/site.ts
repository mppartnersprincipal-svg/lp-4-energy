/**
 * Dados institucionais da 4E Energy: ÚNICO lugar para trocar contatos e dados legais.
 * Itens marcados com PLACEHOLDER ainda não foram enviados pelo cliente (ver docs/PENDENCIAS.md).
 */

export interface NavItem {
  label: string;
  /** id da seção na página inicial (sem #) */
  sectionId: string;
}

// WhatsApp comercial da 4E, (62) 9.9607-1233, confirmado pelo Pedro em 26/10/2026 (DDI + DDD + número, só dígitos).
// Um número começando com 5500 é tratado como fictício (esconde o telefone do schema).
const PLACEHOLDER_PHONE_PREFIX = "5500";
const DEFAULT_WHATSAPP = "5562996071233";

export const SITE = {
  name: "4E Energy",
  // Razão social e CNPJ conferidos na Receita em 27/10/2026 (ATIVA desde 07/02/2025)
  legalName: "MDM & 4E Energy Eficiência Energética Ltda",
  tagline: "Usinas fotovoltaicas para investidores",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://4eenergy.com.br",
  // PLACEHOLDER: e-mail institucional
  email: "contato@4eenergy.com.br",
  instagramUrl: "https://www.instagram.com/4eenergy/",
  instagramHandle: "@4eenergy",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP,
  // CNPJ (null esconde). O 62.877.984/0001-40, enviado antes, era de outra empresa (BAIXADA): não usar
  cnpj: "59.340.742/0001-09" as null | string,
  // Endereço enviado pelo cliente em 26/10/2026; CEP conferido na Receita/ViaCEP
  address: {
    street: "Rua 5, nº 77, Jardim Decolores",
    city: "Trindade",
    state: "GO",
    postalCode: "75385-218",
  } as null | {
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
  { label: "Rentabilidade", sectionId: "investimento" },
  { label: "Gestão", sectionId: "gestao" },
  { label: "Segurança", sectionId: "seguranca" },
  { label: "Dúvidas", sectionId: "perguntas-frequentes" },
];

export const DIAGNOSTIC_ANCHOR = "diagnostico";

/** Âncora para uma seção da página inicial, a partir de qualquer rota. */
export function anchorHref(pathname: string, sectionId: string): string {
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
}
