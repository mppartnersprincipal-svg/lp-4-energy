import { About } from "@/components/sections/About";
import { AudienceFit } from "@/components/sections/AudienceFit";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ManagementGrid } from "@/components/sections/ManagementGrid";
import { Marquee } from "@/components/sections/Marquee";
import { OtherSolutions } from "@/components/sections/OtherSolutions";
import { RevenueModel } from "@/components/sections/RevenueModel";
import { SecurityBlocks } from "@/components/sections/SecurityBlocks";
import { Stats } from "@/components/sections/Stats";
import { buildServiceSchema, JsonLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/lib/content/home";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Usina Solar para Investidores em Goiás | Renda Recorrente | 4E Energy",
  description:
    "A 4E Energy constrói sua usina fotovoltaica, capta e administra a carteira de consumidores e cuida da operação. Renda recorrente com um ativo real, sem você precisar operar nada.",
  path: "/",
  isAbsoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildServiceSchema()} />
      <Hero />
      <Marquee />
      <Stats />
      <AudienceFit />
      <HowItWorks />
      <RevenueModel />
      <ManagementGrid />
      <SecurityBlocks />
      <About />
      <Gallery />
      <DiagnosticSection />
      <OtherSolutions />
      <FaqSection items={FAQ} />
      <FinalCta />
    </>
  );
}
