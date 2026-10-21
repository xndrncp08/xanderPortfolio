import { projects, site } from "@/data/content";

export default function sitemap() {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, changeFrequency: "monthly", priority: 0.7 })),
  ];
}
