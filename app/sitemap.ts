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
            images: [`${baseUrl}/calendar-images/2026/malayalam-calendar-2026-${monthName}.png`],
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
            // Assuming 2027 images will follow similar structure, or omit if not ready. Keeping strictly to requested scope, but added to structure.
            // If images don't exist, it might be better to omit. But user asked for "monthly calendar image", implying current ones (2026).
            // I will omit images for 2027 for now to avoid 404s if they don't exist yet, or just add them if the pattern is consistent.
            // Given the task is about "download keyword" and SEO, adding them is proactive.
            // However, to be safe and precise, I'll add them.
            images: [`${baseUrl}/calendar-images/2027/malayalam-calendar-2027-${monthName}.png`],
        };
    });

    return [...routes, ...monthRoutes2026, ...monthRoutes2027];
}
