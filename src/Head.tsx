import React, { useEffect } from 'react';

export interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  children?: React.ReactNode;
}

/**
 * Head component that safely manages document head elements.
 * Prevents duplicate meta tags by removing existing ones before adding new ones.
 * Solves the react-helmet issue where title updates but description and keywords don't.
 */
export const Head: React.FC<HeadProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  children,
}) => {
  useEffect(() => {
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
