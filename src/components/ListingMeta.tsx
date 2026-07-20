import { useEffect } from 'react';
import type { Listing } from '../data/listings';
import { getListingSeo } from '../data/seo';

interface ListingMetaProps {
  listing: Listing;
}

function upsertMeta(
  attribute: 'name' | 'property',
  value: string,
  content: string,
  touched: Array<{ node: HTMLMetaElement; original: string | null }>
) {
  const selector = `meta[${attribute}="${value}"]`;
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attribute, value);
    document.head.appendChild(node);
    touched.push({ node, original: null });
  } else {
    touched.push({ node, original: node.getAttribute('content') });
  }
  node.setAttribute('content', content);
}

export function ListingMeta({ listing }: ListingMetaProps) {
  useEffect(() => {
    const originalTitle = document.title;
    const seo = getListingSeo(listing);
    const canonical = seo.canonical;
    const touched: Array<{ node: HTMLMetaElement; original: string | null }> = [];
    const originalCanonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    const originalCanonicalHref = originalCanonical?.getAttribute('href') ?? null;

    document.title =
      seo.title;

    upsertMeta('name', 'description', seo.description, touched);
    upsertMeta('property', 'og:type', 'website', touched);
    upsertMeta('property', 'og:title', document.title, touched);
    upsertMeta('property', 'og:description', seo.description, touched);
    upsertMeta('property', 'og:url', canonical, touched);
    upsertMeta('property', 'og:image', seo.image, touched);
    upsertMeta('name', 'twitter:card', 'summary_large_image', touched);
    upsertMeta('name', 'twitter:title', document.title, touched);
    upsertMeta('name', 'twitter:description', seo.description, touched);
    upsertMeta('name', 'twitter:image', seo.image, touched);

    const canonicalNode = originalCanonical ?? document.createElement('link');
    if (!originalCanonical) {
      canonicalNode.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalNode);
    }
    canonicalNode.setAttribute('href', canonical);

    const jsonLd = document.createElement('script');
    jsonLd.id = 'listing-jsonld';
    jsonLd.type = 'application/ld+json';
    jsonLd.textContent = JSON.stringify(seo.jsonLd);

    document.head.querySelector('#listing-jsonld')?.remove();
    document.head.appendChild(jsonLd);

    return () => {
      document.title = originalTitle;
      touched.forEach(({ node, original }) => {
        if (original === null) node.remove();
        else node.setAttribute('content', original);
      });
      if (originalCanonical) {
        if (originalCanonicalHref === null) originalCanonical.removeAttribute('href');
        else originalCanonical.setAttribute('href', originalCanonicalHref);
      } else {
        canonicalNode.remove();
      }
      jsonLd.remove();
    };
  }, [listing]);

  return null;
}
