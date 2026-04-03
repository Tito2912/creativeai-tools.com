import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { SITE } from '@/lib/site';
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/lib/schema';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { LangHtmlUpdater } from '@/components/LangHtmlUpdater';

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: {
    default: SITE.brandName,
    template: `%s | ${SITE.brandName}`,
  },
  description:
    'Reviews, pricing breakdowns, and practical workflows for AI creator tools (video, avatars, voice).',
  metadataBase: new URL(SITE.baseUrl),
  alternates: { canonical: '/' },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    title: SITE.brandName,
    description: 'Affiliate SEO cluster for AI creator tools: reviews, pricing, and alternatives.',
    url: SITE.baseUrl,
    images: [{ url: '/images/visual-2.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.brandName,
    description: 'Affiliate SEO cluster for AI creator tools: reviews, pricing, and alternatives.',
    images: ['/images/visual-2.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = buildOrganizationJsonLd();
  const webSiteJsonLd = buildWebSiteJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <body data-ga4-id={SITE.ga4Id}>
        <LangHtmlUpdater />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        <SiteHeader />
        <main id="main-content" role="main">
          {children}
        </main>
        <SiteFooter />
        <Script src="/site.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
