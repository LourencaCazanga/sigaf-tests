// tests/inscricao.spec.ts
import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'https://website-app-6v7k.onrender.com/enrollment/new',
  timeout: 120_000,
});

test.describe('Formulário de Inscrição Pública', () => {
  test('Deve exibir o formulário corretamente', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="applicantName"]')).toBeVisible();
  });

  test('Deve validar erro ao submeter sem preencher campos obrigatórios', async ({ page }) => {
    await page.goto('/');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toHaveCountGreaterThan(0);
  });

  test('Deve exibir erro ao inserir números no nome', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="applicantName"]', '123456');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toContainText('nome');
  });

  test('Deve exibir erro ao inserir letras no telefone', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="phoneNumber"]', 'abcde');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toContainText('telefone');
  });

  test('Deve validar e-mail com formato inválido', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="email"]', 'emailinvalido.com');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toContainText('email');
  });

  test('Deve impedir envio sem anexar documentos obrigatórios', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="applicantName"]', 'João Silva');
    await page.fill('input[name="identificationNumber"]', '006306663LA047');
    await page.selectOption('select[name="identificationType"]', 'BI');
    await page.selectOption('select[name="targetSchoolId"]', { index: 1 });
    await page.selectOption('select[name="targetCourseId"]', { index: 1 });
    await page.fill('input[name="phoneNumber"]', '923456789');
    await page.fill('input[name="birthDate"]', '2000-01-01');
    await page.fill('input[name="fullAddress"]', 'Rua A, Bairro B');
    await page.fill('input[name="email"]', 'joao@email.com');
    await page.fill('input[name="guardianName"]', 'Ana Silva');
    await page.fill('input[name="guardianPhoneNumber"]', '923123123');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toContainText('comprovativo');
  });

  test('Deve submeter com todos os campos preenchidos corretamente', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="applicantName"]', 'João Silva');
    await page.fill('input[name="identificationNumber"]', '006306663LA047');
    await page.selectOption('select[name="identificationType"]', 'BI');
    await page.selectOption('select[name="targetSchoolId"]', { value: 'd18eaba3-ce60-41c4-95bb-dd3e4e0633ae' });
    await page.selectOption('select[name="targetCourseId"]', { value: 'ba64fd10-0604-49b3-b3bb-74a30aef6ba8' });
    await page.fill('input[name="phoneNumber"]', '923456789');
    await page.fill('input[name="birthDate"]', '2000-01-01');
    await page.fill('input[name="fullAddress"]', 'Rua A, Bairro B');
    await page.fill('input[name="email"]', 'joao@email.com');
    await page.fill('input[name="guardianName"]', 'Ana Silva');
    await page.fill('input[name="guardianPhoneNumber"]', '923123123');
    await page.setInputFiles('input[name="identificationDocument"]', 'tests/Bi.pdf');
    await page.setInputFiles('input[name="academicCertificateDocument"]', 'tests/certificado.pdf');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success-message')).toBeVisible();
  });

  test('Deve exibir o formulário corretamente em telas pequenas e grandes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await page.goto('/');
    await expect(page.locator('form')).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 800 }); // Desktop
    await expect(page.locator('form')).toBeVisible();
  });
});
