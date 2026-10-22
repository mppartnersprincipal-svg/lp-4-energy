import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Política de privacidade",
  description: "Como a 4E Energy trata os dados pessoais de quem visita esta página e envia o diagnóstico de investidor.",
  path: "/politica-de-privacidade",
});

const SECTIONS = [
  {
    title: "1. Quem somos",
    body: [
      `Esta página pertence à ${SITE.legalName}${SITE.cnpj ? ` (CNPJ ${SITE.cnpj})` : ""}, responsável pelo tratamento dos dados pessoais descritos nesta política, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).`,
    ],
  },
  {
    title: "2. Quais dados coletamos",
    body: [
      "Diagnóstico de investidor: nome, WhatsApp, cidade, faixa de capital disponível, perfil (pessoa física ou empresa) e, se informado, se já possui área ou terreno. Esses dados não ficam armazenados nesta página: ao enviar, eles são levados para uma conversa no WhatsApp com a equipe da 4E Energy, onde o atendimento continua.",
      "Nas ferramentas de análise entram apenas as faixas escolhidas (capital e perfil), nunca nome, telefone ou cidade.",
      "Navegação: dados de uso coletados por ferramentas de análise e de anúncios (Google Analytics, Google Ads e Meta Pixel, via Google Tag Manager), por exemplo páginas visitadas, tipo de dispositivo e origem do acesso, incluindo parâmetros de campanha (UTMs).",
      "Estatística própria: registramos de forma anônima as seções vistas, os botões clicados, o tempo na página e a cidade aproximada (informada pelo provedor de hospedagem, sem guardar o endereço IP). Não usamos cookies nem dados pessoais para isso.",
    ],
  },
  {
    title: "3. Para que usamos",
    body: [
      "Entrar em contato sobre o seu interesse em investir em uma usina fotovoltaica, preparar o estudo de viabilidade e a apresentação do projeto.",
      "Entender como a página é usada e medir o resultado das campanhas, para melhorar a experiência e a comunicação.",
    ],
  },
  {
    title: "4. Com quem compartilhamos",
    body: [
      "Com fornecedores de tecnologia que operam a página e as ferramentas de análise e de anúncios. Nunca vendemos seus dados.",
    ],
  },
  {
    title: "5. Cookies",
    body: [
      "Usamos cookies de análise e de marketing para medir acessos e campanhas. Você pode bloquear ou apagar cookies nas configurações do seu navegador a qualquer momento.",
    ],
  },
  {
    title: "6. Seus direitos",
    body: [
      `Você pode pedir acesso, correção, exclusão ou portabilidade dos seus dados, além de revogar consentimentos, pelo e-mail ${SITE.email}. Respondemos no prazo previsto pela LGPD.`,
    ],
  },
];

export default function PoliticaPage() {
  return (
    <>
      <section id="topo" aria-labelledby="politica-title" className="navy-glow pt-[calc(var(--header-h)+48px)] pb-14">
        <div className="container-site flex flex-col gap-5">
          <Link href="/" className="text-sm text-mist transition-colors hover:text-white">
            ← Voltar para a página inicial
          </Link>
          <Eyebrow onDark>Transparência</Eyebrow>
          <h1 id="politica-title" className="text-display text-[clamp(2rem,1.4rem+2.4vw,3rem)] font-bold text-white">
            Política de privacidade
          </h1>
        </div>
      </section>
      <section id="politica" aria-label="Política de privacidade" className="section-y bg-ice text-ink">
        <div className="container-site">
          <article className="flex max-w-3xl flex-col gap-10">
            {SECTIONS.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h2 className="text-display text-xl font-bold text-ink">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
            <p className="border-t border-ice-dark pt-6 text-sm text-ink-soft">Última atualização: outubro de 2026.</p>
          </article>
        </div>
      </section>
    </>
  );
}
