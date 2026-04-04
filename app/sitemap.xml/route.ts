import { NextResponse } from 'next/server';

const baseUrl = 'https://www.malayalamcalendar.site';

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
        { path: '/2026', freq: 'weekly', priority: '0.9' },
        { path: '/2027', freq: 'weekly', priority: '0.8' },
        // Dedicated feature pages
        { path: '/marriage-muhurtham-2026', freq: 'monthly', priority: '0.9' },
        { path: '/ekadashi-2026', freq: 'monthly', priority: '0.9' },
        { path: '/weekly-calendar', freq: 'daily', priority: '0.8' },
        { path: '/innathe-nakshatram', freq: 'daily', priority: '0.8' },
        { path: '/rahu-kalam-today', freq: 'daily', priority: '0.8' },
        { path: '/namaz-times-kerala', freq: 'daily', priority: '0.8' },
        // Festival pages
        { path: '/festivals', freq: 'monthly', priority: '0.8' },
        { path: '/vishu-2026-date-kerala', freq: 'monthly', priority: '0.8' },
        { path: '/onam-2026-date', freq: 'monthly', priority: '0.8' },
        // Info/Article pages
        { path: '/kollavarsham-malayalam-era', freq: 'monthly', priority: '0.8' },
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
    const years = ['2026', '2027'];

    const monthRoutes: Route[] = [];

    years.forEach(year => {
        months.forEach((month, index) => {
            const date = new Date(parseInt(year), index, 1);
            const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();
            
            const route: Route = {
                url: `${baseUrl}/${year}/${monthName}`,
                lastModified: new Date().toISOString().split('T')[0],
                changeFrequency: 'weekly' as Route['changeFrequency'],
                priority: '0.7',
            };

            // Keep image logic if it exists
            const imagePath = `/calendar-images/${year}/malayalam-calendar-${year}-${monthName}.png`;
            // Simplified check: only add if it's likely to exist (e.g. 2026)
            if (year === '2026') {
                route.image = `${baseUrl}${imagePath}`;
                route.imageTitle = `Malayalam Calendar ${year} ${monthName}`;
            }

            monthRoutes.push(route);
        });
    });

    const allRoutes = [...staticUrls, ...monthRoutes];

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
