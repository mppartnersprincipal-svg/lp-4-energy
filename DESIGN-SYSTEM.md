# Design System — 4E Energy

Derivado do **Manual da Marca 4E Energy v1.0 (out/2026)** e do logo em JPEG (1536×1536). Cores medidas no arquivo: azul-marinho `rgb(3,22,65)` e ciano `rgb(48,200,248)`, coerentes com o manual (`#06183E` e `#28C7F2`). Os valores oficiais do manual prevalecem.

> Versão 2 (22/10/2026): depois do feedback do Pedro ("muito simples"), a LP ganhou fotos, ícones próprios e animação de scroll no nível da Visão Solar e da Pacheco. Esta é a versão implementada.

---

## Conceito: "Telemetria"

O símbolo tem marcas de orientação (traços acima, abaixo e nas laterais do 4E) como um medidor. A LP adota essa linguagem: fundo azul-marinho profundo, linhas finas e marcas de escala em ciano, números que sobem, um painel de monitoramento no hero. Comunica **controle, dado e acompanhamento à distância**, exatamente o que o investidor valoriza, e afasta a marca da estética de integrador residencial (sol amarelo, foto de telhado, verde).

Regras do manual que valem aqui: 60% azul-marinho, 25% branco, 15% ciano; ciano só em destaque; uma mensagem por bloco; títulos curtos; fotografia real; dados com unidade e fonte; nada de gradiente multicolorido.

---

## Cores

Tokens em `src/app/globals.css` (`:root` com `--cor-*` + `@theme` com `--color-*`).

### Marca
| Token | Hex | Uso |
|---|---|---|
| `--color-navy` | `#06183E` | Fundo-base, cabeçalhos, 60% da página |
| `--color-navy-deep` | `#040F2A` | Rodapé, hero (profundidade), gradiente de base |
| `--color-navy-soft` | `#0D2457` | Cards e superfícies sobre navy |
| `--color-navy-line` | `#1A3468` | Bordas sobre navy |
| `--color-cyan` | `#28C7F2` | CTA, ícones, linhas, números, 15% da página |
| `--color-cyan-light` | `#5AD5F5` | Hover do CTA, brilho |
| `--color-cyan-dark` | `#0E7FA3` | Texto ciano sobre fundo claro (contraste AA 4,6:1 sobre branco) |

### Neutros
| Token | Hex | Uso |
|---|---|---|
| `--color-white` | `#FFFFFF` | Texto sobre navy, seções claras |
| `--color-ice` | `#EEF4FB` | Fundo das seções claras (modelo, segurança, FAQ) |
| `--color-ice-dark` | `#DCE6F3` | Bordas e divisores em fundo claro |
| `--color-ink` | `#0B1A3A` | Texto principal sobre fundo claro |
| `--color-ink-soft` | `#4F6283` | Texto secundário sobre fundo claro |
| `--color-mist` | `#A9B8D3` | Texto secundário sobre navy |

### Contraste (checado)
- Branco sobre navy `#06183E`: 16,9:1.
- `#A9B8D3` sobre navy: 8,9:1.
- Botão ciano `#28C7F2` com texto **navy** `#06183E`: 9,2:1. Nunca texto branco sobre ciano (2,0:1).
- `#0E7FA3` sobre branco: 4,6:1 (AA para texto normal). Ciano puro sobre branco não serve para texto.

### Efeitos de luz
- Brilho de CTA: `0 0 0 1px rgb(40 199 242 / .35), 0 12px 40px -12px rgb(40 199 242 / .55)`.
- Fundo do hero: `radial-gradient(70% 60% at 80% 0%, rgb(40 199 242 / .16), transparent 60%)` sobre `navy-deep`.
- Linha de telemetria: `rgba(40,199,242,.18)` em 1px; marcas de escala a cada 24px via `repeating-linear-gradient`.
- Sem sombra cinza em lugar nenhum.

---

## Tipografia

Manual: Montserrat ou Inter para títulos; Inter para corpo. Servidas localmente (`next/font/local`, arquivos em `src/fonts/`, `display: swap`, preload nas duas principais).

| Papel | Fonte | Peso | Detalhe |
|---|---|---|---|
| Display (H1, H2, números) | **Montserrat** | 700 / 800 | tracking −0,02em, line-height 1,05 |
| Corpo, botões, formulário | **Inter** | 400 / 500 / 600 | line-height 1,6 |
| Eyebrow e labels de dados | **Inter** 600 | caixa alta, tracking +0,12em, 0,75rem |

### Escala (fluida com `clamp`)
| Nível | Mobile → Desktop |
|---|---|
| H1 (hero) | 2,4rem → 4,5rem |
| H2 | 1,9rem → 3rem |
| H3 | 1,25rem → 1,5rem |
| Número de destaque | 2,5rem → 4rem |
| Corpo grande (sub do hero) | 1,1rem → 1,25rem |
| Corpo | 1rem → 1,125rem (mínimo 16px no mobile) |
| Label | 0,75rem |

Destaque em títulos: `<Highlight>` em ciano sobre navy; sobre fundo claro, sublinhado ciano de 3px (texto continua em `ink`).

---

## Espaço, forma e grid

- **Container:** `max-width: 1200px`, gutter 20px (mobile) e 32px (≥768px).
- **Seções:** `padding-block: 72px` (mobile) e `112px` (≥1024px). Seções alternam navy / gelo para dar ritmo e respiro.
- **Grid:** 1 coluna no mobile, 2 em 768px, 3 ou 4 em 1024px. Cards com `gap` 16 → 24px.
- **Raios:** cards 16px, botões pílula (999px), inputs 12px, painel do hero 20px. O círculo é a forma-mãe (eco do logo) em ícones de etapa e no favicon.
- **Bordas:** 1px `navy-line` sobre navy, `ice-dark` sobre claro. Card de destaque: borda ciano a 35%.
- **Alvos de toque:** mínimo 44px. Botões com `padding: 14px 24px`.

---

## Componentes-assinatura

| Componente | Descrição |
|---|---|
| `Hero` (anel-janela) | O anel do logo vira uma janela com a foto da usina. Seção de 220svh presa ao scroll: o anel gira devagar com marcas de escala, se abre por `clip-path: circle()` até cobrir a tela, a foto dá zoom-out, os rótulos de telemetria (geração, disponibilidade, consumidores, créditos) acendem e a declaração final aparece. No celular o anel "nasce" da borda inferior. Com reduced-motion fica estático |
| `Marquee` | Duas faixas cruzadas em sentidos opostos (navy + ciano) com as provas da marca e o anel como separador |
| `Stats` | Quatro números grandes em grade com bordas, contador (`Counter`) e barra ciano |
| `AudienceFit` | Card com foto e overlay navy ("É para você se") ao lado do card branco ("Não é para você se") |
| `HowItWorks` (scrollytelling) | Seção de 380svh presa: etapas acendem com o scroll e o painel de foto troca por etapa, com HUD "Etapa 0X/04" e barra de progresso. No celular vira lista com a foto de cada etapa |
| `RevenueModel` | Fluxo usina → rede → carteira → investidor com linha tracejada animada; gráfico ilustrativo de 12 barras que cresce com a rolagem (sem valores); caixa "Rentabilidade projetada caso a caso" |
| `ManagementGrid` | Foto de manutenção + 6 `GlowCard` (borda ciano que segue o cursor) com ícones próprios |
| `SecurityBlocks` + `Seal` | Três objeções respondidas e o selo giratório "ESTUDO DE VIABILIDADE • PROJEÇÃO CONSERVADORA • LEI 14.300" com o anel no centro |
| `About` | Foto com parallax leve (`useScrollProgress`, modo pass), linha do tempo 2022 → hoje, card do diretor, pilares do manual |
| `Gallery` (bento) | Quatro fotos em grade bento reveladas por `clip-path` de baixo para cima + zoom-out, com tag e título |
| `DiagnosticSection` + `DiagnosticForm` | Foto de fundo com overlay navy e grão; formulário branco de 6 campos; sucesso abre o WhatsApp |
| `OtherSolutions` | Três cards com cabeçalho em foto (ou grade de telemetria para BESS) e ícone próprio |
| `FinalCta` | Foto da usina à direita com gradiente navy, anel decorativo no celular |
| `Accordion` (FAQ) | Botões acessíveis com ícone + → ×, dispara `faq_open` |
| `WhatsAppButton` / `MobileCtaBar` / `WhatsAppFloat` | Pílula ciano (CTA da marca) e verde do WhatsApp no flutuante e na barra do celular |

---

## Logo

- Fonte: JPEG 1536×1536, fundo navy, anel com 1206px de diâmetro. Não é vetor.
- Tratamento: recorte do círculo (anel + conteúdo) em PNG com transparência e exportação em WebP para o header (altura 44px, mínimo 160px de largura na arte completa conforme o manual) e PNG 512 para `icon`/`apple-icon`. Sobre fundo navy o JPEG funciona como está.
- Versão para fundo claro: não existe. Nas seções claras o header continua navy (header fixo), então não é necessária na v1.
- Área de proteção: altura do traço vertical interno (≈ 5% do diâmetro). Não esticar, não recolorir, não sombra.
- **Pendência:** logo em vetor (SVG/AI/PDF) com o cliente.

---

## Ícones e imagens

- Ícones: conjunto próprio em `ui/icons.tsx` (24 ícones: usina, inversor, bateria, carteira, monitor, relatório, manutenção, distribuidora, estudo, obra, raio, escudo, renda, medidor, cidade, setas, check, x, mais, menu, pergunta, e-mail, relógio, pino), traço 1,6 com uma marca de escala em cada um; ciano sobre navy ou `cyan-dark` sobre claro, em círculo de 44px.
- WhatsApp e Instagram em SVG próprio (`ui/icons.tsx`).
- Fotos: usinas de solo, inversores, BESS, equipe em campo (manual). Hoje: 9 fotos ilustrativas do Unsplash em WebP 480 / 960 / 1600 com blur (`src/lib/images.json`), sempre legendadas como ilustrativas; trocar pelas reais mantendo os nomes (`docs/PENDENCIAS.md`). Grão (`.grao`) e vinheta (`.vinheta`) fundem as fotos ao navy.
- OG image 1200×630 gerada (`opengraph-image.tsx`): navy, logo, H1 e marcas de escala.

---

## Movimento

- **Bibliotecas:** `@react-spring/web` (entradas, contadores, acordeão, hover) e Lenis (smooth scroll, carregado no client depois da hidratação, desligado com `prefers-reduced-motion`).
- **Entrada padrão (`Reveal`):** fade + deslize de 24px, `config.gentle`, stagger de 80ms em grids.
- **Hero:** animação CSS pura (`.enter`), conteúdo visível sem JavaScript; nenhum elemento candidato a LCP começa com `opacity: 0`.
- **Contadores:** easeOutCubic 2s, disparo com 30% do elemento visível.
- **Linha do tempo:** preenchimento ligado ao scroll via rAF + CSS var (sem re-render).
- **Botões:** hover scale 1,03 + brilho ciano; active 0,97; transição 180ms.
- **Header:** fundo navy a 85% com `backdrop-filter: blur(12px)` ao rolar (só no header, elemento estático).
- **Scroll-linked:** `useScrollProgress` (um loop rAF compartilhado, modos `pin` e `pass`) escreve CSS vars (`--e`, `--p`, `--g`, `--py`); nada re-renderiza React no scroll.
- **Proibido:** partículas, scroll-video (não há vídeo da 4E), `backdrop-filter` em elementos que se movem, animação acima de 60fps.

---

## Voz

Formal, consultiva e técnica (manual + briefing). Frases curtas. Verbos de acompanhamento: "avaliar", "acompanhar", "apresentar", "projetar". Promessa sempre condicionada: "potencial", "estimativa", "conforme as condições do projeto". Nunca "venda de energia", "garantido", "sem risco". Sem travessão na copy.
