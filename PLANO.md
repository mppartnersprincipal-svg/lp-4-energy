# Plano da LP — 4E Energy

Landing page de conversão para a 4E Energy (usinas fotovoltaicas para investidores em Goiás), no padrão M|P: Next.js 16 + Tailwind 4 + react-spring + Lenis, trackeamento completo via GTM e painel próprio em `/dashboard`. Pronta para receber tráfego de Google Ads e Meta Ads desde o primeiro dia.

Insumos lidos: `4 Energy - Kick-Off.docx.pdf` (briefing), `LOGO 4E.jpeg - MANUAL.pdf` (manual da marca, v1.0 out/2026) e o logo em JPEG. A pasta `Logos/` está vazia.

> Versão 1 (21/10/2026). Aguardando aprovação do Pedro para iniciar a execução (ver seção 12).

---

## 1. Diagnóstico do briefing

| Item | O que o briefing diz | Consequência para a LP |
|---|---|---|
| Negócio | Construção de usinas fotovoltaicas para investidores + gestão técnica e comercial da carteira de consumidores. Também energia por assinatura (até 30% de desconto), gestão de usinas e BESS/híbridos | A LP vende **um** produto: a usina como negócio autônomo para o investidor. Os outros serviços entram só como apoio |
| Cliente ideal | Investidores, Goiás, 30 a 60 anos. Valoriza não precisar se envolver e ter receita recorrente | Linguagem de investimento e de patrimônio, não de "economia na conta de luz" |
| Dor e desejo | Renda recorrente, previsibilidade, segurança operacional, sem equipe própria nem folha de pagamento | Promessa central: renda recorrente sem operar nada |
| Diferencial | Entrega da usina + gestão completa da carteira. Produto "ainda exclusivo", sem concorrente direto conhecido | Posicionar como categoria própria: "usina gerida", não "integrador solar" |
| Ticket e ciclo | R$ 45 mil de ticket médio, 20 dias e pelo menos 3 etapas até fechar, 3 em cada 10 leads fecham | A LP não fecha a venda: ela gera uma conversa qualificada no WhatsApp e sustenta o follow-up |
| Objeções | Medo de perder o investimento, dúvida sobre rentabilidade e prazo de retorno, incerteza regulatória | Três blocos de resposta na LP: ativo real + estudo de viabilidade, projeção conservadora, Lei 14.300/2022 |
| Tráfego anterior | Falhou: público errado (autoconsumo), muita concorrência de preço, leads demais sem conversão, 90 dias sem venda, atendimento sem planejamento | A LP precisa **qualificar** antes de mandar para o WhatsApp e afastar quem quer kit residencial |
| Restrições | ANEEL. Proibido o termo **"venda de energia"**. Tom formal. Não ser associada a integrador residencial. Aprovação técnico-comercial do Marcos Lamounier | Checklist de copy (seção 9) e revisão do Marcos antes de publicar |
| Marca | Manual pronto: azul-marinho `#06183E`, ciano `#28C7F2`, branco; Montserrat/Inter; fotografia real; não prometer retorno sem base técnica | Design system derivado direto do manual (seção 4) |
| Material | Pouco material produzido; logo só em JPEG | Fotos de banco marcadas para troca + logo tratado em PNG/WebP; pedir vetor |
| Objetivo | Vendas diretas + autoridade; padronizar identidade digital; resultado esperado em 60 dias | Métricas: conversas no WhatsApp qualificadas, custo por conversa, taxa de qualificação |
| Orçamento | R$ 300 por semana para começar | Pesquisa no Google com termos de investimento; Meta só remarketing no início (seção 10) |

**Lacunas do briefing** (ficam como `[PREENCHER]` no código, nunca inventadas): WhatsApp comercial, domínio, CNPJ e endereço, e-mail, nomes e fotos da equipe, fotos reais de usinas, autorização para exibir logos dos parceiros (HES HUB, SEBRAE, Xper, Ubantec), depoimentos de investidores.

### Resumo em 10 linhas
1. A 4E Energy (Goiás, desde 2022) constrói usinas fotovoltaicas para investidores e administra a carteira de consumidores dessas usinas.
2. O investidor recebe a usina pronta e a 4E assume monitoramento, gestão dos consumidores, operação e manutenção mensal.
3. A receita do investidor vem da carteira de consumidores, que recebe energia por assinatura com até 30% de desconto na conta.
4. Público: investidores de 30 a 60 anos em Goiás, que querem renda recorrente sem se envolver na operação.
5. Ticket médio de R$ 45 mil, ciclo de 20 dias em pelo menos 3 etapas, 3 em cada 10 leads fecham.
6. Objeções: medo de perder o capital, dúvida sobre rentabilidade e prazo, incerteza regulatória (ANEEL, Lei 14.300/2022).
7. Diferencial: produto sem concorrente direto conhecido (usina + gestão de carteira). Risco: ser confundida com integrador residencial.
8. Tráfego anterior falhou por público errado e atendimento sem planejamento. Orçamento inicial: R$ 300/semana.
9. Marca com manual pronto (navy, ciano, branco; Montserrat/Inter; tom formal). Proibido usar "venda de energia".
10. CTA principal: conversa no WhatsApp. Foco: vendas diretas + autoridade, resultado esperado em 60 dias.

### Inventário de mídias
| Arquivo | Tipo | Dimensões / peso | Uso |
|---|---|---|---|
| `WhatsApp Image 2026-10-20 at 13.47.23.jpeg` | Logo (raster) | 1536×1536, 152 KB, fundo navy, anel de 1206px | Header, favicon/ícone, OG image. Precisa de recorte e conversão (PNG transparente + WebP). Não serve para impressão nem para fundo claro |
| `LOGO 4E.jpeg - MANUAL.pdf` | Manual da marca | 8 páginas, 190 KB | Fonte das cores, fontes, tom de voz e regras de uso |
| `4 Energy - Kick-Off.docx.pdf` | Briefing | 8 páginas, 229 KB | Fonte de toda a copy. Contém senhas: nunca entra no git |
| `Logos/` | pasta | vazia | Pedir logo vetorial e versão para fundo claro |
| Fotos / vídeos | nenhum | – | Pedir fotos reais; v1 com 3 fotos de banco provisórias |

---

## 2. Estratégia de conversão

### Posicionamento
"A 4E Energy transforma seu capital em uma usina solar que gera renda recorrente, e cuida de tudo por você."

Categoria: **usina gerida para investidor**. Nunca "energia solar para sua casa", nunca "integrador".

### Promessa e ângulos
- **Promessa:** renda recorrente com um ativo real, sem você operar nada.
- **Ângulo 1 (praticidade):** você investe, a 4E constrói, capta os consumidores, opera e mantém. Você acompanha à distância.
- **Ângulo 2 (previsibilidade):** estudo de viabilidade e projeção conservadora antes de qualquer decisão.
- **Ângulo 3 (segurança):** ativo físico, marco legal da geração distribuída (Lei 14.300/2022), mais de 30 usinas sob gestão.

### O que a LP NÃO vai fazer
- Prometer retorno garantido. O "até 3,6% ao mês" do briefing só entra com "potencial", "até", condições e aviso legal, e **depois da aprovação do Marcos** (ver seção 12).
- Falar em "venda de energia". Usar "energia por assinatura", "desconto na conta de luz", "carteira de consumidores".
- Atrair quem quer kit residencial: a seção "Para quem é" diz claramente para quem não é.

### Conversão
- **CTA principal:** WhatsApp ("Falar com um especialista"), presente em navbar, hero, meio da página, final, botão flutuante e barra fixa no mobile.
- **CTA de qualificação:** formulário "Diagnóstico de investidor" (nome, WhatsApp, cidade, faixa de capital disponível, pessoa física ou empresa, já possui área/terreno). No envio, dispara `form_submit` e abre o WhatsApp com a mensagem pronta contendo as respostas e as UTMs. Dado pessoal nunca entra no dataLayer nem no painel.
- **Mensagem do WhatsApp pré-preenchida** em todos os botões: "Olá, vim pela página da 4E Energy e quero entender o investimento em usina solar gerida." (com origem/UTM no fim).
- **Pós-clique (fora da LP, mas decisivo):** resposta em até 15 minutos no horário comercial com mensagem automática do WhatsApp Business, roteiro de 3 perguntas de qualificação e registro em CRM (hoje não existe). Sem isso o histórico de "muito lead, zero venda" se repete.

---

## 3. Arquitetura da página e copy (rascunho)

Ordem das seções, com o `id` de cada `<section>` (usado no funil do painel e nas URLs finais dos grupos de anúncio).

| # | `id` | Seção | Conteúdo |
|---|---|---|---|
| 1 | `topo` | **Hero** | Eyebrow: "Usinas fotovoltaicas para investidores · Goiás". H1: **"Sua usina solar gerando renda recorrente. Sem você precisar operar nada."** Sub: "A 4E Energy constrói a usina, capta e administra a carteira de consumidores e cuida da operação e da manutenção. Você acompanha os resultados à distância." CTA WhatsApp + CTA âncora "Ver como funciona". Faixa de prova: desde 2022 · +30 usinas sob gestão · centenas de projetos concluídos. Visual: painel de monitoramento animado (geração, receita acumulando, disponibilidade), no conceito da seção 4 |
| 2 | `para-quem` | **Para quem é (e para quem não é)** | Dois blocos. É para: quem tem capital para alocar e busca renda recorrente, quer um ativo real sem montar equipe, está em Goiás. Não é para: quem quer instalar placas para reduzir a própria conta. Afasta o lead errado antes do clique |
| 3 | `modelo` | **Como funciona** | 4 etapas em linha do tempo: 1) Estudo de viabilidade e projeção conservadora · 2) Construção e conexão da usina · 3) Captação e gestão da carteira de consumidores · 4) Operação, manutenção mensal e relatórios. Cada etapa diz "o que você faz" (quase nada) e "o que a 4E faz" |
| 4 | `rentabilidade` | **De onde vem a renda** | Explica o modelo em linguagem simples: a usina gera créditos de energia, consumidores da carteira recebem esses créditos com desconto de até 30% na conta e pagam uma mensalidade; essa receita é a renda do investidor. Bloco de números com aviso legal. Aqui entra (se aprovado) "potencial de renda recorrente de até 3,6% ao mês*" com o asterisco explicando que é estimativa sujeita às condições do projeto e do mercado |
| 5 | `gestao` | **O que a 4E assume por você** | Grade de 6 itens: monitoramento contínuo, gestão dos consumidores (inadimplência e substituição), acompanhamento operacional, manutenção mensal, relatórios de desempenho, interlocução com a distribuidora. Fecho: "Sem equipe própria. Sem folha de pagamento." |
| 6 | `seguranca` | **Segurança do investimento** | Três objeções respondidas: "E se eu perder o dinheiro?" (ativo físico, estudo de viabilidade, projeção conservadora, mais de 30 usinas em operação) · "Qual o retorno e em quanto tempo?" (apresentação personalizada, cenário conservador, acompanhamento transparente) · "E a regulamentação?" (Lei 14.300/2022, marco legal da geração distribuída, histórico e regras de transição explicados na reunião) |
| 7 | `sobre` | **Quem é a 4E Energy** | Trajetória desde 2022, parcerias (HES HUB, SEBRAE, Xper, Ubantec, com logos só se autorizado), atuação em usinas, sistemas híbridos e BESS, diretor Marcos Lamounier. Foto real da equipe quando houver |
| 8 | `diagnostico` | **Diagnóstico de investidor** | Formulário de qualificação (seção 2) ao lado de um resumo "o que acontece depois": 1) conversa no WhatsApp · 2) estudo de viabilidade · 3) apresentação personalizada. Reforça o ciclo de 3 etapas do briefing |
| 9 | `outras-solucoes` | **Outras soluções** (compacta) | Três cards pequenos: energia por assinatura para empresas e consumidores (até 30% de desconto), gestão de usinas já existentes, BESS e sistemas híbridos. Cada um com seu próprio `cta_id`. Discreta, para não diluir a oferta principal |
| 10 | `perguntas-frequentes` | **FAQ** | 8 perguntas (precisa investir quanto? preciso ter terreno? quem são os consumidores? o que acontece se um consumidor sair? quanto tempo até a usina operar? como acompanho os resultados? a Lei 14.300 muda alguma coisa? e se eu quiser sair do investimento?). Respostas em rascunho para o Marcos validar |
| 11 | `cta-final` | **CTA final** | "Quer saber se uma usina gerida faz sentido para o seu capital? Fale com um especialista." + WhatsApp |
| – | – | **Rodapé** | Logo, CNPJ e endereço `[PREENCHER]`, Instagram @4eenergy, política de privacidade, aviso legal resumido |

Elementos fixos: navbar com logo + CTA; botão flutuante de WhatsApp (desktop); barra de CTA fixa no rodapé do mobile; página `/politica-de-privacidade`; `not-found` com CTA.

### Formulário "Diagnóstico de investidor" (`form_diagnostico`)
| Campo | Tipo | Validação |
|---|---|---|
| Nome | texto | obrigatório, 2+ palavras |
| WhatsApp | telefone com máscara | obrigatório, DDD + 9 dígitos |
| Cidade | texto | obrigatório |
| Capital disponível para investir | seleção: até R$ 50 mil · R$ 50 a 150 mil · R$ 150 a 500 mil · acima de R$ 500 mil | obrigatório (faixas a confirmar) |
| Você investe como | seleção: pessoa física · empresa | obrigatório |
| Já possui área ou terreno? | seleção: sim · não · não sei | opcional |

Envio: valida, dispara `form_submit` (só `form_id`, `capital_range`, `investor_type`), abre `wa.me` com: "Olá, sou {nome}, de {cidade}. Quero entender o investimento em usina solar gerida. Capital: {faixa}. Perfil: {tipo}. Área própria: {resposta}. (origem: {utm_source}/{utm_campaign})". Botões de WhatsApp fora do formulário levam só a mensagem curta e a origem.

### FAQ (rascunho para o Marcos validar)
1. **Quanto preciso investir?** Cada projeto tem um estudo de viabilidade próprio. O ticket médio dos projetos atuais fica em torno de R$ 45 mil `[confirmar se pode ser publicado]`. Na conversa inicial apresentamos as faixas possíveis.
2. **Preciso ter terreno?** Não necessariamente. `[PREENCHER: a 4E indica área ou o investidor precisa ter?]`
3. **Quem são os consumidores da usina?** Empresas e residências que aderem à energia por assinatura e recebem desconto de até 30% na conta de luz. A 4E capta e administra essa carteira.
4. **O que acontece se um consumidor sair?** A gestão da carteira inclui a substituição de consumidores para manter a usina alocada. `[PREENCHER: prazo médio de substituição]`
5. **Em quanto tempo a usina começa a operar?** `[PREENCHER: prazo médio de construção e conexão]`
6. **Como acompanho os resultados?** Monitoramento contínuo e relatórios periódicos de geração e receita. `[PREENCHER: periodicidade e formato]`
7. **A Lei 14.300/2022 muda alguma coisa?** A lei é o marco legal da geração distribuída e define as regras de transição. Explicamos o cenário regulatório e o histórico na apresentação, para que a decisão seja tomada com informação.
8. **Posso sair do investimento?** `[PREENCHER: a usina é um ativo do investidor; há possibilidade de venda? condições?]`

---

## 4. Design system (a partir do manual da marca)

Detalhe completo em [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Resumo:

**Conceito: "Telemetria".** O símbolo do logo tem marcas de orientação como um medidor. A LP usa essa linguagem: fundo azul-marinho profundo, linhas finas em ciano, marcas de escala, números que sobem, um painel de monitoramento no hero. Transmite controle, dado e acompanhamento à distância, exatamente o que o investidor valoriza. Diferencia a 4E dos integradores residenciais (que usam sol, amarelo e foto de telhado).

| Elemento | Valor |
|---|---|
| Azul-marinho (base, 60%) | `#06183E` · profundo `#040F2A` · suave `#0D2457` (cards) |
| Ciano (destaque, 15%) | `#28C7F2` · hover `#5AD5F5` · para TEXTO sobre fundo claro usar `#0E7FA3` (contraste AA) |
| Branco e neutros (25%) | `#FFFFFF` · gelo `#EEF4FB` (seções claras) · texto suave sobre navy `#A9B8D3` · texto suave sobre claro `#4F6283` |
| Linha | `rgba(40,199,242,.18)` |
| Fontes | **Montserrat** 700/800 para títulos e números · **Inter** 400/500/600 para corpo e botões, arquivos locais via `next/font/local` (sem request externo) |
| Escala | H1 2,6rem → 4,5rem · H2 2rem → 3rem · corpo 1rem → 1,125rem · labels em caixa alta com tracking +0,12em |
| Formas | Cantos 16px em cards, botões em pílula, círculo como forma-mãe (eco do logo) |
| Sombras | Nenhuma sombra cinza; só brilho ciano suave em CTA e cards de destaque |
| Ritmo | 60% das seções em navy, 25% em branco/gelo (modelo, segurança, FAQ), ciano só em CTA, ícones, linhas e números |
| Ícones | lucide-react, traço fino, ciano ou branco |
| Logo | JPEG tratado para PNG/WebP com fundo navy (uso prioritário do manual) e versão só do círculo para favicon/ícone. Logo vetorial fica pendente com o cliente |
| Fotografia | Usinas de solo, inversores, BESS, equipe em campo. Enquanto não houver material real: 3 fotos de banco em WebP marcadas como provisórias em `docs/PENDENCIAS.md` |

**Movimento** (`@react-spring/web` + Lenis, padrão M|P):
- Entrada: fade + deslize de 24px por IntersectionObserver (`Reveal`), stagger de 80ms. Hero com animação CSS (`.enter`) para não atrasar o LCP.
- Painel do hero: contadores de kWh, receita e disponibilidade subindo; linhas de "telemetria" que acendem.
- Linha do tempo de "Como funciona" preenchida com o scroll.
- Contadores da faixa de prova (`Counter`).
- Hover em botões: scale 1,03 + brilho ciano; pressionado 0,97.
- `prefers-reduced-motion` desliga Lenis e animações.
- Mobile-first: sem `backdrop-filter` em elementos que se movem, 60fps.

---

## 5. Stack e estrutura

Modelo: repositório `mppartnersprincipal-svg/lp-padua-corretora` (padrão mais recente, 20/10/2026), que já traz o tracking e o painel portados para o Next.

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.4 (App Router, Turbopack, `cacheComponents`) |
| UI | React 19.3, TypeScript 5 |
| Estilo | Tailwind CSS 4 (tokens em `globals.css` via `@theme`) |
| Animação | `@react-spring/web` 10 + Lenis 1.3 |
| Ícones | lucide-react (WhatsApp e Instagram em SVG próprio) |
| Testes | Vitest (LP) + `node --test` (painel) + Playwright (E2E do fluxo de conversão e do dataLayer) |
| Banco do painel | Supabase, projeto compartilhado `khipnjfbxjgvmjvyxero`, prefixo `energy4e_` |
| Deploy | Vercel, projeto `lp-4e-energy`, branch `main` |
| Repositório | GitHub `mppartnersprincipal-svg/lp-4e-energy` (público, como os demais; briefing e logo original fora do git) |

```
LP - 4Energy/                      ← raiz (briefing, manual, PLANO.md; fora do git)
├── PLANO.md · CLAUDE.md · MEMORY.md · DESIGN-SYSTEM.md
└── lp-4e-energy/                  ← o app (Root Directory na Vercel)
    ├── src/app/           layout, page, politica-de-privacidade, not-found, sitemap, robots,
    │                      opengraph-image, icon, api/{collect,login,dashboard,ga4,google-ads}
    ├── src/components/
    │   ├── layout/        Header, Footer, Logo, WhatsAppFloat, MobileCtaBar
    │   ├── sections/      Hero, AudienceFit, HowItWorks, RevenueModel, ManagementGrid,
    │   │                  SecurityBlocks, About, DiagnosticForm, OtherSolutions, FaqSection, FinalCta
    │   ├── motion/        Reveal, Counter, TimelineTrack, SmoothScroll
    │   ├── tracking/      TrackingProvider, TrackingEvents, UTMCapture, Collector
    │   ├── seo/           JsonLd
    │   └── ui/            Button, WhatsAppButton, Eyebrow, SectionHeading, Accordion, icons
    ├── src/lib/           site.ts (único lugar com contatos), content/, tracking.ts, whatsapp.ts,
    │                      lead.ts (validação + mensagem), collector.ts, metadata.ts
    ├── src/server/analytics/   lógica do painel (db, auth, payload, classify, report, ga4, google-ads)
    ├── public/            brand/, images/ (WebP), dashboard/ (UI do painel), js/
    ├── supabase/migrations/0001_energy4e_analytics.sql
    ├── gtm/GTM-XXXXXXX-importar.json
    ├── docs/PENDENCIAS.md
    └── README.md · DASHBOARD.md · .env.example
```

---

## 6. Trackeamento (obrigatório) e painel

Regra de ouro: GA4, Google Ads e Meta Pixel **só dentro do GTM**. Nada de `gtag` ou `fbq` no código.

### Eventos no dataLayer
| Evento | Quando | Parâmetros |
|---|---|---|
| `click_whatsapp` | qualquer link de WhatsApp (`data-cta`) | `cta_id` |
| `form_submit` | envio válido do diagnóstico (abre o WhatsApp) | `form_id`, `capital_range`, `investor_type` (faixas, nunca dados pessoais) |
| `form_step` | avanço de etapa, se o formulário ficar em 2 passos | `form_id`, `step` |
| `click_cta` | âncoras e botões secundários (`data-track`) | `cta_id` |
| `click_phone` / `click_email` / `click_instagram` | contatos | – |
| `faq_open` | abriu uma pergunta | `faq_question` |
| `scroll_25/50/75/100` | rolagem, uma vez por página | `percent_scrolled` |
| `section_view` | seção entrou na tela (`main section[id]`) | `section_id` |

Todos levam `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` da entrada (first-touch em `sessionStorage`). `track()` zera os parâmetros a cada push (o GTM herda o último valor).

### `cta_id` de WhatsApp
`cta_whatsapp_navbar`, `cta_whatsapp_hero`, `cta_whatsapp_modelo`, `cta_whatsapp_rentabilidade`, `cta_whatsapp_seguranca`, `cta_whatsapp_final`, `cta_whatsapp_footer`, `cta_whatsapp_faq`, `cta_whatsapp_barra_mobile`, `fab_whatsapp`, `cta_whatsapp_assinatura`, `cta_whatsapp_gestao_usinas`, `cta_whatsapp_bess`, `cta_whatsapp_404`. Formulário: `form_diagnostico`. Âncoras: `cta_ver_modelo_hero`, `cta_diagnostico_navbar`, `cta_diagnostico_final`.

### Conversões
- **Google Ads:** conversão "Conversa no WhatsApp" disparada em `click_whatsapp` **e** `form_submit` (os dois terminam no WhatsApp; um não dispara o outro). Vinculador de conversões em todas as páginas.
- **Meta Pixel:** base + PageView, `Contact` em `click_whatsapp`, `Lead` em `form_submit`.
- **GA4:** `click_whatsapp` e `form_submit` como eventos-chave; dimensões personalizadas `cta_id`, `section_id`, `capital_range`.

### Contêiner do GTM
Gerado com `~/.claude/skills/lp-tracking-dashboard/scripts/gtm_container.py` (GA4 + evento genérico `{{Event}}` + conversões do Ads + Pixel) e versionado em `gtm/`. Pedro importa (Mesclar + Substituir conflitantes), testa em Visualizar e publica.

### Painel `/dashboard`
Mesmo modelo da Pádua: coletor first-party anônimo (sessão em `sessionStorage` `fe-s`, visitante em `localStorage` `fe-v`), ingestão em `/api/collect`, tabelas `energy4e_sessions` / `energy4e_events`, login por senha, seções Google Ads (via MCC `603-989-2603`) e GA4 (Data API). Funil com as 11 seções da página. UI com as cores e fontes da 4E.

Variáveis na Vercel (cadastradas pelo Pedro, redeploy depois): `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `DASHBOARD_PASSWORD`, `DASHBOARD_SECRET`, `GA4_PROPERTY_ID`, `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_ADS_*` (com `GOOGLE_ADS_CUSTOMER_ID` = conta da 4E, 10 dígitos).

---

## 7. SEO, GEO e performance

**SEO técnico**
- Metadata completa (title ≤ 60, description ≤ 155, OG image 1200×630 gerada com a identidade, canonical no host final, Twitter card, `lang="pt-BR"`), `sitemap.ts`, `robots.ts` bloqueando `/dashboard` e `/api/`.
- Schema.org em JSON-LD: `Organization` + `LocalBusiness` (Goiás, NAP, `sameAs` Instagram) + `FAQPage` + `Service` ("Usina fotovoltaica gerida para investidores").
- Título sugerido: "Usina Solar para Investidores em Goiás | Renda Recorrente | 4E Energy" (58 caracteres).
- Palavras-chave distribuídas em h1, h2, primeiros parágrafos e alt: usina solar para investidores, investimento em usina fotovoltaica, renda recorrente com energia solar, gestão de usina solar, geração distribuída Goiás.
- Hierarquia h1 > h2 > h3, alt em todas as imagens, links externos com `rel="noopener"`.

**GEO (motores de IA)**
- `public/llms.txt` com empresa, serviço, região, diferenciais e contatos.
- `robots.ts` liberando GPTBot, ClaudeBot, PerplexityBot, Google-Extended e Bingbot (e bloqueando só `/dashboard` e `/api/`).
- Cada seção abre com uma frase que responde "o que, para quem, onde"; FAQ com respostas de 2 a 4 linhas citáveis isoladamente.
- Entidade consistente (nome, endereço, telefone, descrição) na página, no Schema e no `llms.txt`.

**Performance** (lições da Visão Solar): hero visível no primeiro quadro (entrada só por transform), fontes locais com preload, `content-visibility: auto` nas seções abaixo da dobra, GTM carregado após `load`, imagens WebP com `sizes`, sem bibliotecas pesadas no hero.

**Gate de entrega (Lighthouse mobile, build de produção):** LCP ≤ 2,5 s (máximo absoluto 4 s), CLS < 0,1, INP < 200 ms, Performance ≥ 90, SEO 100, Acessibilidade ≥ 95. Sem esses números no checklist a LP não é entregue.

**Segurança:** headers (`nosniff`, `X-Frame-Options`, `Referrer-Policy`, HSTS, `Permissions-Policy`), `poweredByHeader: false`, `/dashboard` e `/api` com `noindex` e `no-store`.

---

## 8. Pronta para tráfego

A LP nasce para campanha. O que fica preparado:

- **Message match:** o H1 e os títulos das seções usam as palavras dos anúncios ("usina solar para investidores", "renda recorrente", "usina gerida").
- **URLs finais por grupo de anúncio:** `/#modelo`, `/#rentabilidade`, `/#gestao`, `/#seguranca`, `/#diagnostico`.
- **UTMs padrão** (Meta): `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}`. Google: autotagging (`gclid`) + UTMs manuais por campanha.
- **Recomendação inicial de mídia (R$ 300/semana):** campanha de Pesquisa no Google com termos de intenção de investimento ("investir em usina solar", "usina solar investimento", "renda com energia solar", "geração distribuída investidor", "usina fotovoltaica para investir") e lista de negativas que repetem o erro de 2025 ("residencial", "kit", "placa solar preço", "minha casa", "quanto custa instalar", "autoconsumo"). Meta Ads só com remarketing (Pixel) nas primeiras semanas. Com ticket de R$ 45 mil, uma conversa qualificada por semana já paga a mídia.
- **Metas para 60 dias:** custo por conversa qualificada, taxa de qualificação do formulário, tempo de primeira resposta. O painel mostra tudo por botão, seção e origem.
- **Atendimento:** mensagem automática no WhatsApp Business, resposta em até 15 minutos em horário comercial, roteiro de qualificação de 3 perguntas, CRM simples (Pipedrive ou planilha estruturada) para os 20 dias de ciclo. Sem isso o tráfego não converte, como em 2025.

---

## 9. Regras de copy e compliance

1. Nunca escrever "venda de energia", "vender energia", "comprar energia". Usar "energia por assinatura", "desconto na conta de luz", "carteira de consumidores", "créditos de energia".
2. Rentabilidade sempre com "potencial", "estimativa", "até", "conforme as condições do projeto e do mercado", e aviso legal no rodapé. Nunca "garantido", "sem risco", "retorno certo".
3. Lei 14.300/2022 citada de forma neutra e informativa; sem interpretação jurídica.
4. Nada de número, depoimento, selo, prêmio ou logo de parceiro que o cliente não tenha confirmado. O que faltar fica `[PREENCHER]` e listado em `docs/PENDENCIAS.md`.
5. Tom formal, consultivo e técnico (manual da marca): "Vamos avaliar...", "A estimativa considera...". Sem gíria, sem urgência artificial.
6. Não usar travessão na copy (padrão das últimas LPs).
7. Revisão técnico-comercial do Marcos Lamounier antes de publicar: seções 4 (rentabilidade), 6 (segurança) e FAQ.

---

## 10. Fases de execução

| Fase | Entrega | Verificação |
|---|---|---|
| 0 | Este plano aprovado + respostas da seção 12 | – |
| 1 | Projeto criado (`lp-4e-energy`), tokens, fontes, logo tratado, `CLAUDE.md`, `DESIGN-SYSTEM.md`, `MEMORY.md`, `docs/PENDENCIAS.md` | `npm run build` e `npm run lint` verdes |
| 2 | 11 seções + layout fixo + copy rascunho + animações + formulário de diagnóstico com validação e mensagem do WhatsApp | Vitest (validação, mensagem, formatação); QA visual em 360, 390 e 1440 (Playwright) |
| 3 | Trackeamento fase 1: `lib/tracking.ts`, UTMs, eventos, `data-cta` em todo WhatsApp, GTM por env | Playwright bloqueando Google e imprimindo o `dataLayer`: UTMs em todo evento, 4 marcas de scroll, um `section_view` por seção, dado pessoal ausente |
| 4 | SEO + performance + política de privacidade + 404 | Lighthouse local (mobile ≥ 80, CLS 0), Schema validado |
| 5 | Painel: coletor, 5 rotas, lógica `server/analytics`, UI com a marca, migration `energy4e_*` aplicada no Supabase | `npm test` (painel + LP) verde; `/api/collect` 204 local |
| 6 | Contêiner do GTM gerado (quando houver os IDs), `README.md`, `DASHBOARD.md` | JSON válido |
| 7 | Repositório no GitHub + projeto na Vercel + deploy de preview | `/`, `/dashboard` 200; `/gtm/*` e `/supabase/*` 404; headers de segurança presentes |
| 8 | QA final e handoff: checklist do prompt padrão preenchido (Lighthouse mobile, overflow em 360/390/768/1024/1440, build sem warning, console limpo, Schema validado, sitemap/robots/llms.txt acessíveis, dataLayer testado, WebP com alt, reduced-motion), tabela de variáveis, passo a passo do GTM, eventos-chave no GA4, DNS do domínio, revisão do Marcos | Visita `qa-seed` gravada no Supabase; login com senha errada responde "Senha incorreta." |

Checkpoints com o Pedro: **fim da Fase 0** (este plano + DESIGN-SYSTEM.md + copy) e **fim da Fase 8** (checklist preenchido). Sem commit nem push sem pedido.

Fora do escopo desta LP (sugestões para depois): página ou LP própria de energia por assinatura (público de consumidor, campanha separada), CRM e automação de atendimento, produção de fotos e vídeo com o Rafael.

---

## 11. Pendências com o cliente (para o Pedro levar ao Marcos)

- [ ] Número de WhatsApp comercial que receberá os leads
- [ ] Domínio da LP (sugestão: `4eenergy.com.br` ou subdomínio do site atual) e quem administra o DNS
- [ ] CNPJ, razão social, endereço e e-mail para rodapé, política e Schema
- [ ] Logo em vetor (SVG/AI/PDF) e versão para fundo claro
- [ ] Fotos reais: usinas, BESS, equipe em campo, Marcos Lamounier
- [ ] Autorização para exibir logos de HES HUB, SEBRAE, Xper e Ubantec
- [ ] Confirmar "centenas de projetos concluídos" e "+30 usinas sob gestão" (números que vão para a LP e para os anúncios)
- [ ] Aprovar ou vetar o uso de "potencial de até 3,6% ao mês" com aviso legal
- [ ] Faixas de capital para o formulário (sugestão: até R$ 50 mil · 50 a 150 mil · 150 a 500 mil · acima de 500 mil) e capital mínimo real do projeto
- [ ] Respostas do FAQ validadas (prazo até operar, saída do investimento, troca de consumidor)
- [ ] Depoimento de pelo menos um investidor (a seção só entra com material real)
- [ ] IDs: GTM, GA4 (G- e propriedade numérica), conta do Google Ads (10 dígitos), Meta Pixel

---

## 12. Decisões que precisam do Pedro antes de codar (onboarding obrigatório)

Respostas sugeridas já marcadas. Basta confirmar ou corrigir.

1. **Biblioteca de animação:** `@react-spring/web` + Lenis (padrão). ✔ sugerido
2. **Efeitos:** entrada por scroll, contadores, linha do tempo preenchida pelo scroll, painel de telemetria animado no hero, hover em botões. Sem parallax pesado e sem scroll-video (não há vídeo da 4E). ✔ sugerido
3. **Seções:** as 11 da seção 3. Dúvida: manter a seção compacta "Outras soluções" (assinatura, gestão, BESS) ou deixar a LP 100% no investidor? ✔ sugerido manter compacta, no fim da página
4. **Elementos visuais:** navy profundo + linhas e marcas de escala em ciano, brilho ciano em CTA, cards com borda fina, sem glassmorphism, sem partículas. ✔ sugerido
5. **Stack:** padrão (Next 16 + Tailwind 4 + Supabase + Vercel), espelhando a Pádua. ✔ sugerido
6. **Formulário de diagnóstico:** 1 passo com 6 campos (sugerido) ou 2 passos (contato → perfil)? ✔ sugerido 1 passo
7. **"Até 3,6% ao mês":** entra já na v1 com aviso legal, ou fica fora até o Marcos aprovar? ✔ sugerido fora da v1 (texto "rentabilidade projetada caso a caso"), entra na v2 com a aprovação
8. **Nome do repositório e do projeto na Vercel:** `lp-4e-energy`. ✔ sugerido
9. **Prefixo no Supabase:** `energy4e` (chaves `fe-*`). ✔ sugerido
