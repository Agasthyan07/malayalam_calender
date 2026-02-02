import TodayPage from './today/page';
import { Metadata } from 'next';

// Re-export metadata from Today page or define specific metadata for Home
export const metadata: Metadata = {
  title: 'Malayalam Calendar 2026 - Daily Panchangam, Rahu Kalam & Festivals',
  description: 'Most accurate Malayalam Calendar 2026. Get daily Malayalam date, Nakshatram, Tithi, Rahu Kalam, Nalla Samayam, and Festival details.',
  alternates: {
    canonical: 'https://malayalamcalendar.site',
  },
};

export default async function Home(props: any) {
  return <TodayPage {...props} />;
}
