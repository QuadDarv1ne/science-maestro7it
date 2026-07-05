import { publications, author } from "@/data/publications";
import { SITE_URL } from "@/lib/config";

/**
 * Structured data (JSON-LD) for SEO.
 * - Person schema for the author
 * - ItemList of ScholarlyArticle entries
 * - WebSite schema with potential search action
 *
 * Rendered server-side in layout.tsx via <script type="application/ld+json">.
 */
export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": author.orcidUrl,
    name: "Дуплей Максим Игоревич",
    alternateName: "Dupley Maxim Igorevich",
    givenName: "Максим",
    familyName: "Дуплей",
    jobTitle: "Старший преподаватель информационных технологий",
    description:
      `Старший преподаватель информационных технологий, аналитик, философ, музыкант и DevOps-инженер. Автор ${publications.length} научных публикаций на Zenodo.`,
    url: SITE_URL,
    image: `${SITE_URL}/author/photo1.png`,
    sameAs: [
      author.orcidUrl,
      author.github,
      author.stepik,
      author.school,
      "https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Dupley%2C+Maxim%22",
    ],
    identifier: {
      "@type": "PropertyValue",
      name: "ORCID",
      value: author.orcid,
    },
    knowsAbout: [
      "Искусственный интеллект",
      "Машинное обучение",
      "Образование",
      "DevOps",
      "Лингвистика",
      "Философия",
      "Радиотехнологии",
      "SDR",
      "Информационная безопасность",
    ],
    worksFor: {
      "@type": "EducationalOrganization",
      name: "Maestro7IT",
      url: author.school,
    },
  };

  const articlesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Научные публикации ${author.name} (род.)`,
    description:
      `${publications.length} научных публикаций на платформе Zenodo в области ИИ, образования, лингвистики и междисциплинарных исследований.`,
    numberOfItems: publications.length,
    itemListElement: publications.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ScholarlyArticle",
        "@id": p.doiUrl,
        headline: p.title,
        datePublished: p.publicationDate,
        dateModified: p.publicationDate,
        author: {
          "@type": "Person",
          "@id": author.orcidUrl,
          name: "Дуплей Максим Игоревич",
        },
        publisher: {
          "@type": "Organization",
          name: "Zenodo",
          url: "https://zenodo.org",
        },
        identifier: [
          {
            "@type": "PropertyValue",
            name: "DOI",
            value: p.doi,
          },
        ],
        url: p.url,
        about: p.categoryLabels.map((label) => ({
          "@type": "Thing",
          name: label,
        })),
        inLanguage: "ru",
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Science Maestro7IT",
    alternateName: `Научные публикации ${author.name}`,
    url: SITE_URL,
    inLanguage: "ru",
    publisher: {
      "@type": "Organization",
      name: "Zenodo",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesSchema) }}
      />
    </>
  );
}
