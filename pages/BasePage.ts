import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async gotoAndValidate200(path: string): Promise<void> {
    const response = await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(response, `Não houve resposta ao acessar ${path}`).not.toBeNull();
    expect(response!.status(), `Status inesperado para ${path}`).toBe(200);
  }

  async validateTitleNotEmpty(): Promise<void> {
    await expect(this.page).toHaveTitle(/.+/);
  }

  async validateBodyVisible(): Promise<void> {
    await expect(this.page.locator('body')).toBeVisible();
  }

  async collectConsoleErrors(action: () => Promise<void>): Promise<string[]> {
    const errors: string[] = [];

    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    this.page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    await action();

    return errors.filter((error) => {
      const normalized = error.toLowerCase();
      return !normalized.includes('favicon');
    });
  }

  findSubmitButton(scope?: Locator): Locator {
    const root = scope ?? this.page.locator('body');
    return root.locator('button[type="submit"], input[type="submit"]').first();
  }

  findFirstForm(): Locator {
    return this.page.locator('form').first();
  }
}