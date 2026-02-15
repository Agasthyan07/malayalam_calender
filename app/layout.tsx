import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Noto_Sans_Malayalam } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieConsent from '@/components/CookieConsent';
import SiteSchema from '@/components/SiteSchema';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const malayalam = Noto_Sans_Malayalam({ subsets: ['malayalam'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://malayalamcalendar.site'),
  title: 'Malayalam Calendar 2026',
  description: 'Daily Malayalam Calendar 2026 with Nakshatram, Tithi, Sunrise, Sunset, and Festivals.',
  verification: {
    google: '9F6rdEd0V_dRvVID9CruxrQQU4InQYqvMpeLP_9zAXg',
  },
  keywords: [
    'Malayalam Calendar 2026', 'Kollavarsham 1201', 'Malayalam Era',
    'Malayalam Panchangam Today', 'Kerala Calendar', 'Malayalam Date',
    'Daily Malayalam Calendar', 'Nalla Samayam', 'Rahu Kalam'
  ],

  icons: {
    icon: '/icon.png',
  },
  other: {
    'google-adsense-account': 'ca-pub-5563933517199081',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${malayalam.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <SiteSchema />
        <GoogleAnalytics />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5563933517199081"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
