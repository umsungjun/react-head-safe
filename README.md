# react-head-safe

[![npm version](https://badge.fury.io/js/react-head-safe.svg)](https://www.npmjs.com/package/react-head-safe)
[![npm downloads](https://img.shields.io/npm/dm/react-head-safe.svg)](https://www.npmjs.com/package/react-head-safe)
[![codecov](https://codecov.io/gh/umsungjun/react-head-safe/branch/main/graph/badge.svg)](https://codecov.io/gh/umsungjun/react-head-safe)

[English](README.md) | [한국어](README.ko.md)

**A lightweight React head manager for client-side rendering (CSR) applications.**

Safely manage document title, meta tags, Open Graph tags, and SEO metadata without duplicates. Perfect for React SPAs, Vite, and Create React App projects.

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
- Remove any duplicate tags

## API Reference

### ReactHeadSafeProps

| Prop            | Type     | Description                                                          |
| --------------- | -------- | -------------------------------------------------------------------- |
| `title`         | `string` | The page title that will be set in the `document.title`              |
| `description`   | `string` | The meta description tag content for SEO                             |
| `keywords`      | `string` | The meta keywords tag content for SEO                                |
| `ogTitle`       | `string` | The Open Graph title (og:title) for social media sharing             |
| `ogDescription` | `string` | The Open Graph description (og:description) for social media sharing |
| `ogImage`       | `string` | The Open Graph image URL (og:image) for social media sharing         |

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
