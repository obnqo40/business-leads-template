export type MessengerId = "telegram" | "max" | "vk" | "phone" | "email" | "other";
export type DeliveryChannelId = "telegram" | "max" | "email" | "googleSheets";

export type BusinessService = {
  id: string;
  title: string;
  description: string;
  price: string;
  duration?: string;
  result?: string;
  features: string[];
  popular?: boolean;
};

export type SectionCopy = {
  eyebrow?: string;
  title: string;
  description: string;
};

export type BusinessConfig = {
  brand: {
    name: string;
    shortName: string;
    niche: string;
    description: string;
    promise: string;
  };
  navigation: Array<{ label: string; href: string }>;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
    badges: string[];
    stats: Array<{ value: string; label: string }>;
  };
  cta: {
    primary: string;
    secondary: string;
    service: string;
    form: string;
  };
  sections: {
    services: SectionCopy;
    benefits: SectionCopy;
    howItWorks: SectionCopy;
    reviews: SectionCopy;
    form: SectionCopy;
    contacts: SectionCopy;
  };
  services: BusinessService[];
  benefits: Array<{ title: string; description: string }>;
  howItWorks: Array<{ title: string; description: string }>;
  reviews: Array<{ name: string; text: string; detail: string; rating: string }>;
  form: {
    title: string;
    subtitle: string;
    noteTitle: string;
    noteText: string;
    submit: string;
    loading: string;
    success: string;
    error: string;
    placeholders: {
      name: string;
      contact: string;
      comment: string;
    };
    privacyText: string;
  };
  contacts: {
    phone: string;
    email: string;
    address?: string;
    workingHours?: string;
    messengers: Array<{
      id: MessengerId;
      label: string;
      value: string;
      url: string;
      enabled: boolean;
    }>;
  };
  integrations: {
    enabledContactMethods: MessengerId[];
    enabledDeliveryChannels: DeliveryChannelId[];
    contactMethodLabels: Record<MessengerId, string>;
  };
  locale: {
    language: string;
    timeZone: string;
  };
  theme: {
    colors: {
      background: string;
      surface: string;
      ink: string;
      muted: string;
      primary: string;
      primaryContrast: string;
      accent: string;
      border: string;
    };
  };
  privacy: {
    operatorName: string;
    operatorEmail: string;
    operatorPhone: string;
    intro: string;
    dataPurpose: string;
    dataCollected: string[];
    deliveryChannelsText: string;
    retentionText: string;
    clientAdaptationNote: string;
  };
};

export const businessConfig: BusinessConfig = {
  brand: {
    name: "Fresh Cut",
    shortName: "Fresh Cut",
    niche: "барбершоп",
    description:
      "Мужские стрижки, оформление бороды и уход в спокойной студии рядом с домом.",
    promise: "Аккуратный образ, понятная цена и запись без лишних звонков."
  },
  navigation: [
    { label: "Услуги", href: "#services" },
    { label: "Почему мы", href: "#benefits" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Контакты", href: "#contacts" }
  ],
  hero: {
    eyebrow: "Барбершоп Fresh Cut",
    title: "Стрижка и борода без суеты: выберите услугу, а мы подберем время",
    subtitle:
      "Оставьте заявку, выберите удобный канал связи, и администратор подтвердит время без лишних звонков.",
    image: "/images/fresh-cut-hero.png",
    imageAlt: "Современное рабочее место барбера Fresh Cut",
    badges: ["Ответ в удобном канале", "Запись за минуту", "Цены до визита"],
    stats: [
      { value: "45-90 мин", label: "на основную услугу" },
      { value: "10:00-21:00", label: "ежедневно" },
      { value: "4.9/5", label: "оценка клиентов" }
    ]
  },
  cta: {
    primary: "Записаться",
    secondary: "Написать напрямую",
    service: "Выбрать",
    form: "Отправить заявку"
  },
  sections: {
    services: {
      eyebrow: "Меню услуг",
      title: "Популярные услуги с понятной ценой",
      description:
        "Карточки легко заменить под любую нишу: маникюр, репетитора, тренера, автосервис или кофейню."
    },
    benefits: {
      eyebrow: "Почему удобно",
      title: "Сайт сразу ведет клиента к заявке",
      description:
        "Посетитель видит предложение, выбирает услугу и сам указывает канал, где ему комфортно продолжить общение."
    },
    howItWorks: {
      eyebrow: "Путь клиента",
      title: "Три шага от интереса до записи",
      description:
        "Сценарий подходит для большинства локальных услуг: меньше ручных переписок и больше понятных заявок."
    },
    reviews: {
      eyebrow: "Доверие",
      title: "Отзывы помогают решиться быстрее",
      description:
        "Блок можно заменить реальными отзывами клиента или временно оставить как аккуратную демо-заготовку."
    },
    form: {
      eyebrow: "Заявка",
      title: "Оставьте контакт, мы ответим удобным способом",
      description:
        "Форма короткая, валидируется на клиенте и сервере, а владелец получает заявку в подключенные каналы."
    },
    contacts: {
      eyebrow: "Связаться",
      title: "Контакты и быстрые каналы связи",
      description:
        "Можно оставить заявку через форму или написать напрямую, если вопрос срочный."
    }
  },
  services: [
    {
      id: "haircut",
      title: "Мужская стрижка",
      description:
        "Подберем форму под тип волос и образ жизни, аккуратно уложим и дадим рекомендации по уходу.",
      price: "от 1 500 ₽",
      duration: "45-60 мин",
      result: "чистая форма и легкая укладка",
      features: ["консультация", "мытье головы", "укладка"],
      popular: true
    },
    {
      id: "beard",
      title: "Борода и контур",
      description:
        "Оформим длину, линию щек и шею, чтобы борода выглядела собранно каждый день.",
      price: "от 1 000 ₽",
      duration: "30-45 мин",
      result: "ровный контур без лишней резкости",
      features: ["форма бороды", "контур", "финишный уход"]
    },
    {
      id: "combo",
      title: "Стрижка + борода",
      description:
        "Комплексный визит для цельного образа: волосы, борода, укладка и финальная проверка деталей.",
      price: "от 2 300 ₽",
      duration: "75-90 мин",
      result: "готовый образ за один визит",
      features: ["экономия времени", "единый стиль", "приоритетная запись"]
    }
  ],
  benefits: [
    {
      title: "Заявка не теряется",
      description:
        "Backend отправляет лид во все подключенные каналы, а сбой одного адаптера не останавливает остальные."
    },
    {
      title: "Клиент выбирает канал",
      description:
        "Telegram, MAX, VK, звонок, email или другой способ связи выбираются прямо в форме."
    },
    {
      title: "Один конфиг для клиента",
      description:
        "Название, услуги, цены, отзывы, контакты, CTA и политика меняются в одном файле."
    },
    {
      title: "Готово к продаже",
      description:
        "Шаблон уже содержит privacy, env example, README, адаптеры и Vercel-ready структуру."
    }
  ],
  howItWorks: [
    {
      title: "Клиент выбирает услугу",
      description: "В карточках есть цена, длительность и понятный результат визита."
    },
    {
      title: "Оставляет заявку",
      description: "Форма собирает только нужные данные и защищена honeypot-полем от спама."
    },
    {
      title: "Владелец получает лид",
      description: "Заявка уходит в Telegram, email, Google Sheets или другой подключенный канал."
    }
  ],
  reviews: [
    {
      name: "Алексей",
      detail: "стрижка и борода",
      rating: "5.0",
      text: "Записался через сайт, ответили в Telegram через несколько минут. Пришел ко времени, все четко."
    },
    {
      name: "Игорь",
      detail: "мужская стрижка",
      rating: "4.9",
      text: "Понравилось, что сразу видно цены и можно написать пожелания. Не пришлось созваниваться."
    },
    {
      name: "Дмитрий",
      detail: "комбо",
      rating: "5.0",
      text: "Выбрал удобный канал связи и быстро договорился. На месте сделали именно тот формат, который хотел."
    }
  ],
  form: {
    title: "Записаться или уточнить время",
    subtitle:
      "Оставьте имя, контакт и услугу. Мы получим заявку и ответим там, где вам удобно.",
    noteTitle: "Что будет после отправки",
    noteText:
      "Заявка уйдет владельцу в подключенные каналы. Если один канал временно недоступен, остальные все равно попробуют доставить сообщение.",
    submit: "Отправить заявку",
    loading: "Отправляем...",
    success: "Заявка отправлена. Мы свяжемся с вами удобным способом.",
    error: "Не удалось отправить заявку. Попробуйте позже или напишите напрямую.",
    placeholders: {
      name: "Иван",
      contact: "+7 900 000-00-00 или @username",
      comment: "Например: хочу записаться на вечер, удобнее ответить в Telegram"
    },
    privacyText: "Я согласен на обработку персональных данных и принимаю"
  },
  contacts: {
    phone: "+7 900 000-00-00",
    email: "hello@freshcut.example",
    address: "Москва, ул. Примерная, 10",
    workingHours: "Ежедневно с 10:00 до 21:00",
    messengers: [
      {
        id: "telegram",
        label: "Telegram",
        value: "@freshcut_demo",
        url: "https://t.me/freshcut_demo",
        enabled: true
      },
      {
        id: "max",
        label: "MAX",
        value: "Fresh Cut",
        url: "https://max.ru",
        enabled: true
      },
      {
        id: "vk",
        label: "VK",
        value: "vk.com/freshcut_demo",
        url: "https://vk.com/freshcut_demo",
        enabled: true
      },
      {
        id: "phone",
        label: "Телефон",
        value: "+7 900 000-00-00",
        url: "tel:+79000000000",
        enabled: true
      },
      {
        id: "email",
        label: "Email",
        value: "hello@freshcut.example",
        url: "mailto:hello@freshcut.example",
        enabled: true
      }
    ]
  },
  integrations: {
    enabledContactMethods: ["telegram", "max", "vk", "phone", "email", "other"],
    enabledDeliveryChannels: ["telegram", "email", "googleSheets"],
    contactMethodLabels: {
      telegram: "Telegram",
      max: "MAX",
      vk: "VK",
      phone: "Телефонный звонок",
      email: "Email",
      other: "Другое"
    }
  },
  locale: {
    language: "ru-RU",
    timeZone: "Europe/Moscow"
  },
  theme: {
    colors: {
      background: "#f8faf7",
      surface: "#ffffff",
      ink: "#111827",
      muted: "#5f6b76",
      primary: "#176b4d",
      primaryContrast: "#ffffff",
      accent: "#c88a39",
      border: "#dfe7df"
    }
  },
  privacy: {
    operatorName: "Fresh Cut",
    operatorEmail: "hello@freshcut.example",
    operatorPhone: "+7 900 000-00-00",
    intro:
      "Эта политика описывает, как обрабатываются заявки, отправленные через сайт. Перед запуском под реального клиента замените данные оператора и при необходимости согласуйте текст с юристом.",
    dataPurpose:
      "обработка заявки, связь с клиентом и согласование услуги, времени визита или консультации",
    dataCollected: [
      "имя",
      "контакт для связи",
      "выбранная услуга",
      "удобный способ ответа",
      "комментарий к заявке",
      "источник и дата отправки"
    ],
    deliveryChannelsText:
      "Заявка может быть передана владельцу бизнеса через Telegram, MAX, email, Google Sheets или другие подключенные каналы. Секретные ключи этих сервисов хранятся только на сервере.",
    retentionText:
      "Данные хранятся столько, сколько необходимо для обработки заявки и последующей коммуникации с клиентом.",
    clientAdaptationNote:
      "Для коммерческого запуска укажите фактического оператора, контакты, подключенные сервисы и сроки хранения данных."
  }
};
