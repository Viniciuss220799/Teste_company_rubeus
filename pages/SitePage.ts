import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SitePage extends BasePage {
  readonly main: Locator;
  readonly allLinks: Locator;
  readonly certLink: Locator;

  constructor(page: Page) {
    super(page);
    this.main = page.locator('main, body');
    this.allLinks = page.locator('a');
    this.certLink = page.locator('a[href*="certificacao"]').first();
  }

  async open(): Promise<void> {
    await this.gotoAndValidate200('/site');
  }

  async validateMainContent(): Promise<void> {
    await expect(this.main).toBeVisible();
  }

  async validateHasLinks(): Promise<void> {
    await expect(this.allLinks.first()).toBeVisible();
    const count = await this.allLinks.count();
    expect(count).toBeGreaterThan(0);
  }

  async goToCertificationIfAvailable(): Promise<void> {
    const count = await this.certLink.count();
    expect(count, 'Nenhum link para certificação encontrado na página /site').toBeGreaterThan(0);
    await this.certLink.click();
    await expect(this.page).toHaveURL(/certificacao/);
  }
}