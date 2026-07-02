import Image from "next/image";
import { businessConfig } from "@/config/business.config";

function getDirectUrl() {
  return (
    businessConfig.contacts.messengers.find((item) => item.enabled && item.url)?.url ??
    "#contacts"
  );
}

export function Hero() {
  const directUrl = getDirectUrl();

  return (
    <section className="overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container-page grid gap-8 py-8 sm:gap-10 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div>
          <p className="section-kicker">{businessConfig.hero.eyebrow}</p>
          <div className="mb-5 mt-3 flex flex-wrap gap-2 sm:mb-6">
            {businessConfig.hero.badges.map((badge) => (
              <span
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]"
                key={badge}
              >
                {badge}
              </span>
            ))}
          </div>
          <Image
            alt={businessConfig.hero.imageAlt}
            className="mb-5 h-32 w-full rounded-lg object-cover shadow-soft ring-1 ring-[var(--color-border)] sm:hidden"
            height={420}
            priority
            src={businessConfig.hero.image}
            width={760}
          />
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
            {businessConfig.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:mt-5 sm:text-lg sm:leading-8">
            {businessConfig.hero.subtitle}
          </p>
          <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-[var(--color-ink)]">
            {businessConfig.brand.promise}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <a className="btn-primary" href="#lead-form">
              {businessConfig.cta.primary}
            </a>
            <a className="btn-secondary" href={directUrl}>
              {businessConfig.cta.secondary}
            </a>
          </div>

          <dl className="mt-8 hidden gap-3 sm:grid sm:grid-cols-3">
            {businessConfig.hero.stats.map((item) => (
              <div
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4"
                key={`${item.value}-${item.label}`}
              >
                <dt className="text-lg font-semibold text-[var(--color-ink)]">{item.value}</dt>
                <dd className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="relative hidden sm:block">
          <Image
            alt={businessConfig.hero.imageAlt}
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft ring-1 ring-[var(--color-border)]"
            height={900}
            priority
            src={businessConfig.hero.image}
            width={1200}
          />
          <figcaption className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/40 bg-white/90 p-4 text-sm leading-6 text-[var(--color-ink)] shadow-soft backdrop-blur">
            {businessConfig.brand.description}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
