import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Caminho para os testes
  timeout: 120_000, // ⏱ Tempo máximo por teste: 2 minutos
  expect: {
    timeout: 10_000, // ⏱ Tempo máximo para esperar elementos/interações
  },
  fullyParallel: true,
  retries: 0,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: 'https://website-app-6v7k.onrender.com',
    actionTimeout: 0,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
