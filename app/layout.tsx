import type { Metadata } from 'next';
import { Inter, Noto_Sans_Malayalam } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SiteSchema from '@/components/SiteSchema';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import LazyClientComponents from '@/components/LazyClientComponents';

// ── Fonts ─────────────────────────────────────────────────────────────────────
// Only load the weights we actually use; preload Inter (above-fold font).
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['400', '500', '600', '700', '800'],
});

// Malayalam font is NOT above-the-fold; skip preload to save ~40kB on initial load.
const malayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  display: 'swap',
  variable: '--font-malayalam',
  preload: false,
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://malayalamcalendar.site'),
  title: 'Malayalam Calendar 2026 (മലയാളം കലണ്ടർ)',
  description: 'Daily Malayalam Calendar 2026 with Nakshatram, Tithi, Sunrise, Sunset, and Festivals.',
  verification: {
    google: '9F6rdEd0V_dRvVID9CruxrQQU4InQYqvMpeLP_9zAXg',
  },
  keywords: [
    'Malayalam Calendar 2026', 'Kollavarsham 1201', 'Malayalam Era',
    'Malayalam Panchangam Today', 'Kerala Calendar', 'Malayalam Date',
    'Daily Malayalam Calendar', 'Nalla Samayam', 'Rahu Kalam',
    'Download Malayalam Calendar 2026', 'Malayalam Calendar PDF Download', 'Download Calendar',
    'Printable Malayalam Calendar',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Malayalam Calendar',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  other: {
    'google-adsense-account': 'ca-pub-5563933517199081',
    'p:domain_verify': '2d348fe818d0d7e7cc72e0c330f2db9b',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          ── Resource hints ──────────────────────────────────────────────────
          Preconnect to critical third-party origins. These shave ~100ms off
          FCP on Slow 4G by opening TCP/TLS handshakes before they're needed.
        */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://analytics.google.com" />
      </head>
      <body className={`${inter.variable} ${malayalam.variable} font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <SiteSchema />
        <GoogleAnalytics />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        {/* Non-critical UI — lazy loaded after hydration */}
        <LazyClientComponents />
        <ServiceWorkerRegister />
        {/*
          ── AdSense script deliberately removed ─────────────────────────────
          AdSlot returns null (pending approval). Loading adsbygoogle.js
          triggers a deprecated Fledge/Privacy Sandbox API warning that drops
          Best Practices to 81. Re-add this script ONLY when AdSense is active.

          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5563933517199081"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        */}
      </body>
    </html>
  );
}
