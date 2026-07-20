import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { LISTING_SEO_PAGES, type PageSeo } from './src/data/seo';

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceOrInsert(html: string, pattern: RegExp, tag: string): string {
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

function renderListingHtml(baseHtml: string, seo: PageSeo): string {
  const description = escapeAttribute(seo.description);
  const title = escapeAttribute(seo.title);
  const canonical = escapeAttribute(seo.canonical);
  const image = escapeAttribute(seo.image);
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

  html = replaceOrInsert(html, /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${description}" />`);
  html = replaceOrInsert(html, /<link\s+rel="canonical"[\s\S]*?\/>/, `<link rel="canonical" href="${canonical}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${title}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${description}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${canonical}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:image"[\s\S]*?\/>/, `<meta property="og:image" content="${image}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${title}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${description}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:image"[\s\S]*?\/>/, `<meta name="twitter:image" content="${image}" />`);

  if (seo.jsonLd) {
    const jsonLd = `<script id="listing-jsonld" type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`;
    html = html.replace('</head>', `  ${jsonLd}\n</head>`);
  }

  return html;
}

function listingHtmlPlugin(): Plugin {
  return {
    name: 'jwillsoldit-listing-html',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const indexAsset = bundle['index.html'] ?? Object.values(bundle).find(
        (item) => item.type === 'asset' && item.fileName === 'index.html'
      );
      if (!indexAsset || indexAsset.type !== 'asset') return;
      const baseHtml = typeof indexAsset.source === 'string'
        ? indexAsset.source
        : new TextDecoder().decode(indexAsset.source);

      for (const seo of LISTING_SEO_PAGES) {
        this.emitFile({
          type: 'asset',
          fileName: seo.outputPath,
          source: renderListingHtml(baseHtml, seo),
        });
      }
    },
  };
}

// JWILLSOLDIT root hub — static build, no backend, no API routes.
export default defineConfig({
  plugins: [react(), listingHtmlPlugin()],
  build: {
    target: 'es2019',
    assetsInlineLimit: 2048,
  },
});
