# react-head-safe

[![npm version](https://badge.fury.io/js/react-head-safe.svg)](https://www.npmjs.com/package/react-head-safe)
[![npm downloads](https://img.shields.io/npm/dm/react-head-safe.svg)](https://www.npmjs.com/package/react-head-safe)
[![codecov](https://codecov.io/gh/umsungjun/react-head-safe/branch/main/graph/badge.svg)](https://codecov.io/gh/umsungjun/react-head-safe)

[English](README.md) | [한국어](README.ko.md)

**클라이언트 사이드 렌더링(CSR) 애플리케이션을 위한 가벼운 React head 매니저입니다.**

중복 없이 document title, meta 태그, Open Graph 태그, SEO 메타데이터를 안전하게 관리합니다. React SPA, Vite, Create React App 프로젝트에 완벽합니다.

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
- 중복 태그 제거

## API 레퍼런스

### ReactHeadSafeProps

| Prop            | Type     | Description                                                                 |
| --------------- | -------- | --------------------------------------------------------------------------- |
| `title`         | `string` | `document.title`에 설정될 페이지 제목                                       |
| `description`   | `string` | SEO를 위한 메타 설명 태그 콘텐츠                                            |
| `keywords`      | `string` | SEO를 위한 메타 키워드 태그 콘텐츠                                          |
| `ogTitle`       | `string` | 소셜 미디어 공유를 위한 Open Graph 제목 (og:title)                          |
| `ogDescription` | `string` | 소셜 미디어 공유를 위한 Open Graph 설명 (og:description)                    |
| `ogImage`       | `string` | 소셜 미디어 공유를 위한 Open Graph 이미지 URL (og:image)                    |
| `ogUrl`         | `string` | 소셜 미디어 공유를 위한 Open Graph URL (og:url)                             |
| `ogType`        | `string` | 소셜 미디어 공유를 위한 Open Graph 타입, 예: "website", "article" (og:type) |

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
