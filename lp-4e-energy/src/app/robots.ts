import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PRIVATE_PATHS = ["/dashboard", "/api/"];
// Motores de IA liberados de propósito (GEO): a página quer ser citada.
// Citação em busca: OAI-SearchBot (ChatGPT Search), Claude-SearchBot (Claude), PerplexityBot, Applebot, Bingbot.
// Treino (liberados por escolha, não afetam a busca): GPTBot, ClaudeBot, Google-Extended.
const AI_BOTS = [
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Applebot",
  "Bingbot",
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE_PATHS })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
