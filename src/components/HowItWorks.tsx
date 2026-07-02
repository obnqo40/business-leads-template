import { businessConfig } from "@/config/business.config";

export function HowItWorks() {
  const section = businessConfig.sections.howItWorks;

  return (
    <section className="section-y" id="how">
      <div className="container-page">
        {section.eyebrow ? <p className="section-kicker">{section.eyebrow}</p> : null}
        <h2 className="section-title mt-2">{section.title}</h2>
        <p className="section-copy">{section.description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {businessConfig.howItWorks.map((step, index) => (
            <article className="content-card content-card-hover" key={step.title}>
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-primary)] text-sm font-semibold text-[var(--color-primary-contrast)]">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
