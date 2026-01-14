# react-head-safe

[English](README.md) | [한국어](README.ko.md)

A CSR-only React head manager that prevents duplicate meta tags and safely manages document head elements.

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

[![npm version](https://badge.fury.io/js/react-head-safe.svg)](https://www.npmjs.com/package/react-head-safe)

```bash
npm install react-head-safe
# or
yarn add react-head-safe
# or
pnpm add react-head-safe
```

## Usage

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

## API

### ReactHeadSafeProps

| Prop            | Type     | Description                                                          |
| --------------- | -------- | -------------------------------------------------------------------- |
| `title`         | `string` | The page title that will be set in the `document.title`              |
| `description`   | `string` | The meta description tag content for SEO                             |
| `keywords`      | `string` | The meta keywords tag content for SEO                                |
| `ogTitle`       | `string` | The Open Graph title (og:title) for social media sharing             |
| `ogDescription` | `string` | The Open Graph description (og:description) for social media sharing |
| `ogImage`       | `string` | The Open Graph image URL (og:image) for social media sharing         |

## When to Use

**Use react-head-safe if:**

- You're building a CSR-only application (Create React App, Vite, etc.)
- You want a simple, lightweight solution with minimal setup
- You need explicit control over duplicate meta tag prevention
- You prefer `useLayoutEffect` for synchronous DOM updates

**Use alternatives if:**

- You need SSR/SSG support → use `react-helmet-async`, Next.js `<Head>`, or Remix `<Meta>`
- You need advanced features like nested components or deduplication logic
- You're already using a framework with built-in head management

## Why CSR Only?

This library is specifically designed for **Client-Side Rendering (CSR)** applications. If you need Server-Side Rendering (SSR) support, consider using:

- `react-helmet-async` for SSR
- Next.js built-in `<Head>` component
- Remix `<Meta>` component

## Local Development

To test your local changes with the example application:

```bash
pnpm run example
```

## Testing

[![codecov](https://codecov.io/gh/umsungjun/react-head-safe/branch/main/graph/badge.svg)](https://codecov.io/gh/umsungjun/react-head-safe)

This project uses **Vitest** and **React Testing Library** for unit testing.

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

### CI/CD

The project uses GitHub Actions for continuous integration:

- ✅ **Automated Testing** - Tests run on every PR and push to main
- ✅ **Node.js 20.x** - Tests against Node.js 20.x (LTS)
- ✅ **Build Verification** - Ensures the package builds correctly
- ✅ **Branch Protection** - Tests must pass before merging to main

All tests must pass before a PR can be merged to the main branch.

This command will run the example project using your local version of the library, allowing you to test any modifications you've made before publishing.

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
