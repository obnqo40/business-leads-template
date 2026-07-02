import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { businessConfig } from "@/config/business.config";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="section-y">
        <div className="container-page max-w-4xl">
          <p className="section-kicker">Документы сайта</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            Политика конфиденциальности
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
            {businessConfig.privacy.intro}
          </p>

          <div className="mt-8 space-y-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-8">
            <section>
              <h2 className="text-xl font-semibold">1. Кто собирает данные</h2>
              <p className="mt-3 leading-7 text-[var(--color-muted)]">
                Оператором персональных данных является {businessConfig.privacy.operatorName}.
                Связаться с оператором можно по телефону {businessConfig.privacy.operatorPhone}
                или email {businessConfig.privacy.operatorEmail}.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">2. Какие данные собираются</h2>
              <ul className="mt-3 grid gap-2 text-[var(--color-muted)] sm:grid-cols-2">
                {businessConfig.privacy.dataCollected.map((item) => (
                  <li className="rounded-md bg-[var(--color-bg)] px-3 py-2" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">3. Зачем собираются данные</h2>
              <p className="mt-3 leading-7 text-[var(--color-muted)]">
                Данные используются для цели: {businessConfig.privacy.dataPurpose}.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">4. Как обрабатывается заявка</h2>
              <p className="mt-3 leading-7 text-[var(--color-muted)]">
                {businessConfig.privacy.deliveryChannelsText}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">5. Срок хранения и отзыв согласия</h2>
              <p className="mt-3 leading-7 text-[var(--color-muted)]">
                {businessConfig.privacy.retentionText} Пользователь может запросить уточнение,
                удаление данных или отозвать согласие, связавшись с оператором по указанным
                контактам.
              </p>
            </section>

            <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <h2 className="text-base font-semibold">Перед запуском под клиента</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {businessConfig.privacy.clientAdaptationNote}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
