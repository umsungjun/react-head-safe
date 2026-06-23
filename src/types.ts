/**
 * Standard Open Graph object types per the OG Protocol.
 *
 * Provides IDE autocompletion for the 12 well-known values while still
 * accepting any string for forward compatibility (via `(string & {})`).
 *
 * @see https://ogp.me/#types
 */
export type OgType =
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | (string & {});

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
  ogType?: OgType;
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
  /**
   * The robots meta tag content controlling crawler indexing, e.g. "noindex,follow", "noindex,nofollow".
   *
   * Note: a JS-injected `noindex` is only honored by crawlers that render JavaScript
   * (e.g. Googlebot, with delay). Non-JS crawlers ignore it. For pages that must be
   * reliably excluded, use a server-side `X-Robots-Tag: noindex` header instead.
   */
  robots?: string;
}
