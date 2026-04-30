# react-head-safe

[![npm version](https://badge.fury.io/js/react-head-safe.svg)](https://www.npmjs.com/package/react-head-safe)
[![npm downloads](https://img.shields.io/npm/dm/react-head-safe.svg)](https://www.npmjs.com/package/react-head-safe)
[![codecov](https://codecov.io/gh/umsungjun/react-head-safe/branch/main/graph/badge.svg)](https://codecov.io/gh/umsungjun/react-head-safe)

[English](README.md) | [한국어](README.ko.md)

**클라이언트 사이드 렌더링(CSR) 애플리케이션을 위한 가벼운 React head 매니저입니다.**

중복 없이 document title, meta 태그, Open Graph 태그, SEO 메타데이터를 안전하게 관리합니다. React SPA, Vite, Create React App 프로젝트에 완벽합니다.

## 중요: CSR 애플리케이션에서의 SEO

CSR 앱은 클라이언트에서 JavaScript를 실행하기 때문에, 검색 엔진 크롤러와 소셜 미디어 봇이 JavaScript를 실행하지 못할 수 있습니다. 이 경우 **동적으로 주입된 메타 태그가 인식되지 않을 수 있습니다.**

최적의 SEO를 위해 `index.html`에 항상 기본 메타 태그를 설정하세요:

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <!-- JavaScript를 실행하지 않는 크롤러를 위한 기본 메타 태그 -->
    <title>My App</title>
    <meta name="description" content="앱에 대한 기본 설명입니다." />
    <meta property="og:title" content="My App" />
    <meta property="og:description" content="앱에 대한 기본 설명입니다." />
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

`react-head-safe`는 JavaScript가 실행될 때 **이 기본값을 런타임에 덮어씁니다.** 이 두 단계 접근 방식은 다음을 보장합니다:

1. **JS를 실행하지 않는 크롤러**는 `index.html`의 기본 메타 태그를 인식
2. **JS를 실행하는 크롤러** (예: Googlebot)와 **사용자**는 `react-head-safe`가 설정한 페이지별 메타 태그를 인식

## 왜 react-head-safe인가요?

React에서 document head 요소를 관리하기 위한 가볍고 CSR에 최적화된 대안입니다. 다음과 같은 요구사항이 있는 간단한 클라이언트 사이드 렌더링 애플리케이션에 완벽합니다:

- **명시적 중복 방지** - 새로운 태그를 추가하기 전에 항상 기존 메타 태그를 제거합니다
- **간단함** - 복잡한 설정 없이 props만 전달하는 단일 컴포넌트
- **성능** - 페인트 전 동기적 DOM 업데이트를 위해 `useLayoutEffect` 사용
- **타입 안전성** - TypeScript로 작성되어 완전한 타입 정의 제공

## 주요 기능

- ✅ **중복 태그 없음** - 새 태그를 만들기 전에 기존 메타 태그 제거
- ✅ **TypeScript 지원** - TypeScript로 완전한 타입 안전성 제공
- ✅ **경량** - React 외에 의존성 제로
- ✅ **CSR 최적화** - 동기적 DOM 업데이트를 위해 `useLayoutEffect` 사용
- ✅ **Open Graph 지원** - 소셜 미디어 메타 태그 기본 지원
- ✅ **Twitter Card 지원** - Open Graph 태그 설정 시 Twitter 태그 자동 생성
- ✅ **간단한 API** - props만 전달하면 되는 복잡하지 않은 설정

## 설치

npm, yarn 또는 pnpm으로 설치:

```bash
npm install react-head-safe
# 또는
yarn add react-head-safe
# 또는
pnpm add react-head-safe
```

의존성 제로 (React는 peer dependency입니다).

## 빠른 시작

React 페이지에서 `ReactHeadSafe` 컴포넌트를 import하여 사용하세요:

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

이게 전부입니다! 컴포넌트가 자동으로:

- document title 설정
- meta description과 keywords 추가/업데이트
- 소셜 미디어용 Open Graph 태그 추가/업데이트
- Twitter Card 태그 추가/업데이트 (Open Graph 태그에서 자동 생성)
- canonical URL 링크 태그 추가/업데이트
- 중복 태그 제거

## API 레퍼런스

### ReactHeadSafeProps

| Prop             | Type     | Description                                                                 |
| ---------------- | -------- | --------------------------------------------------------------------------- |
| `title`          | `string` | `document.title`에 설정될 페이지 제목                                       |
| `description`    | `string` | SEO를 위한 메타 설명 태그 콘텐츠                                            |
| `keywords`       | `string` | SEO를 위한 메타 키워드 태그 콘텐츠                                          |
| `ogTitle`        | `string` | 소셜 미디어 공유를 위한 Open Graph 제목 (og:title)                          |
| `ogDescription`  | `string` | 소셜 미디어 공유를 위한 Open Graph 설명 (og:description)                    |
| `ogImage`        | `string` | 소셜 미디어 공유를 위한 Open Graph 이미지 URL (og:image)                    |
| `ogUrl`          | `string` | 소셜 미디어 공유를 위한 Open Graph URL (og:url)                             |
| `ogType`         | `string` | 소셜 미디어 공유를 위한 Open Graph 타입, 예: "website", "article" (og:type) |
| `canonicalUrl`   | `string` | SEO를 위한 페이지의 대표 URL (`<link rel="canonical">`)                     |
| `ogSiteName`     | `string` | 소셜 미디어 공유를 위한 사이트 이름 (og:site_name)                          |
| `ogLocale`       | `string` | 콘텐츠의 언어/지역 코드 (og:locale), 예: `"ko_KR"`, `"en_US"`               |
| `twitterSite`    | `string` | 웹사이트의 Twitter 계정 (twitter:site), 예: `"@mysite"`                     |
| `twitterCreator` | `string` | 콘텐츠 작성자의 Twitter 계정 (twitter:creator), 예: `"@author"`             |

### Twitter Card 지원

Open Graph 태그를 설정하면 해당하는 Twitter Card 태그가 자동으로 생성됩니다:

| Open Graph Prop | 생성되는 Twitter 태그                                  |
| --------------- | ------------------------------------------------------ |
| `ogTitle`       | `twitter:title`                                        |
| `ogDescription` | `twitter:description`                                  |
| `ogImage`       | `twitter:image` + `twitter:card` (summary_large_image) |

또한 `twitterSite`와 `twitterCreator`는 Open Graph 대응 항목 없이 `twitter:site`와 `twitter:creator`에 직접 씁니다.

## 동작 방식

### 언마운트 시 자동 정리

`<ReactHeadSafe>` 인스턴스가 언마운트될 때 (예: SPA 페이지 전환 시), 해당 인스턴스가 삽입한 모든 meta/link 태그가 `<head>`에서 자동으로 제거됩니다. 페이지 간 stale 메타데이터 유출을 방지합니다.

```tsx
// v1.7.0 이전: /home에서 설정한 og:image가 /about에도 남아있었음
// v1.7.0 이후: HomePage 언마운트 시 cleanup이 og:image를 자동 제거
<Route path="/home" element={<HomePage />} />    {/* ogImage 사용 */}
<Route path="/about" element={<AboutPage />} />  {/* ogImage 없음 */}
```

> **참고:** `document.title`은 언마운트 시 **복원되지 않습니다**. 다음 페이지의 `<ReactHeadSafe>`가 즉시 덮어쓰는 것이 일반적이기 때문에, 복원 시 순간적인 깜빡임이 발생할 수 있습니다. 후속 인스턴스가 `title`을 설정하지 않으면 이전 값이 남습니다.

### `undefined` 전달로 태그 제거하기

prop이 값에서 `undefined`로 변경되면 해당 태그가 제거됩니다. 컴포넌트를 언마운트하지 않고도 조건부로 태그를 빼고 싶을 때 사용하세요:

```tsx
<ReactHeadSafe title="My Page" ogImage={isSharable ? shareImage : undefined} />
```

### 추적하지 않는 항목

- **React 마운트 전에 `index.html`에 있던 태그** — `<ReactHeadSafe>`는 마운트 시 이들을 덮어쓰지만, 언마운트 시 **복원하지는 않습니다**. `index.html`은 "기본값" 계층으로, `<ReactHeadSafe>`는 "덮어쓰기" 계층으로 이해해주세요.
- **동시에 여러 개의 `<ReactHeadSafe>` 인스턴스** — 두 인스턴스가 겹치는 prop을 동시에 설정하는 경우 동작을 보장하지 않습니다. 페이지당 하나의 인스턴스만 사용하세요.

## 로컬 개발

예제 애플리케이션으로 로컬 변경사항을 테스트하려면:

```bash
pnpm run example
```

## 테스트

이 프로젝트는 높은 코드 커버리지를 가진 포괄적인 단위 테스트를 위해 **Vitest**와 **React Testing Library**를 사용합니다.

### 테스트 실행

```bash
# 테스트 한 번 실행
pnpm test

# watch 모드로 테스트 실행
pnpm test:watch

# 커버리지와 함께 테스트 실행
pnpm test:coverage

# UI 모드로 테스트 실행
pnpm test:ui
```

## 기여하기

기여를 환영합니다! Pull Request를 자유롭게 제출해주세요.

### 개발

```bash
# 의존성 설치
pnpm install

# 테스트 실행
pnpm test

# 라이브러리 빌드
pnpm build

# 예제 앱 실행
pnpm example
```

## 라이선스

[MIT](LICENSE) © [umsungjun](https://github.com/umsungjun)

---

**키워드:** react head manager, react meta tags, react seo, open graph react, react helmet alternative, csr meta tags, spa seo, client-side rendering seo, react document head, vite meta tags
