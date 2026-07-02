import Link from "next/link";
import { businessConfig } from "@/config/business.config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-ink)] text-white">
      <div className="container-page flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{businessConfig.brand.name}</p>
          <p className="mt-1 max-w-lg text-sm leading-6 text-white/70">
            {businessConfig.brand.promise}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-white/80">
          {businessConfig.navigation.map((item) => (
            <Link className="transition hover:text-white" href={`/${item.href}`} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="transition hover:text-white" href="/privacy">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-4 text-sm text-white/60">
          © {new Date().getFullYear()} {businessConfig.brand.name}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
