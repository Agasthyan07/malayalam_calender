import { NextResponse } from 'next/server';

const baseUrl = 'https://malayalamcalendar.site';

interface Route {
    url: string;
    lastModified: string;
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'hourly' | 'never';
    priority: string;
    image?: string;
    imageTitle?: string;
}

export async function GET() {
    // Static routes – each URL must be unique and canonical
    const staticRoutes: { path: string; freq: Route['changeFrequency']; priority: string }[] = [
        { path: '', freq: 'daily', priority: '1.0' },
        // Year pages
        { path: '/malayalam-calendar/2026', freq: 'weekly', priority: '0.9' },
        { path: '/malayalam-calendar/2027', freq: 'weekly', priority: '0.8' },
        // Dedicated feature pages
        { path: '/marriage-muhurtham-2026', freq: 'monthly', priority: '0.9' },
        { path: '/ekadashi-2026', freq: 'monthly', priority: '0.9' },
        { path: '/weekly-calendar', freq: 'daily', priority: '0.8' },
        { path: '/innathe-nakshatram', freq: 'daily', priority: '0.8' },
        { path: '/rahu-kalam-today', freq: 'daily', priority: '0.8' },
        { path: '/vratham-today', freq: 'daily', priority: '0.7' },
        // Festival pages
        { path: '/festivals', freq: 'monthly', priority: '0.8' },
        { path: '/vishu-2026-date-kerala', freq: 'monthly', priority: '0.8' },
        { path: '/onam-2026-date', freq: 'monthly', priority: '0.8' },
        // Info pages
        { path: '/about', freq: 'yearly', priority: '0.5' },
        { path: '/website-map', freq: 'monthly', priority: '0.5' },
        { path: '/contact', freq: 'yearly', priority: '0.4' },
        { path: '/privacy-policy', freq: 'yearly', priority: '0.3' },
        { path: '/terms', freq: 'yearly', priority: '0.3' },
        { path: '/disclaimer', freq: 'yearly', priority: '0.3' },
    ];

    const staticUrls: Route[] = staticRoutes.map(({ path, freq, priority }) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: freq,
        priority,
    }));

    // Generate routes for all 12 months of 2026 and 2027
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const monthRoutes2026: Route[] = months.map((month, index) => {
        const date = new Date(2026, index, 1);
        const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();
        return {
            url: `${baseUrl}/malayalam-calendar-${monthName}-2026`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'weekly' as Route['changeFrequency'],
            priority: '0.7',
            image: `${baseUrl}/calendar-images/2026/malayalam-calendar-2026-${monthName}.png`,
            imageTitle: `Malayalam Calendar 2026 ${monthName}`,
        };
    });

    const monthRoutes2027: Route[] = months.map((month, index) => {
        const date = new Date(2027, index, 1);
        const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();
        const isJan2027 = month === '01';

        const route: Route = {
            url: `${baseUrl}/malayalam-calendar-${monthName}-2027`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'weekly',
            priority: '0.7', // normalised – year page /malayalam-calendar/2027 already has 0.8
        };

        if (isJan2027) {
            route.image = `${baseUrl}/calendar-images/2027/malayalam-calendar-2027-${monthName}.png`;
            route.imageTitle = `Malayalam Calendar 2027 ${monthName}`;
        }

        return route;
    });

    const allRoutes = [...staticUrls, ...monthRoutes2026, ...monthRoutes2027];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allRoutes
            .map((route) => {
                return `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
    ${route.image
                        ? `
    <image:image>
      <image:loc>${route.image}</image:loc>
      <image:title>${route.imageTitle}</image:title>
    </image:image>
    `
                        : ''
                    }
  </url>`;
            })
            .join('')}
</urlset>`;

    return new NextResponse(sitemapXml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
