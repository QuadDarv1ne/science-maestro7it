import type { MetadataRoute } from "next";
import { publications } from "@/data/publications";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://science-maestro7it.ru";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#publications`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#timeline`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Each publication as a virtual entry (anchors to #publications)
  // — helps search engines discover individual works
  const publicationRoutes: MetadataRoute.Sitemap = publications.map((p) => ({
    url: `${baseUrl}/#publications`,
    lastModified: new Date(p.publicationDate),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...publicationRoutes];
}
