import { test, expect } from '@playwright/test';
import { BriefForm } from '../pages/BriefForm';

test.describe('Brief wizard', () => {
  let brief: BriefForm;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    brief = new BriefForm(page);
    await brief.form.scrollIntoViewIfNeeded();
  });

  test('initial state: step 1/5, back hidden, next disabled', async () => {
    await brief.expectStep(1);
    await expect(brief.dots).toHaveCount(5);
    await expect(brief.dots.nth(0)).toHaveClass(/w-\[22px\]/);
    await expect(brief.back).toHaveClass(/invisible/);
    await expect(brief.action).toBeDisabled();
  });

  test('selecting a direction enables next and advances', async () => {
    await expect(brief.action).toBeDisabled();
    await brief.pick('Веб-сайт');
    await expect(brief.action).toBeEnabled();
    await brief.next();
    await brief.expectStep(2);
    await expect(brief.activePanel().getByText('Что именно нужно?')).toBeVisible();
  });

  test('web branch shows website project types', async () => {
    await brief.pick('Веб-сайт');
    await brief.next();
    for (const label of ['Лендинг', 'Корпоративный сайт', 'Интернет-магазин', 'Редизайн']) {
      await expect(brief.option(label)).toBeVisible();
    }
  });

  test('mobile branch shows app project types', async () => {
    await brief.pick('Мобильное приложение');
    await brief.next();
    for (const label of ['iOS приложение', 'Android приложение', 'Кроссплатформа', 'MVP / Прототип']) {
      await expect(brief.option(label)).toBeVisible();
    }
    await expect(brief.option('Лендинг')).toHaveCount(0);
  });

  test('identity branch shows brand project types', async () => {
    await brief.pick('Айдентика для digital');
    await brief.next();
    for (const label of ['Логотип и стиль', 'Брендбук', 'Digital-айдентика', 'Паттерны / Графика']) {
      await expect(brief.option(label)).toBeVisible();
    }
  });

  test('changing direction resets project type and swaps branch', async () => {
    // pick web → type → advance into budget
    await brief.pick('Веб-сайт');
    await brief.next();
    await brief.pick('Лендинг');
    await brief.next();
    await brief.expectStep(3);

    // back to step 1, switch to mobile
    await brief.goBack(); // -> step 2
    await brief.goBack(); // -> step 1
    await brief.expectStep(1);
    await brief.pick('Мобильное приложение');
    await brief.next();

    // step 2 now mobile branch, selection reset → next disabled
    await brief.expectStep(2);
    await expect(brief.option('iOS приложение')).toBeVisible();
    await expect(brief.action).toBeDisabled();
  });

  test('left nav reflects progress (completed step gets a check)', async ({ page }) => {
    await brief.pick('Веб-сайт');
    await brief.next();
    // step 1 nav item is now completed → shows an svg check, not the number
    await expect(brief.navItems.nth(0).locator('svg')).toBeVisible();
    // active dot moved to second
    await expect(brief.dots.nth(1)).toHaveClass(/w-\[22px\]/);
  });

  test('full web flow → chips + submit', async ({ page }) => {
    let posted = false;
    await page.route('**/formspree.io/**', (route) => route.fulfill({ status: 200, body: 'ok' }));
    page.on('request', (req) => {
      if (req.url().includes('formspree.io')) posted = true;
    });

    await brief.pick('Веб-сайт');
    await brief.next();
    await brief.expectStep(2);
    await brief.pick('Корпоративный сайт');
    await brief.next();
    await brief.expectStep(3);
    await brief.pick('до 200 000 ₸');
    await brief.next();
    await brief.expectStep(4);
    await brief.pick('Как можно скорее');
    await brief.next();
    await brief.expectStep(5);

    // summary chips reflect selections
    await expect(brief.chips).toContainText(['Веб-сайт', 'Корпоративный сайт', 'до 200 000 ₸', 'Как можно скорее']);

    // submit disabled until both fields filled
    await expect(brief.action).toBeDisabled();
    await expect(brief.action.locator('[data-action-label]')).toHaveText('Отправить заявку');
    await brief.fillContacts('Иван Иванов', '+7 777 000 00 00');
    await expect(brief.action).toBeEnabled();

    await brief.next(); // submit
    await expect.poll(() => posted).toBeTruthy();
  });

  test('cannot advance without a selection (validation gate)', async () => {
    await expect(brief.action).toBeDisabled();
    // force-click does nothing because button is disabled; still on step 1
    await brief.action.click({ force: true }).catch(() => {});
    await brief.expectStep(1);
  });
});
