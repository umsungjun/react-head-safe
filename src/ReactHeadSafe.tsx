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
}) => {
  useLayoutEffect(() => {
    // Update title
    if (title !== undefined) {
      document.title = title;
    }

    // Update description meta tag
    if (description !== undefined) {
      updateMetaTag('name', 'description', description);
    }

    // Update keywords meta tag
    if (keywords !== undefined) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // Update Open Graph tags and Twitter tags
    if (ogTitle !== undefined) {
      updateMetaTag('property', 'og:title', ogTitle);
      updateMetaTag('name', 'twitter:title', ogTitle);
    }

    if (ogDescription !== undefined) {
      updateMetaTag('property', 'og:description', ogDescription);
      updateMetaTag('name', 'twitter:description', ogDescription);
    }

    if (ogImage !== undefined) {
      updateMetaTag('property', 'og:image', ogImage);
      updateMetaTag('name', 'twitter:image', ogImage);
      updateMetaTag('name', 'twitter:card', 'summary_large_image');
    }

    if (ogUrl !== undefined) {
      updateMetaTag('property', 'og:url', ogUrl);
    }

    if (ogType !== undefined) {
      updateMetaTag('property', 'og:type', ogType);
    }

    // Update canonical URL
    if (canonicalUrl !== undefined) {
      updateLinkTag('canonical', canonicalUrl);
    }
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
