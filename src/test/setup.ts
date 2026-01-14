import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Clean up after each test
afterEach(() => {
  cleanup();

  // Clean up document head after each test
  document.head.innerHTML = '';
  document.title = '';
});
