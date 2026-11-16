import type { Lang } from './ui';

/**
 * Words shown inside the service-card mock-ups (decorative, aria-hidden).
 * Kept short: they sit at 10–13px inside tiny windows.
 */
export interface DemoCopy {
  ux: { title: string; item: string; price: string; pay: string; done: string };
  web: { hero: string; live: string };
  landing: { hero: string; sub: string; price: string; cta: string; lead: string };
  redesign: { before: string; after: string; oldNav: string; newHero: string; start: string };
  seo: { query: string; ours: string; oursSub: string; others: string[] };
  geo: { question: string; answer: string; source: string };
  audit: { rings: string[]; checks: string[] };
  /** screens of the phone in the process panel, one per step */
  phone: {
    chat: string[];
    brief: string;
    briefDone: string;
    briefItems: string[];
    blocks: string[];
    designHero: string;
    designCta: string;
    code: string[];
    launched: string;
    url: string;
    notify: string;
    call: string;
    designer: string;
    blocksCount: string;
    speed: string;
  };
}

export const demoCopy: Record<Lang, DemoCopy> = {
  ru: {
    ux: { title: 'Заказ', item: 'Капучино', price: '1 200 ₸', pay: 'Оплатить', done: 'Готово' },
    web: { hero: 'Новый сайт', live: 'Live' },
    landing: { hero: 'Курс UX-дизайна', sub: 'Старт 1 декабря', price: '49 000 ₸', cta: 'Записаться', lead: '+1 заявка' },
    redesign: { before: 'Было', after: 'Стало', oldNav: 'Главная | О нас | Контакты', newHero: 'Свежий взгляд', start: 'Начать' },
    seo: { query: 'веб-студия алматы', ours: 'bmstudio.kz', oursSub: 'Сайты и приложения', others: ['studio-one.kz', 'webpro.kz', 'design-lab.kz'] },
    geo: { question: 'Какую студию выбрать для сайта?', answer: 'Посмотрите BM Studio — делают быстрые сайты и приложения в Алматы.', source: 'bmstudio.kz' },
    audit: { rings: ['Скорость', 'SEO', 'UX'], checks: ['Сжаты картинки', 'Есть метатеги', 'Удобно с телефона'] },
    phone: {
      chat: ['Привет! Нужен сайт для кофейни', 'Здравствуйте! Расскажите о задаче — созвонимся сегодня?', 'Да, в 15:00 👍'],
      brief: 'Бриф',
      briefDone: '5 из 5 готово',
      briefItems: ['Цели проекта', 'Аудитория', 'Конкуренты', 'Сроки', 'Бюджет'],
      blocks: ['Шапка', 'Первый экран', 'Преимущества', 'Меню', 'Отзывы', 'Заявка'],
      designHero: 'Кофе с собой',
      designCta: 'Заказать',
      code: ["import { Hero } from './ui'", 'export default () => (', '  <Page>', '    <Hero title="Кофе" />', '    <Menu items={menu} />', '    <Form lead />', '  </Page>', ')', '', '$ npm run build ✓'],
      launched: 'Сайт запущен',
      url: 'coffee.kz',
      notify: 'Новая заявка',
      call: 'Созвон · 15:00',
      designer: 'Дизайнер',
      blocksCount: '6 блоков',
      speed: 'Скорость',
    },
  },
  en: {
    ux: { title: 'Order', item: 'Cappuccino', price: '$3.50', pay: 'Pay', done: 'Done' },
    web: { hero: 'New website', live: 'Live' },
    landing: { hero: 'UX design course', sub: 'Starts December 1', price: '$99', cta: 'Enroll', lead: '+1 lead' },
    redesign: { before: 'Before', after: 'After', oldNav: 'Home | About | Contact', newHero: 'Fresh look', start: 'Start' },
    seo: { query: 'web studio almaty', ours: 'bmstudio.kz', oursSub: 'Websites & apps', others: ['studio-one.kz', 'webpro.kz', 'design-lab.kz'] },
    geo: { question: 'Which studio should build my site?', answer: 'Try BM Studio — fast websites and apps from Almaty.', source: 'bmstudio.kz' },
    audit: { rings: ['Speed', 'SEO', 'UX'], checks: ['Images compressed', 'Meta tags set', 'Mobile friendly'] },
    phone: {
      chat: ['Hi! We need a site for our coffee shop', 'Hello! Tell us about it — call today?', 'Yes, at 3 pm 👍'],
      brief: 'Brief',
      briefDone: '5 of 5 done',
      briefItems: ['Goals', 'Audience', 'Competitors', 'Timeline', 'Budget'],
      blocks: ['Header', 'Hero', 'Benefits', 'Menu', 'Reviews', 'Request'],
      designHero: 'Coffee to go',
      designCta: 'Order',
      code: ["import { Hero } from './ui'", 'export default () => (', '  <Page>', '    <Hero title="Coffee" />', '    <Menu items={menu} />', '    <Form lead />', '  </Page>', ')', '', '$ npm run build ✓'],
      launched: 'Site is live',
      url: 'coffee.kz',
      notify: 'New request',
      call: 'Call · 3 pm',
      designer: 'Designer',
      blocksCount: '6 blocks',
      speed: 'Speed',
    },
  },
  kk: {
    ux: { title: 'Тапсырыс', item: 'Капучино', price: '1 200 ₸', pay: 'Төлеу', done: 'Дайын' },
    web: { hero: 'Жаңа сайт', live: 'Live' },
    landing: { hero: 'UX-дизайн курсы', sub: '1 желтоқсанда басталады', price: '49 000 ₸', cta: 'Жазылу', lead: '+1 өтінім' },
    redesign: { before: 'Бұрын', after: 'Қазір', oldNav: 'Басты | Біз туралы | Байланыс', newHero: 'Жаңа келбет', start: 'Бастау' },
    seo: { query: 'веб-студия алматы', ours: 'bmstudio.kz', oursSub: 'Сайттар мен қосымшалар', others: ['studio-one.kz', 'webpro.kz', 'design-lab.kz'] },
    geo: { question: 'Сайтқа қай студияны таңдау керек?', answer: 'BM Studio-ны қараңыз — Алматыда жылдам сайттар мен қосымшалар жасайды.', source: 'bmstudio.kz' },
    audit: { rings: ['Жылдамдық', 'SEO', 'UX'], checks: ['Суреттер сығылған', 'Метатегтер бар', 'Телефонға ыңғайлы'] },
    phone: {
      chat: ['Сәлем! Кофеханаға сайт керек', 'Сәлеметсіз бе! Міндетті айтып беріңіз — бүгін сөйлесейік пе?', 'Иә, 15:00-де 👍'],
      brief: 'Бриф',
      briefDone: '5/5 дайын',
      briefItems: ['Жоба мақсаты', 'Аудитория', 'Бәсекелестер', 'Мерзім', 'Бюджет'],
      blocks: ['Тақырып', 'Бірінші экран', 'Артықшылықтар', 'Мәзір', 'Пікірлер', 'Өтінім'],
      designHero: 'Кофе алып кету',
      designCta: 'Тапсырыс',
      code: ["import { Hero } from './ui'", 'export default () => (', '  <Page>', '    <Hero title="Кофе" />', '    <Menu items={menu} />', '    <Form lead />', '  </Page>', ')', '', '$ npm run build ✓'],
      launched: 'Сайт іске қосылды',
      url: 'coffee.kz',
      notify: 'Жаңа өтінім',
      call: 'Қоңырау · 15:00',
      designer: 'Дизайнер',
      blocksCount: '6 блок',
      speed: 'Жылдамдық',
    },
  },
};
