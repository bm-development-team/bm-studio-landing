import { ui, defaultLang, languages, type Lang } from './ui';

/** Detect locale from URL pathname; falls back to default. */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg && seg in ui) return seg as Lang;
  return defaultLang;
}

/** Get the translation dictionary for a locale. */
export function useTranslations(lang: Lang) {
  return ui[lang] ?? ui[defaultLang];
}

/** Build a localized path. Default locale has no prefix. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '' : clean}`;
}

export const allLangs = Object.keys(languages) as Lang[];
