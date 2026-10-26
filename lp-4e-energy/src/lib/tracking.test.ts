import { describe, expect, it } from "vitest";
import { pageTypeOf } from "@/lib/collector";
import { toCollector } from "@/lib/tracking";
import { PAGE_TYPES } from "@/server/analytics/payload.js";

describe("toCollector", () => {
  it("WhatsApp e envio do formulário viram whatsapp_click com o botão/formulário de origem", () => {
    expect(toCollector("click_whatsapp", { cta_id: "fab_whatsapp" })).toEqual({
      name: "whatsapp_click",
      props: { cta_location: "fab_whatsapp" },
    });
    expect(
      toCollector("form_complete", { form_id: "form_diagnostico", capital_range: "50k_150k", investor_type: "empresa" }),
    ).toEqual({
      name: "whatsapp_click",
      props: { cta_location: "form_diagnostico", capital_range: "50k_150k", investor_type: "empresa" },
    });
  });

  it("links sem cta_id usam o tipo do link", () => {
    expect(toCollector("click_email", {})?.props).toEqual({ cta_location: "email" });
    expect(toCollector("click_cta", { cta_id: "cta_ver_modelo_hero" })?.props).toEqual({ cta_location: "cta_ver_modelo_hero" });
  });

  it("nunca repassa dados pessoais do formulário", () => {
    const leaked = { form_id: "form_diagnostico", capital_range: "ate_50k", nome: "Maria", telefone: "62999990000", cidade: "Rio Verde" };
    expect(JSON.stringify(toCollector("form_complete", leaked))).not.toMatch(/Maria|62999|Rio Verde/);
  });

  it("rolagem e seções ficam só no GTM (o coletor mede sozinho)", () => {
    expect(toCollector("scroll_50", { percent_scrolled: 50 })).toBeNull();
    expect(toCollector("section_view", { section_id: "topo" })).toBeNull();
  });
});

describe("pageTypeOf", () => {
  it("mapeia cada página para um page_type aceito pelo servidor", () => {
    for (const path of ["/", "/politica-de-privacidade"]) {
      const type = pageTypeOf(path);
      expect(type).not.toBeNull();
      expect(PAGE_TYPES.has(type as string)).toBe(true);
    }
  });

  it("ignora barra final e devolve null para páginas fora do mapa", () => {
    expect(pageTypeOf("/politica-de-privacidade/")).toBe("politica");
    expect(pageTypeOf("/qualquer-coisa")).toBeNull();
  });
});
