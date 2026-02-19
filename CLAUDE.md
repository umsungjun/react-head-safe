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

Twitter Card tags are automatically derived from OG props — there are no separate Twitter-specific props. The exact mapping is:

| OG prop | Also writes |
|---|---|
| `ogTitle` | `twitter:title` |
| `ogDescription` | `twitter:description` |
| `ogImage` | `twitter:image` + `twitter:card` (hardcoded to `summary_large_image`) |
| `ogUrl`, `ogType` | *(no Twitter equivalent)* |

### Adding a new prop

When adding a new meta tag prop, update all four of these locations:

1. `src/types.ts` — add the prop to `ReactHeadSafeProps`
2. `src/ReactHeadSafe.tsx` — destructure the prop, add `updateMetaTag()` call(s) inside `useLayoutEffect`, and add it to the dependency array
3. `src/test/ReactHeadSafe.test.tsx` — add tests (creation, update on re-render, duplicate prevention)

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
