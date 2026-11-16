import type { APIRoute } from 'astro';
import { ui, type Dictionary, type Lang } from '../i18n/ui';
import { localizePath } from '../i18n/utils';

/**
 * /llms.txt — a plain markdown summary of the studio for AI assistants (llmstxt.org).
 * Built from the same copy as the page, so it never drifts from what visitors see.
 */
function section(t: Dictionary, lang: Lang, site: URL): string {
  const url = new URL(localizePath('/', lang), site).href;
  const services = t.services.items.map((s) => `- **${s.phrase}** — ${s.text}`).join('\n');
  const steps = t.process.steps.map((s, i) => `${i + 1}. **${s.title}** (${s.duration}) — ${s.description}`).join('\n');
  const faq = t.faq.items.map((f) => `### ${f.q}\n${f.a}`).join('\n\n');
  const cases = t.cases.items.map((c) => `- **${c.title}** — ${c.text}`).join('\n');
  return `## ${t.services.heading} (${lang}) — ${url}

${services}

## ${t.process.heading}

${t.process.lead}

${steps}

## ${t.cases.heading}

${cases}

## ${t.faq.heading}

${faq}`;
}

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://bm-studio-landing.vercel.app');
  const ru = ui.ru;
  const body = `# BM Studio

> ${ru.meta.description}

- Сайт: ${new URL('/', base).href} (ru), ${new URL('/en/', base).href} (en), ${new URL('/kk/', base).href} (kk)
- Телефон: ${ru.contact.phone}
- Email: ${ru.contact.email}
- Страна: Казахстан. Языки работы: русский, казахский, английский.
- Оффер: первый кликабельный прототип — через 2 недели после заявки.
- Как начать: заполнить бриф на сайте (${new URL('/#contact', base).href}) — предложение в течение одного рабочего дня.

${section(ru, 'ru', base)}

---

# BM Studio (English)

> ${ui.en.meta.description}

${section(ui.en, 'en', base)}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
