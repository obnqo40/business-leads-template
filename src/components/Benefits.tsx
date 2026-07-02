import { businessConfig } from "@/config/business.config";

export function Benefits() {
  const section = businessConfig.sections.benefits;

  return (
    <section className="section-y bg-[var(--color-surface)]" id="benefits">
      <div className="container-page">
        {section.eyebrow ? <p className="section-kicker">{section.eyebrow}</p> : null}
        <h2 className="section-title mt-2">{section.title}</h2>
        <p className="section-copy">{section.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {businessConfig.benefits.map((benefit) => (
            <article className="content-card content-card-hover" key={benefit.title}>
              <h3 className="text-lg font-semibold leading-tight">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
