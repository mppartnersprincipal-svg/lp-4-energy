import type { MetadataRoute } from "next";
import { CONTENT_UPDATED_AT } from "@/lib/content/home";
import { SITE } from "@/lib/site";

// lastModified só onde a data é real (a home segue CONTENT_UPDATED_AT); o Google ignora lastmod impreciso
const ROUTES: { path: string; priority: number; lastModified?: string }[] = [
  { path: "/", priority: 1, lastModified: CONTENT_UPDATED_AT },
  { path: "/politica-de-privacidade", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, lastModified }) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
