/**
 * Toda a copy da LP num lugar só. Regras: tom formal e consultivo, sem travessão,
 * nunca "venda de energia", rentabilidade sempre como estimativa (ver PLANO.md, seção 9).
 * Dados factuais vêm do briefing de 20/10/2026; o que falta está em docs/PENDENCIAS.md.
 * Fotos: ilustrativas (lib/images.ts) até chegarem as reais.
 */
import type { ComponentType } from "react";
import type { FaqItem } from "@/components/ui/Accordion";
import {
  IconBateria,
  IconCarteira,
  IconCidade,
  IconDistribuidora,
  IconEstudo,
  IconManutencao,
  IconMonitor,
  IconObra,
  IconPino,
  IconRaio,
  IconRelatorio,
  IconRenda,
  IconUsina,
  type IconProps,
} from "@/components/ui/icons";
import type { PhotoName } from "@/lib/images";

type Icon = ComponentType<IconProps>;

/** Data da última revisão do conteúdo (aparece no rodapé e no schema WebPage). Atualizar a cada mudança de copy. */
export const CONTENT_UPDATED_AT = "2026-10-26";
export const CONTENT_PUBLISHED_AT = "2026-10-22";

/** Fontes oficiais citadas na página (links externos com rel="noopener") */
export const SOURCES = {
  lei14300: {
    label: "Lei nº 14.300/2022 (Marco Legal da Geração Distribuída)",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14300.htm",
  },
  aneel: {
    label: "ANEEL: geração distribuída",
    url: "https://www.gov.br/aneel/pt-br/assuntos/geracao-distribuida",
  },
} as const;

export const HERO = {
  eyebrow: "Usinas fotovoltaicas para investidores · Goiás",
  title: "Sua usina solar gerando renda recorrente.",
  titleHighlight: "Sem você precisar operar nada.",
  description:
    "A 4E Energy constrói a usina, capta e administra a carteira de consumidores e cuida da operação e da manutenção. Você acompanha os resultados à distância.",
  primaryCta: "Falar com um especialista",
  secondaryCta: "Ver como funciona",
  revealEyebrow: "Usina de solo · imagem ilustrativa",
  revealTitle: "Mais de 30 usinas sob gestão em Goiás.",
  revealTitleHighlight: "A próxima pode ser a sua.",
  proof: [
    { value: "+30", label: "usinas sob gestão" },
    { value: "2022", label: "no mercado desde" },
    { value: "Centenas", label: "de projetos concluídos" },
  ],
} as const;

export interface TelemetryMetric {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
}

/** Números ilustrativos do painel (rotulados como exemplo na interface) */
export const TELEMETRY: TelemetryMetric[] = [
  { label: "Geração hoje", value: 1284, suffix: " kWh" },
  { label: "Disponibilidade", value: 99.2, suffix: "%", decimals: 1 },
  { label: "Consumidores ativos", value: 48 },
  { label: "Créditos alocados", value: 100, suffix: "%" },
];

export const MARQUEE = [
  "Usinas para investidores",
  "+30 usinas sob gestão",
  "Carteira de consumidores administrada",
  "Operação e manutenção mensal",
  "Desde 2022 em Goiás",
  "Lei nº 14.300/2022",
  "Relatórios de desempenho",
  "BESS e sistemas híbridos",
] as const;

export interface Stat {
  value: number | null;
  text?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
}

export const STATS = {
  eyebrow: "O que é uma usina gerida",
  title: "O que é uma usina fotovoltaica gerida para investidores?",
  titleMuted: "Investir em energia não é aposta. É operação bem feita, todos os dias.",
  // Bloco de definição, autocontido (GEO): responde à pergunta do título sem depender do resto da página
  definition:
    "Uma usina fotovoltaica gerida para investidores é uma usina solar de solo construída em nome do investidor e administrada por uma empresa especializada. A 4E Energy faz o estudo de viabilidade, constrói e conecta a usina à distribuidora, capta empresas e residências para a energia por assinatura e assume a operação, a manutenção mensal e os relatórios. Os consumidores da carteira recebem os créditos de energia com até 30% de desconto na conta de luz e pagam uma mensalidade; essa receita, descontados os custos de gestão, é a renda recorrente do investidor. O modelo segue o marco legal da geração distribuída, a Lei nº 14.300/2022, e é regulado pela ANEEL. Em Goiás, a 4E Energy atua desde 2022 e mantém mais de 30 usinas sob gestão.",
  items: [
    { value: 30, prefix: "+", label: "usinas sob gestão", detail: "monitoradas e mantidas pela 4E" },
    { value: null, text: "2022", label: "no mercado de energia", detail: "projetos e parcerias desde o início" },
    { value: 30, prefix: "até ", suffix: "%", label: "de desconto na conta", detail: "para os consumidores da carteira" },
    { value: 100, suffix: "%", label: "da operação com a 4E", detail: "você acompanha pelos relatórios" },
  ] satisfies Stat[],
} as const;

export const AUDIENCE = {
  eyebrow: "Para quem é",
  title: "Um investimento para quem quer o resultado,",
  titleHighlight: "não a operação.",
  description:
    "Esta página fala com investidores. Se a sua necessidade é outra, a 4E Energy tem soluções específicas no fim da página.",
  fit: [
    "Tem capital para alocar em um ativo real e busca renda recorrente",
    "Quer um negócio que funcione sem montar equipe nem folha de pagamento",
    "Valoriza previsibilidade, relatórios e acompanhamento à distância",
    "Está em Goiás ou quer investir no estado",
  ],
  unfit: [
    "Quer instalar placas para reduzir a conta de luz da própria casa",
    "Procura o menor preço por kit fotovoltaico",
    "Pretende operar e administrar a usina por conta própria",
  ],
  unfitNote: "A 4E Energy não atua como integradora residencial. O foco é a usina como negócio do investidor.",
  photo: "usina-aerea" as PhotoName,
} as const;

export interface Step {
  icon: Icon;
  title: string;
  description: string;
  investor: string;
  photo: PhotoName;
  photoAlt: string;
}

export const HOW_IT_WORKS = {
  eyebrow: "Como funciona",
  title: "Como funciona uma usina gerida para investidores?",
  titleHighlight: "Em quatro etapas.",
  description:
    "Uma usina fotovoltaica gerida para investidores funciona assim: a 4E Energy executa cada etapa e você acompanha o resultado.",
  steps: [
    {
      icon: IconEstudo,
      title: "Estudo de viabilidade",
      description:
        "Analisamos área, conexão, demanda e cenário regulatório e apresentamos uma projeção conservadora. Você decide com números na mesa.",
      investor: "Você avalia a proposta.",
      photo: "usina-aerea-grama",
      photoAlt: "Vista aérea de fileiras de módulos fotovoltaicos sobre área gramada (imagem ilustrativa)",
    },
    {
      icon: IconObra,
      title: "Construção e conexão",
      description:
        "Projeto, equipamentos, obra e homologação junto à distribuidora. A usina é entregue em operação.",
      investor: "Você acompanha o cronograma.",
      photo: "usina-fileiras",
      photoAlt: "Fileiras de módulos de uma usina de solo sob céu azul (imagem ilustrativa)",
    },
    {
      icon: IconCarteira,
      title: "Carteira de consumidores",
      description:
        "Captamos empresas e residências para a energia por assinatura e administramos adesões, contratos e substituições.",
      investor: "Você não precisa fazer nada.",
      photo: "telhado-empresa",
      photoAlt: "Telhado de empresa ao entardecer, exemplo de consumidor atendido por energia por assinatura (imagem ilustrativa)",
    },
    {
      icon: IconMonitor,
      title: "Operação e manutenção",
      description:
        "Monitoramento contínuo, manutenção mensal, interlocução com a distribuidora e relatórios de desempenho.",
      investor: "Você lê o relatório.",
      photo: "tecnico-manutencao",
      photoAlt: "Técnico com luvas fazendo manutenção em um módulo fotovoltaico (imagem ilustrativa)",
    },
  ] satisfies Step[],
} as const;

export interface FlowNode {
  icon: Icon;
  title: string;
  description: string;
}

export const REVENUE = {
  eyebrow: "De onde vem a renda",
  title: "De onde vem a renda recorrente do investidor?",
  titleHighlight: "Um modelo simples, sem letras miúdas.",
  description:
    "A renda do investidor vem da carteira de consumidores da usina. Veja o caminho do crédito de energia até a sua receita.",
  flow: [
    { icon: IconUsina, title: "Usina gera", description: "Toda a geração é injetada na rede da distribuidora." },
    { icon: IconDistribuidora, title: "Rede converte", description: "A energia injetada vira créditos de compensação." },
    { icon: IconCidade, title: "Carteira recebe", description: "Empresas e residências recebem os créditos com até 30% de desconto e pagam uma mensalidade." },
    { icon: IconRenda, title: "Você recebe", description: "A mensalidade da carteira, descontados os custos de gestão, é a sua renda recorrente." },
  ] satisfies FlowNode[],
  chart: {
    title: "Receita recorrente, mês a mês",
    caption: "Gráfico ilustrativo, sem valores: mostra a lógica de uma carteira alocada, não uma projeção.",
    legend: ["Mensalidades da carteira", "Custos de gestão"],
  },
  projection: {
    title: "Rentabilidade projetada caso a caso",
    description:
      "Cada projeto recebe um estudo de viabilidade com projeção conservadora, considerando investimento, geração estimada, tarifa vigente e condições de mercado. As estimativas são apresentadas com todas as premissas e não constituem garantia de resultado.",
  },
} as const;

export interface InvestmentTier {
  /** Capital investido, em reais */
  investment: number;
  /** Teto da renda mensal estimada, em reais */
  monthlyIncome: number;
}

export interface InvestmentBenefit {
  icon: Icon;
  title: string;
  description: string;
}

/** Faixas enviadas pelo cliente em 26/10/2026, sempre com o aviso logo abaixo. */
export const INVESTMENT = {
  eyebrow: "Investimento x retorno",
  title: "Quanto rende investir em uma usina solar com a 4E Energy?",
  titleHighlight: "Renda mensal estimada por faixa de investimento.",
  description:
    "Veja a renda mensal estimada para três faixas de capital. O valor de cada projeto é confirmado no estudo de viabilidade, com todas as premissas apresentadas.",
  tiers: [
    { investment: 50_000, monthlyIncome: 1_600 },
    { investment: 100_000, monthlyIncome: 3_600 },
    { investment: 200_000, monthlyIncome: 7_200 },
  ] satisfies InvestmentTier[],
  benefits: [
    {
      icon: IconManutencao,
      title: "Suporte completo",
      description: "A 4E Energy acompanha toda a execução do projeto, da implantação à gestão da usina.",
    },
    {
      icon: IconPino,
      title: "Não tem espaço para instalar?",
      description: "Nós providenciamos alternativas para viabilizar o seu projeto.",
    },
  ] satisfies InvestmentBenefit[],
  closing: "Invista em energia solar e construa seu patrimônio com potencial de renda recorrente.",
  notice: "*Valores estimados, não garantidos, sujeitos à viabilidade e aos custos do projeto.",
  ctaMessage: "Olá, vim pela página da 4E Energy e quero conhecer a oportunidade de investimento em usina solar.",
} as const;

export interface ManagementItem {
  icon: Icon;
  title: string;
  description: string;
}

export const MANAGEMENT = {
  eyebrow: "O que a 4E assume por você",
  title: "O que a 4E Energy faz pelo investidor?",
  titleHighlight: "Toda a operação, do painel ao consumidor.",
  description: "A 4E Energy assume a gestão técnica e comercial da usina. Para o investidor, o acompanhamento é feito pelos relatórios.",
  closing: "Sem equipe própria. Sem folha de pagamento. Sem operação no seu dia a dia.",
  items: [
    { icon: IconMonitor, title: "Monitoramento contínuo", description: "Geração, disponibilidade e alarmes acompanhados todos os dias." },
    { icon: IconCarteira, title: "Gestão da carteira", description: "Adesão, cobrança, inadimplência e substituição de consumidores." },
    { icon: IconRelatorio, title: "Relatórios de desempenho", description: "Geração, carteira e resultado apresentados de forma transparente." },
    { icon: IconManutencao, title: "Manutenção mensal", description: "Rotina preventiva e corretiva para manter a usina produzindo." },
    { icon: IconDistribuidora, title: "Relação com a distribuidora", description: "Homologação, compensação de créditos e demandas regulatórias." },
    { icon: IconRaio, title: "Acompanhamento operacional", description: "Indicadores reais comparados com a projeção do projeto." },
  ] satisfies ManagementItem[],
  photo: "tecnico-manutencao" as PhotoName,
} as const;

export interface SecurityItem {
  question: string;
  answer: string;
  proof: string;
  /** Fonte oficial ligada à prova (link externo) */
  source?: { label: string; url: string };
}

export const SECURITY = {
  eyebrow: "Segurança do investimento",
  title: "É seguro investir em uma usina solar gerida?",
  titleHighlight: "As três perguntas que todo investidor faz, e as nossas respostas.",
  seal: "ESTUDO DE VIABILIDADE • PROJEÇÃO CONSERVADORA • LEI Nº 14.300/2022 • ",
  items: [
    {
      question: "E se eu perder o investimento?",
      answer:
        "A usina é um ativo físico, construído em seu nome, e nenhuma decisão é tomada sem um estudo de viabilidade. Trabalhamos com projeções conservadoras, que mostram riscos e oportunidades antes do investimento.",
      proof: "Mais de 30 usinas em operação sob nossa gestão.",
    },
    {
      question: "Qual é o retorno e em quanto tempo?",
      answer:
        "Cada projeto possui uma projeção de retorno personalizada, que pode chegar a até 3,6% ao mês, com um projeto de caráter vitalício. Em reunião, apresentamos todas as premissas do investimento, incluindo valor investido, geração estimada, tarifa de energia e custos de gestão. Após a implantação, você acompanha o desempenho e os resultados reais por meio de relatórios periódicos, com transparência e acompanhamento técnico especializado.",
      proof: "Apresentação personalizada e projeção conservadora.",
    },
    {
      question: "E a regulamentação do setor?",
      answer:
        "A geração distribuída tem marco legal próprio, a Lei nº 14.300/2022, que define regras e prazos de transição. Explicamos o cenário regulatório e o histórico das discussões para que a decisão seja tomada com planejamento e informação.",
      proof: "Setor regulado pela ANEEL, com marco legal na Lei nº 14.300/2022.",
      source: SOURCES.lei14300,
    },
  ] satisfies SecurityItem[],
} as const;

export const ABOUT = {
  eyebrow: "Quem é a 4E Energy",
  title: "Quem é a 4E Energy?",
  titleHighlight: "Engenharia, gestão e tecnologia desde 2022.",
  paragraphs: [
    "A 4E Energy nasceu em 2022, com projetos e parcerias ao lado de HES HUB, SEBRAE, Xper e Ubantec. Os primeiros estudos foram voltados à gestão de cargas e ao armazenamento de energia em baterias.",
    "A participação em eventos e palestras pelo Brasil aprofundou o conhecimento sobre os desafios da infraestrutura elétrica nacional e levou a empresa a se especializar na gestão de usinas fotovoltaicas, sistemas híbridos e BESS.",
    "Hoje, a 4E Energy atua na gestão de usinas de investidores e no mercado de energia por assinatura, com centenas de projetos concluídos e mais de 30 usinas sob gestão.",
  ],
  timeline: [
    { year: "2022", title: "Início", description: "Projetos e parcerias com HES HUB, SEBRAE, Xper e Ubantec." },
    { year: "2023", title: "Gestão de cargas e BESS", description: "Primeiros estudos em armazenamento de energia em baterias." },
    { year: "2024", title: "Brasil afora", description: "Eventos e palestras sobre a infraestrutura elétrica nacional." },
    { year: "Hoje", title: "+30 usinas sob gestão", description: "Usinas de investidores e energia por assinatura." },
  ],
  pillars: [
    { title: "Tecnologia", description: "Monitoramento e decisões baseadas em dados." },
    { title: "Confiança", description: "Clareza técnica, responsabilidade e acompanhamento." },
    { title: "Eficiência", description: "Uso racional de energia e foco em desempenho." },
    { title: "Sustentabilidade", description: "Decisões energéticas com visão de longo prazo." },
  ],
  photo: "usina-entardecer" as PhotoName,
  photoAlt: "Módulos fotovoltaicos ao entardecer com prédio ao fundo (imagem ilustrativa)",
} as const;

export interface GalleryItem {
  photo: PhotoName;
  alt: string;
  tag: string;
  title: string;
}

export const GALLERY = {
  eyebrow: "Imagens ilustrativas",
  title: "Como é uma usina de solo como as que operamos",
  titleMuted: "Fotos reais das usinas sob gestão entram nesta página assim que forem liberadas pelo cliente.",
  items: [
    { photo: "usina-campo", alt: "Usina de solo com módulos em campo verde (imagem ilustrativa)", tag: "Usina de solo", title: "Módulos em estrutura fixa" },
    { photo: "usina-aerea-grama", alt: "Vista aérea de usina de solo (imagem ilustrativa)", tag: "Vista aérea", title: "Fileiras alinhadas ao sol" },
    { photo: "usina-verde", alt: "Fileira de módulos fotovoltaicos sob céu azul (imagem ilustrativa)", tag: "Operação", title: "Geração em dia de céu limpo" },
    { photo: "tecnico-manutencao", alt: "Técnico fazendo manutenção em módulo (imagem ilustrativa)", tag: "Manutenção", title: "Rotina mensal em campo" },
  ] satisfies GalleryItem[],
} as const;

export const DIAGNOSTIC = {
  eyebrow: "Diagnóstico de investidor",
  title: "Descubra se uma usina gerida",
  titleHighlight: "faz sentido para o seu capital.",
  description:
    "Responda em menos de um minuto. A conversa continua no WhatsApp com um especialista da 4E Energy, sem compromisso.",
  nextSteps: [
    { icon: IconCarteira, title: "Conversa no WhatsApp", description: "Entendemos seu perfil, capital e expectativa." },
    { icon: IconEstudo, title: "Estudo de viabilidade", description: "Projeção conservadora com todas as premissas." },
    { icon: IconRenda, title: "Apresentação personalizada", description: "Cenários, prazos e condições do projeto." },
  ],
  photo: "usina-aerea" as PhotoName,
} as const;

export interface SolutionCard {
  icon: Icon;
  title: string;
  description: string;
  ctaId: string;
  message: string;
  photo: PhotoName | null;
}

export const OTHER_SOLUTIONS = {
  eyebrow: "Outras soluções",
  title: "Também atendemos empresas e consumidores.",
  items: [
    {
      icon: IconCidade,
      title: "Energia por assinatura",
      description: "Até 30% de desconto na conta de luz para empresas e residências, sem obra e sem investimento inicial.",
      ctaId: "cta_whatsapp_assinatura",
      message: "Olá, vim pela página da 4E Energy e quero saber mais sobre energia por assinatura.",
      photo: "telhado-empresa",
    },
    {
      icon: IconMonitor,
      title: "Gestão de usinas existentes",
      description: "Monitoramento, manutenção e gestão da carteira de consumidores para usinas já construídas.",
      ctaId: "cta_whatsapp_gestao_usinas",
      message: "Olá, vim pela página da 4E Energy e quero saber mais sobre gestão de usinas.",
      photo: "usina-verde",
    },
    {
      icon: IconBateria,
      title: "BESS e sistemas híbridos",
      description: "Armazenamento de energia para reduzir quedas, substituir geradores a diesel e cortar custos no horário de ponta.",
      ctaId: "cta_whatsapp_bess",
      message: "Olá, vim pela página da 4E Energy e quero saber mais sobre BESS e sistemas híbridos.",
      photo: null,
    },
  ] satisfies SolutionCard[],
} as const;

const BRL = new Intl.NumberFormat("pt-BR");
// "R$ 50 mil rendem até R$ 1.600 por mês, R$ 100 mil ... e R$ 200 mil ..." (resposta direta para IA, mesma fonte dos cards)
const INVESTMENT_SUMMARY = INVESTMENT.tiers
  .map(({ investment, monthlyIncome }) => `R$ ${BRL.format(investment / 1000)} mil rendem até R$ ${BRL.format(monthlyIncome)} por mês`)
  .join(", ")
  .replace(/, ([^,]*)$/, " e $1");

export const FAQ: FaqItem[] = [
  {
    question: "Quanto rende investir em uma usina solar com a 4E Energy?",
    answer: `Pelas estimativas da 4E Energy, ${INVESTMENT_SUMMARY}. A renda vem das mensalidades da carteira de consumidores, descontados os custos de gestão. São valores estimados, não garantidos, sujeitos à viabilidade e aos custos de cada projeto, confirmados no estudo de viabilidade.`,
  },
  {
    question: "Quanto preciso investir?",
    answer:
      "Cada projeto tem um estudo de viabilidade próprio, com faixas de investimento diferentes conforme a potência da usina e a área disponível. Como referência, um investimento de R$ 50 mil tem renda mensal estimada de até R$ 1.600, valor não garantido e sujeito à viabilidade e aos custos do projeto. Na primeira conversa apresentamos as opções compatíveis com o seu capital.",
  },
  {
    question: "Preciso ter terreno?",
    answer:
      "Não. Se você não tiver espaço para instalar, a 4E Energy providencia alternativas para viabilizar o seu projeto. Informe no diagnóstico se você já possui terreno ou área para a usina.",
  },
  {
    question: "Quem são os consumidores da usina?",
    answer:
      "Empresas e residências que aderem à energia por assinatura e recebem até 30% de desconto na conta de luz. A 4E Energy capta e administra essa carteira em nome do investidor.",
  },
  {
    question: "O que acontece se um consumidor sair da carteira?",
    answer:
      "A gestão da carteira inclui a substituição de consumidores, para manter os créditos da usina alocados. O acompanhamento é contínuo e aparece nos relatórios.",
  },
  {
    question: "Em quanto tempo a usina começa a operar?",
    answer:
      "O prazo depende do porte da usina e da conexão com a distribuidora. O cronograma é apresentado no estudo de viabilidade e acompanhado com você durante a obra.",
  },
  {
    question: "Como acompanho os resultados?",
    answer:
      "Com monitoramento contínuo da usina e relatórios periódicos de geração, carteira e resultado. Você acompanha tudo à distância, sem precisar se envolver na operação.",
  },
  {
    question: "A Lei nº 14.300/2022 muda alguma coisa?",
    answer:
      "A lei é o marco legal da geração distribuída e define as regras e os prazos de transição do setor. Explicamos o cenário regulatório e o histórico na apresentação, para que a decisão seja tomada com informação.",
  },
  {
    question: "Posso sair do investimento depois?",
    answer:
      "A usina é um ativo seu. As condições para venda ou transferência são tratadas caso a caso e explicadas na apresentação do projeto.",
  },
];

export const FINAL_CTA = {
  eyebrow: "Próximo passo",
  title: "Quer saber se uma usina gerida faz sentido para o seu capital?",
  description: "Fale com um especialista da 4E Energy. A primeira conversa é um diagnóstico, sem compromisso.",
  photo: "usina-solo-nuvens" as PhotoName,
} as const;

export const LEGAL_NOTICE =
  "As informações desta página têm caráter informativo. Projeções de geração e de receita dependem das condições técnicas, comerciais e regulatórias de cada projeto e não constituem garantia de rentabilidade. Fotos ilustrativas.";
