# Business Leads

**Конфигурируемый сайт для малого бизнеса с приёмом заявок.**

Готовый MVP-шаблон для малого бизнеса: адаптивный лендинг, форма заявки, backend endpoint и доставка лидов владельцу в Telegram, MAX, email или Google Sheets.

Демо-ниша: барбершоп Fresh Cut. Эту же структуру можно адаптировать под мастера маникюра, репетитора, тренера, автосервис, кофейню, доставку, локальный магазин или сервисную услугу.

**[Открыть демо ↗](https://business-leads-template.vercel.app/)** · [Разбор архитектуры](https://github.com/obnqo40/obnqo40/blob/main/docs/business-leads.md) · [Маршрут по коду](https://github.com/obnqo40/obnqo40/blob/main/docs/code-tour.md#1-как-заявка-проходит-через-сервер) · [Портфолио автора](https://github.com/obnqo40)

![Главная страница демонстрационного сайта Fresh Cut](https://raw.githubusercontent.com/obnqo40/obnqo40/main/assets/business-leads.jpg)

## Что входит

- Лендинг на русском языке с hero, услугами, преимуществами, процессом, отзывами, формой и контактами.
- Один главный конфиг клиента: `src/config/business.config.ts`.
- Backend endpoint `POST /api/leads`.
- Модульные адаптеры доставки: Telegram, MAX, email, Google Sheets.
- Honeypot, frontend/backend-валидация, лимиты полей и таймауты адаптеров.
- Страница `/privacy` с шаблонной политикой конфиденциальности.
- Vercel-ready структура без CRM, авторизации, оплаты, базы данных и админки.

## Стек

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- API Route

## Запуск локально

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

Если PowerShell блокирует `npm`, используйте:

```bash
npm.cmd install
npm.cmd run dev
```

## Главный файл клиента

Основной файл настройки:

```text
src/config/business.config.ts
```

Что менять под нового клиента:

- `brand`: название, короткое название, ниша, описание и обещание бренда;
- `navigation`: пункты меню;
- `hero`: первый экран, бейджи, изображение, alt-текст и метрики;
- `cta`: тексты основных кнопок;
- `sections`: заголовки и описания блоков сайта;
- `services`: услуги, цены, длительность, результат и состав услуги;
- `benefits`: преимущества;
- `howItWorks`: шаги работы;
- `reviews`: отзывы;
- `form`: тексты формы, placeholders, success/error сообщения;
- `contacts`: телефон, email, адрес, часы работы и ссылки на мессенджеры;
- `integrations.enabledContactMethods`: способы связи, доступные пользователю в форме;
- `integrations.enabledDeliveryChannels`: каналы, куда владелец получает заявки;
- `integrations.contactMethodLabels`: подписи способов связи в форме и сообщениях лида;
- `locale`: язык и часовой пояс для форматирования даты заявки;
- `theme`: цвета сайта;
- `privacy`: данные оператора и текстовые фрагменты политики.

Данные Fresh Cut должны оставаться только в `business.config.ts` и демо-примерах README. Компоненты берут контент из конфига.

## Быстрая адаптация под клиента

1. Замените `brand`, `hero`, `sections` и `cta`.
2. Заполните реальные услуги в `services`.
3. Добавьте преимущества и отзывы.
4. Проверьте контакты и ссылки на мессенджеры.
5. В `integrations.enabledContactMethods` оставьте только способы связи, которые доступны клиенту.
6. В `integrations.enabledDeliveryChannels` включите каналы, куда владелец должен получать заявки.
7. Обновите `privacy` под фактического оператора данных.
8. Замените hero-изображение в `public/images`.
9. Запустите `npm run lint` и `npm run build`.

Пример:

```ts
integrations: {
  enabledContactMethods: ["telegram", "max", "vk", "phone", "email", "other"],
  enabledDeliveryChannels: ["telegram", "email", "googleSheets"]
}
```

## Переменные окружения

Скопируйте `.env.example` в `.env.local`:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

MAX_BOT_TOKEN=
MAX_CHAT_ID=
MAX_API_URL=

EMAIL_ENABLED=false
EMAIL_TO=
EMAIL_FROM=
RESEND_API_KEY=

GOOGLE_SHEETS_WEBHOOK_URL=

NEXT_PUBLIC_SITE_URL=
```

Важно:

- токены задаются только в `.env.local` или в переменных проекта Vercel;
- не добавляйте `NEXT_PUBLIC_` к секретам Telegram, MAX, Resend или Google Sheets;
- `NEXT_PUBLIC_SITE_URL` не является секретом и нужен только для публичного URL сайта;
- пустые env-значения не включают адаптеры;
- без активных каналов доставки проект не падает, но `POST /api/leads` вернет ошибку доставки, чтобы заявки не терялись тихо.

## Telegram

Telegram - основной канал для первого реального теста MVP.

1. Откройте Telegram и найдите `@BotFather`.
2. Отправьте команду `/newbot`.
3. Укажите имя бота, например `Fresh Cut Leads`.
4. Укажите username бота, который заканчивается на `bot`, например `fresh_cut_leads_bot`.
5. BotFather выдаст токен. Сохраните его как `TELEGRAM_BOT_TOKEN`.
6. Напишите любое сообщение созданному боту от аккаунта владельца.
7. Чтобы получить `chat_id`, откройте в браузере:

```text
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates
```

8. Найдите в JSON поле `message.chat.id` и сохраните его как `TELEGRAM_CHAT_ID`.
9. Для группы добавьте бота в группу, отправьте сообщение в группу и снова откройте `getUpdates`. У групповой `chat_id` часто отрицательное значение.
10. Добавьте `telegram` в `integrations.enabledDeliveryChannels`.
11. Заполните `.env.local`:

```env
TELEGRAM_BOT_TOKEN=123456:example_token
TELEGRAM_CHAT_ID=123456789
```

12. Запустите проект и отправьте тестовую заявку через форму.

Telegram-адаптер отправляет владельцу имя, услугу, контакт, удобный способ ответа, комментарий, источник и дату. Если Telegram временно недоступен, другие активные адаптеры все равно выполняются.

## MAX

MAX вынесен в отдельный опциональный модуль:

```text
src/server/adapters/max.adapter.ts
```

Переменные:

```env
MAX_BOT_TOKEN=
MAX_CHAT_ID=
MAX_API_URL=
```

MAX не является обязательной частью MVP. Адаптер включается только если `max` добавлен в `integrations.enabledDeliveryChannels`, а `MAX_BOT_TOKEN`, `MAX_CHAT_ID` и валидный `MAX_API_URL` заполнены.

Перед production-использованием MAX обязательно проверьте актуальный endpoint, схему авторизации и payload в официальной документации MAX Bot API или в документации вашего gateway. Текущий адаптер отправляет `POST` с Bearer-токеном и payload:

```json
{
  "chat_id": "MAX_CHAT_ID",
  "text": "текст заявки"
}
```

Если официальный endpoint ожидает другой формат, измените только `src/server/adapters/max.adapter.ts`. Без `MAX_API_URL` MAX-адаптер выключен и не ломает проект.

## Email

Email-адаптер использует HTTP API Resend без отдельной зависимости:

```env
EMAIL_ENABLED=true
EMAIL_TO=owner@example.com
EMAIL_FROM=Fresh Cut <leads@example.com>
RESEND_API_KEY=...
```

Если `EMAIL_ENABLED` не равен `true` или не хватает ключей, адаптер выключен.

## Google Sheets

Для MVP используется Google Apps Script Web App URL.

1. Создайте Google Sheets.
2. Создайте первую строку таблицы:

```text
createdAt | name | contact | service | preferredMessenger | comment | source
```

3. Откройте Extensions -> Apps Script.
4. Добавьте скрипт, который принимает `POST` и добавляет строку:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.createdAt,
    data.name,
    data.contact,
    data.service,
    data.preferredMessenger,
    data.comment || "",
    data.source
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Нажмите Deploy -> New deployment -> Web app.
6. Выберите доступ, подходящий клиенту. Для простого MVP часто используют доступ по ссылке к Web App.
7. Скопируйте Web App URL и укажите:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
```

URL должен начинаться с `https://` или `http://`. Невалидный URL не включает адаптер.

## Backend

Endpoint:

```text
POST /api/leads
```

Он принимает JSON, проверяет обязательные поля, отклоняет слишком большие запросы, отсекает honeypot-спам, сверяет услугу и способ связи с конфигом, нормализует заявку и отправляет ее во все активные адаптеры.

Лимиты:

- имя: 80 символов;
- контакт: 160 символов;
- комментарий: 500 символов;
- тело запроса: 32 КБ;
- таймаут адаптера: 10 секунд.

Поведение:

- без активных каналов endpoint возвращает ошибку доставки, но не падает;
- если сработал хотя бы один активный канал, заявка считается доставленной;
- если один канал упал, остальные все равно выполняются;
- технические ошибки адаптеров не показываются пользователю в форме;
- токены не логируются и не отправляются на frontend.

## Политика конфиденциальности

Страница доступна по адресу:

```text
/privacy
```

Текст собирается из `business.config.ts`. Перед коммерческим запуском замените оператора данных, контакты, фактические каналы обработки и при необходимости согласуйте текст с юристом.

Форма заявки содержит ссылку на `/privacy` рядом с согласием на обработку персональных данных.

## Проверка перед сдачей клиенту

```bash
npm run lint
npm run build
```

Также проверьте вручную:

- главная открывается без ошибок на desktop и mobile;
- форма показывает ошибки для пустых и слишком длинных полей;
- checkbox согласия обязателен;
- honeypot-заявка не отправляется в адаптеры;
- успешная заявка попадает хотя бы в один канал доставки;
- `/privacy` заполнена данными клиента;
- все ссылки на мессенджеры рабочие;
- env-переменные заданы на Vercel.

## Деплой на Vercel

Predeploy-команды:

```bash
npm run lint
npm run build
```

Чеклист:

1. Загрузите проект в GitHub/GitLab.
2. Создайте проект в Vercel.
3. Укажите Build Command: `npm run build`.
4. Укажите Install Command: `npm install`, если Vercel не определил его автоматически.
5. Добавьте env-переменные в Project Settings -> Environment Variables.
6. Проверьте, что секреты не начинаются с `NEXT_PUBLIC_`.
7. Выполните первый deploy.
8. Откройте production URL.
9. Отправьте тестовую заявку.
10. Проверьте, что заявка пришла владельцу.

Env-переменные для Vercel:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
MAX_BOT_TOKEN=
MAX_CHAT_ID=
MAX_API_URL=
EMAIL_ENABLED=
EMAIL_TO=
EMAIL_FROM=
RESEND_API_KEY=
GOOGLE_SHEETS_WEBHOOK_URL=
NEXT_PUBLIC_SITE_URL=
```

Для первого реального теста достаточно Telegram:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Структура

```text
app/
  page.tsx
  privacy/page.tsx
  api/leads/route.ts

src/
  config/business.config.ts
  components/
  server/
    env.ts
    lead.types.ts
    lead.schema.ts
    formatLeadMessage.ts
    delivery.ts
    adapters/
```

Шаблон рассчитан на быстрые коммерческие сайты для малого бизнеса: аккуратная витрина, прием заявок и доставка уведомлений без лишней инфраструктуры.
