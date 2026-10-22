import { describe, expect, it } from "vitest";
import { buildLeadMessage, isValidPhone, maskPhone, validateLead, type LeadInput } from "@/lib/lead";

const VALID: LeadInput = {
  name: "Ana Souza",
  phone: "(62) 99876-5432",
  city: "Goiânia",
  capitalRange: "150k_500k",
  investorType: "pessoa_fisica",
  hasLand: "nao_sei",
};

describe("maskPhone", () => {
  it("formata celular e fixo com DDD", () => {
    expect(maskPhone("62998765432")).toBe("(62) 99876-5432");
    expect(maskPhone("6232345678")).toBe("(62) 3234-5678");
  });

  it("ignora o que não é dígito e corta em 11", () => {
    expect(maskPhone("+55 (62) 99876-5432 999")).toBe("(55) 62998-7654");
    expect(maskPhone("")).toBe("");
  });
});

describe("validateLead", () => {
  it("aceita um lead completo", () => {
    expect(validateLead(VALID)).toEqual({});
  });

  it("exige nome e sobrenome, telefone válido, cidade e faixas conhecidas", () => {
    const errors = validateLead({ name: "Ana", phone: "629", city: " ", capitalRange: "x", investorType: "", hasLand: "" });
    expect(Object.keys(errors).sort()).toEqual(["capitalRange", "city", "investorType", "name", "phone"]);
    expect(isValidPhone("629")).toBe(false);
  });

  it("terreno é opcional, mas só aceita as opções da lista", () => {
    expect(validateLead({ ...VALID, hasLand: "" })).toEqual({});
    expect(validateLead({ ...VALID, hasLand: "talvez" }).hasLand).toBeDefined();
  });
});

describe("buildLeadMessage", () => {
  it("monta a mensagem com os rótulos legíveis e a origem", () => {
    const message = buildLeadMessage(VALID, { utm_source: "google", utm_campaign: "pesquisa-investidor" });
    expect(message).toContain("Olá, sou Ana Souza, de Goiânia.");
    expect(message).toContain("Capital disponível: R$ 150 mil a R$ 500 mil.");
    expect(message).toContain("Perfil: Pessoa física.");
    expect(message).toContain("Área ou terreno próprio: Ainda não sei.");
    expect(message).toMatch(/\(origem: google \/ pesquisa-investidor\)$/);
  });

  it("sem UTMs não acrescenta origem; sem terreno omite a linha", () => {
    const message = buildLeadMessage({ ...VALID, hasLand: "" });
    expect(message).not.toContain("origem");
    expect(message).not.toContain("terreno");
  });
});
