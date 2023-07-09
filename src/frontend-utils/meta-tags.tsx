const metaDescription = (pageName: string) =>
  `Anne Mariel | Anne Mariel | ${pageName}, Web Developer, Software Engineer, Frontend Engineer. React, JavaScript, TypeScript expert. Husband & Father`;

export const commonMetaTags = (
  pageName: string,
  slug = '/',
  previewImg = 'preview.png',
) => (
  <>
    <meta
      name="twitter:image"
      content={`https://annemariel.com/assets/${previewImg}`}
    />
    <meta name="twitter:description" content={metaDescription(pageName)} />
    <meta name="twitter:title" content="Anne Mariel" />
    <meta property="og:url" content={`https://annemariel.com${slug}`} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Anne Mariel" />
    <meta property="og:description" content={metaDescription(pageName)} />
    <meta
      property="og:image"
      content={`https://annemariel.com/assets/${previewImg}`}
    />
    <meta name="description" content={metaDescription(pageName)} />
    <link rel="canonical" href={`https://annemariel.com${slug}`} />
    <link rel="icon" href="/favicon.ico" />
    {/* For PWA */}
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/assets/logo.png"></link>
  </>
);
