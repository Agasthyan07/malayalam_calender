import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Malayalam Calendar 2026',
        short_name: 'Malayalam Calendar',
        description: 'Daily Malayalam Calendar 2026 with Nakshatram, Tithi, Sunrise, Sunset, and Festivals.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4F46E5',
        icons: [
            {
                src: '/icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
