import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for the multi-step brief wizard inside the contact section.
 * Targets the stable data-* hooks rendered by Contact.astro.
 */
export class BriefForm {
  readonly page: Page;
  readonly form: Locator;
  readonly stepNum: Locator;
  readonly action: Locator;
  readonly back: Locator;
  readonly chips: Locator;
  readonly dots: Locator;
  readonly navItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('[data-brief]');
    this.stepNum = page.locator('[data-step-num]');
    this.action = page.locator('[data-action]');
    this.back = page.locator('[data-back]');
    this.chips = page.locator('[data-chips] span');
    this.dots = page.locator('[data-dot]');
    this.navItems = page.locator('[data-nav-item]');
  }

  /** The currently visible step panel (others are .hidden). */
  activePanel(): Locator {
    return this.form.locator('[data-step]:not(.hidden)');
  }

  /** Visible option button by its visible label text (ignores hidden branch groups). */
  option(label: string): Locator {
    return this.activePanel().locator('[data-opt]:visible', { hasText: label });
  }

  async pick(label: string) {
    await this.option(label).click();
  }

  async next() {
    await this.action.click();
  }

  async goBack() {
    await this.back.click();
  }

  async fillContacts(name: string, contact: string) {
    await this.activePanel().locator('input[name="name"]').fill(name);
    await this.activePanel().locator('input[name="contact"]').fill(contact);
  }

  async expectStep(n: number) {
    await expect(this.stepNum).toHaveText(String(n));
  }
}
