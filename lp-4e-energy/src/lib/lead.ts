/**
 * Formulário "Diagnóstico de investidor": campos, validação e mensagem do WhatsApp.
 * Os dados pessoais (nome, telefone, cidade) só vão para a mensagem do WhatsApp.
 * No dataLayer e no painel entram apenas as faixas (capital_range, investor_type).
 */
import type { Utms } from "@/lib/tracking";
import { originSuffix } from "@/lib/whatsapp";

export const FORM_ID = "form_diagnostico";

export const CAPITAL_RANGES = [
  { value: "ate_50k", label: "Até R$ 50 mil" },
  { value: "50k_150k", label: "R$ 50 mil a R$ 150 mil" },
  { value: "150k_500k", label: "R$ 150 mil a R$ 500 mil" },
  { value: "acima_500k", label: "Acima de R$ 500 mil" },
] as const;

export const INVESTOR_TYPES = [
  { value: "pessoa_fisica", label: "Pessoa física" },
  { value: "empresa", label: "Empresa" },
] as const;

export const LAND_OPTIONS = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
  { value: "nao_sei", label: "Ainda não sei" },
] as const;

export type CapitalRange = (typeof CAPITAL_RANGES)[number]["value"];
export type InvestorType = (typeof INVESTOR_TYPES)[number]["value"];
export type LandOption = (typeof LAND_OPTIONS)[number]["value"];

export interface LeadInput {
  name: string;
  phone: string;
  city: string;
  capitalRange: string;
  investorType: string;
  hasLand: string;
}

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

const MIN_NAME_WORDS = 2;
const PHONE_DIGITS = [10, 11];

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Telefone: (62) 98765-4321 ou (62) 3456-7890 */
export function maskPhone(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  const splitAt = rest.length === 9 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, splitAt)}-${rest.slice(splitAt)}`;
}

export function isValidPhone(value: string): boolean {
  return PHONE_DIGITS.includes(onlyDigits(value).length);
}

function isOption<T extends readonly { value: string }[]>(options: T, value: string): boolean {
  return options.some((option) => option.value === value);
}

export function validateLead(input: LeadInput): LeadErrors {
  const errors: LeadErrors = {};
  if (input.name.trim().split(/\s+/).filter(Boolean).length < MIN_NAME_WORDS) {
    errors.name = "Informe nome e sobrenome.";
  }
  if (!isValidPhone(input.phone)) errors.phone = "Informe o WhatsApp com DDD.";
  if (!input.city.trim()) errors.city = "Informe a sua cidade.";
  if (!isOption(CAPITAL_RANGES, input.capitalRange)) errors.capitalRange = "Escolha uma faixa.";
  if (!isOption(INVESTOR_TYPES, input.investorType)) errors.investorType = "Escolha uma opção.";
  if (input.hasLand && !isOption(LAND_OPTIONS, input.hasLand)) errors.hasLand = "Escolha uma opção.";
  return errors;
}

function labelOf<T extends readonly { value: string; label: string }[]>(options: T, value: string): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

/** Mensagem pronta para o WhatsApp do comercial, com os dados do diagnóstico e a origem. */
export function buildLeadMessage(input: LeadInput, utms: Utms = {}): string {
  const lines = [
    `Olá, sou ${input.name.trim()}, de ${input.city.trim()}.`,
    "Quero entender o investimento em usina solar gerida.",
    `Capital disponível: ${labelOf(CAPITAL_RANGES, input.capitalRange)}.`,
    `Perfil: ${labelOf(INVESTOR_TYPES, input.investorType)}.`,
  ];
  if (input.hasLand) lines.push(`Área ou terreno próprio: ${labelOf(LAND_OPTIONS, input.hasLand)}.`);
  return `${lines.join("\n")}${originSuffix(utms)}`;
}
