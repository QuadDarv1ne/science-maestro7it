import { publications, author } from "@/data/publications";
import { SITE_URL } from "@/lib/config";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const sorted = [...publications].sort((a, b) =>
    b.publicationDate.localeCompare(a.publicationDate)
  );

  const items = sorted
    .map((p) => {
      const date = new Date(p.publicationDate).toUTCString();
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(p.url)}</link>
      <guid isPermaLink="true">${escapeXml(p.doiUrl)}</guid>
      <description>${escapeXml(p.abstractShort)}</description>
      <author>Дуплей Максим Игоревич (ORCID: ${author.orcid})</author>
      <category>${escapeXml(p.categoryLabels.join(", "))}</category>
      <pubDate>${date}</pubDate>
      <source url="${escapeXml(p.url)}">Zenodo</source>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Science Maestro7IT — Научные публикации Дуплея Максима Игоревича</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${publications.length} научных публикаций на Zenodo в области ИИ, образования, лингвистики, международных отношений и радиотехнологий.</description>
    <language>ru-ru</language>
    <copyright>© Дуплей Максим Игоревич, ${new Date().getFullYear()}. Все права принадлежат автору.</copyright>
    <managingEditor>Дуплей Максим Игоревич (ORCID: ${author.orcid})</managingEditor>
    <webMaster>Дуплей Максим Игоревич (ORCID: ${author.orcid})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Science Maestro7IT — Next.js 16</generator>
    <image>
      <url>${SITE_URL}/favicon.svg</url>
      <title>Science Maestro7IT</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
