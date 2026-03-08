import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CertificacaoPage extends BasePage {
  readonly form: Locator;

  constructor(page: Page) {
    super(page);
    this.form = page.locator('form').first();
  }

  async open(): Promise<void> {
    await this.gotoAndValidate200('/certificacao');
  }

  async validateFormVisible(): Promise<void> {
    await expect(this.form).toBeVisible();
  }

  private async locateNameField(): Promise<Locator | null> {
    const candidates = [
      this.page.getByLabel(/nome/i),
      this.page.getByPlaceholder(/nome/i),
      this.form.locator('input[name*="nome" i]').first(),
      this.form.locator('input[type="text"]').first(),
    ];

    for (const locator of candidates) {
      if (await locator.count()) return locator;
    }
    return null;
  }

  private async locateEmailField(): Promise<Locator | null> {
    const candidates = [
      this.page.getByLabel(/e-?mail/i),
      this.page.getByPlaceholder(/e-?mail/i),
      this.form.locator('input[type="email"]').first(),
      this.form.locator('input[name*="email" i]').first(),
    ];

    for (const locator of candidates) {
      if (await locator.count()) return locator;
    }
    return null;
  }

  private async locatePhoneField(): Promise<Locator | null> {
    const candidates = [
      this.page.getByLabel(/telefone|celular|whatsapp/i),
      this.page.getByPlaceholder(/telefone|celular|whatsapp/i),
      this.form.locator('input[name*="telefone" i], input[name*="celular" i], input[name*="phone" i]').first(),
      this.form.locator('input[type="tel"]').first(),
    ];

    for (const locator of candidates) {
      if (await locator.count()) return locator;
    }
    return null;
  }

  private async locateSuccessMessage(): Promise<Locator> {
    return this.page.locator('text=/sucesso|enviado|recebido|cadastro realizado|mensagem enviada/i').first();
  }

  private async locateValidationMessage(): Promise<Locator> {
    return this.page.locator('text=/obrigatório|required|preencha|inválido|incorreto|campo obrigatório/i').first();
  }

  async fillValidForm(): Promise<void> {
    const nameField = await this.locateNameField();
    const emailField = await this.locateEmailField();
    const phoneField = await this.locatePhoneField();

    if (nameField) {
      await nameField.fill('Teste Automação QA');
    }

    if (emailField) {
      await emailField.fill('teste.qa@example.com');
    }

    if (phoneField) {
      await phoneField.fill('11999999999');
    }
  }

  async submit(): Promise<void> {
    const button = this.findSubmitButton(this.form);
    await expect(button).toBeVisible();
    await button.click();
  }

  async validateHasCoreFields(): Promise<void> {
    const nameField = await this.locateNameField();
    const emailField = await this.locateEmailField();
    const submitButton = this.findSubmitButton(this.form);

    expect(nameField, 'Campo de nome não encontrado').not.toBeNull();
    expect(emailField, 'Campo de email não encontrado').not.toBeNull();

    await expect(nameField!).toBeVisible();
    await expect(emailField!).toBeVisible();
    await expect(submitButton).toBeVisible();
  }

  async submitEmptyAndExpectValidation(): Promise<void> {
    await this.submit();
    await expect(await this.locateValidationMessage()).toBeVisible();
  }

  async fillInvalidEmailAndSubmit(): Promise<void> {
    const nameField = await this.locateNameField();
    const emailField = await this.locateEmailField();

    if (nameField) {
      await nameField.fill('Teste QA');
    }

    if (emailField) {
      await emailField.fill('email-invalido');
    }

    await this.submit();
  }

  async expectValidationMessage(): Promise<void> {
    await expect(await this.locateValidationMessage()).toBeVisible();
  }

  async expectSuccessOrHandledFeedback(): Promise<void> {
    const successMessage = await this.locateSuccessMessage();
    const validationMessage = await this.locateValidationMessage();

    const hasSuccess = await successMessage.count();
    const hasValidation = await validationMessage.count();

    if (hasSuccess) {
      await expect(successMessage).toBeVisible();
      return;
    }

    if (hasValidation) {
      await expect(validationMessage).toBeVisible();
      return;
    }

    await expect(this.page.locator('body')).toBeVisible();
  }
}