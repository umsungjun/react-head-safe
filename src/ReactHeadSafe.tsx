import React, { useLayoutEffect } from 'react';

export interface ReactHeadSafeProps {
  /** The page title that will be set in the document.title */
  title?: string;
  /** The meta description tag content for SEO */
  description?: string;
  /** The meta keywords tag content for SEO */
  keywords?: string;
  /** The Open Graph title (og:title) for social media sharing */
  ogTitle?: string;
  /** The Open Graph description (og:description) for social media sharing */
  ogDescription?: string;
  /** The Open Graph image URL (og:image) for social media sharing */
  ogImage?: string;
}

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
 * />
 */
export const ReactHeadSafe: React.FC<ReactHeadSafeProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
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

    // Update Open Graph tags
    if (ogTitle !== undefined) {
      updateMetaTag('property', 'og:title', ogTitle);
    }

    if (ogDescription !== undefined) {
      updateMetaTag('property', 'og:description', ogDescription);
    }

    if (ogImage !== undefined) {
      updateMetaTag('property', 'og:image', ogImage);
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage]);

  return null;
};

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
