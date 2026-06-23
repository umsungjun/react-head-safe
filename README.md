# react-head-safe

[![npm version](https://badge.fury.io/js/react-head-safe.svg)](https://www.npmjs.com/package/react-head-safe)
[![npm downloads](https://img.shields.io/npm/dm/react-head-safe.svg)](https://www.npmjs.com/package/react-head-safe)
[![codecov](https://codecov.io/gh/umsungjun/react-head-safe/branch/main/graph/badge.svg)](https://codecov.io/gh/umsungjun/react-head-safe)

[English](README.md) | [한국어](README.ko.md)

**A lightweight React head manager for client-side rendering (CSR) applications.**

Safely manage document title, meta tags, Open Graph tags, and SEO metadata without duplicates. Perfect for React SPAs, Vite, and Create React App projects.

## Important: SEO in CSR Applications

Since CSR apps run JavaScript on the client side, search engine crawlers and social media bots may not execute your JavaScript. This means **dynamically injected meta tags might not be recognized**.

For optimal SEO, always set default meta tags directly in your `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Default meta tags for crawlers that don't execute JavaScript -->
    <title>My App</title>
    <meta name="description" content="Default description for your app." />
    <meta property="og:title" content="My App" />
    <meta
      property="og:description"
      content="Default description for your app."
    />
    <meta property="og:image" content="https://example.com/default-image.jpg" />
    <meta property="og:url" content="https://example.com" />
    <meta property="og:type" content="website" />
    <link rel="canonical" href="https://example.com" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`react-head-safe` will **override these defaults at runtime** when JavaScript executes, allowing page-specific meta tags for each route. This two-layer approach ensures:

1. **Crawlers without JS execution** see meaningful default meta tags from `index.html`
2. **Crawlers with JS execution** (e.g., Googlebot) and **users** see page-specific meta tags set by `react-head-safe`

## Why react-head-safe?

A lightweight, CSR-focused alternative for managing document head elements in React. Perfect for simple client-side rendered applications that need:

- **Explicit duplicate prevention** - Always removes existing meta tags before adding new ones
- **Simplicity** - Just a single component with props, no complex setup
- **Performance** - Uses `useLayoutEffect` for synchronous DOM updates before paint
- **Type safety** - Written in TypeScript with full type definitions

## Features

- ✅ **No Duplicate Tags** - Removes existing meta tags before creating new ones
- ✅ **TypeScript Support** - Full type safety with TypeScript
- ✅ **Lightweight** - Zero dependencies except React
- ✅ **CSR Optimized** - Uses `useLayoutEffect` for synchronous DOM updates
- ✅ **Open Graph Support** - Built-in support for social media meta tags
- ✅ **Twitter Card Support** - Automatically sets Twitter tags when Open Graph tags are provided
- ✅ **Simple API** - Just pass props, no complex configuration

## Installation

Install via npm, yarn, or pnpm:

```bash
npm install react-head-safe
# or
yarn add react-head-safe
# or
pnpm add react-head-safe
```

Zero dependencies required (React is a peer dependency).

## Quick Start

Simply import and use the `ReactHeadSafe` component in your React pages:

```tsx
import { ReactHeadSafe } from 'react-head-safe';

function MyPage() {
  return (
    <>
      <ReactHeadSafe
        title="My Page Title"
        description="This is the page description for SEO."
        keywords="react,seo,meta tags"
        ogTitle="My Page Title for Social Media"
        ogDescription="This is the description for social media."
        ogImage="https://example.com/image.jpg"
        ogUrl="https://example.com/page"
        ogType="website"
        canonicalUrl="https://example.com/page"
      />
      <div>Your page content...</div>
    </>
  );
}
```

That's it! The component will automatically:

- Set the document title
- Add/update meta description and keywords
- Add/update Open Graph tags for social media
- Add/update Twitter Card tags (automatically generated from Open Graph tags)
- Add/update the canonical URL link tag
- Remove any duplicate tags

## API Reference

### ReactHeadSafeProps

| Prop             | Type     | Description                                                                                             |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `title`          | `string` | The page title that will be set in the `document.title`                                                 |
| `description`    | `string` | The meta description tag content for SEO                                                                |
| `keywords`       | `string` | The meta keywords tag content for SEO                                                                   |
| `ogTitle`        | `string` | The Open Graph title (og:title) for social media sharing                                                |
| `ogDescription`  | `string` | The Open Graph description (og:description) for social media sharing                                    |
| `ogImage`        | `string` | The Open Graph image URL (og:image) for social media sharing                                            |
| `ogUrl`          | `string` | The canonical URL of your object that will be used as its permanent ID in the graph (og:url)            |
| `ogType`         | `OgType` | The type of your object (og:type). Autocompletes 12 standard OG values; also accepts any string.        |
| `canonicalUrl`   | `string` | The canonical URL of the page for SEO (`<link rel="canonical">`)                                        |
| `ogSiteName`     | `string` | The site name for social media sharing (og:site_name)                                                   |
| `ogLocale`       | `string` | The locale of the content (og:locale), e.g. `"en_US"`, `"ko_KR"`                                        |
| `twitterSite`    | `string` | The Twitter @username of the website (twitter:site), e.g. `"@mysite"`                                   |
| `twitterCreator` | `string` | The Twitter @username of the content author (twitter:creator), e.g. `"@author"`                         |
| `robots`         | `string` | The robots meta tag content controlling crawler indexing, e.g. `"noindex,follow"`, `"noindex,nofollow"` |

> **Warning:** A JS-injected `robots="noindex"` is only honored by crawlers that render JavaScript (e.g. Googlebot, with delay). Non-JS crawlers (many bots, social preview crawlers) ignore it, so the page may still be indexed. For pages that must be reliably excluded from indexing, use a server-side `X-Robots-Tag: noindex` header instead.

### Twitter Card Support

When you set Open Graph tags, the corresponding Twitter Card tags are automatically generated:

| Open Graph Prop | Twitter Tag Generated                                  |
| --------------- | ------------------------------------------------------ |
| `ogTitle`       | `twitter:title`                                        |
| `ogDescription` | `twitter:description`                                  |
| `ogImage`       | `twitter:image` + `twitter:card` (summary_large_image) |

In addition, `twitterSite` and `twitterCreator` write directly to `twitter:site` and `twitter:creator` with no Open Graph equivalent.

### `OgType` standard values

`ogType` provides autocomplete for these 12 OG Protocol standard values while still accepting any custom string:

`'website'` · `'article'` · `'book'` · `'profile'` · `'video.movie'` · `'video.episode'` · `'video.tv_show'` · `'video.other'` · `'music.song'` · `'music.album'` · `'music.playlist'` · `'music.radio_station'`

You can also import the `OgType` type for use in your own code:

```tsx
import { ReactHeadSafe, type OgType } from 'react-head-safe';

const pageType: OgType = 'article';
```

## Behavior

### Automatic cleanup on unmount

When a `<ReactHeadSafe>` instance unmounts (e.g., during SPA page transitions), all meta and link tags it inserted are automatically removed from `<head>`. This prevents stale metadata from leaking between pages.

```tsx
// Before v1.7.0: og:image set on /home would persist on /about
// v1.7.0+:       cleanup removes og:image automatically when HomePage unmounts
<Route path="/home" element={<HomePage />} />    {/* uses ogImage */}
<Route path="/about" element={<AboutPage />} />  {/* no ogImage  */}
```

> **Note:** `document.title` is **not** restored on unmount. Since the next page's `<ReactHeadSafe>` typically overrides it immediately, restoring would cause a visible flash. If no subsequent instance sets `title`, the previous value remains.

### Removing a tag by passing `undefined`

If a prop transitions from a value to `undefined` on re-render, the corresponding tag is removed. This lets you conditionally drop a tag without unmounting the component:

```tsx
<ReactHeadSafe title="My Page" ogImage={isSharable ? shareImage : undefined} />
```

### What is NOT tracked

- **Tags present in `index.html` before React mounts** — `<ReactHeadSafe>` overwrites them on mount but does **not** restore them on unmount. Treat `index.html` as the "default" layer and `<ReactHeadSafe>` as the "override" layer.
- **Multiple simultaneous instances** — behavior is not guaranteed when two `<ReactHeadSafe>` instances target overlapping props at the same time. Use a single instance per page.

## Local Development

To test your local changes with the example application:

```bash
pnpm run example
```

## Testing

This project uses **Vitest** and **React Testing Library** for comprehensive unit testing with high code coverage.

### Running Tests

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the library
pnpm build

# Run example app
pnpm example
```

## License

[MIT](LICENSE) © [umsungjun](https://github.com/umsungjun)

---

**Keywords:** react head manager, react meta tags, react seo, open graph react, react helmet alternative, csr meta tags, spa seo, client-side rendering seo, react document head, vite meta tags
