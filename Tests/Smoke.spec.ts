import { test, expect } from '@playwright/test';

test.describe('Smoke tests', () => {

  test('smoke - site deve responder com status válido', async ({ page }) => {

    const response = await page.goto('https://qualidade.apprbs.com.br/site');

    expect(response).not.toBeNull();
    expect(response!.ok()).toBeTruthy();

  });

  test('smoke - certificacao deve responder com status válido', async ({ page }) => {

    const response = await page.goto('https://qualidade.apprbs.com.br/certificacao');

    expect(response).not.toBeNull();
    expect(response!.ok()).toBeTruthy();

  });

  test('smoke - site deve ter título', async ({ page }) => {

    await page.goto('https://qualidade.apprbs.com.br/site');

    await expect(page).toHaveTitle(/.+/);

  });

  test('smoke - certificacao deve ter título', async ({ page }) => {

    await page.goto('https://qualidade.apprbs.com.br/certificacao');

    await expect(page).toHaveTitle(/.+/);

  });

});