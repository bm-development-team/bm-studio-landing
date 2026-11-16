import { test, expect } from '@playwright/test';
import { BriefForm } from '../pages/BriefForm';

test.describe('Brief — live estimate', () => {
  let brief: BriefForm;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    brief = new BriefForm(page);
    await brief.form.scrollIntoViewIfNeeded();
  });

  test('hidden until a project type is chosen', async ({ page }) => {
    const estimate = page.locator('[data-estimate]');
    await expect(estimate).toBeHidden();
    await brief.pick('Веб-сайт');
    await brief.next();
    await expect(estimate).toBeHidden();
    await brief.pick('Лендинг');
    await expect(estimate).toBeVisible();
    await expect(page.locator('[data-estimate-weeks]')).toHaveText('2–3 недели');
    await expect(page.locator('[data-estimate-budget]')).toContainText('до 200 000 ₸');
  });

  test('updates when project type changes', async ({ page }) => {
    await brief.pick('Веб-сайт');
    await brief.next();
    await brief.pick('Лендинг');
    await brief.pick('Интернет-магазин');
    await expect(page.locator('[data-estimate-weeks]')).toHaveText('6–10 недель');
  });

  test('changing direction hides the estimate', async ({ page }) => {
    await brief.pick('Веб-сайт');
    await brief.next();
    await brief.pick('Лендинг');
    await brief.goBack();
    await brief.pick('Мобильное приложение');
    await expect(page.locator('[data-estimate]')).toBeHidden();
  });

  test('budget below typical shows a hint, enough budget hides it', async ({ page }) => {
    const hint = page.locator('[data-budget-hint]');
    await brief.pick('Веб-сайт');
    await brief.next();
    await brief.pick('Интернет-магазин');
    await brief.next();
    await brief.pick('до 200 000 ₸');
    await expect(hint).toBeVisible();
    await expect(hint).toContainText('600 000 – 1 500 000 ₸');
    await brief.pick('от 1 500 000 ₸');
    await expect(hint).toBeHidden();
  });
});

test.describe('Process — sticky panel follows the steps', () => {
  test('scrolling a step to the middle activates it and updates the panel', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'panel is desktop-only');
    await page.goto('/');
    const centre = async (i: number) => {
      await page.locator(`[data-stage="${i}"]`).evaluate((el: HTMLElement) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    };
    await centre(3);
    await expect(page.locator('[data-stage="3"]')).toHaveClass(/is-active/);
    await expect(page.locator('[data-stage="0"]')).not.toHaveClass(/is-active/);
    await expect(page.locator('[data-panel-num]')).toHaveText('04');
    await expect(page.locator('[data-process-scenes]')).toHaveAttribute('data-active', '3');
    const panel = await page.locator('[data-process-panel]').boundingBox();
    expect(panel && panel.y).toBeGreaterThanOrEqual(0);
    await centre(5);
    await expect(page.locator('[data-panel-title]')).toHaveText('Запуск');
  });
});

test.describe('Mobile — swipe services and step accordion', () => {
  test('services rail scrolls sideways and updates the counter', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only behaviour');
    await page.goto('/');
    const rail = page.locator('[data-services-rail]');
    await rail.scrollIntoViewIfNeeded();
    const { sw, cw } = await rail.evaluate((el: HTMLElement) => ({ sw: el.scrollWidth, cw: el.clientWidth }));
    expect(sw).toBeGreaterThan(cw * 3);
    await rail.evaluate((el: HTMLElement) => el.scrollTo({ left: el.scrollWidth, behavior: 'instant' }));
    await expect(page.locator('[data-services-count]')).toHaveText('07 / 07');
  });

  test('process timeline fills and marks passed steps while scrolling', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only behaviour');
    await page.goto('/');
    await page.locator('[data-stage="3"]').evaluate((el: HTMLElement) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await expect(page.locator('[data-stage="2"]')).toHaveClass(/is-passed/);
    await expect(page.locator('[data-stage="5"]')).not.toHaveClass(/is-passed/);
    const h = await page.locator('[data-process-line]').evaluate((el: HTMLElement) => parseFloat(el.style.height));
    expect(h).toBeGreaterThan(20);
  });

  test('section headings split into words and keep their accessible name', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'once is enough');
    await page.goto('/');
    const h = page.locator('#cases h2');
    await expect(h).toHaveAttribute('aria-label', 'Наши работы');
    await expect(h.locator('.split-mask')).toHaveCount(2);
    await h.scrollIntoViewIfNeeded();
    await expect(h).toHaveClass(/is-in/);
  });

  test('process steps open one at a time', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only behaviour');
    await page.goto('/');
    const first = page.locator('[data-stage="0"]');
    const third = page.locator('[data-stage="2"]');
    await expect(first).toHaveClass(/is-open/);
    await third.locator('[data-step-toggle]').click();
    await expect(third).toHaveClass(/is-open/);
    await expect(third.locator('[data-step-toggle]')).toHaveAttribute('aria-expanded', 'true');
    await expect(first).not.toHaveClass(/is-open/);
    await third.locator('[data-step-toggle]').click();
    await expect(third).not.toHaveClass(/is-open/);
  });
});

test.describe('Services — demos', () => {
  test('a field plays its demo when scrolled into view', async ({ page }) => {
    await page.goto('/');
    const field = page.locator('[data-field]').nth(1);
    await field.scrollIntoViewIfNeeded();
    await expect(field).toHaveClass(/sd-play/);
  });
});
