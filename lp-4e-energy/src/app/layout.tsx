import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { buildOrganizationSchema, JsonLd } from "@/components/seo/JsonLd";
import { GtmNoScript, TrackingProvider } from "@/components/tracking/TrackingProvider";
import { GlassFilter } from "@/components/ui/GlassFilter";
import { SITE } from "@/lib/site";
import "./globals.css";

// Fontes do manual da marca servidas pelo próprio site (sem requisição externa)
// Montserrat só no peso 700 (títulos): arquivo pequeno, com preload. Testado "optional" em 21/10:
// não mudou o LCP simulado do Lighthouse (o gargalo é o JS no grafo do título), então fica "swap".
const montserrat = localFont({
  src: "../fonts/montserrat-latin-700-normal.woff2",
  variable: "--font-montserrat",
  weight: "700",
  display: "swap",
  preload: true,
});
// Inter (corpo) sem preload: não participa do LCP e deixa a banda para o título
const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  preload: false,
});

const DEFAULT_TITLE = "Usina Solar para Investidores em Goiás | 4E Energy";
const DEFAULT_DESCRIPTION =
  "Usina fotovoltaica gerida em Goiás: a 4E Energy constrói, capta a carteira de consumidores e opera. Renda recorrente com um ativo real, sem você operar nada.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE.name}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // Search Console: meta de verificação só se a propriedade for de prefixo de URL (a de domínio usa TXT no DNS)
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#06183e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-dvh font-sans">
        <GtmNoScript />
        {/* Sem JavaScript, o conteúdo das animações de entrada aparece direto */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-cyan focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-deep"
        >
          Pular para o conteúdo
        </a>
        <JsonLd data={buildOrganizationSchema()} />
        <GlassFilter />
        <TrackingProvider>
          <SmoothScroll />
          <RevealObserver />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <MobileCtaBar />
        </TrackingProvider>
      </body>
    </html>
  );
}
