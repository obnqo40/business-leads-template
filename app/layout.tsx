import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { businessConfig } from "@/config/business.config";

const themeStyles = {
  "--color-bg": businessConfig.theme.colors.background,
  "--color-surface": businessConfig.theme.colors.surface,
  "--color-ink": businessConfig.theme.colors.ink,
  "--color-muted": businessConfig.theme.colors.muted,
  "--color-primary": businessConfig.theme.colors.primary,
  "--color-primary-contrast": businessConfig.theme.colors.primaryContrast,
  "--color-accent": businessConfig.theme.colors.accent,
  "--color-border": businessConfig.theme.colors.border
} as CSSProperties;

function getMetadataBase() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    return undefined;
  }

  try {
    return new URL(siteUrl);
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  title: `${businessConfig.brand.name} | ${businessConfig.brand.niche}`,
  description: businessConfig.brand.promise,
  metadataBase: getMetadataBase(),
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: `${businessConfig.brand.name} | ${businessConfig.brand.niche}`,
    description: businessConfig.brand.promise,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" style={themeStyles}>
      <body>{children}</body>
    </html>
  );
}
