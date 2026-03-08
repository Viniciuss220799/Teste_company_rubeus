import { test, expect } from '@playwright/test';

test.describe('Página /site', () => {
  test('deve carregar com status 200', async ({ page }) => {
    const response = await page.goto('https://qualidade.apprbs.com.br/site', {
      waitUntil: 'domcontentloaded'
    });

    expect(response).not.toBeNull();
    expect(response!.ok()).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
  });

  test('deve possuir estrutura renderizada na página', async ({ page }) => {
    await page.goto('https://qualidade.apprbs.com.br/site', {
      waitUntil: 'networkidle'
    });

    const body = page.locator('body');
    await expect(body).toBeVisible();

    const childCount = await page.locator('body *').count();
    expect(childCount).toBeGreaterThan(0);
  });

  test('não deve apresentar erros críticos no console', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      errors.push(err.message);
    });

    await page.goto('https://qualidade.apprbs.com.br/site', {
      waitUntil: 'domcontentloaded'
    });

    await expect(page.locator('body')).toBeVisible();

    const relevantes = errors.filter(e => {
      const t = e.toLowerCase();
      return !t.includes('favicon');
    });

    expect(relevantes).toEqual([]);
  });
});