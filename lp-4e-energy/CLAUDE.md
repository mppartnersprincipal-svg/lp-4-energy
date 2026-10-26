# LP — 4E Energy

Landing page de conversão para investidores em usinas fotovoltaicas geridas (Goiás). Objetivo: levar o investidor a uma conversa qualificada no WhatsApp e servir de destino para Google Ads e Meta Ads.

> Plano aprovado, decisões e copy: `../PLANO.md`. Design system: `../DESIGN-SYSTEM.md`. Histórico e pendências: `../MEMORY.md` e `docs/PENDENCIAS.md`.

---

## Cliente

| Campo | Valor |
|-------|-------|
| Cliente | 4E Energy (diretor: Marcos Lamounier; comercial: Marcos, Renan e Moacir) |
| Segmento | Energia: construção de usinas fotovoltaicas para investidores + gestão da carteira de consumidores (energia por assinatura), gestão de usinas, BESS e híbridos |
| Objetivo da LP | Conversa qualificada no WhatsApp (vendas diretas + autoridade) |
| CTA principal | "Falar com um especialista" (WhatsApp) + formulário "Diagnóstico de investidor" |
| WhatsApp | (62) 9 9607-1233 → `5562996071233` em `src/lib/site.ts` (`NEXT_PUBLIC_WHATSAPP_NUMBER` sobrescreve) |
| URL de produção | `https://4eenergy.com.br` (domínio do cliente na GoDaddy; `www` redireciona 308 para o domínio principal na Vercel). Padrão de `NEXT_PUBLIC_SITE_URL` em `src/lib/site.ts` |
| Ticket / ciclo (interno, não publicar) | R$ 45 mil · 20 dias · 3 etapas · 3 em 10 leads fecham |

Insumos em `../`: `4 Energy - Kick-Off.docx.pdf` (briefing, contém senhas: fora do git), `LOGO 4E.jpeg - MANUAL.pdf` (manual da marca) e o logo em JPEG.

---

## Stack

| Tecnologia | Versão | Função |
|---|---|---|
| Next.js | 16.4 (App Router, Turbopack, `cacheComponents`) | Framework |
| React | 19.3 | UI |
| TypeScript | 5 | Tipagem |
| Tailwind CSS | 4 (tokens em `src/app/globals.css`, paleta padrão desligada) | Estilização |
| @react-spring/web | 10 | Contadores, linha do tempo, painel do hero, menu mobile |
| Lenis | 1.3 | Smooth scroll (iniciado no ocioso; desligado com reduced-motion) |
| Ícones próprios | `ui/icons.tsx` | 24 ícones no estilo telemetria (traço 1.6 + marca de escala); lucide removido |
| Vitest + node --test + Playwright | – | Testes da LP, do painel e QA (`scripts/qa.mjs`) |

> Next 16: ler `node_modules/next/dist/docs/` antes de usar APIs novas. Com `cacheComponents`, `new Date()` em Server Component precisa de `"use cache"` (ver `Footer`). Não sobrescrever o `next.config.ts` sem ler: ele tem o loader do Tailwind, os headers e o rewrite do `/dashboard`.

---

## Estrutura

```
src/
├── app/            layout, page (11 seções), politica-de-privacidade, not-found, sitemap, robots,
│                   opengraph-image, icon.png, apple-icon.png, api/{collect,login,dashboard,ga4,google-ads}
├── components/
│   ├── layout/     Header (nav por âncora + WhatsApp), MobileMenu, Footer, Logo/RingMark, WhatsAppFloat, MobileCtaBar
│   ├── sections/   Hero (anel + clip-path), Marquee, Stats, AudienceFit, HowItWorks (scrollytelling), RevenueModel, InvestmentReturn (faixas investimento x renda),
│   │               ManagementGrid (GlowCard), SecurityBlocks (Seal), About (parallax), Gallery (bento), DiagnosticSection
│   │               (+DiagnosticForm), OtherSolutions, FaqSection, FinalCta
│   ├── motion/     Reveal (CSS) + RevealObserver (1 IntersectionObserver), Counter, SmoothScroll
│   ├── tracking/   TrackingProvider (GTM), TrackingEvents, UTMCapture, Collector
│   ├── seo/        JsonLd (Organization+LocalBusiness, Service, FAQPage)
│   └── ui/         Button (liquid glass), WhatsAppButton, GlassFilter, Eyebrow, SectionHeading/Highlight, Accordion, GlowCard, Seal, icons
├── lib/
│   ├── site.ts     ÚNICO lugar com contatos/dados legais (placeholders marcados) + NAV_ITEMS + anchorHref()
│   ├── content/home.ts   TODA a copy (hero, públicos, etapas, renda, gestão, segurança, sobre, diagnóstico, soluções, FAQ)
│   ├── lead.ts     campos, validação e mensagem do WhatsApp do diagnóstico (+ lead.test.ts)
│   ├── images.ts (+images.json)  fotos ilustrativas com blur; useScrollProgress.ts (rAF compartilhado, modos pin/pass), usePrefersReducedMotion.ts
│   ├── tracking.ts, whatsapp.ts, collector.ts, metadata.ts, useMediaQuery.ts, useScrolledPast.ts
│   └── fonts/ (../fonts) montserrat 700 + inter variável, locais via next/font/local
└── server/analytics/   lógica do painel (db, auth, payload, classify, period, report, ga4, google-ads) + tests/
public/brand (logo recortado do JPEG) · public/dashboard (UI do painel) · public/llms.txt
```

**Seções (`id`, na ordem):** `topo`, `numeros`, `para-quem`, `modelo`, `rentabilidade`, `investimento`, `gestao`, `seguranca`, `sobre`, `usinas`, `diagnostico`, `outras-solucoes`, `perguntas-frequentes`, `cta-final`. Toda `<section>` nova precisa de `id` (funil do painel + `section_view`) e da classe `cv-auto` se ficar abaixo da dobra.

---

## Design (manual da marca)

| Elemento | Valor |
|----------|-------|
| Conceito | "Telemetria": navy profundo, linhas e marcas de escala em ciano, anel da marca como janela para a usina (hero preso ao scroll), HUD de telemetria, grão fotográfico |
| Navy | `#06183E` · profundo `#040F2A` · suave `#0D2457` (cards) · linha `#1A3468` |
| Ciano | `#28C7F2` · hover `#5AD5F5` · para TEXTO sobre fundo claro `cyan-dark #0E7FA3` |
| Claros | branco · gelo `#EEF4FB` · gelo escuro `#DCE6F3` · texto `ink #0B1A3A` / `ink-soft #4F6283` · sobre navy `mist #A9B8D3` |
| Fontes | Montserrat 700 (display, `.text-display`) · Inter (corpo), locais |
| Botões | pílula "liquid glass" (`Button` variantes `liquid` ciano, `liquid-clear`, `liquid-light`; CSS `.btn-liquid` + `GlassFilter` no layout); WhatsApp verde `#25D366` no flutuante e na barra mobile; submit do formulário = ciano sólido com o aro |

Destaque em títulos: `<Highlight>` (ciano no navy; sublinhado ciano no claro). Utilitários: `.container-site`, `.section-y`, `.cv-auto`, `.tick-grid`, `.navy-glow`, `.telemetry-line`, `.enter` (hero, só transform).

---

## Conversão e trackeamento

- Todo CTA de WhatsApp tem `data-cta="<id único>"` → `click_whatsapp` + `cta_id`. Outros CTAs: `data-track="click_cta" data-cta-id="..."`. Lista completa no `README.md`.
- `WhatsAppButton` renderiza o `href` sem UTMs e, no clique, troca pela URL com a origem (`buildWhatsAppUrlWithOrigin`).
- `DiagnosticForm` (`lib/lead.ts`): nome, WhatsApp, cidade, faixa de capital, perfil (PF/empresa), terreno (opcional). Dispara `form_complete` com `form_id`, `capital_range`, `investor_type` e abre `wa.me` com a mensagem pronta + origem. **Nunca** colocar nome, telefone ou cidade no dataLayer (teste em `tracking.test.ts` e no `scripts/qa.mjs`).
- Automáticos: `scroll_25/50/75/100`, `section_view` (toda `main section[id]`), `faq_open`.
- GTM só carrega com `NEXT_PUBLIC_GTM_ID` válido. GA4, Google Ads e Meta Pixel ficam DENTRO do GTM (contêiner a gerar em `gtm/`). Conversão do Ads em `click_whatsapp` e `form_complete`.
- Painel `/dashboard` (`DASHBOARD.md`): coletor anônimo `lib/collector.ts`, rotas `app/api/*`, banco Supabase `energy4e_*`.

---

## SEO e GEO (auditado com as skills `claude-seo:seo-page` e `claude-seo:seo-geo` em 22/10/2026)

- Title ≤ 60 e description ≤ 160 (`layout.tsx` e `page.tsx`); um H1; H2 em forma de pergunta nas seções principais; frases secundárias fora dos H2 (em `<p>`); rodapé sem H2.
- Bloco de definição citável ("O que é uma usina fotovoltaica gerida para investidores?") logo depois do marquee, em `STATS.definition`: autocontido, ~130 palavras, no primeiro terço da página. Manter atualizado com os números do cliente.
- Fontes oficiais com link (`SOURCES` em `lib/content/home.ts`): Lei nº 14.300/2022 (planalto) e ANEEL, usadas na seção de segurança, no FAQ, no `llms.txt` e no schema `WebPage.citation`.
- Datas: `CONTENT_PUBLISHED_AT` e `CONTENT_UPDATED_AT` em `lib/content/home.ts` aparecem no rodapé (`<time>`) e no schema `WebPage`. **Atualizar `CONTENT_UPDATED_AT` sempre que a copy mudar** (recência pesa na citação por IA).
- Schemas (JSON-LD): Organization+LocalBusiness (com `founder`), WebPage (datas, `citation`, `speakable`, `reviewedBy`), Service (com `hasOfferCatalog`), Person (Marcos Lamounier), FAQPage. `telephone`/`contactPoint`/`address` só entram quando os dados reais chegarem (`lib/site.ts`).
- `robots.ts` libera os crawlers que decidem citação (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Applebot, Bingbot) e os de treino (GPTBot, ClaudeBot, Google-Extended); bloqueia `/dashboard` e `/api/`. `llms.txt` existe por completude (o Google ignora).
- Tudo é SSR (Next App Router): o conteúdo chega no HTML sem JavaScript.

## Regras do projeto

- Não inventar números, depoimentos, selos ou logos de parceiros. O que falta está em `docs/PENDENCIAS.md`.
- Nunca escrever "venda de energia". Rentabilidade só como estimativa ("potencial", "até", condições) com aviso legal (`LEGAL_NOTICE` no rodapé). Valores de renda só os enviados pelo cliente (`INVESTMENT` em `home.ts`, 26/10/2026), sempre com o aviso "*Valores estimados, não garantidos..." colado neles.
- Sem travessão na copy. Tom formal e consultivo (manual).
- Hero: elementos candidatos a LCP não podem começar com `opacity: 0` (usar `.enter`, só transform). `Reveal` é CSS + `RevealObserver`; não voltar a usar molas por elemento (TBT).
- `content-visibility: auto` (`.cv-auto`) nas seções abaixo da dobra: capturas de página inteira precisam forçar `content-visibility: visible` (o `scripts/qa.mjs` já faz).
- Seções presas ao scroll (`Hero`, `HowItWorks`) usam `useScrollProgress` (modo `pin`) e CSS vars (`--e`, `--p`); com `prefers-reduced-motion` viram estáticas. Não usar `opacity: 0` em elementos candidatos a LCP.
- Fotos são ilustrativas (Unsplash) até chegarem as reais: nunca legendar como obra ou usina da 4E. Trocar mantendo os nomes em `public/images` e regenerar o manifesto (`src/lib/images.json`).
- `Button` define `inline-flex`: para esconder por breakpoint, envolva num wrapper (`hidden sm:block`).

---

## Comandos

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
npm test        # Vitest (lead, tracking) + node --test (painel)
node scripts/qa.mjs http://localhost:3000 <pasta>   # capturas 360/390/768/1024/1440, overflow, dataLayer, formulário, 404
npx lighthouse http://localhost:3000/ --preset=perf --form-factor=mobile --screenEmulation.mobile --output=json
```

---

## Pendências

Ver `docs/PENDENCIAS.md` (cliente) e `../MEMORY.md` (internas). Resumo: WhatsApp, domínio, CNPJ/endereço, logo vetorial, fotos reais, logos de parceiros, aprovação do Marcos, IDs de GTM/GA4/Ads/Pixel, variáveis da Vercel, migration do Supabase, repo e projeto Vercel.

## Histórico

- 2026-10-26 — Seção `investimento` (Investimento x retorno: R$ 50/100/200 mil → até R$ 1.600/3.600/7.200 por mês, com aviso) logo após `rentabilidade`, a pedido do cliente; FAQ de terreno e de investimento atualizadas.

- 2026-10-21 — Plano + design system aprovados (checkpoint da Fase 0). LP criada a partir do modelo da Pádua: 11 seções, formulário de diagnóstico, tracking fase 1, SEO/GEO, painel portado, 98 testes verdes, QA Playwright e Lighthouse mobile (ver `../MEMORY.md`).
