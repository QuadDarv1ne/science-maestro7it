import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "YandexBot",
        allow: "/",
      },
    ],
    sitemap: "https://science-maestro7it.ru/sitemap.xml",
    host: "https://science-maestro7it.ru",
  };
}
