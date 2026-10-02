import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./vitest/**/*.test.js'],
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});
