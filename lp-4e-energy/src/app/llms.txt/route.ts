import { CONTENT_UPDATED_AT, INVESTMENT, SOURCES, STATS } from "@/lib/content/home";
import { SITE } from "@/lib/site";

const BRL = new Intl.NumberFormat("pt-BR");

/**
 * llms.txt (GEO) gerado da mesma copy da página: domínio, valores e data de revisão nunca
 * ficam diferentes do que está no ar. Formato llmstxt.org: H1, resumo em citação e seções com links Markdown.
 */
function buildLlmsTxt(): string {
  const tiers = INVESTMENT.tiers.map(
    ({ investment, monthlyIncome }) =>
      `- R$ ${BRL.format(investment / 1000)} mil investidos: renda mensal estimada de até R$ ${BRL.format(monthlyIncome)}`,
  );

  return [
    `# ${SITE.name}`,
    "",
    "> Usinas fotovoltaicas para investidores em Goiás, com gestão completa da carteira de consumidores, operação e manutenção. Energia Inteligente · Economia · Sustentabilidade.",
    "",
    `A ${SITE.name} constrói usinas fotovoltaicas para investidores e administra, em nome do investidor, a carteira de consumidores que recebe a energia por assinatura (até 30% de desconto na conta de luz). O investidor tem um ativo real que gera renda recorrente sem precisar operar, montar equipe ou folha de pagamento. Fundada em ${SITE.foundedYear}, com projetos e parcerias ao lado de ${SITE.partners.join(", ").replace(/, ([^,]*)$/, " e $1")}, a empresa tem centenas de projetos concluídos e mais de 30 usinas sob gestão. Diretor: ${SITE.director}.`,
    "",
    "## Páginas",
    "",
    `- [Usina solar para investidores em Goiás](${SITE.url}/): como funciona a usina gerida, de onde vem a renda, faixas de investimento x retorno, gestão, segurança e perguntas frequentes`,
    `- [Investimento x retorno](${SITE.url}/#investimento): renda mensal estimada por faixa de capital`,
    `- [Perguntas frequentes](${SITE.url}/#perguntas-frequentes): investimento, terreno, consumidores, prazos e Lei nº 14.300/2022`,
    `- [Política de privacidade](${SITE.url}/politica-de-privacidade)`,
    "",
    "## O que é uma usina fotovoltaica gerida",
    "",
    STATS.definition,
    "",
    "## Investimento x retorno (valores estimados)",
    "",
    ...tiers,
    "- Suporte completo da implantação à gestão da usina. Quem não tem espaço para instalar recebe alternativas para viabilizar o projeto.",
    `- ${INVESTMENT.notice.replace(/^\*/, "")}`,
    "",
    "## O que a 4E Energy faz",
    "",
    "- Estudo de viabilidade com projeção conservadora antes de qualquer decisão",
    "- Construção e conexão da usina fotovoltaica junto à distribuidora",
    "- Captação e gestão da carteira de consumidores (adesão, cobrança, inadimplência, substituição)",
    "- Operação, monitoramento contínuo, manutenção mensal e relatórios de desempenho",
    "- Energia por assinatura para empresas e residências; gestão de usinas já construídas; sistemas BESS e híbridos",
    "",
    "## Para quem",
    "",
    "Investidores (pessoa física ou empresa) que buscam renda recorrente, previsibilidade e segurança operacional, principalmente em Goiás. Não atende quem quer instalar placas para reduzir a própria conta de luz (integração residencial).",
    "",
    "## Regulamentação e fontes",
    "",
    `- [${SOURCES.aneel.label}](${SOURCES.aneel.url})`,
    `- [${SOURCES.lei14300.label}](${SOURCES.lei14300.url})`,
    "- Projeções de geração e de receita dependem das condições de cada projeto e não constituem garantia de rentabilidade.",
    "",
    "## Contato",
    "",
    `- [WhatsApp comercial](https://wa.me/${SITE.whatsappNumber})`,
    `- [Instagram ${SITE.instagramHandle}](${SITE.instagramUrl})`,
    SITE.address
      ? `- Endereço: ${SITE.address.street}, ${SITE.address.city}/${SITE.address.state}, CEP ${SITE.address.postalCode}`
      : `- Região: ${SITE.areaServed}, Brasil`,
    `- Responsável técnico-comercial: ${SITE.director}, diretor`,
    `- Conteúdo revisado em: ${CONTENT_UPDATED_AT}`,
    "",
  ].join("\n");
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
