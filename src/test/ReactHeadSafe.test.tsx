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
        />
      );

      expect(document.title).toBe('Complete Test');
      expect(
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute('content')
      ).toBe('Test Description');
      expect(
        document.querySelector('meta[name="keywords"]')?.getAttribute('content')
      ).toBe('test, keywords');
      expect(
        document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute('content')
      ).toBe('OG Title');
      expect(
        document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute('content')
      ).toBe('OG Description');
      expect(
        document
          .querySelector('meta[property="og:image"]')
          ?.getAttribute('content')
      ).toBe('https://example.com/image.jpg');
    });

    it('should update only changed props', () => {
      const { rerender } = render(
        <ReactHeadSafe
          title="Initial Title"
          description="Initial Description"
        />
      );

      expect(document.title).toBe('Initial Title');
      expect(
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute('content')
      ).toBe('Initial Description');

      rerender(
        <ReactHeadSafe
          title="Updated Title"
          description="Initial Description"
        />
      );

      expect(document.title).toBe('Updated Title');
      expect(
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute('content')
      ).toBe('Initial Description');
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
});
