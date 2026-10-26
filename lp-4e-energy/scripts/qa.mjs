// QA da LP 4E Energy: capturas por largura, overflow horizontal, dataLayer com UTMs,
// formulário de diagnóstico (form_complete sem dado pessoal) e console limpo.
// Uso: node scripts/qa.mjs http://localhost:3000 <pasta-de-saida>
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3100";
const OUT = process.argv[3] ?? "./out";
mkdirSync(OUT, { recursive: true });

const WIDTHS = [360, 390, 768, 1024, 1440];
const BLOCK = /googletagmanager|google-analytics|wa\.me|whatsapp|facebook/;
const results = { screenshots: [], overflow: {}, console: [], dataLayer: null, form: null };

const browser = await chromium.launch();

// 1) Capturas + overflow em cada largura
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.route(BLOCK, (route) => route.abort());
  await page.goto(BASE, { waitUntil: "networkidle" });
  // Rola até o fim para disparar os reveals e deixar tudo visível
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  // Captura de página inteira: o Chrome não pinta content-visibility:auto fora da viewport original,
  // e os reveals ainda não vistos ficam com opacity 0. Força os dois só para a imagem.
  await page.addStyleTag({ content: ".cv-auto{content-visibility:visible!important}[data-reveal]{opacity:1!important;transform:none!important}" });
  await page.waitForTimeout(300);
  const overflow = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const wide = [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > docWidth + 1 && getComputedStyle(el).position !== "fixed")
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(" ")[0]}`);
    return { scrollWidth: document.documentElement.scrollWidth, clientWidth: docWidth, wide };
  });
  results.overflow[width] = overflow;
  const file = join(OUT, `lp-${width}.png`);
  await page.screenshot({ path: file, fullPage: true });
  results.screenshots.push(file);
  await page.close();
}

// 2) dataLayer: UTMs, cliques, scroll, section_view, FAQ, formulário
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.route(BLOCK, (route) => route.abort());
page.on("console", (msg) => {
  if (["error", "warning"].includes(msg.type())) results.console.push(`${msg.type()}: ${msg.text()}`);
});
page.on("pageerror", (err) => results.console.push(`pageerror: ${err.message}`));
await page.goto(`${BASE}/?utm_source=google&utm_medium=cpc&utm_campaign=qa-teste&utm_content=qa-seed`, {
  waitUntil: "networkidle",
});
await page.click("[data-cta='cta_whatsapp_hero']");
await page.click("[data-cta-id='cta_ver_modelo_hero']");
// A âncora dispara a rolagem suave do Lenis: espera terminar e volta ao topo antes de rolar na mão
await page.waitForTimeout(1800);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
// Rola tela a tela (as seções com content-visibility expandem ao entrar; passos menores com pausas curtas pulam seções)
await page.evaluate(async () => {
  const step = window.innerHeight;
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
});
await page.waitForTimeout(500);
// FAQ: abre a segunda pergunta
await page.locator("#perguntas-frequentes button[aria-expanded]").nth(1).click();
// Formulário
await page.fill("input[name='nome']", "Teste Qualidade");
await page.fill("input[name='whatsapp']", "62999990000");
await page.fill("input[name='cidade']", "Goiânia");
await page.selectOption("select[name='capital']", "150k_500k");
await page.selectOption("select[name='perfil']", "empresa");
await page.check("input[name='terreno'][value='sim']", { force: true });
await page.click("form#form_diagnostico button[type='submit']");
await page.waitForTimeout(700);
const dataLayer = await page.evaluate(() => window.dataLayer ?? []);
results.dataLayer = dataLayer;
const events = dataLayer.filter((e) => typeof e.event === "string" && !e.event.startsWith("gtm."));
const names = events.map((e) => e.event);
const missingUtm = events.filter((e) => e.utm_source !== "google" || e.utm_campaign !== "qa-teste").map((e) => e.event);
const formEvent = events.find((e) => e.event === "form_complete");
const leaked = JSON.stringify(dataLayer).match(/Teste Qualidade|62999990000|Goiânia/);
const sectionIds = [...new Set(events.filter((e) => e.event === "section_view").map((e) => e.section_id))];
results.form = {
  formEvent,
  leaked: Boolean(leaked),
  success: await page.locator("[role='status']").count(),
};
results.summary = {
  names,
  scrollMarks: ["scroll_25", "scroll_50", "scroll_75", "scroll_100"].filter((n) => names.includes(n)),
  sectionIds,
  missingUtm,
  whatsappCtas: events.filter((e) => e.event === "click_whatsapp").map((e) => e.cta_id),
  faq: events.filter((e) => e.event === "faq_open").map((e) => e.faq_question),
};
await page.close();

// 3) Reduced motion + 404 + política
const rm = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
await rm.route(BLOCK, (route) => route.abort());
await rm.goto(BASE, { waitUntil: "networkidle" });
results.reducedMotion = { lenis: await rm.evaluate(() => document.documentElement.classList.contains("lenis")) };
const r404 = await rm.goto(`${BASE}/pagina-que-nao-existe`);
results.notFound = { status: r404?.status(), hasCta: await rm.locator("[data-cta='cta_whatsapp_404']").count() };
const pol = await rm.goto(`${BASE}/politica-de-privacidade`);
results.politica = { status: pol?.status(), h1: await rm.locator("h1").textContent() };
await rm.close();

await browser.close();
writeFileSync(join(OUT, "qa.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify({ overflow: results.overflow, summary: results.summary, form: results.form, console: results.console, reducedMotion: results.reducedMotion, notFound: results.notFound, politica: results.politica }, null, 2));
