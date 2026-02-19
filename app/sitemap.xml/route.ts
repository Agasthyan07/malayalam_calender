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
    // Static routes
    const routes = [
        '',
        '/calendar/2026',
        '/calendar-2026',
        '/calendar/2027',
        '/festivals',
        '/privacy-policy',
        '/terms',
        '/disclaimer',
        '/rahu-kalam-today',
        '/contact',
    ];

    const staticUrls: Route[] = routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: route === '' ? '1.0' : '0.8',
    }));

    // Generate routes for all 12 months of 2026 and 2027
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const monthRoutes2026: Route[] = months.map((month, index) => {
        const date = new Date(2026, index, 1);
        const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();
        return {
            url: `${baseUrl}/malayalam-calendar-${monthName}-2026`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: '0.7',
            image: `${baseUrl}/calendar-images/2026/malayalam-calendar-2026-${monthName}.png`,
            imageTitle: `Malayalam Calendar 2026 ${monthName}`,
        };
    });

    const monthRoutes2027: Route[] = months.map((month, index) => {
        const date = new Date(2027, index, 1);
        const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();

        // Only January 2027 image exists currently
        const isJan2027 = month === '01';

        const route: Route = {
            url: `${baseUrl}/malayalam-calendar-${monthName}-2027`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: isJan2027 ? '1.0' : '0.7',
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
