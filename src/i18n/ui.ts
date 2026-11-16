export const languages = {
  ru: 'Русский',
  en: 'English',
  kk: 'Қазақша',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'ru';

export interface Service {
  /** two-to-four word statement set at poster size */
  phrase: string;
  text: string;
}

export interface CaseItem {
  title: string;
  category: string;
  text: string;
  image: string;
  imageAlt: string;
  /** optional second (phone) screenshot */
  imageMobile?: string;
  url?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  /** typical length of the stage */
  duration: string;
  /** what the client gets at this stage */
  points: [string, string, string];
}

export type Direction = 'web' | 'mobile' | 'uxui' | 'identity';

export interface BriefOption {
  value: string;
  label: string;
  sub?: string;
}

export interface BriefQuestion {
  num: string;
  step: string;
  title: string;
  sub: string;
  options: BriefOption[];
}

export interface Dictionary {
  meta: { title: string; description: string };
  nav: { services: string; cases: string; process: string };
  header: { cta: string };
  hero: {
    /** full headline, used for aria-label */
    title: string;
    /** the headline split into its two lines */
    lines: [string, string];
    lead: string;
    cta: string;
    secondary: string;
    statFigure: string;
    statText: string;
    imageAlt: string;
    /** hint under the hero card */
    scroll: string;
  };
  statement: {
    lines: [string, string];
    text: string;
    cta: string;
    /** the offer card next to the statement */
    stat: { label: string; value: string; text: string };
  };
  services: { heading: string; lead: string; items: Service[] };
  cases: { heading: string; lead: string; visit: string; view: string; items: CaseItem[] };
  process: {
    heading: string;
    lead: string;
    stepWord: string;
    /** headline offer shown on the desktop panel */
    offer: string;
    /** label of the milestone after the structure step */
    prototype: string;
    steps: ProcessStep[];
  };
  contact: {
    heading: string;
    description: string;
    phone: string;
    email: string;
    stepWord: string;
    ofWord: string;
    stepNav: string[];
    q1: BriefQuestion;
    q2: { num: string; step: string; title: string; sub: string; byDirection: Record<Direction, BriefOption[]> };
    q3: BriefQuestion;
    q4: BriefQuestion;
    q5: { num: string; step: string; title: string; sub: string; nameLabel: string; namePlaceholder: string; contactLabel: string; contactPlaceholder: string };
    back: string;
    next: string;
    submit: string;
    estimate: {
      label: string;
      weeks: string;
      /** unit forms keyed by Intl.PluralRules category of the max value */
      weekUnits: Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };
      budget: string;
      budgetLow: string;
      note: string;
    };
  };
  footer: { notes: [string, string]; top: string; menu: string };
  a11y: { langSwitch: string };
}

export const ui: Record<Lang, Dictionary> = {
  ru: {
    meta: {
      title: 'BM Studio — digital-студия для брендов',
      description:
        'BM Studio создаёт сайты, айдентику и digital-интерфейсы, которые формируют первое впечатление, усиливают бренд и помогают бизнесу двигаться быстрее.',
    },
    nav: { services: 'Услуги', cases: 'Работы', process: 'Процесс' },
    header: { cta: 'Обсудить проект' },
    hero: {
      title: 'Звучите громче',
      lines: ['Звучите', 'громче'],
      lead: 'BM Studio — digital-студия. Делаем сайты, приложения и айдентику для брендов, которые хотят, чтобы их замечали.',
      cta: 'Заполнить бриф',
      secondary: 'Наши работы',
      statFigure: '1 день',
      statText: 'и у вас персональное предложение',
      imageAlt: 'Сайт REEMAX, сделанный в BM Studio',
      scroll: 'Листайте вниз',
    },
    statement: {
      lines: ['Идеи, которые', 'замечают'],
      text: 'Соединяем дизайн, движение и разработку, чтобы сайт не просто работал, а запоминался. От лендинга под запуск до приложения — делаем так, чтобы о вас говорили.',
      cta: 'Наш подход',
      stat: { label: 'Первый прототип', value: '2 нед', text: 'от заявки до кликабельного прототипа' },
    },
    services: {
      heading: 'Что мы делаем',
      lead: 'Семь направлений — от первого экрана до ответов нейросетей. Можно взять одно или всё вместе.',
      items: [
        { phrase: 'Удобные интерфейсы', text: 'UX/UI-дизайн: проектируем экраны, где каждый шаг понятен — от первого касания до финальной кнопки.' },
        { phrase: 'Сайты на вырост', text: 'Разработка сайтов: быстрые, адаптивные, аккуратно собранные. Запускаем и закладываем фундамент для роста.' },
        { phrase: 'Лендинги, что продают', text: 'Одна страница — одна задача. Раскрываем ценность продукта или запуска и ведём посетителя к заявке.' },
        { phrase: 'Редизайн без потерь', text: 'Обновляем устаревший сайт: свежий визуал, скорость и удобство. Смысл и наработки сохраняем.' },
        { phrase: 'Выше в поиске', text: 'SEO: структура, скорость, метатеги и контент, чтобы сайт находили в Google и Яндексе по нужным запросам.' },
        { phrase: 'Видны в ответах ИИ', text: 'GEO: готовим сайт к ChatGPT, Perplexity и поиску с ИИ, чтобы нейросети цитировали и рекомендовали именно вас.' },
        { phrase: 'Аудит без прикрас', text: 'Проверяем сайт целиком: скорость, SEO, удобство и доступность. Отдаём понятный список того, что мешает заявкам, и план исправлений.' },
      ],
    },
    cases: {
      heading: 'Наши работы',
      lead: 'Проекты, которые уже работают на бизнес наших клиентов.',
      visit: 'Открыть сайт',
      view: 'Смотреть',
      items: [
        {
          title: 'REEMAX',
          category: 'Сайт-каталог · B2B',
          text: 'Сайт казахстанского производителя рабочих перчаток: каталог из 28 моделей с подбором по условиям работы, сертификаты и запрос прайса в один клик. Одинаково удобен с телефона и с компьютера.',
          image: '/assets/cases/reemax-desktop.jpg',
          imageMobile: '/assets/cases/reemax-mobile.jpg',
          imageAlt: 'Главная страница сайта REEMAX',
          url: 'https://reemax.kz',
        },
        {
          title: 'RestApp',
          category: 'Мобильное приложение · UX/UI',
          text: 'Единая платформа для сервиса и отдыха: рестораны, отели и услуги в одном приложении. Спроектировали интерфейс и визуальный стиль — от экрана запуска до входа и регистрации.',
          image: '/assets/cases/restapp-phones.png',
          imageAlt: 'Экраны приложения RestApp',
        },
      ],
    },
    process: {
      heading: 'Как мы работаем',
      lead: 'Шесть шагов от заявки до запуска. Первый прототип — уже через 2 недели, на каждом шаге вы согласуете результат.',
      stepWord: 'Шаг',
      offer: 'Первый прототип — через 2 недели',
      prototype: 'Прототип · 2 нед',
      steps: [
        { title: 'Заявка', description: 'Вы оставляете заявку или пишете нам напрямую. Мы уточняем задачу, формат проекта и ваши цели.', duration: '1 день', points: ['Созвон 15 минут', 'Понимаем задачу', 'Предварительная оценка'] },
        { title: 'Брифинг', description: 'Разбираем бизнес, аудиторию, конкурентов, стиль и функционал, который нужен проекту.', duration: '2–3 дня', points: ['Аудит конкурентов', 'Цели и аудитория', 'Техническое задание'] },
        { title: 'Структура', description: 'Собираем логику сайта: страницы, блоки, сценарии пользователя и ключевые действия.', duration: '3–5 дней', points: ['Карта страниц', 'Прототипы блоков', 'Сценарии пользователя'] },
        { title: 'Дизайн', description: 'Создаем визуальную концепцию, подбираем цвета, типографику, стиль и оформляем все экраны.', duration: '1–2 недели', points: ['Визуальная концепция', 'Все экраны и адаптив', 'Дизайн-система'] },
        { title: 'Разработка', description: 'Переносим дизайн в рабочий сайт, адаптируем под устройства, подключаем формы и базовые настройки.', duration: '2–4 недели', points: ['Вёрстка и анимации', 'Формы и интеграции', 'Все устройства'] },
        { title: 'Запуск', description: 'Проверяем сайт, исправляем детали и подготавливаем проект к публикации.', duration: '2–3 дня', points: ['Тестирование', 'Домен и хостинг', 'SEO-настройки'] },
      ],
    },
    contact: {
      heading: 'Готовы начать?',
      description: 'Заполните короткий бриф — и мы подготовим персональное предложение в течение одного рабочего дня.',
      phone: '+7 (777) 726 26 20',
      email: 'bmstudio@bmstudio.kz',
      stepWord: 'Шаг',
      ofWord: 'из',
      stepNav: ['Направление', 'Тип проекта', 'Бюджет', 'Сроки', 'Контакты'],
      q1: {
        num: '01', step: 'Направление', title: 'Что будем создавать?', sub: 'Выберите одно направление',
        options: [
          { value: 'web', label: 'Веб-сайт', sub: 'Корпоративный, продуктовый или портфолио' },
          { value: 'mobile', label: 'Мобильное приложение', sub: 'iOS, Android или кроссплатформа' },
          { value: 'uxui', label: 'UX/UI дизайн', sub: 'Интерфейсы, которые удобны и красивы' },
          { value: 'identity', label: 'Айдентика для digital', sub: 'Цвет, типографика, стиль бренда' },
        ],
      },
      q2: {
        num: '02', step: 'Тип проекта', title: 'Что именно нужно?', sub: 'Уточните формат — это влияет на сроки и стоимость',
        byDirection: {
          web: [
            { value: 'Лендинг', label: 'Лендинг', sub: 'Одностраничник для продукта или услуги' },
            { value: 'Корпоративный сайт', label: 'Корпоративный сайт', sub: 'Многостраничный сайт компании' },
            { value: 'Интернет-магазин', label: 'Интернет-магазин', sub: 'Каталог товаров с оформлением заказа' },
            { value: 'Редизайн', label: 'Редизайн', sub: 'Обновление существующего сайта' },
          ],
          mobile: [
            { value: 'iOS приложение', label: 'iOS приложение', sub: 'Нативное приложение для iPhone / iPad' },
            { value: 'Android приложение', label: 'Android приложение', sub: 'Нативное приложение для Android' },
            { value: 'Кроссплатформа', label: 'Кроссплатформа', sub: 'React Native или Flutter — iOS + Android' },
            { value: 'MVP / Прототип', label: 'MVP / Прототип', sub: 'Быстрый запуск с ключевым функционалом' },
          ],
          uxui: [
            { value: 'Интерфейс приложения', label: 'Интерфейс приложения', sub: 'Мобильный или десктопный UX/UI' },
            { value: 'Интерфейс сайта', label: 'Интерфейс сайта', sub: 'Дизайн страницы и компонентов' },
            { value: 'Редизайн', label: 'Редизайн', sub: 'Переосмысление существующего продукта' },
            { value: 'Дизайн-система', label: 'Дизайн-система', sub: 'Компоненты, токены, гайдлайн' },
          ],
          identity: [
            { value: 'Логотип и стиль', label: 'Логотип и стиль', sub: 'Знак, цвет, типографика бренда' },
            { value: 'Брендбук', label: 'Брендбук', sub: 'Полное руководство по фирменному стилю' },
            { value: 'Digital-айдентика', label: 'Digital-айдентика', sub: 'Адаптация бренда под соцсети, сайт' },
            { value: 'Паттерны / Графика', label: 'Паттерны / Графика', sub: 'Иллюстрации, текстуры, визуальный язык' },
          ],
        },
      },
      q3: {
        num: '03', step: 'Бюджет', title: 'Какой бюджет?', sub: 'Ориентировочная сумма на проект',
        options: [
          { value: 'до 200 000 ₸', label: 'до 200 000 ₸', sub: 'Небольшой проект' },
          { value: '200 000 – 600 000 ₸', label: '200 000 – 600 000 ₸', sub: 'Средний проект' },
          { value: '600 000 – 1 500 000 ₸', label: '600 000 – 1 500 000 ₸', sub: 'Крупный проект' },
          { value: 'от 1 500 000 ₸', label: 'от 1 500 000 ₸' },
        ],
      },
      q4: {
        num: '04', step: 'Сроки', title: 'Когда нужен результат?', sub: 'Желаемые сроки запуска',
        options: [
          { value: 'Как можно скорее', label: 'Как можно скорее' },
          { value: 'В течение месяца', label: 'В течение месяца' },
          { value: '1–3 месяца', label: '1–3 месяца' },
          { value: 'Гибко, обсудим', label: 'Гибко, обсудим' },
        ],
      },
      q5: {
        num: '05', step: 'Контакты', title: 'Как с вами связаться?', sub: 'Мы напишем или позвоним в удобное время',
        nameLabel: 'Ваше имя', namePlaceholder: 'Иван Иванов',
        contactLabel: 'Телефон или e-mail', contactPlaceholder: '+7 (___) ___ __ __  или  hello@you.kz',
      },
      back: 'Назад',
      next: 'Далее',
      submit: 'Отправить заявку',
      estimate: {
        label: 'Предварительная оценка',
        weeks: '{min}–{max} {unit}',
        weekUnits: { one: 'неделя', few: 'недели', many: 'недель', other: 'недели' },
        budget: 'Обычно бюджет: {budget}',
        budgetLow: 'Для такого формата обычно нужен бюджет {budget} — обсудим, как уложиться.',
        note: 'Точную смету пришлём после брифа',
      },
    },
    footer: { notes: ['BM Studio — digital-студия для брендов', 'Отвечаем в течение рабочего дня'], top: 'Наверх', menu: 'Меню' },
    a11y: { langSwitch: 'Выбрать язык' },
  },

  en: {
    meta: {
      title: 'BM Studio — digital studio for brands',
      description:
        'BM Studio builds websites, identity and digital interfaces that shape first impressions, strengthen the brand and help business move faster.',
    },
    nav: { services: 'Services', cases: 'Work', process: 'Process' },
    header: { cta: 'Start a project' },
    hero: {
      title: 'Sound louder',
      lines: ['Sound', 'louder'],
      lead: 'BM Studio is a digital studio. We build websites, apps and identities for brands that want to be noticed.',
      cta: 'Fill in the brief',
      secondary: 'Our work',
      statFigure: '1 day',
      statText: 'to get your personal proposal',
      imageAlt: 'REEMAX website made by BM Studio',
      scroll: 'Scroll to explore',
    },
    statement: {
      lines: ['Ideas people', 'notice'],
      text: 'We combine design, motion and development so a site does more than work — it sticks. From a launch landing page to an app, we make you worth talking about.',
      cta: 'Our approach',
      stat: { label: 'First prototype', value: '2 wks', text: 'from request to a clickable prototype' },
    },
    services: {
      heading: 'What we do',
      lead: 'Seven services — from the first screen to answers in AI search. Take one or all of them together.',
      items: [
        { phrase: 'Frictionless interfaces', text: 'UX/UI design: screens where every step makes sense, from the first tap to the final button.' },
        { phrase: 'Sites built to grow', text: 'Web development: fast, responsive, neatly built websites, launched with a foundation for growth.' },
        { phrase: 'Landings that sell', text: 'One page, one job. We show what your product or launch is worth and lead visitors to the request.' },
        { phrase: 'Redesign, no losses', text: 'We refresh outdated sites: new visuals, speed and usability, keeping the meaning and what already works.' },
        { phrase: 'Higher in search', text: 'SEO: structure, speed, meta tags and content, so people find your site on Google for the queries that matter.' },
        { phrase: 'Seen in AI answers', text: 'GEO: we prepare your site for ChatGPT, Perplexity and AI search, so the models quote and recommend you.' },
        { phrase: 'An honest audit', text: 'We check the whole site: speed, SEO, usability and accessibility. You get a clear list of what costs you leads and a plan to fix it.' },
      ],
    },
    cases: {
      heading: 'Our work',
      lead: 'Projects already working for our clients.',
      visit: 'Visit the site',
      view: 'View',
      items: [
        {
          title: 'REEMAX',
          category: 'Catalogue site · B2B',
          text: 'A website for a Kazakhstani maker of work gloves: a catalogue of 28 models with selection by working conditions, certificates and a one-click price request. Equally easy on a phone and on a desktop.',
          image: '/assets/cases/reemax-desktop.jpg',
          imageMobile: '/assets/cases/reemax-mobile.jpg',
          imageAlt: 'REEMAX website home page',
          url: 'https://reemax.kz',
        },
        {
          title: 'RestApp',
          category: 'Mobile app · UX/UI',
          text: 'One platform for service and leisure: restaurants, hotels and services in a single app. We designed the interface and visual style, from the launch screen to sign-in and sign-up.',
          image: '/assets/cases/restapp-phones.png',
          imageAlt: 'RestApp app screens',
        },
      ],
    },
    process: {
      heading: 'How we work',
      lead: 'Six steps from request to launch. The first prototype is ready in 2 weeks, and you approve the result at every step.',
      stepWord: 'Step',
      offer: 'First prototype in 2 weeks',
      prototype: 'Prototype · 2 wks',
      steps: [
        { title: 'Request', description: 'You leave a request or message us directly. We clarify the task, project format and your goals.', duration: '1 day', points: ['15-minute call', 'We get the task', 'Rough estimate'] },
        { title: 'Briefing', description: 'We study the business, audience, competitors, style and the functionality the project needs.', duration: '2–3 days', points: ['Competitor audit', 'Goals and audience', 'Technical brief'] },
        { title: 'Structure', description: 'We assemble the site logic: pages, blocks, user scenarios and key actions.', duration: '3–5 days', points: ['Sitemap', 'Block wireframes', 'User flows'] },
        { title: 'Design', description: 'We create the visual concept, pick colors, typography, style and design every screen.', duration: '1–2 weeks', points: ['Visual concept', 'All screens, responsive', 'Design system'] },
        { title: 'Development', description: 'We turn the design into a working site, adapt it to devices, connect forms and base settings.', duration: '2–4 weeks', points: ['Front-end and motion', 'Forms and integrations', 'Every device'] },
        { title: 'Launch', description: 'We test the site, fix the details and prepare the project for publication.', duration: '2–3 days', points: ['Testing', 'Domain and hosting', 'SEO setup'] },
      ],
    },
    contact: {
      heading: 'Ready to start?',
      description: 'Fill in a short brief — and we will prepare a tailored proposal within one business day.',
      phone: '+7 (777) 726 26 20',
      email: 'bmstudio@bmstudio.kz',
      stepWord: 'Step',
      ofWord: 'of',
      stepNav: ['Direction', 'Project type', 'Budget', 'Timeline', 'Contacts'],
      q1: {
        num: '01', step: 'Direction', title: 'What are we building?', sub: 'Pick one direction',
        options: [
          { value: 'web', label: 'Website', sub: 'Corporate, product or portfolio' },
          { value: 'mobile', label: 'Mobile app', sub: 'iOS, Android or cross-platform' },
          { value: 'uxui', label: 'UX/UI design', sub: 'Interfaces that are usable and beautiful' },
          { value: 'identity', label: 'Digital identity', sub: 'Color, typography, brand style' },
        ],
      },
      q2: {
        num: '02', step: 'Project type', title: 'What exactly do you need?', sub: 'Specify the format — it affects timing and cost',
        byDirection: {
          web: [
            { value: 'Лендинг', label: 'Landing', sub: 'Single page for a product or service' },
            { value: 'Корпоративный сайт', label: 'Corporate site', sub: 'Multi-page company website' },
            { value: 'Интернет-магазин', label: 'Online store', sub: 'Product catalog with checkout' },
            { value: 'Редизайн', label: 'Redesign', sub: 'Refresh of an existing site' },
          ],
          mobile: [
            { value: 'iOS приложение', label: 'iOS app', sub: 'Native app for iPhone / iPad' },
            { value: 'Android приложение', label: 'Android app', sub: 'Native app for Android' },
            { value: 'Кроссплатформа', label: 'Cross-platform', sub: 'React Native or Flutter — iOS + Android' },
            { value: 'MVP / Прототип', label: 'MVP / Prototype', sub: 'Fast launch with the core features' },
          ],
          uxui: [
            { value: 'Интерфейс приложения', label: 'App interface', sub: 'Mobile or desktop UX/UI' },
            { value: 'Интерфейс сайта', label: 'Website interface', sub: 'Page and component design' },
            { value: 'Редизайн', label: 'Redesign', sub: 'Rethinking an existing product' },
            { value: 'Дизайн-система', label: 'Design system', sub: 'Components, tokens, guidelines' },
          ],
          identity: [
            { value: 'Логотип и стиль', label: 'Logo & style', sub: 'Mark, color, brand typography' },
            { value: 'Брендбук', label: 'Brand book', sub: 'Full corporate style guide' },
            { value: 'Digital-айдентика', label: 'Digital identity', sub: 'Brand adaptation for social and web' },
            { value: 'Паттерны / Графика', label: 'Patterns / Graphics', sub: 'Illustrations, textures, visual language' },
          ],
        },
      },
      q3: {
        num: '03', step: 'Budget', title: "What's the budget?", sub: 'Approximate amount for the project',
        options: [
          { value: 'до 200 000 ₸', label: 'up to 200 000 ₸', sub: 'Small project' },
          { value: '200 000 – 600 000 ₸', label: '200 000 – 600 000 ₸', sub: 'Medium project' },
          { value: '600 000 – 1 500 000 ₸', label: '600 000 – 1 500 000 ₸', sub: 'Large project' },
          { value: 'от 1 500 000 ₸', label: 'from 1 500 000 ₸' },
        ],
      },
      q4: {
        num: '04', step: 'Timeline', title: 'When do you need it?', sub: 'Desired launch timeline',
        options: [
          { value: 'Как можно скорее', label: 'As soon as possible' },
          { value: 'В течение месяца', label: 'Within a month' },
          { value: '1–3 месяца', label: '1–3 months' },
          { value: 'Гибко, обсудим', label: 'Flexible, let’s discuss' },
        ],
      },
      q5: {
        num: '05', step: 'Contacts', title: 'How can we reach you?', sub: 'We will write or call at a convenient time',
        nameLabel: 'Your name', namePlaceholder: 'John Doe',
        contactLabel: 'Phone or e-mail', contactPlaceholder: '+7 (___) ___ __ __  or  hello@you.kz',
      },
      back: 'Back',
      next: 'Next',
      submit: 'Send request',
      estimate: {
        label: 'Rough estimate',
        weeks: '{min}–{max} {unit}',
        weekUnits: { one: 'week', other: 'weeks' },
        budget: 'Typical budget: {budget}',
        budgetLow: 'This format usually needs {budget} — let\'s discuss how to fit yours.',
        note: 'Exact quote follows after the brief',
      },
    },
    footer: { notes: ['BM Studio — a digital studio for brands', 'We reply within one business day'], top: 'Back to top', menu: 'Menu' },
    a11y: { langSwitch: 'Select language' },
  },

  kk: {
    meta: {
      title: 'BM Studio — брендтерге арналған digital студия',
      description:
        'BM Studio алғашқы әсерді қалыптастыратын, брендті күшейтетін және бизнеске жылдам жүруге көмектесетін сайттар, айдентика және digital интерфейстер жасайды.',
    },
    nav: { services: 'Қызметтер', cases: 'Жұмыстар', process: 'Процесс' },
    header: { cta: 'Жобаны талқылау' },
    hero: {
      title: 'Қаттырақ естіліңіз',
      lines: ['Қаттырақ', 'естіліңіз'],
      lead: 'BM Studio — digital-студия. Байқалғысы келетін брендтерге сайт, қосымша және айдентика жасаймыз.',
      cta: 'Брифті толтыру',
      secondary: 'Жұмыстарымыз',
      statFigure: '1 күн',
      statText: 'және сізге жеке ұсыныс дайын',
      imageAlt: 'BM Studio жасаған REEMAX сайты',
      scroll: 'Төмен айналдырыңыз',
    },
    statement: {
      lines: ['Байқалатын', 'идеялар'],
      text: 'Дизайнды, қозғалысты және әзірлеуді біріктіреміз — сайт жай жұмыс істеп қана қоймай, есте қалсын. Іске қосуға арналған лендингтен қосымшаға дейін — сіз туралы айтатындай етеміз.',
      cta: 'Біздің тәсіл',
      stat: { label: 'Алғашқы прототип', value: '2 апта', text: 'өтінімнен басылатын прототипке дейін' },
    },
    services: {
      heading: 'Не істейміз',
      lead: 'Жеті бағыт — бірінші экраннан нейрожелі жауаптарына дейін. Біреуін немесе бәрін бірге алуға болады.',
      items: [
        { phrase: 'Ыңғайлы интерфейс', text: 'UX/UI дизайн: алғашқы түртуден соңғы батырмаға дейін әр қадамы түсінікті экрандар жобалаймыз.' },
        { phrase: 'Өсуге дайын сайттар', text: 'Сайт әзірлеу: жылдам, бейімделгіш, ұқыпты жиналған сайттар. Іске қосамыз және өсуге негіз қалаймыз.' },
        { phrase: 'Сататын лендингтер', text: 'Бір бет — бір міндет. Өнімнің құндылығын ашып, келушіні өтінімге жетелейміз.' },
        { phrase: 'Шығынсыз редизайн', text: 'Ескірген сайтты жаңартамыз: жаңа визуал, жылдамдық пен ыңғайлылық. Мағынасы мен жетістіктерін сақтаймыз.' },
        { phrase: 'Іздеуде жоғары', text: 'SEO: құрылым, жылдамдық, мета-тегтер мен контент — сайтыңызды Google мен Яндекс қажетті сұраныстар бойынша тапсын.' },
        { phrase: 'ЖИ жауаптарында', text: 'GEO: сайтты ChatGPT, Perplexity және ЖИ іздеуіне дайындаймыз — нейрожелілер дәл сізді келтіріп, ұсынсын.' },
        { phrase: 'Әділ аудит', text: 'Сайтты толық тексереміз: жылдамдық, SEO, ыңғайлылық пен қолжетімділік. Өтінімдерге не кедергі екенін және түзету жоспарын береміз.' },
      ],
    },
    cases: {
      heading: 'Біздің жұмыстар',
      lead: 'Клиенттеріміздің бизнесі үшін жұмыс істеп тұрған жобалар.',
      visit: 'Сайтты ашу',
      view: 'Қарау',
      items: [
        {
          title: 'REEMAX',
          category: 'Каталог-сайт · B2B',
          text: 'Жұмыс қолғаптарын шығаратын қазақстандық өндірушінің сайты: жұмыс жағдайы бойынша таңдауы бар 28 модельден тұратын каталог, сертификаттар және бір басумен прайс сұрау. Телефоннан да, компьютерден де бірдей ыңғайлы.',
          image: '/assets/cases/reemax-desktop.jpg',
          imageMobile: '/assets/cases/reemax-mobile.jpg',
          imageAlt: 'REEMAX сайтының басты беті',
          url: 'https://reemax.kz',
        },
        {
          title: 'RestApp',
          category: 'Мобильді қосымша · UX/UI',
          text: 'Қызмет пен демалысқа арналған бірыңғай платформа: мейрамханалар, қонақүйлер мен қызметтер бір қосымшада. Іске қосу экранынан кіру мен тіркелуге дейін интерфейс пен визуалды стильді жобаладық.',
          image: '/assets/cases/restapp-phones.png',
          imageAlt: 'RestApp қосымшасының экрандары',
        },
      ],
    },
    process: {
      heading: 'Қалай жұмыс істейміз',
      lead: 'Өтінімнен іске қосуға дейін алты қадам. Алғашқы прототип — 2 аптада, әр қадамда нәтижені келісесіз.',
      stepWord: 'Қадам',
      offer: 'Алғашқы прототип — 2 аптада',
      prototype: 'Прототип · 2 апта',
      steps: [
        { title: 'Өтінім', description: 'Сіз өтінім қалдырасыз немесе бізге тікелей жазасыз. Біз тапсырманы, жоба форматы мен мақсаттарыңызды нақтылаймыз.', duration: '1 күн', points: ['15 минуттық қоңырау', 'Міндетті түсінеміз', 'Алдын ала бағалау'] },
        { title: 'Брифинг', description: 'Бизнесті, аудиторияны, бәсекелестерді, стиль мен жобаға қажет функционалды талдаймыз.', duration: '2–3 күн', points: ['Бәсекелестер аудиті', 'Мақсат пен аудитория', 'Техникалық тапсырма'] },
        { title: 'Құрылым', description: 'Сайт логикасын жинаймыз: беттер, блоктар, пайдаланушы сценарийлері және негізгі әрекеттер.', duration: '3–5 күн', points: ['Беттер картасы', 'Блок прототиптері', 'Пайдаланушы сценарийлері'] },
        { title: 'Дизайн', description: 'Визуалды концепция жасаймыз, түс, типографика, стиль таңдап, барлық экрандарды безендіреміз.', duration: '1–2 апта', points: ['Визуалды концепция', 'Барлық экрандар мен адаптив', 'Дизайн-жүйе'] },
        { title: 'Әзірлеу', description: 'Дизайнды жұмыс сайтына көшіреміз, құрылғыларға бейімдейміз, формалар мен негізгі баптауларды қосамыз.', duration: '2–4 апта', points: ['Беттеу мен анимация', 'Формалар мен интеграциялар', 'Барлық құрылғылар'] },
        { title: 'Іске қосу', description: 'Сайтты тексереміз, бөлшектерді түзетеміз және жобаны жариялауға дайындаймыз.', duration: '2–3 күн', points: ['Тестілеу', 'Домен мен хостинг', 'SEO баптаулары'] },
      ],
    },
    contact: {
      heading: 'Бастауға дайынсыз ба?',
      description: 'Қысқа бриф толтырыңыз — біз бір жұмыс күні ішінде жеке ұсыныс дайындаймыз.',
      phone: '+7 (777) 726 26 20',
      email: 'bmstudio@bmstudio.kz',
      stepWord: 'Қадам',
      ofWord: '/',
      stepNav: ['Бағыт', 'Жоба түрі', 'Бюджет', 'Мерзім', 'Байланыс'],
      q1: {
        num: '01', step: 'Бағыт', title: 'Не жасаймыз?', sub: 'Бір бағытты таңдаңыз',
        options: [
          { value: 'web', label: 'Веб-сайт', sub: 'Корпоративтік, өнімдік немесе портфолио' },
          { value: 'mobile', label: 'Мобильді қосымша', sub: 'iOS, Android немесе кроссплатформа' },
          { value: 'uxui', label: 'UX/UI дизайн', sub: 'Ыңғайлы әрі әдемі интерфейстер' },
          { value: 'identity', label: 'Digital айдентика', sub: 'Түс, типографика, бренд стилі' },
        ],
      },
      q2: {
        num: '02', step: 'Жоба түрі', title: 'Нақты не қажет?', sub: 'Форматты нақтылаңыз — бұл мерзім мен бағаға әсер етеді',
        byDirection: {
          web: [
            { value: 'Лендинг', label: 'Лендинг', sub: 'Өнім немесе қызметке арналған бір бет' },
            { value: 'Корпоративный сайт', label: 'Корпоративтік сайт', sub: 'Компанияның көпбетті сайты' },
            { value: 'Интернет-магазин', label: 'Интернет-дүкен', sub: 'Тапсырыс рәсімдейтін тауар каталогы' },
            { value: 'Редизайн', label: 'Редизайн', sub: 'Бар сайтты жаңарту' },
          ],
          mobile: [
            { value: 'iOS приложение', label: 'iOS қосымшасы', sub: 'iPhone / iPad үшін нативті қосымша' },
            { value: 'Android приложение', label: 'Android қосымшасы', sub: 'Android үшін нативті қосымша' },
            { value: 'Кроссплатформа', label: 'Кроссплатформа', sub: 'React Native немесе Flutter — iOS + Android' },
            { value: 'MVP / Прототип', label: 'MVP / Прототип', sub: 'Негізгі функциямен жылдам іске қосу' },
          ],
          uxui: [
            { value: 'Интерфейс приложения', label: 'Қосымша интерфейсі', sub: 'Мобильді немесе десктоп UX/UI' },
            { value: 'Интерфейс сайта', label: 'Сайт интерфейсі', sub: 'Бет пен компоненттер дизайны' },
            { value: 'Редизайн', label: 'Редизайн', sub: 'Бар өнімді қайта ойлау' },
            { value: 'Дизайн-система', label: 'Дизайн-жүйе', sub: 'Компоненттер, токендер, гайдлайн' },
          ],
          identity: [
            { value: 'Логотип и стиль', label: 'Логотип пен стиль', sub: 'Белгі, түс, бренд типографикасы' },
            { value: 'Брендбук', label: 'Брендбук', sub: 'Фирмалық стильдің толық нұсқаулығы' },
            { value: 'Digital-айдентика', label: 'Digital айдентика', sub: 'Брендті соцсеть пен сайтқа бейімдеу' },
            { value: 'Паттерны / Графика', label: 'Паттерндер / Графика', sub: 'Иллюстрация, текстура, визуалды тіл' },
          ],
        },
      },
      q3: {
        num: '03', step: 'Бюджет', title: 'Бюджет қандай?', sub: 'Жобаға шамамен сома',
        options: [
          { value: 'до 200 000 ₸', label: '200 000 ₸ дейін', sub: 'Шағын жоба' },
          { value: '200 000 – 600 000 ₸', label: '200 000 – 600 000 ₸', sub: 'Орташа жоба' },
          { value: '600 000 – 1 500 000 ₸', label: '600 000 – 1 500 000 ₸', sub: 'Ірі жоба' },
          { value: 'от 1 500 000 ₸', label: '1 500 000 ₸ бастап' },
        ],
      },
      q4: {
        num: '04', step: 'Мерзім', title: 'Нәтиже қашан керек?', sub: 'Қалаған іске қосу мерзімі',
        options: [
          { value: 'Как можно скорее', label: 'Мүмкіндігінше тез' },
          { value: 'В течение месяца', label: 'Бір ай ішінде' },
          { value: '1–3 месяца', label: '1–3 ай' },
          { value: 'Гибко, обсудим', label: 'Икемді, талқылаймыз' },
        ],
      },
      q5: {
        num: '05', step: 'Байланыс', title: 'Сізбен қалай байланысамыз?', sub: 'Ыңғайлы уақытта жазамыз немесе қоңырау шаламыз',
        nameLabel: 'Атыңыз', namePlaceholder: 'Иван Иванов',
        contactLabel: 'Телефон немесе e-mail', contactPlaceholder: '+7 (___) ___ __ __  немесе  hello@you.kz',
      },
      back: 'Артқа',
      next: 'Әрі қарай',
      submit: 'Өтінім жіберу',
      estimate: {
        label: 'Алдын ала бағалау',
        weeks: '{min}–{max} {unit}',
        weekUnits: { other: 'апта' },
        budget: 'Әдетте бюджет: {budget}',
        budgetLow: 'Мұндай формат әдетте {budget} бюджетті қажет етеді — қалай сыйғызуды талқылаймыз.',
        note: 'Нақты сметаны брифтен кейін жібереміз',
      },
    },
    footer: { notes: ['BM Studio — брендтерге арналған digital-студия', 'Бір жұмыс күні ішінде жауап береміз'], top: 'Жоғары', menu: 'Мәзір' },
    a11y: { langSwitch: 'Тілді таңдау' },
  },
};
