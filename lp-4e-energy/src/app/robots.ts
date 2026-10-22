import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PRIVATE_PATHS = ["/dashboard", "/api/"];
// Motores de IA liberados de propósito (GEO): a página quer ser citada
const AI_BOTS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE_PATHS })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
