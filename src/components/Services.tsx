import { businessConfig } from "@/config/business.config";

export function Services() {
  const section = businessConfig.sections.services;

  return (
    <section className="section-y" id="services">
      <div className="container-page">
        <div className="section-heading">
          <div>
            {section.eyebrow ? <p className="section-kicker">{section.eyebrow}</p> : null}
            <h2 className="section-title mt-2">{section.title}</h2>
            <p className="section-copy">{section.description}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {businessConfig.services.map((service) => (
            <article
              className="content-card content-card-hover relative flex min-h-[360px] flex-col"
              key={service.id}
            >
              {service.popular ? (
                <span className="absolute right-4 top-4 rounded-md bg-[var(--color-accent)] px-2.5 py-1 text-xs font-semibold text-white">
                  Часто выбирают
                </span>
              ) : null}
              <div className="flex-1">
                <h3 className="max-w-[12rem] text-xl font-semibold leading-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  {service.description}
                </p>
                {service.duration || service.result ? (
                  <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
                    {service.duration ? (
                      <p className="rounded-md bg-[var(--color-bg)] px-3 py-2">
                        <span className="block text-xs font-medium text-[var(--color-muted)]">
                          Время
                        </span>
                        <span className="font-semibold">{service.duration}</span>
                      </p>
                    ) : null}
                    {service.result ? (
                      <p className="rounded-md bg-[var(--color-bg)] px-3 py-2">
                        <span className="block text-xs font-medium text-[var(--color-muted)]">
                          Результат
                        </span>
                        <span className="font-semibold">{service.result}</span>
                      </p>
                    ) : null}
                  </div>
                ) : null}
                <ul className="mt-5 space-y-2 text-sm text-[var(--color-muted)]">
                  {service.features.map((feature) => (
                    <li className="flex gap-2" key={feature}>
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 text-2xl font-semibold text-[var(--color-primary)]">
                {service.price}
              </p>
              <a className="btn-secondary mt-5 w-full" href="#lead-form">
                {businessConfig.cta.service}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
