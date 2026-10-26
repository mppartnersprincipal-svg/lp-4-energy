import type { FaqItem } from "@/components/ui/Accordion";
import { CONTENT_PUBLISHED_AT, CONTENT_UPDATED_AT, SOURCES } from "@/lib/content/home";
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

const ORG_ID = `${SITE.url}/#organizacao`;
const PERSON_ID = `${SITE.url}/#marcos-lamounier`;
const WEBSITE_ID = `${SITE.url}/#site`;
const PAGE_ID = `${SITE.url}/#pagina`;

const DESCRIPTION =
  "A 4E Energy constrói usinas fotovoltaicas para investidores em Goiás e administra a carteira de consumidores, a operação e a manutenção. Renda recorrente com um ativo real, sem o investidor precisar operar.";

const KNOWS_ABOUT = [
  "Usinas fotovoltaicas",
  "Geração distribuída",
  "Energia por assinatura",
  "Sistemas de armazenamento de energia (BESS)",
  "Gestão de usinas solares",
  "Lei nº 14.300/2022",
];

export function buildOrganizationSchema(): JsonLdData {
  const schema: JsonLdData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/brand/logo-4e-512.png`,
    image: `${SITE.url}/opengraph-image`,
    email: SITE.email,
    description: DESCRIPTION,
    foundingDate: String(SITE.foundedYear),
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    areaServed: { "@type": "State", name: "Goiás", containedInPlace: { "@type": "Country", name: "Brasil" } },
    sameAs: [SITE.instagramUrl],
    knowsAbout: KNOWS_ABOUT,
    slogan: "Energia Inteligente · Economia · Sustentabilidade",
  };
  // Só publica telefone/endereço quando o cliente enviar os dados reais
  if (hasRealPhone()) {
    schema.telephone = `+${SITE.whatsappNumber}`;
    schema.contactPoint = {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${SITE.whatsappNumber}`,
      availableLanguage: "pt-BR",
      areaServed: "BR",
    };
  }
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

/** Diretor da 4E como entidade (E-E-A-T): quem responde pelo conteúdo técnico-comercial. */
export function buildPersonSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.director,
    jobTitle: "Diretor",
    worksFor: { "@id": ORG_ID },
    knowsAbout: KNOWS_ABOUT,
    url: `${SITE.url}/#sobre`,
  };
}

/** Página com datas, idioma, assunto e fontes citadas. */
export function buildWebPageSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_ID,
    url: SITE.url,
    name: "Usina Solar para Investidores em Goiás | 4E Energy",
    description: DESCRIPTION,
    inLanguage: "pt-BR",
    datePublished: CONTENT_PUBLISHED_AT,
    dateModified: CONTENT_UPDATED_AT,
    isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID, url: SITE.url, name: SITE.name, publisher: { "@id": ORG_ID } },
    about: { "@id": ORG_ID },
    author: { "@id": ORG_ID },
    reviewedBy: { "@id": PERSON_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE.url}/opengraph-image`, width: 1200, height: 630 },
    citation: [
      { "@type": "Legislation", name: SOURCES.lei14300.label, url: SOURCES.lei14300.url },
      { "@type": "WebPage", name: SOURCES.aneel.label, url: SOURCES.aneel.url },
    ],
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["#hero-title", "#numeros-title", "#investimento-title"] },
  };
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
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "State", name: "Goiás" },
    audience: { "@type": "Audience", audienceType: "Investidores" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Soluções da 4E Energy",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Usina fotovoltaica gerida para investidores" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Energia por assinatura para empresas e residências" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestão de usinas existentes" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "BESS e sistemas híbridos" } },
      ],
    },
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
