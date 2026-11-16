import { test, expect } from '@playwright/test';

test.describe('SEO and GEO', () => {
  test('title, description and canonical carry the offer and services', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/разработка сайтов, приложений и UX\/UI-дизайн/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Первый прототип — через 2 недели/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/$/);
    await expect(page.locator('link[rel="alternate"][hreflang="kk"]')).toHaveAttribute('href', /\/kk\/$/);
  });

  test('JSON-LD: organization with services and an FAQ matching the visible block', async ({ page }) => {
    await page.goto('/');
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const graph = JSON.parse(raw ?? '{}')['@graph'] as Array<Record<string, unknown>>;
    const types = graph.map((n) => n['@type']);
    expect(types).toEqual(expect.arrayContaining(['Organization', 'WebSite', 'WebPage', 'FAQPage']));
    const org = graph.find((n) => n['@type'] === 'Organization') as { hasOfferCatalog: { itemListElement: unknown[] } };
    expect(org.hasOfferCatalog.itemListElement).toHaveLength(7);
    const faq = graph.find((n) => n['@type'] === 'FAQPage') as { mainEntity: Array<{ name: string }> };
    const visible = page.locator('#faq details h3');
    await expect(visible).toHaveCount(faq.mainEntity.length);
    await expect(visible.first()).toHaveText(faq.mainEntity[0].name);
  });

  test('FAQ answers open and close', async ({ page }) => {
    await page.goto('/');
    const second = page.locator('#faq details').nth(1);
    await expect(second.locator('p')).toBeHidden();
    await second.locator('summary').click();
    await expect(second.locator('p')).toBeVisible();
  });

  test('robots.txt allows AI crawlers and points to sitemap and llms.txt', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
      expect(body).toContain(`User-agent: ${bot}\nAllow: /`);
    }
    expect(body).toMatch(/Sitemap: .*sitemap-index\.xml/);
    expect(body).toContain('llms.txt');
  });

  test('llms.txt summarises the studio from the page copy', async ({ request }) => {
    const res = await request.get('/llms.txt');
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body.startsWith('# BM Studio')).toBeTruthy();
    expect(body).toContain('Видны в ответах ИИ');
    expect(body).toContain('через 2 недели');
    expect(body).toContain('Questions and answers');
  });
});
