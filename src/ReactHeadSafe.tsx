import { FC, useLayoutEffect } from 'react';
import { type ReactHeadSafeProps } from './types';

/**
 * @description
 * A CSR-only React head manager that safely manages document head elements.
 * Prevents duplicate meta tags by explicitly removing existing ones before adding new ones.
 *
 * @example
 * <ReactHeadSafe
 *   title="My Page Title"
 *   description="This is the page description."
 *   keywords="react,seo,meta tags"
 *   ogTitle="My Page Title for Social Media"
 *   ogDescription="This is the description for social media."
 *   ogImage="https://example.com/image.jpg"
 *   ogUrl="https://example.com/page"
 *   ogType="website"
 *   canonicalUrl="https://example.com/page"
 * />
 */
export const ReactHeadSafe: FC<ReactHeadSafeProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType,
  canonicalUrl,
  ogSiteName,
  ogLocale,
  twitterSite,
  twitterCreator,
  robots,
}) => {
  useLayoutEffect(() => {
    // Track selectors for meta/link tags inserted in this effect run.
    // Cleanup only removes tags we inserted, preventing stale tags on
    // unmount or when a prop transitions to undefined.
    const insertedSelectors: string[] = [];

    // Update title
    // NOTE: document.title is intentionally not restored on cleanup —
    // the next page's ReactHeadSafe typically overwrites it immediately.
    if (title !== undefined) {
      document.title = title;
    }

    // Update description meta tag
    if (description !== undefined) {
      updateMetaTag('name', 'description', description);
      insertedSelectors.push('meta[name="description"]');
    }

    // Update keywords meta tag
    if (keywords !== undefined) {
      updateMetaTag('name', 'keywords', keywords);
      insertedSelectors.push('meta[name="keywords"]');
    }

    // Update Open Graph tags and Twitter tags
    if (ogTitle !== undefined) {
      updateMetaTag('property', 'og:title', ogTitle);
      updateMetaTag('name', 'twitter:title', ogTitle);
      insertedSelectors.push(
        'meta[property="og:title"]',
        'meta[name="twitter:title"]'
      );
    }

    if (ogDescription !== undefined) {
      updateMetaTag('property', 'og:description', ogDescription);
      updateMetaTag('name', 'twitter:description', ogDescription);
      insertedSelectors.push(
        'meta[property="og:description"]',
        'meta[name="twitter:description"]'
      );
    }

    if (ogImage !== undefined) {
      updateMetaTag('property', 'og:image', ogImage);
      updateMetaTag('name', 'twitter:image', ogImage);
      updateMetaTag('name', 'twitter:card', 'summary_large_image');
      insertedSelectors.push(
        'meta[property="og:image"]',
        'meta[name="twitter:image"]',
        'meta[name="twitter:card"]'
      );
    }

    if (ogUrl !== undefined) {
      updateMetaTag('property', 'og:url', ogUrl);
      insertedSelectors.push('meta[property="og:url"]');
    }

    if (ogType !== undefined) {
      updateMetaTag('property', 'og:type', ogType);
      insertedSelectors.push('meta[property="og:type"]');
    }

    // Update canonical URL
    if (canonicalUrl !== undefined) {
      updateLinkTag('canonical', canonicalUrl);
      insertedSelectors.push('link[rel="canonical"]');
    }

    if (ogSiteName !== undefined) {
      updateMetaTag('property', 'og:site_name', ogSiteName);
      insertedSelectors.push('meta[property="og:site_name"]');
    }

    if (ogLocale !== undefined) {
      updateMetaTag('property', 'og:locale', ogLocale);
      insertedSelectors.push('meta[property="og:locale"]');
    }

    if (twitterSite !== undefined) {
      updateMetaTag('name', 'twitter:site', twitterSite);
      insertedSelectors.push('meta[name="twitter:site"]');
    }

    if (twitterCreator !== undefined) {
      updateMetaTag('name', 'twitter:creator', twitterCreator);
      insertedSelectors.push('meta[name="twitter:creator"]');
    }

    // Update robots meta tag (controls crawler indexing, e.g. "noindex,follow")
    if (robots !== undefined) {
      updateMetaTag('name', 'robots', robots);
      insertedSelectors.push('meta[name="robots"]');
    }

    // Cleanup: remove every tag this effect inserted.
    // - On deps change: runs before the next effect, clearing stale tags
    //   (handles prop → undefined transitions).
    // - On unmount: final run, preventing stale metadata across pages.
    return () => {
      insertedSelectors.forEach((selector) => {
        document.querySelector(selector)?.remove();
      });
    };
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    canonicalUrl,
    ogSiteName,
    ogLocale,
    twitterSite,
    twitterCreator,
    robots,
  ]);

  return null;
};

/**
 * Updates or creates a link tag in the document head.
 * Removes existing tag with the same rel to prevent duplicates.
 */
function updateLinkTag(rel: string, href: string): void {
  const existingTag = document.querySelector(`link[rel="${rel}"]`);
  if (existingTag) {
    existingTag.remove();
  }

  const linkTag = document.createElement('link');
  linkTag.setAttribute('rel', rel);
  linkTag.setAttribute('href', href);
  document.head.appendChild(linkTag);
}

/**
 * Updates or creates a meta tag in the document head.
 * Removes existing tag with the same identifier to prevent duplicates.
 */
function updateMetaTag(
  attribute: 'name' | 'property',
  identifier: string,
  content: string
): void {
  // Remove existing meta tag with the same identifier
  const existingTag = document.querySelector(
    `meta[${attribute}="${identifier}"]`
  );
  if (existingTag) {
    existingTag.remove();
  }

  // Create and append new meta tag
  const metaTag = document.createElement('meta');
  metaTag.setAttribute(attribute, identifier);
  metaTag.setAttribute('content', content);
  document.head.appendChild(metaTag);
}
