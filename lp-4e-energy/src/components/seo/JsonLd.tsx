import type { FaqItem } from "@/components/ui/Accordion";
import { hasRealPhone, SITE } from "@/lib/site";

type JsonLdData = Record<string, unknown>;

interface JsonLdProps {
  data: JsonLdData;
}

/** Dados estruturados. Conteúdo é estático (do próprio site); `<` é escapado por segurança. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const DESCRIPTION =
  "A 4E Energy constrói usinas fotovoltaicas para investidores em Goiás e administra a carteira de consumidores, a operação e a manutenção. Renda recorrente com um ativo real, sem o investidor precisar operar.";

export function buildOrganizationSchema(): JsonLdData {
  const schema: JsonLdData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE.url}/#organizacao`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/brand/logo-4e-512.png`,
    image: `${SITE.url}/opengraph-image`,
    email: SITE.email,
    description: DESCRIPTION,
    foundingDate: String(SITE.foundedYear),
    areaServed: { "@type": "State", name: "Goiás", containedInPlace: { "@type": "Country", name: "Brasil" } },
    sameAs: [SITE.instagramUrl],
    knowsAbout: [
      "Usinas fotovoltaicas",
      "Geração distribuída",
      "Energia por assinatura",
      "Sistemas de armazenamento de energia (BESS)",
      "Gestão de usinas solares",
    ],
    slogan: "Energia Inteligente · Economia · Sustentabilidade",
  };
  // Só publica telefone/endereço quando o cliente enviar os dados reais
  if (hasRealPhone()) schema.telephone = `+${SITE.whatsappNumber}`;
  if (SITE.address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postalCode,
      addressCountry: "BR",
    };
  }
  return schema;
}

export function buildServiceSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Usina fotovoltaica gerida para investidores",
    name: "Usina fotovoltaica gerida para investidores",
    description:
      "Construção da usina fotovoltaica, captação e gestão da carteira de consumidores por assinatura, operação, manutenção e relatórios para o investidor.",
    url: `${SITE.url}/#modelo`,
    provider: { "@id": `${SITE.url}/#organizacao` },
    areaServed: { "@type": "State", name: "Goiás" },
    audience: { "@type": "Audience", audienceType: "Investidores" },
  };
}

export function buildFaqSchema(items: FaqItem[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
