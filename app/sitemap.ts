import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://malayalamcalendar.site';

    // Static routes
    const routes = [
        '',
        '/today',
        '/calendar/2026',
        '/festivals',
        '/privacy-policy',
        '/terms',
        '/disclaimer',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' || route === '/today' ? 1.0 : 0.8,
    }));

    // Generate routes for all 12 months of 2026
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const monthRoutes = months.map((month) => ({
        url: `${baseUrl}/calendar/2026/${month}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...routes, ...monthRoutes];
}
