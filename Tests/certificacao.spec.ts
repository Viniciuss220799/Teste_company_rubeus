import { test, expect } from '@playwright/test';

test.describe('Página /certificacao', () => {
  test('deve carregar com status 200', async ({ page }) => {
    const response = await page.goto('https://qualidade.apprbs.com.br/certificacao', {
      waitUntil: 'domcontentloaded'
    });

    expect(response).not.toBeNull();
    expect(response!.ok()).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
  });

  test('deve exibir conteúdo interativo ou formulário', async ({ page }) => {
    await page.goto('https://qualidade.apprbs.com.br/certificacao', {
      waitUntil: 'networkidle'
    });

    const forms = await page.locator('form').count();
    const inputs = await page.locator('input, textarea, select').count();
    const buttons = await page.locator('button, input[type="submit"], input[type="button"]').count();

    expect(forms > 0 || inputs > 0 || buttons > 0).toBeTruthy();
  });

  test('deve possuir algum elemento clicável de ação', async ({ page }) => {
    await page.goto('https://qualidade.apprbs.com.br/certificacao', {
      waitUntil: 'networkidle'
    });

    const actionElements = page.locator(`
      button,
      input[type="submit"],
      input[type="button"],
      a,
      [role="button"]
    `);

    const total = await actionElements.count();
    expect(total).toBeGreaterThan(0);
  });

  test('envio vazio não deve quebrar a página', async ({ page }) => {
    await page.goto('https://qualidade.apprbs.com.br/certificacao', {
      waitUntil: 'networkidle'
    });

    const action = page.locator(`
      button,
      input[type="submit"],
      input[type="button"],
      [role="button"]
    `).first();

    if (await action.count()) {
      await action.click({ force: true }).catch(() => {});
    }

    await expect(page.locator('body')).toBeVisible();
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

    await page.goto('https://qualidade.apprbs.com.br/certificacao', {
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