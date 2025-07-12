import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'https://website-app-6v7k.onrender.com'
});

test.describe('Inscrição Pública', () => {
  test('A página de inscrição pública deve carregar corretamente', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SIGAF/i);
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input')).toHaveCountGreaterThan(1);
  });

  test('Deve mostrar erro se enviar campos obrigatórios vazios', async ({ page }) => {
    await page.goto('/');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toHaveCountGreaterThan(0);
  });

  test('Deve validar erro ao inserir letras no campo telefone', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="phoneNumber"]', 'abcde');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toContainText('telefone');
  });

  test('Deve validar erro ao inserir números no campo de nome', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="applicantName"]', '123456');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toContainText('nome');
  });

  test('Deve impedir envio se comprovativo de pagamento não for anexado', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="applicantName"]', 'João');
    // preencher outros campos obrigatórios
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toContainText('comprovativo');
  });

  test('Deve aceitar inscrição válida com todos os campos corretamente preenchidos', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="applicantName"]', 'João Silva');
    await page.fill('input[name="phoneNumber"]', '923456789');
    await page.fill('input[name="email"]', 'joao@email.com');
    await page.setInputFiles('input[type="file"]', 'tests/files/comprovativo.pdf');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success-message')).toBeVisible();
  });

  test('Deve validar formato de email incorreto', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="email"]', 'email@invalido');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toContainText('email');
  });

  test('Deve testar a responsividade em diferentes tamanhos de tela', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await page.goto('/');
    await expect(page.locator('form')).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 800 }); // Desktop
    await expect(page.locator('form')).toBeVisible();
  });
});
