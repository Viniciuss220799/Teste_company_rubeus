import { test, expect } from '@playwright/test';

test('CERTIFICACAO - deve exibir conteúdo interativo ou formulário', async ({ page }) => {
  await page.goto('https://qualidade.apprbs.com.br/certificacao', {
    waitUntil: 'networkidle'
  });

  const forms = await page.locator('form').count();
  const inputs = await page.locator('input, textarea, select').count();
  const buttons = await page.locator('button, input[type="submit"], input[type="button"]').count();

  expect(forms > 0 || inputs > 0 || buttons > 0).toBeTruthy();
});

test('CERTIFICACAO - deve ter algum elemento clicável de ação', async ({ page }) => {
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