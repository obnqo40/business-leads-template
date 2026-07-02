import Link from "next/link";
import { businessConfig } from "@/config/business.config";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)] backdrop-blur">
      <div className="container-page flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={businessConfig.brand.name}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-primary)] text-sm font-bold text-[var(--color-primary-contrast)]">
            {businessConfig.brand.shortName.slice(0, 2).toUpperCase()}
          </span>
          <span>
            <span className="block text-sm font-semibold leading-5">{businessConfig.brand.name}</span>
            <span className="block text-xs text-[var(--color-muted)]">{businessConfig.brand.niche}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Основная навигация">
          {businessConfig.navigation.map((item) => (
            <Link
              className="text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-primary)]"
              href={`/${item.href}`}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="btn-primary px-4 py-2" href="/#lead-form">
          {businessConfig.cta.primary}
        </Link>
      </div>
    </header>
  );
}
