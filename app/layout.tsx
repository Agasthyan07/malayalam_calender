import type { Metadata } from 'next';
import { Inter, Noto_Sans_Malayalam } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({ subsets: ['latin'] });
const malayalam = Noto_Sans_Malayalam({ subsets: ['malayalam'] });

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
  alternates: {
    canonical: './',
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
        <GoogleAnalytics />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
