# Pendências de conteúdo e configuração

Tudo o que a LP mostra sem confirmação do cliente está marcado aqui. Nada abaixo foi inventado: o que faltava ficou como placeholder ou foi omitido.

## Com o cliente (4E Energy / Marcos Lamounier)

| Item | Onde na LP | Estado |
|---|---|---|
| WhatsApp comercial | todos os botões e schema | **(62) 9 9607-1233** (`5562996071233` em `src/lib/site.ts`), confirmado em 26/10/2026 |
| Domínio final | canonical, OG, sitemap, Schema (`NEXT_PUBLIC_SITE_URL`) | **4eenergy.com.br** (26/10/2026), substituindo o site antigo do construtor da GoDaddy; DNS na GoDaddy: A `@` → 216.198.79.1 e 64.29.17.1, CNAME `www` → Vercel. E-mail (MX/SPF) mantido |
| Endereço | rodapé, Schema, llms.txt | **OK** (26/10/2026): Rua 5, nº 77, Jardim Decolores, Trindade/GO, CEP 75385-218 |
| CNPJ e razão social | rodapé, política de privacidade, Schema | **PENDENTE**: o CNPJ enviado (62.877.984/0001-40, 4ENERGY SOLUCOES INTELIGENTES LTDA) consta **BAIXADO** na Receita desde 06/05/2026 (liquidação voluntária). Pedir ao cliente o CNPJ ativo; `cnpj: null` até lá |
| E-mail institucional | rodapé, política, Schema | placeholder `contato@4eenergy.com.br` |
| Horário de atendimento | rodapé | "Segunda a sexta, das 8h às 18h" (a confirmar) |
| Logo em vetor (SVG/AI/PDF) | header, ícone, OG | usando recorte do JPEG (`public/brand/`) |
| Foto do Marcos Lamounier e da equipe | seção "Quem é a 4E" | iniciais no lugar da foto |
| Fotos reais de usinas, BESS e equipe em campo | hero, para quem, como funciona, gestão, sobre, galeria, diagnóstico, soluções, CTA final | **9 fotos ilustrativas do Unsplash** (`public/images/*-{480,960,1600}.webp`, manifesto em `src/lib/images.json`), todas legendadas como ilustrativas. Trocar pelas reais mantendo os nomes e regenerar com sharp (comando no README) |
| Autorização para exibir logos de HES HUB, SEBRAE, Xper e Ubantec | seção "Quem é a 4E" | nomes em texto, sem logos |
| Confirmar "centenas de projetos concluídos" e "+30 usinas sob gestão" | hero, segurança, sobre, llms.txt | vindos do briefing; confirmar antes dos anúncios |
| Faixas investimento x renda (R$ 50/100/200 mil → até R$ 1.600/3.600/7.200 por mês) | seção `investimento`, FAQ, llms.txt | **enviadas pelo cliente em 26/10/2026**, publicadas com o aviso dele ("Valores estimados, não garantidos...") |
| Faixas de capital do formulário | `src/lib/lead.ts` | até 50k · 50 a 150k · 150 a 500k · acima de 500k (sugestão) |
| Capital mínimo real por projeto | FAQ "Quanto preciso investir?" | resposta genérica |
| Prazo médio de construção e conexão | FAQ | resposta genérica |
| Substituição de consumidor (prazo) e saída do investimento (condições) | FAQ | respostas genéricas |
| Depoimento de investidor | sem seção na v1 | só com material real |
| Presença de marca fora do site (GEO) | Instagram só | Menções em YouTube, LinkedIn e Reddit pesam mais que backlinks na citação por IA; perfil no LinkedIn da empresa e do Marcos + `sameAs` no schema quando existirem |
| Google Business Profile | – | criar/confirmar o perfil (entidade local para Goiás) e adicionar o link em `sameAs` |
| Revisão técnico-comercial do Marcos | seções `rentabilidade`, `seguranca` e FAQ | obrigatória antes de publicar |

## Com o Pedro (configuração)

| Item | Onde |
|---|---|
| `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | Vercel + gerar o JSON do GTM (`README.md`) |
| Conta do Google Ads da 4E (10 dígitos) e conversão "Conversa no WhatsApp" | Vercel + GTM |
| Variáveis do painel (`SUPABASE_*`, `DASHBOARD_*`, `GA4_*`, `GOOGLE_*`) | `DASHBOARD.md` |
| Migration `supabase/migrations/0001_energy4e_analytics.sql` | aplicar no projeto compartilhado |
| Projeto na Vercel (Root Directory `lp-4e-energy`) e domínio | repo já no GitHub (`lp-4-energy`); deploy aguarda pedido |
| Fotos ilustrativas | Unsplash (licença livre), 9 imagens; substituir pelas reais antes de anunciar com "nossas usinas" |
