# react-head-safe

[English](README.md) | [한국어](README.ko.md)

중복 메타 태그를 방지하고 document head 요소를 안전하게 관리하는 CSR 전용 React head 매니저입니다.

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

[![npm version](https://badge.fury.io/js/react-head-safe.svg)](https://www.npmjs.com/package/react-head-safe)

```bash
npm install react-head-safe
# 또는
yarn add react-head-safe
# 또는
pnpm add react-head-safe
```

## 사용법

```tsx
import { ReactHeadSafe } from 'react-head-safe';

function MyPage() {
  return (
    <>
      <ReactHeadSafe
        title="내 페이지 제목"
        description="SEO를 위한 페이지 설명입니다."
        keywords="react,seo,meta tags"
        ogTitle="소셜 미디어용 페이지 제목"
        ogDescription="소셜 미디어용 설명입니다."
        ogImage="https://example.com/image.jpg"
      />
      <div>페이지 콘텐츠...</div>
    </>
  );
}
```

## API

### ReactHeadSafeProps

| Prop            | Type     | Description                                              |
| --------------- | -------- | -------------------------------------------------------- |
| `title`         | `string` | `document.title`에 설정될 페이지 제목                    |
| `description`   | `string` | SEO를 위한 메타 설명 태그 콘텐츠                         |
| `keywords`      | `string` | SEO를 위한 메타 키워드 태그 콘텐츠                       |
| `ogTitle`       | `string` | 소셜 미디어 공유를 위한 Open Graph 제목 (og:title)       |
| `ogDescription` | `string` | 소셜 미디어 공유를 위한 Open Graph 설명 (og:description) |
| `ogImage`       | `string` | 소셜 미디어 공유를 위한 Open Graph 이미지 URL (og:image) |

## 언제 사용해야 하나요?

**다음과 같은 경우 react-head-safe를 사용하세요:**

- CSR 전용 애플리케이션을 구축하는 경우 (Create React App, Vite 등)
- 최소한의 설정으로 간단하고 가벼운 솔루션을 원하는 경우
- 중복 메타 태그 방지에 대한 명시적 제어가 필요한 경우
- 동기적 DOM 업데이트를 위해 `useLayoutEffect`를 선호하는 경우

**다음과 같은 경우 대안을 사용하세요:**

- SSR/SSG 지원이 필요한 경우 → `react-helmet-async`, Next.js `<Head>`, Remix `<Meta>` 사용
- 중첩 컴포넌트나 중복 제거 로직 같은 고급 기능이 필요한 경우
- head 관리 기능이 내장된 프레임워크를 이미 사용 중인 경우

## 왜 CSR 전용인가요?

이 라이브러리는 **클라이언트 사이드 렌더링(CSR)** 애플리케이션을 위해 특별히 설계되었습니다. 서버 사이드 렌더링(SSR) 지원이 필요하다면 다음을 고려하세요:

- SSR용 `react-helmet-async`
- Next.js 내장 `<Head>` 컴포넌트
- Remix `<Meta>` 컴포넌트

## 로컬 개발

예제 애플리케이션으로 로컬 변경사항을 테스트하려면:

```bash
pnpm run example
```

이 명령은 라이브러리의 로컬 버전을 사용하여 예제 프로젝트를 실행하므로, 게시하기 전에 수정한 내용을 테스트할 수 있습니다.

## 테스트

[![codecov](https://codecov.io/gh/umsungjun/react-head-safe/branch/main/graph/badge.svg)](https://codecov.io/gh/umsungjun/react-head-safe)

이 프로젝트는 단위 테스트를 위해 **Vitest**와 **React Testing Library**를 사용합니다.

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

### CI/CD

이 프로젝트는 지속적 통합을 위해 GitHub Actions를 사용합니다:

- ✅ **자동화된 테스트** - 모든 PR과 main 브랜치 push 시 테스트 실행
- ✅ **Node.js 20.x** - Node.js 20.x (LTS) 버전으로 테스트
- ✅ **빌드 검증** - 패키지가 올바르게 빌드되는지 확인
- ✅ **브랜치 보호** - main 브랜치에 머지하기 전에 테스트 통과 필수

PR이 main 브랜치에 머지되기 전에 모든 테스트를 통과해야 합니다.

## 라이선스

[MIT](LICENSE)

## 기여하기

기여를 환영합니다! Pull Request를 자유롭게 제출해주세요.
