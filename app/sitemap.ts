import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://malayalamcalendar.site';

    // Static routes
    const routes = [
        '',
        '/calendar/2026',
        '/calendar-2026',
        '/calendar/2027', // New 2027 route
        '/festivals',
        '/privacy-policy',
        '/terms',
        '/disclaimer',
        '/rahu-kalam-today',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Generate routes for all 12 months of 2026 and 2027
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const monthRoutes2026 = months.map((month, index) => {
        const date = new Date(2026, index, 1);
        const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();
        return {
            url: `${baseUrl}/malayalam-calendar-${monthName}-2026`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        };
    });

    const monthRoutes2027 = months.map((month, index) => {
        const date = new Date(2027, index, 1);
        const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();
        return {
            url: `${baseUrl}/malayalam-calendar-${monthName}-2027`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        };
    });

    return [...routes, ...monthRoutes2026, ...monthRoutes2027];
}
