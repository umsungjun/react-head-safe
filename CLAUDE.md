# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm build          # Build library to dist/ (CJS + ESM + .d.ts)
pnpm test           # Run tests once
pnpm test:watch     # Run tests in watch mode
pnpm test:coverage  # Generate coverage report
pnpm test:ui        # Interactive Vitest UI
pnpm format         # Format with Prettier
pnpm example        # Run the basic example app

# Run a specific test by name pattern
pnpm vitest run -t "test name pattern"
```

## Architecture

**react-head-safe** is a single-component library for managing `<head>` elements in CSR React apps. It is intentionally CSR-only — not SSR compatible.

### Core flow

1. `src/types.ts` — defines `ReactHeadSafeProps` (all optional strings)
2. `src/ReactHeadSafe.tsx` — the only component; uses `useLayoutEffect` to synchronously mutate the DOM before paint
3. `src/index.ts` — re-exports the component and its props type

The component returns `null` (no DOM output). The `updateMetaTag()` helper removes any existing matching `<meta>` element before inserting the new one, preventing duplicates.

The `useLayoutEffect` tracks the selectors it inserts in a local `insertedSelectors` array and returns a cleanup function that removes them. This runs when deps change (handling prop → `undefined` transitions) and on unmount (preventing stale metadata across SPA page transitions). `document.title` is intentionally not restored on cleanup.

Most Twitter Card tags are automatically derived from OG props:

| OG prop           | Also writes                                                           |
| ----------------- | --------------------------------------------------------------------- |
| `ogTitle`         | `twitter:title`                                                       |
| `ogDescription`   | `twitter:description`                                                 |
| `ogImage`         | `twitter:image` + `twitter:card` (hardcoded to `summary_large_image`) |
| `ogUrl`, `ogType` | _(no Twitter equivalent)_                                             |

`twitterSite` and `twitterCreator` are standalone Twitter-only props with no Open Graph equivalent — they write directly to `twitter:site` and `twitter:creator`.

### Adding a new prop

When adding a new meta tag prop, update all four of these locations:

1. `src/types.ts` — add the prop to `ReactHeadSafeProps`
2. `src/ReactHeadSafe.tsx` — destructure the prop, add `updateMetaTag()` call(s) inside `useLayoutEffect`, **push the corresponding selector(s) to `insertedSelectors` so cleanup removes them**, and add the prop to the dependency array
3. `src/test/ReactHeadSafe.test.tsx` — add tests (creation, update on re-render, duplicate prevention, **removal on unmount**, **removal when prop transitions to `undefined`**)
4. `README.md` and `README.ko.md` — add the prop to the API Reference table

### Code style

Write all code comments in English — this overrides the global "Korean comments" rule. The library is published to npm for an international audience, so in-source comments must be English. User-facing documentation in README may still include a Korean translation (`README.ko.md`).

### Build output

Vite is configured in library mode and produces:

- `dist/index.js` — CommonJS
- `dist/index.mjs` — ESM
- `dist/index.d.ts` — TypeScript declarations

React and ReactDOM are externalized (peer dependencies).

### Testing

Tests run in `jsdom`. The setup file (`src/test/setup.ts`) resets `document.head.innerHTML` and `document.title` after each test. Test coverage is uploaded to Codecov via CI.

### Package manager

This project uses `pnpm` and requires Node 20.x (see `.nvmrc`). Use `pnpm` for all install/run commands, not `npm` or `yarn`.
