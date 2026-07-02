import { businessConfig } from "@/config/business.config";

export function Contacts() {
  const enabledMessengers = businessConfig.contacts.messengers.filter((item) => item.enabled);
  const section = businessConfig.sections.contacts;

  return (
    <section className="section-y bg-[var(--color-surface)]" id="contacts">
      <div className="container-page grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          {section.eyebrow ? <p className="section-kicker">{section.eyebrow}</p> : null}
          <h2 className="section-title mt-2">{section.title}</h2>
          <p className="section-copy">{section.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {enabledMessengers.map((item) => (
            <a
              className="content-card content-card-hover"
              href={item.url}
              key={item.id}
            >
              <span className="text-sm font-medium text-[var(--color-muted)]">{item.label}</span>
              <span className="mt-2 block font-semibold">{item.value}</span>
            </a>
          ))}

          {businessConfig.contacts.address ? (
            <div className="content-card">
              <span className="text-sm font-medium text-[var(--color-muted)]">Адрес</span>
              <span className="mt-2 block font-semibold">{businessConfig.contacts.address}</span>
            </div>
          ) : null}

          {businessConfig.contacts.workingHours ? (
            <div className="content-card">
              <span className="text-sm font-medium text-[var(--color-muted)]">Часы работы</span>
              <span className="mt-2 block font-semibold">{businessConfig.contacts.workingHours}</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
