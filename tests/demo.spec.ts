import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'https://website-app-6v7k.onrender.com'
});

test('A página de inscrição pública deve carregar corretamente', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/SIGAF/i);
  await expect(page.locator('form')).toBeVisible();
  await expect(page.locator('input')).toHaveCountGreaterThan(1);
});
