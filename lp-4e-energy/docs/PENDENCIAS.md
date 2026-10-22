# Pendências de conteúdo e configuração

Tudo o que a LP mostra sem confirmação do cliente está marcado aqui. Nada abaixo foi inventado: o que faltava ficou como placeholder ou foi omitido.

## Com o cliente (4E Energy / Marcos Lamounier)

| Item | Onde na LP | Estado |
|---|---|---|
| WhatsApp comercial | todos os botões (`NEXT_PUBLIC_WHATSAPP_NUMBER`) | **PENDENTE**: placeholder `5500000000000` em `src/lib/site.ts` |
| Domínio final | canonical, OG, sitemap, Schema (`NEXT_PUBLIC_SITE_URL`) | **PENDENTE**: hoje `lp-4e-energy.vercel.app` |
| CNPJ, razão social, endereço | rodapé, política de privacidade, Schema | **PENDENTE**: `cnpj: null`, `address: null` (blocos ocultos) |
| E-mail institucional | rodapé, política, Schema | placeholder `contato@4eenergy.com.br` |
| Horário de atendimento | rodapé | "Segunda a sexta, das 8h às 18h" (a confirmar) |
| Logo em vetor (SVG/AI/PDF) | header, ícone, OG | usando recorte do JPEG (`public/brand/`) |
| Foto do Marcos Lamounier e da equipe | seção "Quem é a 4E" | iniciais no lugar da foto |
| Fotos reais de usinas, BESS e equipe em campo | hero, para quem, como funciona, gestão, sobre, galeria, diagnóstico, soluções, CTA final | **9 fotos ilustrativas do Unsplash** (`public/images/*-{480,960,1600}.webp`, manifesto em `src/lib/images.json`), todas legendadas como ilustrativas. Trocar pelas reais mantendo os nomes e regenerar com sharp (comando no README) |
| Autorização para exibir logos de HES HUB, SEBRAE, Xper e Ubantec | seção "Quem é a 4E" | nomes em texto, sem logos |
| Confirmar "centenas de projetos concluídos" e "+30 usinas sob gestão" | hero, segurança, sobre, llms.txt | vindos do briefing; confirmar antes dos anúncios |
| "Potencial de até 3,6% ao mês" | seção "De onde vem a renda" | **fora da v1** por decisão do Pedro; entra com aviso legal após aprovação |
| Faixas de capital do formulário | `src/lib/lead.ts` | até 50k · 50 a 150k · 150 a 500k · acima de 500k (sugestão) |
| Capital mínimo real por projeto | FAQ "Quanto preciso investir?" | resposta genérica |
| Prazo médio de construção e conexão | FAQ | resposta genérica |
| Substituição de consumidor (prazo) e saída do investimento (condições) | FAQ | respostas genéricas |
| Depoimento de investidor | sem seção na v1 | só com material real |
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
