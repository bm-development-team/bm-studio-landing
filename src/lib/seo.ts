import type { Dictionary, Lang } from '../i18n/ui';

/**
 * schema.org graph for the landing: the studio, its services, the FAQ and the page itself.
 * Facts come only from the visible copy (ui.ts), so markup and page never disagree.
 */
export function buildJsonLd(t: Dictionary, lang: Lang, siteUrl: string, pageUrl: string): Record<string, unknown> {
  const org = `${siteUrl}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: 'BM Studio',
        url: `${siteUrl}/`,
        logo: `${siteUrl}/apple-touch-icon.png`,
        image: `${siteUrl}/og-default.png`,
        description: t.meta.description,
        email: t.contact.email,
        telephone: t.contact.phone,
        areaServed: { '@type': 'Country', name: 'Kazakhstan' },
        knowsLanguage: ['ru', 'kk', 'en'],
        knowsAbout: t.services.items.map((s) => s.phrase),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: t.contact.email,
          telephone: t.contact.phone,
          areaServed: 'KZ',
          availableLanguage: ['ru', 'kk', 'en'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.services.heading,
          itemListElement: t.services.items.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.phrase, description: s.text, provider: { '@id': org } },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: 'BM Studio',
        description: t.meta.description,
        inLanguage: ['ru', 'kk', 'en'],
        publisher: { '@id': org },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': org },
        primaryImageOfPage: `${siteUrl}/og-default.png`,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: lang,
        mainEntity: t.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}
