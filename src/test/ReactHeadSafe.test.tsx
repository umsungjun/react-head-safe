import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { ReactHeadSafe } from '../ReactHeadSafe';

describe('ReactHeadSafe', () => {
  beforeEach(() => {
    // Reset document head before each test
    document.head.innerHTML = '';
    document.title = '';
  });

  describe('title', () => {
    it('should set document title', () => {
      render(<ReactHeadSafe title="Test Title" />);
      expect(document.title).toBe('Test Title');
    });

    it('should update document title when prop changes', () => {
      const { rerender } = render(<ReactHeadSafe title="Initial Title" />);
      expect(document.title).toBe('Initial Title');

      rerender(<ReactHeadSafe title="Updated Title" />);
      expect(document.title).toBe('Updated Title');
    });

    it('should not change document title when title prop is undefined', () => {
      document.title = 'Existing Title';
      render(<ReactHeadSafe description="Some description" />);
      expect(document.title).toBe('Existing Title');
    });
  });

  describe('description meta tag', () => {
    it('should create description meta tag', () => {
      render(<ReactHeadSafe description="Test Description" />);

      const metaTag = document.querySelector('meta[name="description"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('Test Description');
    });

    it('should update description meta tag when prop changes', () => {
      const { rerender } = render(
        <ReactHeadSafe description="Initial Description" />
      );

      let metaTag = document.querySelector('meta[name="description"]');
      expect(metaTag?.getAttribute('content')).toBe('Initial Description');

      rerender(<ReactHeadSafe description="Updated Description" />);

      metaTag = document.querySelector('meta[name="description"]');
      expect(metaTag?.getAttribute('content')).toBe('Updated Description');
    });

    it('should prevent duplicate description meta tags', () => {
      const { rerender } = render(
        <ReactHeadSafe description="First Description" />
      );
      rerender(<ReactHeadSafe description="Second Description" />);

      const metaTags = document.querySelectorAll('meta[name="description"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('Second Description');
    });
  });

  describe('keywords meta tag', () => {
    it('should create keywords meta tag', () => {
      render(<ReactHeadSafe keywords="react, testing, vitest" />);

      const metaTag = document.querySelector('meta[name="keywords"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('react, testing, vitest');
    });

    it('should update keywords meta tag when prop changes', () => {
      const { rerender } = render(
        <ReactHeadSafe keywords="initial, keywords" />
      );

      let metaTag = document.querySelector('meta[name="keywords"]');
      expect(metaTag?.getAttribute('content')).toBe('initial, keywords');

      rerender(<ReactHeadSafe keywords="updated, keywords" />);

      metaTag = document.querySelector('meta[name="keywords"]');
      expect(metaTag?.getAttribute('content')).toBe('updated, keywords');
    });

    it('should prevent duplicate keywords meta tags', () => {
      const { rerender } = render(<ReactHeadSafe keywords="first" />);
      rerender(<ReactHeadSafe keywords="second" />);

      const metaTags = document.querySelectorAll('meta[name="keywords"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('second');
    });
  });

  describe('Open Graph tags', () => {
    it('should create og:title meta tag', () => {
      render(<ReactHeadSafe ogTitle="OG Test Title" />);

      const metaTag = document.querySelector('meta[property="og:title"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('OG Test Title');
    });

    it('should create og:description meta tag', () => {
      render(<ReactHeadSafe ogDescription="OG Test Description" />);

      const metaTag = document.querySelector('meta[property="og:description"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('OG Test Description');
    });

    it('should create og:image meta tag', () => {
      render(<ReactHeadSafe ogImage="https://example.com/image.jpg" />);

      const metaTag = document.querySelector('meta[property="og:image"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe(
        'https://example.com/image.jpg'
      );
    });

    it('should create og:url meta tag', () => {
      render(<ReactHeadSafe ogUrl="https://example.com/page" />);

      const metaTag = document.querySelector('meta[property="og:url"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('https://example.com/page');
    });

    it('should create og:type meta tag', () => {
      render(<ReactHeadSafe ogType="website" />);

      const metaTag = document.querySelector('meta[property="og:type"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('website');
    });

    it('should prevent duplicate og:title meta tags', () => {
      const { rerender } = render(<ReactHeadSafe ogTitle="First OG Title" />);
      rerender(<ReactHeadSafe ogTitle="Second OG Title" />);

      const metaTags = document.querySelectorAll('meta[property="og:title"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('Second OG Title');
    });

    it('should prevent duplicate og:description meta tags', () => {
      const { rerender } = render(
        <ReactHeadSafe ogDescription="First OG Description" />
      );
      rerender(<ReactHeadSafe ogDescription="Second OG Description" />);

      const metaTags = document.querySelectorAll(
        'meta[property="og:description"]'
      );
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('Second OG Description');
    });

    it('should prevent duplicate og:image meta tags', () => {
      const { rerender } = render(
        <ReactHeadSafe ogImage="https://example.com/first.jpg" />
      );
      rerender(<ReactHeadSafe ogImage="https://example.com/second.jpg" />);

      const metaTags = document.querySelectorAll('meta[property="og:image"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe(
        'https://example.com/second.jpg'
      );
    });

    it('should prevent duplicate og:url meta tags', () => {
      const { rerender } = render(<ReactHeadSafe ogUrl="https://site.com/1" />);
      rerender(<ReactHeadSafe ogUrl="https://site.com/2" />);

      const metaTags = document.querySelectorAll('meta[property="og:url"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('https://site.com/2');
    });

    it('should prevent duplicate og:type meta tags', () => {
      const { rerender } = render(<ReactHeadSafe ogType="website" />);
      rerender(<ReactHeadSafe ogType="website" />);

      const metaTags = document.querySelectorAll('meta[property="og:type"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('website');
    });
  });

  describe('Twitter tags', () => {
    it('should create twitter:title meta tag when ogTitle is set', () => {
      render(<ReactHeadSafe ogTitle="Twitter Test Title" />);

      const metaTag = document.querySelector('meta[name="twitter:title"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('Twitter Test Title');
    });

    it('should create twitter:description meta tag when ogDescription is set', () => {
      render(<ReactHeadSafe ogDescription="Twitter Test Description" />);

      const metaTag = document.querySelector(
        'meta[name="twitter:description"]'
      );
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('Twitter Test Description');
    });

    it('should create twitter:image meta tag when ogImage is set', () => {
      render(<ReactHeadSafe ogImage="https://example.com/twitter-image.jpg" />);

      const metaTag = document.querySelector('meta[name="twitter:image"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe(
        'https://example.com/twitter-image.jpg'
      );
    });

    it('should create twitter:card meta tag with summary_large_image when ogImage is set', () => {
      render(<ReactHeadSafe ogImage="https://example.com/image.jpg" />);

      const metaTag = document.querySelector('meta[name="twitter:card"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('summary_large_image');
    });

    it('should prevent duplicate twitter:title meta tags', () => {
      const { rerender } = render(
        <ReactHeadSafe ogTitle="First Twitter Title" />
      );
      rerender(<ReactHeadSafe ogTitle="Second Twitter Title" />);

      const metaTags = document.querySelectorAll('meta[name="twitter:title"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('Second Twitter Title');
    });

    it('should prevent duplicate twitter:description meta tags', () => {
      const { rerender } = render(
        <ReactHeadSafe ogDescription="First Twitter Description" />
      );
      rerender(<ReactHeadSafe ogDescription="Second Twitter Description" />);

      const metaTags = document.querySelectorAll(
        'meta[name="twitter:description"]'
      );
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe(
        'Second Twitter Description'
      );
    });

    it('should prevent duplicate twitter:image meta tags', () => {
      const { rerender } = render(
        <ReactHeadSafe ogImage="https://example.com/first.jpg" />
      );
      rerender(<ReactHeadSafe ogImage="https://example.com/second.jpg" />);

      const metaTags = document.querySelectorAll('meta[name="twitter:image"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe(
        'https://example.com/second.jpg'
      );
    });

    it('should prevent duplicate twitter:card meta tags', () => {
      const { rerender } = render(
        <ReactHeadSafe ogImage="https://example.com/first.jpg" />
      );
      rerender(<ReactHeadSafe ogImage="https://example.com/second.jpg" />);

      const metaTags = document.querySelectorAll('meta[name="twitter:card"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('summary_large_image');
    });

    it('should set both og and twitter tags together', () => {
      render(
        <ReactHeadSafe
          ogTitle="Shared Title"
          ogDescription="Shared Description"
          ogImage="https://example.com/shared.jpg"
        />
      );

      // OG tags
      expect(
        document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute('content')
      ).toBe('Shared Title');
      expect(
        document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute('content')
      ).toBe('Shared Description');
      expect(
        document
          .querySelector('meta[property="og:image"]')
          ?.getAttribute('content')
      ).toBe('https://example.com/shared.jpg');

      // Twitter tags
      expect(
        document
          .querySelector('meta[name="twitter:title"]')
          ?.getAttribute('content')
      ).toBe('Shared Title');
      expect(
        document
          .querySelector('meta[name="twitter:description"]')
          ?.getAttribute('content')
      ).toBe('Shared Description');
      expect(
        document
          .querySelector('meta[name="twitter:image"]')
          ?.getAttribute('content')
      ).toBe('https://example.com/shared.jpg');
      expect(
        document
          .querySelector('meta[name="twitter:card"]')
          ?.getAttribute('content')
      ).toBe('summary_large_image');
    });
  });

  describe('canonical URL', () => {
    it('should create link rel="canonical" tag', () => {
      render(<ReactHeadSafe canonicalUrl="https://example.com/page" />);

      const linkTag = document.querySelector('link[rel="canonical"]');
      expect(linkTag).toBeInTheDocument();
      expect(linkTag?.getAttribute('href')).toBe('https://example.com/page');
    });

    it('should update canonical URL when prop changes', () => {
      const { rerender } = render(
        <ReactHeadSafe canonicalUrl="https://example.com/page-1" />
      );

      let linkTag = document.querySelector('link[rel="canonical"]');
      expect(linkTag?.getAttribute('href')).toBe('https://example.com/page-1');

      rerender(<ReactHeadSafe canonicalUrl="https://example.com/page-2" />);

      linkTag = document.querySelector('link[rel="canonical"]');
      expect(linkTag?.getAttribute('href')).toBe('https://example.com/page-2');
    });

    it('should prevent duplicate canonical link tags', () => {
      const { rerender } = render(
        <ReactHeadSafe canonicalUrl="https://example.com/first" />
      );
      rerender(<ReactHeadSafe canonicalUrl="https://example.com/second" />);

      const linkTags = document.querySelectorAll('link[rel="canonical"]');
      expect(linkTags).toHaveLength(1);
      expect(linkTags[0].getAttribute('href')).toBe(
        'https://example.com/second'
      );
    });
  });

  describe('multiple props', () => {
    it('should handle all props together', () => {
      render(
        <ReactHeadSafe
          title="Complete Test"
          description="Test Description"
          keywords="test, keywords"
          ogTitle="OG Title"
          ogDescription="OG Description"
          ogImage="https://example.com/image.jpg"
          ogUrl="https://example.com/page"
          ogType="website"
          canonicalUrl="https://example.com/page"
        />
      );

      expect(document.title).toBe('Complete Test');
      expect(
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute('content')
      ).toBe('Test Description');
      expect(
        document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute('content')
      ).toBe('OG Title');
      expect(
        document
          .querySelector('meta[property="og:url"]')
          ?.getAttribute('content')
      ).toBe('https://example.com/page');
      expect(
        document
          .querySelector('meta[property="og:type"]')
          ?.getAttribute('content')
      ).toBe('website');
      expect(
        document.querySelector('link[rel="canonical"]')?.getAttribute('href')
      ).toBe('https://example.com/page');
    });

    it('should update only changed props', () => {
      const { rerender } = render(
        <ReactHeadSafe title="Initial Title" ogUrl="https://example.com/1" />
      );

      expect(document.title).toBe('Initial Title');
      expect(
        document
          .querySelector('meta[property="og:url"]')
          ?.getAttribute('content')
      ).toBe('https://example.com/1');

      rerender(
        <ReactHeadSafe title="Updated Title" ogUrl="https://example.com/1" />
      );

      expect(document.title).toBe('Updated Title');
      expect(
        document
          .querySelector('meta[property="og:url"]')
          ?.getAttribute('content')
      ).toBe('https://example.com/1');
    });
  });

  describe('component behavior', () => {
    it('should render null', () => {
      const { container } = render(<ReactHeadSafe title="Test" />);
      expect(container.firstChild).toBeNull();
    });

    it('should work with React 17+ (no children required)', () => {
      expect(() => {
        render(<ReactHeadSafe title="Test" />);
      }).not.toThrow();
    });
  });

  describe('og:site_name meta tag', () => {
    it('should create og:site_name meta tag', () => {
      render(<ReactHeadSafe ogSiteName="My Site" />);

      const metaTag = document.querySelector('meta[property="og:site_name"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('My Site');
    });

    it('should update og:site_name meta tag when prop changes', () => {
      const { rerender } = render(<ReactHeadSafe ogSiteName="Initial Site" />);
      rerender(<ReactHeadSafe ogSiteName="Updated Site" />);

      const metaTag = document.querySelector('meta[property="og:site_name"]');
      expect(metaTag?.getAttribute('content')).toBe('Updated Site');
    });

    it('should prevent duplicate og:site_name meta tags', () => {
      const { rerender } = render(<ReactHeadSafe ogSiteName="First" />);
      rerender(<ReactHeadSafe ogSiteName="Second" />);

      const metaTags = document.querySelectorAll(
        'meta[property="og:site_name"]'
      );
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('Second');
    });

    it('should remove og:site_name meta tag on unmount', () => {
      const { unmount } = render(<ReactHeadSafe ogSiteName="My Site" />);
      unmount();

      expect(
        document.querySelector('meta[property="og:site_name"]')
      ).not.toBeInTheDocument();
    });

    it('should remove og:site_name meta tag when prop becomes undefined', () => {
      const { rerender } = render(<ReactHeadSafe ogSiteName="My Site" />);
      rerender(<ReactHeadSafe />);

      expect(
        document.querySelector('meta[property="og:site_name"]')
      ).not.toBeInTheDocument();
    });
  });

  describe('og:locale meta tag', () => {
    it('should create og:locale meta tag', () => {
      render(<ReactHeadSafe ogLocale="ko_KR" />);

      const metaTag = document.querySelector('meta[property="og:locale"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('ko_KR');
    });

    it('should update og:locale meta tag when prop changes', () => {
      const { rerender } = render(<ReactHeadSafe ogLocale="ko_KR" />);
      rerender(<ReactHeadSafe ogLocale="en_US" />);

      const metaTag = document.querySelector('meta[property="og:locale"]');
      expect(metaTag?.getAttribute('content')).toBe('en_US');
    });

    it('should prevent duplicate og:locale meta tags', () => {
      const { rerender } = render(<ReactHeadSafe ogLocale="ko_KR" />);
      rerender(<ReactHeadSafe ogLocale="en_US" />);

      const metaTags = document.querySelectorAll('meta[property="og:locale"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('en_US');
    });

    it('should remove og:locale meta tag on unmount', () => {
      const { unmount } = render(<ReactHeadSafe ogLocale="ko_KR" />);
      unmount();

      expect(
        document.querySelector('meta[property="og:locale"]')
      ).not.toBeInTheDocument();
    });

    it('should remove og:locale meta tag when prop becomes undefined', () => {
      const { rerender } = render(<ReactHeadSafe ogLocale="ko_KR" />);
      rerender(<ReactHeadSafe />);

      expect(
        document.querySelector('meta[property="og:locale"]')
      ).not.toBeInTheDocument();
    });
  });

  describe('twitter:site meta tag', () => {
    it('should create twitter:site meta tag', () => {
      render(<ReactHeadSafe twitterSite="@mysite" />);

      const metaTag = document.querySelector('meta[name="twitter:site"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('@mysite');
    });

    it('should update twitter:site meta tag when prop changes', () => {
      const { rerender } = render(<ReactHeadSafe twitterSite="@oldsite" />);
      rerender(<ReactHeadSafe twitterSite="@newsite" />);

      const metaTag = document.querySelector('meta[name="twitter:site"]');
      expect(metaTag?.getAttribute('content')).toBe('@newsite');
    });

    it('should prevent duplicate twitter:site meta tags', () => {
      const { rerender } = render(<ReactHeadSafe twitterSite="@first" />);
      rerender(<ReactHeadSafe twitterSite="@second" />);

      const metaTags = document.querySelectorAll('meta[name="twitter:site"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('@second');
    });

    it('should remove twitter:site meta tag on unmount', () => {
      const { unmount } = render(<ReactHeadSafe twitterSite="@mysite" />);
      unmount();

      expect(
        document.querySelector('meta[name="twitter:site"]')
      ).not.toBeInTheDocument();
    });

    it('should remove twitter:site meta tag when prop becomes undefined', () => {
      const { rerender } = render(<ReactHeadSafe twitterSite="@mysite" />);
      rerender(<ReactHeadSafe />);

      expect(
        document.querySelector('meta[name="twitter:site"]')
      ).not.toBeInTheDocument();
    });
  });

  describe('twitter:creator meta tag', () => {
    it('should create twitter:creator meta tag', () => {
      render(<ReactHeadSafe twitterCreator="@author" />);

      const metaTag = document.querySelector('meta[name="twitter:creator"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('@author');
    });

    it('should update twitter:creator meta tag when prop changes', () => {
      const { rerender } = render(<ReactHeadSafe twitterCreator="@old" />);
      rerender(<ReactHeadSafe twitterCreator="@new" />);

      const metaTag = document.querySelector('meta[name="twitter:creator"]');
      expect(metaTag?.getAttribute('content')).toBe('@new');
    });

    it('should prevent duplicate twitter:creator meta tags', () => {
      const { rerender } = render(<ReactHeadSafe twitterCreator="@first" />);
      rerender(<ReactHeadSafe twitterCreator="@second" />);

      const metaTags = document.querySelectorAll(
        'meta[name="twitter:creator"]'
      );
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('@second');
    });

    it('should remove twitter:creator meta tag on unmount', () => {
      const { unmount } = render(<ReactHeadSafe twitterCreator="@author" />);
      unmount();

      expect(
        document.querySelector('meta[name="twitter:creator"]')
      ).not.toBeInTheDocument();
    });

    it('should remove twitter:creator meta tag when prop becomes undefined', () => {
      const { rerender } = render(<ReactHeadSafe twitterCreator="@author" />);
      rerender(<ReactHeadSafe />);

      expect(
        document.querySelector('meta[name="twitter:creator"]')
      ).not.toBeInTheDocument();
    });
  });

  describe('robots meta tag', () => {
    it('should create robots meta tag', () => {
      render(<ReactHeadSafe robots="noindex,follow" />);

      const metaTag = document.querySelector('meta[name="robots"]');
      expect(metaTag).toBeInTheDocument();
      expect(metaTag?.getAttribute('content')).toBe('noindex,follow');
    });

    it('should update robots meta tag when prop changes', () => {
      const { rerender } = render(<ReactHeadSafe robots="noindex,follow" />);
      rerender(<ReactHeadSafe robots="noindex,nofollow" />);

      const metaTag = document.querySelector('meta[name="robots"]');
      expect(metaTag?.getAttribute('content')).toBe('noindex,nofollow');
    });

    it('should prevent duplicate robots meta tags', () => {
      const { rerender } = render(<ReactHeadSafe robots="noindex,follow" />);
      rerender(<ReactHeadSafe robots="noindex,nofollow" />);

      const metaTags = document.querySelectorAll('meta[name="robots"]');
      expect(metaTags).toHaveLength(1);
      expect(metaTags[0].getAttribute('content')).toBe('noindex,nofollow');
    });

    it('should remove robots meta tag on unmount', () => {
      const { unmount } = render(<ReactHeadSafe robots="noindex,follow" />);
      unmount();

      expect(
        document.querySelector('meta[name="robots"]')
      ).not.toBeInTheDocument();
    });

    it('should remove robots meta tag when prop becomes undefined', () => {
      const { rerender } = render(<ReactHeadSafe robots="noindex,follow" />);
      rerender(<ReactHeadSafe />);

      expect(
        document.querySelector('meta[name="robots"]')
      ).not.toBeInTheDocument();
    });
  });

  describe('cleanup on unmount', () => {
    it('should remove all inserted meta and link tags on unmount', () => {
      const { unmount } = render(
        <ReactHeadSafe
          description="Test"
          keywords="test,cleanup"
          ogTitle="OG Title"
          ogDescription="OG Description"
          ogImage="https://example.com/img.jpg"
          ogUrl="https://example.com"
          ogType="website"
          canonicalUrl="https://example.com"
        />
      );

      // Sanity check: a representative tag exists before unmount
      expect(
        document.querySelector('meta[name="description"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:title"]')
      ).toBeInTheDocument();

      unmount();

      // After unmount: every inserted meta/link tag must be gone
      expect(
        document.querySelector('meta[name="description"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[name="keywords"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:title"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[name="twitter:title"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:description"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[name="twitter:description"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:image"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[name="twitter:image"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[name="twitter:card"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:url"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:type"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('link[rel="canonical"]')
      ).not.toBeInTheDocument();
    });

    it('should NOT reset document.title on unmount', () => {
      const { unmount } = render(<ReactHeadSafe title="Page Title" />);
      expect(document.title).toBe('Page Title');

      unmount();

      // title is intentionally NOT restored — next page's ReactHeadSafe overwrites it
      expect(document.title).toBe('Page Title');
    });
  });

  describe('prop transitioning to undefined', () => {
    it('should remove description meta tag when prop becomes undefined', () => {
      const { rerender } = render(<ReactHeadSafe description="Initial" />);
      expect(
        document.querySelector('meta[name="description"]')
      ).toBeInTheDocument();

      rerender(<ReactHeadSafe />);

      expect(
        document.querySelector('meta[name="description"]')
      ).not.toBeInTheDocument();
    });

    it('should remove og and twitter tags together when ogTitle becomes undefined', () => {
      const { rerender } = render(<ReactHeadSafe ogTitle="Title" />);
      expect(
        document.querySelector('meta[property="og:title"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[name="twitter:title"]')
      ).toBeInTheDocument();

      rerender(<ReactHeadSafe />);

      expect(
        document.querySelector('meta[property="og:title"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[name="twitter:title"]')
      ).not.toBeInTheDocument();
    });

    it('should remove twitter:card when ogImage becomes undefined', () => {
      const { rerender } = render(
        <ReactHeadSafe ogImage="https://example.com/img.jpg" />
      );
      expect(
        document.querySelector('meta[name="twitter:card"]')
      ).toBeInTheDocument();

      rerender(<ReactHeadSafe />);

      expect(
        document.querySelector('meta[property="og:image"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[name="twitter:image"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[name="twitter:card"]')
      ).not.toBeInTheDocument();
    });

    it('should remove canonical link when canonicalUrl becomes undefined', () => {
      const { rerender } = render(
        <ReactHeadSafe canonicalUrl="https://example.com" />
      );
      expect(
        document.querySelector('link[rel="canonical"]')
      ).toBeInTheDocument();

      rerender(<ReactHeadSafe />);

      expect(
        document.querySelector('link[rel="canonical"]')
      ).not.toBeInTheDocument();
    });

    it('should remove only the unset prop and keep others', () => {
      const { rerender } = render(
        <ReactHeadSafe description="Desc" ogTitle="Title" />
      );
      expect(
        document.querySelector('meta[name="description"]')
      ).toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:title"]')
      ).toBeInTheDocument();

      // Drop description; ogTitle should remain
      rerender(<ReactHeadSafe ogTitle="Title" />);

      expect(
        document.querySelector('meta[name="description"]')
      ).not.toBeInTheDocument();
      expect(
        document.querySelector('meta[property="og:title"]')
      ).toBeInTheDocument();
    });
  });

  describe('multiple rerenders', () => {
    it('should not accumulate duplicate tags across many rerenders', () => {
      const { rerender } = render(<ReactHeadSafe description="v1" />);

      for (let i = 2; i <= 10; i++) {
        rerender(<ReactHeadSafe description={`v${i}`} />);
      }

      const tags = document.querySelectorAll('meta[name="description"]');
      expect(tags).toHaveLength(1);
      expect(tags[0].getAttribute('content')).toBe('v10');
    });
  });
});
