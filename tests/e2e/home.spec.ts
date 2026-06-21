import { test, expect } from '@playwright/test';

test.describe('Home page — structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header: logo, nav, CTA', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'header nav/CTA hidden on mobile');
    const header = page.locator('header');
    await expect(header.getByText('BM Studio')).toBeVisible();
    await expect(header.getByRole('link', { name: 'Услуги' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Кейсы' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Связаться с нами' })).toBeVisible();
  });

  test('no theme toggle present (dark theme removed)', async ({ page }) => {
    await expect(page.locator('[data-theme-toggle]')).toHaveCount(0);
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
  });

  test('hero heading rendered', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toHaveAttribute('aria-label', /Digital-студия для брендов/);
  });

  test('hero has no scroll-cue pill', async ({ page }) => {
    await expect(page.locator('.scroll-cue')).toHaveCount(0);
  });

  test('services section', async ({ page }) => {
    const section = page.locator('#services');
    await expect(section.getByRole('heading', { name: 'Наши услуги' })).toBeVisible();
    expect(await section.locator('article').count()).toBeGreaterThanOrEqual(4);
  });

  test('cases: 3 cards, view-all link, RestApp image', async ({ page }) => {
    const section = page.locator('#cases');
    await expect(section.getByRole('heading', { name: 'Наши кейсы' })).toBeVisible();
    await expect(section.getByRole('link', { name: /Все/ })).toBeVisible();

    const cards = section.locator('article');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0).getByRole('heading', { name: 'RestApp' })).toBeVisible();
    await expect(cards.nth(0).locator('img')).toHaveAttribute('src', /restapp\.png/);
    // two REEMAX titles
    await expect(section.getByRole('heading', { name: 'REEMAX' })).toHaveCount(2);
  });

  test('process: heading, 6 steps with dividers, phone mockup', async ({ page }) => {
    const section = page.locator('#process');
    await expect(section.getByRole('heading', { name: 'Как мы работаем' })).toBeVisible();
    await expect(section.locator('ol > li')).toHaveCount(6);
    await expect(section.getByRole('heading', { name: '1. Заявка' })).toBeVisible();
    await expect(section.getByRole('heading', { name: '6. Запуск' })).toBeVisible();
    await expect(section.locator('img[src*="process/phone"]')).toBeVisible();
  });

  test('contact section heading + wizard present', async ({ page }) => {
    const section = page.locator('#contact');
    await expect(section.getByRole('heading', { name: 'Готовы начать?' })).toBeVisible();
    await expect(section.locator('[data-brief]')).toBeVisible();
  });

  test('footer: contacts + socials', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByText('BM Studio')).toBeVisible();
    await expect(footer.getByText('+7 (777) 726 26 20')).toBeVisible();
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
    await expect(menu.getByRole('link', { name: 'Кейсы' })).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Связаться с нами' })).toBeVisible();

    // selecting a link closes the menu
    await menu.getByRole('link', { name: 'Кейсы' }).click();
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
