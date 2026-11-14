import { test, expect } from '@playwright/test';

test.describe('Home page — structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header: logo, nav, CTA', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'header nav/CTA hidden on mobile');
    const header = page.locator('header');
    await expect(header.getByText('BM Studio')).toBeVisible();
    for (const name of ['Услуги', 'Работы', 'Процесс']) {
      await expect(header.getByRole('link', { name })).toBeVisible();
    }
    await expect(header.getByRole('link', { name: 'Обсудить проект' })).toBeVisible();
  });

  test('hero: headline, one action, real work picture', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toHaveAttribute('aria-label', /Звучите громче/);
    await expect(page.getByRole('link', { name: 'Заполнить бриф' })).toBeVisible();
    await expect(page.locator('main section').first().locator('img')).toHaveAttribute('alt', /REEMAX/);
  });

  test('services: four statement fields, each with a demo', async ({ page }) => {
    const section = page.locator('#services');
    await expect(section.locator('[data-field]')).toHaveCount(4);
    await expect(section.getByRole('heading', { name: 'Удобные интерфейсы' })).toBeVisible();
    await expect(section.locator('.sd')).toHaveCount(4);
  });

  test('cases: REEMAX and RestApp folders with real pictures', async ({ page }) => {
    const section = page.locator('#cases');
    await expect(section.getByRole('heading', { name: 'Наши работы' })).toBeVisible();
    await expect(section.locator('[data-case]')).toHaveCount(2);
    await expect(section.getByRole('heading', { name: 'REEMAX' })).toBeVisible();
    await expect(section.getByRole('heading', { name: 'RestApp' })).toBeVisible();
    await expect(section.getByRole('link', { name: /Открыть сайт/ })).toHaveAttribute('href', 'https://reemax.kz');
  });

  test('process: heading, 6 stages, first open with the phone', async ({ page }) => {
    const section = page.locator('#process');
    await expect(section.getByRole('heading', { name: 'Как мы работаем' })).toBeVisible();
    await expect(section.locator('[data-stage]')).toHaveCount(6);
    await expect(section.locator('[data-stage-btn]').first()).toHaveAttribute('aria-expanded', 'true');
    await expect(section.locator('[data-stage="0"] [data-process-phone]')).toBeVisible();
  });

  test('contact: coupon brief present', async ({ page }) => {
    const section = page.locator('#contact');
    await expect(section.getByRole('heading', { name: 'Готовы начать?' })).toBeVisible();
    await expect(section.locator('[data-brief]')).toBeVisible();
  });

  test('footer: phone as headline, email, socials', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: '+7 777 726 26 20' })).toBeVisible();
    await expect(footer.getByText('bmstudio@bmstudio.kz')).toBeVisible();
    for (const s of ['telegram', 'whatsapp', 'instagram']) {
      await expect(footer.getByRole('link', { name: s })).toBeVisible();
    }
  });
});

test.describe('Mobile menu', () => {
  test('hamburger toggles nav + CTA', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only nav');
    await page.goto('/');
    const toggle = page.locator('[data-menu-toggle]');
    const menu = page.locator('[data-menu]');
    await expect(toggle).toBeVisible();
    await expect(menu).toBeHidden();

    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Услуги' })).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Работы' })).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Обсудить проект' })).toBeVisible();

    // selecting a link closes the menu
    await menu.getByRole('link', { name: 'Работы' }).click();
    await expect(menu).toBeHidden();
  });

  test('hamburger hidden on desktop', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'desktop-only check');
    await page.goto('/');
    await expect(page.locator('[data-menu-toggle]')).toBeHidden();
  });
});

test.describe('i18n', () => {
  test('english page', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('#contact').getByRole('heading', { name: 'Ready to start?' })).toBeVisible();
    await expect(page.locator('#process').getByRole('heading', { name: 'How we work' })).toBeVisible();
  });

  test('kazakh page', async ({ page }) => {
    await page.goto('/kk/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'kk');
    await expect(page.locator('#contact').getByRole('heading', { name: 'Бастауға дайынсыз ба?' })).toBeVisible();
  });
});
