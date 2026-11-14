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

test.describe('Process — accordion', () => {
  test('opening a stage moves the phone and switches its screen', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#process');
    const stage = section.locator('[data-stage="3"]');
    await stage.locator('[data-stage-btn]').click();
    await expect(stage).toHaveClass(/is-open/);
    await expect(stage.locator('[data-stage-btn]')).toHaveAttribute('aria-expanded', 'true');
    await expect(section.locator('[data-stage="0"] [data-stage-btn]')).toHaveAttribute('aria-expanded', 'false');
    const phone = stage.locator('[data-process-phone]');
    await expect(phone).toHaveAttribute('data-active', '3');
    await expect(phone.locator('.pp-screen').nth(3)).toHaveClass(/is-active/);
  });
});

test.describe('Process — scroll-driven on desktop', () => {
  test('scrolling through the track opens stages in order', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'desktop-only behaviour');
    await page.goto('/');
    const track = page.locator('[data-process-track]');
    const stageAt = async (fraction: number) => {
      await track.evaluate((el: HTMLElement, f) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top + (el.offsetHeight - window.innerHeight) * f);
      }, fraction);
    };
    for (const [fraction, stage] of [[0.05, '0'], [0.4, '2'], [0.97, '5']] as const) {
      await stageAt(fraction);
      await expect(page.locator(`[data-stage="${stage}"]`)).toHaveClass(/is-open/);
    }
    // the accordion stays pinned on screen while the track scrolls
    const box = await page.locator('[data-stages]').boundingBox();
    expect(box && box.y).toBeGreaterThanOrEqual(0);
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
