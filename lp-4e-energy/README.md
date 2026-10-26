# LP — 4E Energy

Landing page de conversão da 4E Energy (usinas fotovoltaicas para investidores em Goiás).
Next.js 16 (App Router) + Tailwind 4, deploy na Vercel. Contexto do projeto em `CLAUDE.md`; painel em `DASHBOARD.md`;
pendências de conteúdo em `docs/PENDENCIAS.md`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
npm test        # Vitest (formulário, tracking) + node --test (analytics do painel)
```

## Rastreamento

| Ferramenta | ID | Onde |
|---|---|---|
| Google Tag Manager | `GTM-WH5SJJB7` | `NEXT_PUBLIC_GTM_ID` (Vercel) → `components/tracking/TrackingProvider.tsx` |
| GA4 | `G-39VQ4LFZJS` | dentro do GTM |
| Google Ads | conversão "Clique Botão de Wpp" `AW-18524866634` / `KIIsCOPkvqodEMqQrIFF` | dentro do GTM, disparada em `click_whatsapp` e `form_complete` |
| Meta Pixel | `[PREENCHER]` (ainda não informado) | dentro do GTM (`Contact` em `click_whatsapp`, `Lead` em `form_complete`) |
| Painel próprio | `/dashboard` | ver `DASHBOARD.md` |

**Regra:** GA4, Ads e Pixel só pelo GTM. Nada de `gtag`/`fbq` direto no código (contaria em dobro).

### Contêiner do GTM

Arquivo gerado: `gtm/GTM-WH5SJJB7-importar.json` (26/10/2026, skill `lp-tracking-dashboard`, com os parâmetros
`capital_range` e `investor_type` acrescentados à lista padrão). Para regenerar, rodar o `gtm_container.py` da skill com
`--events click_whatsapp,click_cta,click_phone,click_email,click_instagram,form_step,form_complete,faq_open,scroll_25,scroll_50,scroll_75,scroll_100,section_view`
e as duas `--conv` (mesma conversão em `click_whatsapp` e `form_complete`). O formulário usa `form_complete`, nunca
`form_submit` (nome reservado da medição otimizada do GA4: dispararia junto com qualquer `<form>`).

Importar: GTM → Administrador → Importar contêiner → arquivo → espaço de trabalho existente → **Mesclar** +
**Substituir conflitantes** → Visualizar (clicar num WhatsApp) → **Enviar → Publicar**. No GA4, marcar `click_whatsapp` e
`form_complete` como **eventos-chave** e criar as dimensões personalizadas `cta_id`, `section_id`, `capital_range`.

### Eventos (`src/lib/tracking.ts`)

| Evento | Quando | Parâmetros |
|---|---|---|
| `click_whatsapp` | qualquer link de WhatsApp (`data-cta`) | `cta_id` |
| `form_complete` | enviou o diagnóstico (abre o WhatsApp com a mensagem pronta) | `form_id`, `capital_range`, `investor_type` |
| `click_cta` | âncoras e botões de diagnóstico (`data-track`) | `cta_id` |
| `click_email` / `click_instagram` / `click_phone` | links de contato | – |
| `faq_open` | abriu uma pergunta | `faq_question` |
| `scroll_25/50/75/100` | rolagem (uma vez por página) | `percent_scrolled` |
| `section_view` | seção apareceu (`main section[id]`) | `section_id` |

Todos levam as UTMs da entrada (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`). Nome, telefone e
cidade do formulário **nunca** vão para o `dataLayer` nem para o painel (há teste para isso).

`cta_id` de WhatsApp: `cta_whatsapp_navbar`, `cta_whatsapp_hero`, `cta_whatsapp_modelo`, `cta_whatsapp_rentabilidade`, `cta_whatsapp_investimento`,
`cta_whatsapp_seguranca`, `cta_whatsapp_faq`, `cta_whatsapp_final`, `cta_whatsapp_footer`, `cta_whatsapp_footer_contato`,
`cta_whatsapp_menu`, `cta_whatsapp_barra_mobile`, `fab_whatsapp`, `cta_whatsapp_404`, `cta_whatsapp_assinatura`,
`cta_whatsapp_gestao_usinas`, `cta_whatsapp_bess`. Formulário: `form_diagnostico`.
Outros `cta_id`: `cta_ver_modelo_hero`, `cta_diagnostico_menu`, `cta_diagnostico_barra_mobile`, `cta_diagnostico_final`.

Seções (`id`, na ordem): `topo`, `numeros`, `para-quem`, `modelo`, `rentabilidade`, `investimento`, `gestao`, `seguranca`, `sobre`,
`usinas`, `diagnostico`, `outras-solucoes`, `perguntas-frequentes`, `cta-final`. URLs finais por grupo de anúncio: `/#modelo`, `/#rentabilidade`, `/#investimento`,
`/#gestao`, `/#seguranca`, `/#diagnostico`.

### Fotos

As 9 fotos em `public/images` são ilustrativas (Unsplash) até o cliente enviar as reais. Para trocar, salve os JPEGs
com os mesmos nomes numa pasta e regenere as variantes e o manifesto de blur:

```bash
node -e "const s=require('sharp'),fs=require('fs'),p=require('path');const src=process.argv[1];(async()=>{const m={};for(const f of fs.readdirSync(src).filter(f=>/\.jpe?g$/i.test(f))){const n=f.replace(/\.jpe?g$/i,'');const meta=await s(p.join(src,f)).metadata();for(const w of[480,960,1600])await s(p.join(src,f)).resize({width:w,withoutEnlargement:true}).webp({quality:w===1600?74:72}).toFile(`public/images/${n}-${w}.webp`);const b=await s(p.join(src,f)).resize(16).webp({quality:40}).toBuffer();m[n]={width:meta.width,height:meta.height,blur:`data:image/webp;base64,${b.toString('base64')}`}}fs.writeFileSync('src/lib/images.json',JSON.stringify(m,null,2))})()" ../fotos
```

### Anúncios

Google Ads: autotagging (`gclid`) + UTMs manuais por campanha. Meta Ads, para o painel separar pago de orgânico:

```
utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}
```
