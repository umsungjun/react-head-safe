# React Head Safe Examples

## 🚀 Basic Example

The basic example is an interactive demo application that showcases all features of React Head Safe with real routing using React Router.

### Running the Example

```bash
cd examples/basic
pnpm install
pnpm dev
```

The browser will automatically open at http://localhost:3000

### Features Demonstrated

This example includes three pages (Home, About, Contact) with:

1. **Title Updates**: Browser tab title changes dynamically when navigating between pages
2. **Meta Tags**: Real-time updates of meta tags in the document `<head>`
3. **Duplicate Prevention**: Ensures no duplicate meta tags are created
4. **Open Graph**: Proper og:title, og:description, and og:image tags for social media sharing
5. **SEO-friendly**: Description and keywords meta tags for search engines

### Testing in DevTools

1. Open DevTools (F12 or Cmd+Opt+I)
2. Navigate to the **Elements** tab
3. Expand the `<head>` element
4. Click through different pages (Home → About → Contact)
5. Watch the meta tags update in real-time without creating duplicates

### What to Look For

- ✅ `<title>` changes for each page
- ✅ `<meta name="description">` content updates
- ✅ `<meta name="keywords">` content updates
- ✅ `<meta property="og:title">` updates
- ✅ `<meta property="og:description">` updates
- ✅ `<meta property="og:image">` updates (different colored placeholders per page)
- ✅ No duplicate meta tags accumulate in the DOM

### Technology Stack

- React 18
- React Router DOM v6
- Vite
- TypeScript
- React Head Safe
