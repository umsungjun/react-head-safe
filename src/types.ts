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
  /** The canonical URL of your object that will be used as its permanent ID in the graph (og:url) */
  ogUrl?: string;
  /** The type of your object, e.g., "website", "article" (og:type) */
  ogType?: string;
  /** The canonical URL of the page for SEO (link rel="canonical") */
  canonicalUrl?: string;
  /** The site name for social media sharing (og:site_name) */
  ogSiteName?: string;
  /** The locale of the content (og:locale), e.g. "en_US", "ko_KR" */
  ogLocale?: string;
  /** The Twitter @username of the website (twitter:site), e.g. "@mysite" */
  twitterSite?: string;
  /** The Twitter @username of the content author (twitter:creator), e.g. "@author" */
  twitterCreator?: string;
}
