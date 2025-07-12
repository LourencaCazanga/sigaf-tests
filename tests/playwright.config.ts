import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './',  
  use: {
    baseURL: 'https://website-app-6v7k.onrender.com',
    headless: true,
    screenshot: 'only-on-failure'
  }
});
