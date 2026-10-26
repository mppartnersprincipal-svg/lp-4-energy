# MEMORY — LP 4E Energy

Memória do projeto entre sessões. Contexto fixo fica em `lp-4e-energy/CLAUDE.md`; plano e copy em `PLANO.md`; design em `DESIGN-SYSTEM.md`. Aqui ficam status, decisões e pendências.

**Regra:** ao final de cada sessão com alterações, adicionar 1 linha no Histórico e atualizar Pendências/Decisões.

---

## Status atual (2026-10-26)

**No ar em https://4eenergy.com.br** (Vercel `lp-4e-energy`, deploy automático da `main`; `www` → 308 para o domínio principal; DNS na GoDaddy com A `@` → 216.198.79.1 / 64.29.17.1 e CNAME `www` → Vercel; MX/SPF intactos). Substituiu o site antigo do construtor da GoDaddy. Repositório público https://github.com/mppartnersprincipal-svg/lp-4-energy (raiz = esta pasta; app em `lp-4e-energy/`, Root Directory na Vercel). Briefing, manual e logo originais ficam fora do git (`.gitignore` da raiz).

| Frente | Status |
|---|---|
| Plano (PLANO.md) + DESIGN-SYSTEM.md | ✅ aprovados pelo Pedro ("ok") |
| LP (11 seções, formulário de diagnóstico, política, 404, OG image, sitemap, robots, llms.txt) | ✅ build e lint verdes |
| Tracking fase 1 (dataLayer, UTMs, eventos, data-cta) | ✅ testado com Playwright (`scripts/qa.mjs`) |
| Painel /dashboard (coletor, 5 rotas, UI com a marca, migration `energy4e_*`) | ✅ no ar; migrations 0001 e 0002 aplicadas pelo Pedro no projeto compartilhado (26/10); dados de teste zerados. Seções Google Ads e GA4 do painel ainda não conferidas |
| GTM `GTM-WH5SJJB7` · GA4 `G-39VQ4LFZJS` · Ads `AW-18524866634` / `KIIsCOPkvqodEMqQrIFF` | ✅ contêiner importado e publicado (versão 2); teste no ar: `page_view`, `section_view`, `click_whatsapp` no GA4 e conversão do Ads no clique. Sem Meta Pixel |
| Repo GitHub | ✅ `lp-4-energy`, branch `main` (22/10/2026) |
| Vercel + domínio | ✅ 4eenergy.com.br (26/10/2026) |
| Lighthouse mobile (build de produção, simulado), visual v2 | ⚠️ Performance 84 a 87 · SEO 100 · A11y 100 · Boas práticas 100 · LCP 3,9 a 4,1 s · CLS 0 · TBT 70 a 130 ms · desktop 100 (LCP 0,8 s). O LCP ficou no limite do gate (4 s): preço das fotos e das seções presas ao scroll, como na Visão Solar (66 a 78). Medir de novo em produção (PageSpeed) depois do deploy |

---

## Pendências

### Com o cliente (detalhe em `lp-4e-energy/docs/PENDENCIAS.md`)
- [x] WhatsApp comercial (62) 9 9607-1233 e domínio 4eenergy.com.br (26/10/2026)
- [x] Endereço: Rua 5, nº 77, Jardim Decolores, Trindade/GO, CEP 75385-218 (26/10/2026)
- [ ] CNPJ ativo: o enviado (62.877.984/0001-40) está BAIXADO na Receita desde 06/05/2026; fora da LP até confirmação
- [ ] E-mail institucional
- [ ] Logo em vetor, fotos reais (usinas, BESS, equipe, Marcos), autorização dos logos de parceiros
- [ ] Confirmar números de prova ("+30 usinas", "centenas de projetos") antes dos anúncios
- [x] Valores de renda: cliente enviou as faixas investimento x retorno com aviso (26/10/2026), publicadas na seção `investimento`
- [ ] Validar FAQ (capital mínimo, prazo, substituição de consumidor, saída) e faixas de capital do formulário
- [ ] Revisão técnico-comercial do Marcos nas seções `rentabilidade`, `seguranca` e FAQ

### Internas (M|P)
- [x] Repo `mppartnersprincipal-svg/lp-4-energy` criado e enviado (22/10/2026)
- [x] Projeto Vercel + domínio 4eenergy.com.br (26/10/2026)
- [x] `gtm/GTM-WH5SJJB7-importar.json` gerado, importado e publicado (26/10/2026)
- [x] Migrations 0001 e 0002 aplicadas pelo Pedro (o MCP do Supabase desta máquina não tem acesso ao projeto `khipnjfbxjgvmjvyxero`: passar SQL ao Pedro)
- [ ] Conferir no painel as seções Google Ads (conta da 4E) e GA4 (conta de serviço como Leitor)
- [x] GA4: eventos-chave `click_whatsapp` e `form_complete` e dimensões `cta_id`, `section_id`, `capital_range` criados pelo Pedro (26/10/2026)
- [ ] GA4: filtro de tráfego interno (IP da equipe)
- [ ] Cancelar o plano do construtor de sites da GoDaddy (site antigo fora do ar)
- [ ] Campanha de Pesquisa (seção 8 do PLANO.md): termos de investimento + negativas; Meta só remarketing no início
- [ ] Pedir ao cliente: SLA de resposta ≤ 15 min, mensagem automática do WhatsApp Business, CRM

---

## Decisões

| Data | Decisão | Motivo |
|------|---------|--------|
| 2026-10-21 | LP fala só com o investidor; assinatura, gestão e BESS numa seção compacta no fim com `cta_id` próprios | Tráfego de 2025 falhou por público errado (autoconsumo) |
| 2026-10-21 | Seção "Para quem é / não é" logo após o hero | Afastar quem quer kit residencial antes do clique |
| 2026-10-21 | "Até 3,6% ao mês" fora da v1; seção de renda com "rentabilidade projetada caso a caso" + aviso legal | Manual proíbe promessa sem base; aguarda aprovação do Marcos |
| 2026-10-21 | Formulário "Diagnóstico de investidor" em 1 passo (nome, WhatsApp, cidade, faixa de capital, perfil, terreno) → abre WhatsApp | Qualificar o lead; dado pessoal nunca entra no dataLayer |
| 2026-10-21 | Modelo de código: repo da Pádua Corretora (Next 16 + tracking + painel portados) | Padrão mais recente da M|P |
| 2026-10-21 | Conceito visual "Telemetria" (navy + marcas de escala em ciano); v1 sem fotos foi rejeitada pelo Pedro → v2 com fotos ilustrativas do Unsplash, legendadas como ilustrativas, até chegarem as reais | Pedro quer o nível da Visão Solar e da Pacheco (fotos, ícones únicos, animação de scroll) |
| 2026-10-21 | Logo: recorte circular do JPEG em PNG/WebP; header usa símbolo + nome em texto | Não há vetor; manual exige 160px para a arte completa |
| 2026-10-21 | Fontes locais: Montserrat 700 estática (títulos, preload) + Inter variável (corpo, sem preload) | Prompt padrão exige `next/font/local`; menos bytes no caminho do LCP |
| 2026-10-26 | Seção própria "Investimento x retorno" (`#investimento`, navy) logo após "De onde vem a renda", com as 3 faixas do cliente, aviso colado nos valores e CTA `cta_whatsapp_investimento` | Pedido do cliente para destacar o tema; seção própria dá URL final para anúncio e linha no funil do painel |
| 2026-10-26 | Rodada SEO/GEO para o Search Console: menu "Rentabilidade" → `#investimento`; `llms.txt` virou rota gerada da copy (links Markdown); `lastmod` no sitemap; meta de verificação opcional (`GOOGLE_SITE_VERIFICATION`); FAQ "Quanto rende..."; favicon 512 px/176 KB → 192 px/12 KB. Lighthouse mobile local: Perf 81 a 88, LCP 3,5 a 3,7 s, A11y/BP/SEO/Agentic 100; desktop 99 ; GTM `afterInteractive` → `lazyOnload` (em produção gtm.js + gtag ~340 KB rodavam antes da primeira pintura: LCP mobile 6,2 a 8,0 s, Perf 51 a 66) | Pedro pediu LP 100% otimizada para SEO e GEO e qualidade "ótima/excelente" |
| 2026-10-26 | Endereço publicado (rodapé, schema, llms.txt); CNPJ 62.877.984/0001-40 NÃO publicado | Receita (BrasilAPI e ReceitaWS): BAIXADO em 06/05/2026 por liquidação voluntária, aberto em 24/09/2025; Pedro decidiu segurar até o cliente confirmar o CNPJ ativo |
| 2026-10-22 | LP aprovada pelo Pedro ("ÓTIMO! Ficou muito bom!"). Primeiro commit enviado para `lp-4-energy`; LP salva como referência na skill `landing-page-references` (`sites/lp-4e-energy`, `patterns.md` consolidado) |
| 2026-10-22 | SEO/GEO implementado com as skills `claude-seo` (title/description nos limites, H2 em pergunta, bloco de definição citável, links para Lei 14.300 e ANEEL, datas de revisão, schemas WebPage/Person, robots com OAI-SearchBot/Claude-SearchBot/Applebot) | Pedro perguntou se a LP estava otimizada para SEO e GEO; a base estava, faltavam citabilidade, datas, fontes e crawlers de citação |
| 2026-10-22 | CTAs com efeito "liquid glass" (pedido do Pedro, a partir de um componente shadcn): integrado no `Button` próprio com CSS + filtro SVG, sem instalar shadcn/Radix/cva | Projeto não usa shadcn; o efeito é só `backdrop-filter` + sombras internas |
| 2026-10-22 | Hero: foto `loading="eager"` sem `priority`; no celular o anel nasce da borda inferior (`--cy: 100% + 8vw`) e a foto sobe 22vh até o anel abrir | Deixar o título como LCP; testado `font-display: optional` (sem ganho no LCP simulado, revertido para `swap`) |
| 2026-10-21 | `Reveal` em CSS + `RevealObserver` (um IntersectionObserver), Lenis no ocioso | Molas por elemento pesavam na hidratação: Lighthouse 78 → 90, LCP 4,1 → 3,2 s |
| 2026-10-21 | Prefixo Supabase `energy4e`, chaves do navegador `fe-*`, repo/Vercel `lp-4e-energy` | Prefixo precisa começar com letra |
| 2026-10-21 | Paleta padrão do Tailwind desligada (`--color-*: initial`) | Só as cores do manual; CSS menor |

---

## Histórico

| Data | O que foi feito |
|------|-----------------|
| 2026-10-21 | Leitura do briefing e do manual; PLANO.md e DESIGN-SYSTEM.md (checkpoint da Fase 0) aprovados |
| 2026-10-21 | LP construída em `lp-4e-energy/` a partir da Pádua: 11 seções, formulário, tracking, SEO/GEO, painel re-skinado, migration, docs (README, DASHBOARD, CLAUDE, PENDENCIAS). Build/lint verdes; 98 testes (13 Vitest + 85 node) verdes |
| 2026-10-21 | QA Playwright (360/390/768/1024/1440): sem overflow, UTMs em todo evento, 4 marcas de scroll, 11 `section_view` com rolagem contínua, `form_submit` sem dado pessoal, console limpo, 404 e política OK |
| 2026-10-21 | Performance: Reveal em CSS + 1 IO, Lenis no ocioso, Montserrat 700 estática, Inter sem preload. Lighthouse mobile 78 → 94/95, LCP 4,1 → 2,9 s, TBT 280 → 50 ms; desktop 100 |
| 2026-10-21 | **Visual v2** (Pedro achou a v1 simples demais): hero preso ao scroll com o anel da marca se abrindo sobre a foto da usina (clip-path) e HUD de telemetria, marquee cruzado, números grandes com contador, cards com borda que segue o cursor, "como funciona" em scrollytelling com foto por etapa, fluxo da energia com traços animados + gráfico que cresce com a rolagem, selo giratório, parallax na foto do sobre, galeria bento com revelação por clip-path, fotos de fundo no diagnóstico e no CTA final, 24 ícones próprios (lucide removido). 9 fotos ilustrativas do Unsplash em `public/images` (WebP 480/960/1600 + blur). Lighthouse mobile: ver status |
| 2026-10-26 | Título de "Como funciona" cortado em notebook corrigido; copy de retorno "até 3,6% ao mês" (texto do cliente); seção Investimento x retorno; LP publicada em 4eenergy.com.br (DNS GoDaddy → Vercel); WhatsApp real; `form_submit` → `form_complete`; GTM/GA4/Ads publicados e testados; migrations do painel aplicadas e dados de teste zerados |
