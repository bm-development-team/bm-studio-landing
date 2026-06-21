export const languages = {
  ru: 'Русский',
  en: 'English',
  kk: 'Қазақша',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'ru';

export interface Service {
  title: string;
  description: string;
}

export interface CaseItem {
  title: string;
  image?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
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
  nav: { services: string; cases: string };
  header: { cta: string };
  hero: {
    title: string;
    ctaCases: string;
    ctaContact: string;
    subtitle: string;
  };
  services: { heading: string; subtitle: string; items: Service[] };
  cases: { heading: string; viewAll: string; items: CaseItem[] };
  process: { heading: string; steps: ProcessStep[] };
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
  };
  footer: { contactsLabel: string };
  a11y: { langSwitch: string };
}

export const ui: Record<Lang, Dictionary> = {
  ru: {
    meta: {
      title: 'BM Studio — digital-студия для брендов',
      description:
        'BM Studio создаёт сайты, айдентику и digital-интерфейсы, которые формируют первое впечатление, усиливают бренд и помогают бизнесу двигаться быстрее.',
    },
    nav: { services: 'Услуги', cases: 'Кейсы' },
    header: { cta: 'Связаться с нами' },
    hero: {
      title: 'Digital-студия для брендов, которые хотят звучать громче',
      ctaCases: 'Наши кейсы',
      ctaContact: 'Связаться с нами',
      subtitle:
        'BM Studio создаёт сайты, айдентику и digital-интерфейсы, которые не просто выглядят красиво — они формируют первое впечатление, усиливают бренд и помогают бизнесу двигаться быстрее.',
    },
    services: {
      heading: 'Наши услуги',
      subtitle:
        'Мы создаём digital-решения, которые помогают бренду выглядеть сильнее, понятнее и заметнее. От первого экрана до финальной кнопки — каждый элемент работает на впечатление, доверие и действие.',
      items: [
        { title: 'UX/UI дизайн', description: 'Интерфейсы, в которых каждый экран работает на комфорт, логику и безупречный пользовательский опыт.' },
        { title: 'Разработка сайтов', description: 'Быстрые, адаптивные и аккуратно собранные сайты, готовые к запуску и росту бизнеса.' },
        { title: 'Лендинги', description: 'Эффектные страницы для продуктов, услуг и запусков, которые красиво раскрывают ценность бренда.' },
        { title: 'Редизайн', description: 'Обновляем устаревшие сайты — свежий визуал, скорость и удобство без потери смысла.' },
      ],
    },
    cases: {
      heading: 'Наши кейсы',
      viewAll: 'Все',
      items: [
        { title: 'RestApp', image: '/assets/cases/restapp.png' },
        { title: 'REEMAX' },
        { title: 'REEMAX' },
      ],
    },
    process: {
      heading: 'Как мы работаем',
      steps: [
        { title: 'Заявка', description: 'Вы оставляете заявку или пишете нам напрямую. Мы уточняем задачу, формат проекта и ваши цели.' },
        { title: 'Брифинг', description: 'Разбираем бизнес, аудиторию, конкурентов, стиль и функционал, который нужен проекту.' },
        { title: 'Структура', description: 'Собираем логику сайта: страницы, блоки, сценарии пользователя и ключевые действия.' },
        { title: 'Дизайн', description: 'Создаем визуальную концепцию, подбираем цвета, типографику, стиль и оформляем все экраны.' },
        { title: 'Разработка', description: 'Переносим дизайн в рабочий сайт, адаптируем под устройства, подключаем формы и базовые настройки.' },
        { title: 'Запуск', description: 'Проверяем сайт, исправляем детали и подготавливаем проект к публикации.' },
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
    },
    footer: { contactsLabel: 'Контакты' },
    a11y: { langSwitch: 'Выбрать язык' },
  },

  en: {
    meta: {
      title: 'BM Studio — digital studio for brands',
      description:
        'BM Studio builds websites, identity and digital interfaces that shape first impressions, strengthen the brand and help business move faster.',
    },
    nav: { services: 'Services', cases: 'Cases' },
    header: { cta: 'Get in touch' },
    hero: {
      title: 'Digital studio for brands that want to sound louder',
      ctaCases: 'Our cases',
      ctaContact: 'Get in touch',
      subtitle:
        'BM Studio builds websites, identity and digital interfaces that not only look great — they shape the first impression, strengthen the brand and help business move faster.',
    },
    services: {
      heading: 'Our services',
      subtitle:
        'We craft digital solutions that make a brand look stronger, clearer and more visible. From the first screen to the final button — every element works for impression, trust and action.',
      items: [
        { title: 'UX/UI design', description: 'Interfaces where every screen works for comfort, logic and a flawless user experience.' },
        { title: 'Web development', description: 'Fast, responsive and neatly built websites, ready to launch and grow your business.' },
        { title: 'Landing pages', description: 'Striking pages for products, services and launches that reveal the brand value beautifully.' },
        { title: 'Redesign', description: 'We refresh outdated sites — new visuals, speed and usability without losing the meaning.' },
      ],
    },
    cases: {
      heading: 'Our cases',
      viewAll: 'All',
      items: [
        { title: 'RestApp', image: '/assets/cases/restapp.png' },
        { title: 'REEMAX' },
        { title: 'REEMAX' },
      ],
    },
    process: {
      heading: 'How we work',
      steps: [
        { title: 'Request', description: 'You leave a request or message us directly. We clarify the task, project format and your goals.' },
        { title: 'Briefing', description: 'We study the business, audience, competitors, style and the functionality the project needs.' },
        { title: 'Structure', description: 'We assemble the site logic: pages, blocks, user scenarios and key actions.' },
        { title: 'Design', description: 'We create the visual concept, pick colors, typography, style and design every screen.' },
        { title: 'Development', description: 'We turn the design into a working site, adapt it to devices, connect forms and base settings.' },
        { title: 'Launch', description: 'We test the site, fix the details and prepare the project for publication.' },
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
    },
    footer: { contactsLabel: 'Contacts' },
    a11y: { langSwitch: 'Select language' },
  },

  kk: {
    meta: {
      title: 'BM Studio — брендтерге арналған digital студия',
      description:
        'BM Studio алғашқы әсерді қалыптастыратын, брендті күшейтетін және бизнеске жылдам жүруге көмектесетін сайттар, айдентика және digital интерфейстер жасайды.',
    },
    nav: { services: 'Қызметтер', cases: 'Кейстер' },
    header: { cta: 'Хабарласу' },
    hero: {
      title: 'Қаттырақ естілгісі келетін брендтерге арналған digital студия',
      ctaCases: 'Біздің кейстер',
      ctaContact: 'Хабарласу',
      subtitle:
        'BM Studio тек әдемі көрінетін емес — алғашқы әсерді қалыптастыратын, брендті күшейтетін және бизнеске жылдам жүруге көмектесетін сайттар, айдентика және digital интерфейстер жасайды.',
    },
    services: {
      heading: 'Біздің қызметтер',
      subtitle:
        'Брендті күштірек, түсініктірек және көрнектірек ететін digital шешімдер жасаймыз. Алғашқы экраннан соңғы түймеге дейін — әр элемент әсер, сенім және әрекет үшін жұмыс істейді.',
      items: [
        { title: 'UX/UI дизайн', description: 'Әр экран ыңғайлылық, логика және мінсіз пайдаланушы тәжірибесі үшін жұмыс істейтін интерфейстер.' },
        { title: 'Сайт әзірлеу', description: 'Жылдам, бейімделген және ұқыпты жиналған, іске қосуға және өсуге дайын сайттар.' },
        { title: 'Лендингтер', description: 'Бренд құндылығын әдемі ашатын өнімдер, қызметтер мен старттарға арналған әсерлі беттер.' },
        { title: 'Редизайн', description: 'Ескірген сайттарды жаңартамыз — мағынасын жоғалтпай, жаңа визуал, жылдамдық пен ыңғайлылық.' },
      ],
    },
    cases: {
      heading: 'Біздің кейстер',
      viewAll: 'Барлығы',
      items: [
        { title: 'RestApp', image: '/assets/cases/restapp.png' },
        { title: 'REEMAX' },
        { title: 'REEMAX' },
      ],
    },
    process: {
      heading: 'Қалай жұмыс істейміз',
      steps: [
        { title: 'Өтінім', description: 'Сіз өтінім қалдырасыз немесе бізге тікелей жазасыз. Біз тапсырманы, жоба форматы мен мақсаттарыңызды нақтылаймыз.' },
        { title: 'Брифинг', description: 'Бизнесті, аудиторияны, бәсекелестерді, стиль мен жобаға қажет функционалды талдаймыз.' },
        { title: 'Құрылым', description: 'Сайт логикасын жинаймыз: беттер, блоктар, пайдаланушы сценарийлері және негізгі әрекеттер.' },
        { title: 'Дизайн', description: 'Визуалды концепция жасаймыз, түс, типографика, стиль таңдап, барлық экрандарды безендіреміз.' },
        { title: 'Әзірлеу', description: 'Дизайнды жұмыс сайтына көшіреміз, құрылғыларға бейімдейміз, формалар мен негізгі баптауларды қосамыз.' },
        { title: 'Іске қосу', description: 'Сайтты тексереміз, бөлшектерді түзетеміз және жобаны жариялауға дайындаймыз.' },
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
    },
    footer: { contactsLabel: 'Байланыс' },
    a11y: { langSwitch: 'Тілді таңдау' },
  },
};
