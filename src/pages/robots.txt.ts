import type { APIRoute } from 'astro';

/**
 * Dynamic robots.txt — always references the correct site domain (from astro.config `site`).
 * AI search and assistant crawlers are named explicitly and allowed (GEO): the studio wants
 * to be found, quoted and recommended by ChatGPT, Claude, Perplexity, Gemini and others.
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'YandexBot',
];

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  const llms = new URL('llms.txt', site).href;
  const ai = AI_AGENTS.map((agent) => `User-agent: ${agent}\nAllow: /`).join('\n\n');
  const body = `User-agent: *
Allow: /

${ai}

# Plain-text summary for AI assistants: ${llms}
Sitemap: ${sitemap}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
