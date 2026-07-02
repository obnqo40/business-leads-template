import { businessConfig } from "@/config/business.config";

export function Reviews() {
  const section = businessConfig.sections.reviews;

  return (
    <section className="section-y bg-[var(--color-surface)]" id="reviews">
      <div className="container-page">
        {section.eyebrow ? <p className="section-kicker">{section.eyebrow}</p> : null}
        <h2 className="section-title mt-2">{section.title}</h2>
        <p className="section-copy">{section.description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {businessConfig.reviews.map((review) => (
            <article className="content-card content-card-hover" key={`${review.name}-${review.detail}`}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  Оценка {review.rating}
                </span>
                <span className="text-xs text-[var(--color-muted)]">{review.detail}</span>
              </div>
              <p className="text-sm leading-6 text-[var(--color-muted)]">“{review.text}”</p>
              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <p className="font-semibold">{review.name}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{businessConfig.brand.niche}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
