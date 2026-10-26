# Dashboard first-party da LP 4E Energy

Painel de comportamento dos visitantes em **/dashboard**, no modelo da Pádua Corretora (que veio da Nova Ferragista,
Construbloc, Gaspar Lopes e Sólida): coleta **própria, anônima e sempre ativa**, gravada no Supabase, **sem tocar** no
GTM/GA4/Pixel (que seguem o `README.md`). Inclui as seções **Google Ads** e **GA4**, lidas das APIs oficiais (só leitura).

## Como funciona

| Peça | Arquivo | O quê |
|---|---|---|
| Coletor | `src/lib/collector.ts` + `components/tracking/Collector.tsx` | Sessão anônima em `sessionStorage` (`fe-s`, renova após 30 min parada), id de visitante em `localStorage` por 13 meses (`fe-v`, apagado se `fe-consent = essential`), fila com envio a cada 10 eventos / 5 s / aba oculta / `pagehide` (`sendBeacon`). Sem IP, sem cookies. Não roda para bots nem no /dashboard. Cada rota abre um `page_view` com o próprio `page_type` (`home`, `politica`). |
| Eventos | `collector.ts` + `track()` em `src/lib/tracking.ts` | Próprios: `page_view`, `page_leave`, `click`, `section_view`. Espelhados do `dataLayer` (`toCollector`): `click_whatsapp` **e `form_complete`** → `whatsapp_click` (o formulário abre o WhatsApp), `click_cta`/`click_email`/`click_instagram` → `cta_click`, `click_phone` → `phone_click`, `faq_open`, `form_step`. Do formulário só entram `capital_range` e `investor_type`. |
| Ingestão | `src/app/api/collect/route.ts` + `src/server/analytics/payload.js` | Valida o lote, descarta bots, deriva dispositivo/navegador/SO do user-agent e cidade/UF dos cabeçalhos da Vercel. |
| Banco | `supabase/migrations/0001_energy4e_analytics.sql` | `energy4e_sessions` / `energy4e_events` + RPC `energy4e_upsert_session`. RLS ligado sem policies (só a service role acessa). Projeto compartilhado `khipnjfbxjgvmjvyxero`. |
| Atribuição | `src/server/analytics/classify.js` | `gclid` → Google Ads; `utm_source=facebook/instagram` + `utm_medium` pago → **Meta Ads**; referrer → orgânico, direto, indicação. |
| Login | `src/app/api/login/route.ts` + `auth.js` | Senha única (`DASHBOARD_PASSWORD`) → token HMAC de 30 dias (`DASHBOARD_SECRET`). |
| Consulta | `src/app/api/dashboard/route.ts` + `report.js` | KPIs com comparação de período, série diária, origens, dispositivos, WhatsApp por botão/formulário + pivô por canal, funil das 11 seções, FAQ, campanhas UTM, jornadas, heatmap 7×24, geografia, cliques, feed ao vivo. |
| Google Ads | `src/app/api/google-ads/route.ts` + `google-ads.js` | Consulta separada (se falhar, o resto do painel não espera). Conta da 4E via MCC `603-989-2603`. |
| GA4 | `src/app/api/ga4/route.ts` + `ga4.js` | GA4 Data API (conta de serviço, só leitura). Conta `click_whatsapp`, `form_complete`, `click_cta`, `click_phone`, `click_email`, `click_instagram`, `faq_open`. |
| UI | `public/dashboard/index.html` + `app.js` | HTML estático (rewrite `/dashboard` → `/dashboard/index.html` no `next.config.ts`), Chart.js via CDN, filtros na URL, identidade da 4E (navy/ciano, Montserrat/Inter). `noindex` + `robots.ts`. |

### Funil (seções da LP, na ordem)

`topo`, `numeros`, `para-quem`, `modelo`, `rentabilidade`, `gestao`, `seguranca`, `sobre`, `usinas`, `diagnostico`,
`outras-solucoes`, `perguntas-frequentes`, `cta-final`.

Seção ou página nova: atualizar `PAGE_TYPE_BY_PATH` (`collector.ts`), `PAGE_TYPES` (`payload.js`), `SECTIONS`
(`report.js`) e os nomes em `public/dashboard/app.js` (`PAGE`, `SECTION`, `CTA`). Botão novo: `cta_id` único + nome em `CTA`.

## Variáveis de ambiente (Vercel → projeto → Settings → Environment Variables)

Nenhuma chave vai no código nem no front. Depois de cadastrar, faça **Redeploy**.

| Variável | Valor |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` da 4E |
| `NEXT_PUBLIC_SITE_URL` | URL final (host que não redireciona) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp comercial, só dígitos com DDI |
| `SUPABASE_URL` | `https://khipnjfbxjgvmjvyxero.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | mesma dos outros clientes (**secreta**) |
| `DASHBOARD_PASSWORD` | senha da tela de login (mín. 8; use 16+) |
| `DASHBOARD_SECRET` | string aleatória longa (mín. 16) |
| `GA4_PROPERTY_ID` | ID numérico da **propriedade** (não o `G-`) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | JSON da conta de serviço `dashboard-ga4@` (**secreto**). Adicionar o `client_email` como **Leitor** na propriedade GA4 da 4E |
| `GOOGLE_ADS_*` | ver `.env.example`; `GOOGLE_ADS_CUSTOMER_ID` = conta da 4E (10 dígitos), vinculada à MCC |

Sem as duas do Supabase, a coleta descarta em silêncio (a LP nunca quebra por causa de analytics). Sem senha/segredo, o
login responde 503. Sem as do Ads/GA4, cada seção mostra "conexão pendente".

## Desenvolvimento local

```
cp .env.example .env.local   # e preencha
npm run dev                  # http://localhost:3000 (LP + /api + /dashboard)
npm test
```

## QA depois do deploy

- `/dashboard` 200 com `X-Robots-Tag: noindex`; `/api/collect` 204; login com senha errada → "Senha incorreta.".
- Abrir a LP com `?utm_source=google&utm_medium=cpc&utm_content=qa-seed`, clicar no WhatsApp, abrir uma pergunta do
  FAQ, enviar o diagnóstico e conferir em /dashboard (período "Hoje", seção "Ao vivo").
- Limpar a visita de teste (SQL Editor do Supabase): `delete from energy4e_sessions where utm_content = 'qa-seed';`
- **Nunca** rode `drop`/`delete` sem o prefixo `energy4e_` nesse projeto: ele é compartilhado com outros clientes.

## LGPD

Coleta anônima e agregada: sem IP, sem cookies, sem dados pessoais (o formulário nunca entra no coletor nem no
`dataLayer`; há teste para isso). A política de privacidade cita a estatística própria, o GA4, o Google Ads e o Meta
Pixel. A LP não tem banner de cookies; se entrar, basta gravar `localStorage['fe-consent'] = 'accepted' | 'essential'`.
