import { FC, useEffect, useLayoutEffect } from 'react';
import { type ReactHeadSafeProps } from './types';

// Falls back to useEffect during SSR to avoid React's
// "useLayoutEffect does nothing on the server" warning.
// The library stays CSR-only: no tags are ever emitted on the server.
const useIsomorphicLayoutEffect =
  typeof document !== 'undefined' ? useLayoutEffect : useEffect;

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
  twitterCard,
  robots,
}) => {
  useIsomorphicLayoutEffect(() => {
    // Track the exact elements inserted in this effect run.
    // Cleanup removes only these references, so it is a no-op for tags that
    // another ReactHeadSafe instance has since replaced — preventing one
    // instance's unmount from deleting a tag it no longer owns.
    const insertedElements: HTMLElement[] = [];

    // Empty strings are treated the same as undefined: no tag is rendered.

    // Update title
    // NOTE: document.title is intentionally not restored on cleanup —
    // the next page's ReactHeadSafe typically overwrites it immediately.
    if (title) {
      document.title = title;
    }

    // Update description meta tag
    if (description) {
      insertedElements.push(updateMetaTag('name', 'description', description));
    }

    // Update keywords meta tag
    if (keywords) {
      insertedElements.push(updateMetaTag('name', 'keywords', keywords));
    }

    // Update Open Graph tags and Twitter tags
    if (ogTitle) {
      insertedElements.push(
        updateMetaTag('property', 'og:title', ogTitle),
        updateMetaTag('name', 'twitter:title', ogTitle)
      );
    }

    if (ogDescription) {
      insertedElements.push(
        updateMetaTag('property', 'og:description', ogDescription),
        updateMetaTag('name', 'twitter:description', ogDescription)
      );
    }

    if (ogImage) {
      insertedElements.push(
        updateMetaTag('property', 'og:image', ogImage),
        updateMetaTag('name', 'twitter:image', ogImage)
      );
    }

    if (ogUrl) {
      insertedElements.push(updateMetaTag('property', 'og:url', ogUrl));
    }

    if (ogType) {
      insertedElements.push(updateMetaTag('property', 'og:type', ogType));
    }

    // Update canonical URL
    if (canonicalUrl) {
      insertedElements.push(updateLinkTag('canonical', canonicalUrl));
    }

    if (ogSiteName) {
      insertedElements.push(
        updateMetaTag('property', 'og:site_name', ogSiteName)
      );
    }

    if (ogLocale) {
      insertedElements.push(updateMetaTag('property', 'og:locale', ogLocale));
    }

    if (twitterSite) {
      insertedElements.push(updateMetaTag('name', 'twitter:site', twitterSite));
    }

    if (twitterCreator) {
      insertedElements.push(
        updateMetaTag('name', 'twitter:creator', twitterCreator)
      );
    }

    // Emit twitter:card whenever any Twitter tag is written — X/Twitter
    // ignores cards that lack it. Defaults to "summary_large_image" and can
    // be overridden via the twitterCard prop.
    const hasTwitterTag = Boolean(
      ogTitle || ogDescription || ogImage || twitterSite || twitterCreator
    );
    if (twitterCard || hasTwitterTag) {
      insertedElements.push(
        updateMetaTag(
          'name',
          'twitter:card',
          twitterCard || 'summary_large_image'
        )
      );
    }

    // Update robots meta tag (controls crawler indexing, e.g. "noindex,follow")
    if (robots) {
      insertedElements.push(updateMetaTag('name', 'robots', robots));
    }

    // Cleanup: remove every tag this effect inserted.
    // - On deps change: runs before the next effect, clearing stale tags
    //   (handles prop → undefined transitions).
    // - On unmount: final run, preventing stale metadata across pages.
    return () => {
      insertedElements.forEach((element) => {
        element.remove();
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
    twitterCard,
    robots,
  ]);

  return null;
};

/**
 * Updates or creates a link tag in the document head.
 * Removes every existing tag with the same rel (case-insensitive) to
 * prevent duplicates, then returns the newly created element.
 */
function updateLinkTag(rel: string, href: string): HTMLLinkElement {
  document
    .querySelectorAll(`link[rel="${rel}" i]`)
    .forEach((tag) => tag.remove());

  const linkTag = document.createElement('link');
  linkTag.setAttribute('rel', rel);
  linkTag.setAttribute('href', href);
  document.head.appendChild(linkTag);
  return linkTag;
}

/**
 * Updates or creates a meta tag in the document head.
 * Removes every existing tag with the same identifier (case-insensitive) to
 * prevent duplicates, then returns the newly created element.
 */
function updateMetaTag(
  attribute: 'name' | 'property',
  identifier: string,
  content: string
): HTMLMetaElement {
  document
    .querySelectorAll(`meta[${attribute}="${identifier}" i]`)
    .forEach((tag) => tag.remove());

  const metaTag = document.createElement('meta');
  metaTag.setAttribute(attribute, identifier);
  metaTag.setAttribute('content', content);
  document.head.appendChild(metaTag);
  return metaTag;
}
