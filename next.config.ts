import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,

  // ── Aggressive tree-shaking for lucide-react (saves ~300 KiB) ──
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // ── Next.js Image optimisation ──────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 768, 1024, 1280],
    minimumCacheTTL: 31536000, // 1 year
  },

  // ── Security + Cache headers ────────────────────────────────────
  async headers() {
    return [
      // ── Global security headers ──────────────────────────────
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Allow popups needed for future OAuth / AdSense
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://translate.googleapis.com https://translate.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
              "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },

      // ── Immutable cache for hashed Next.js static assets ─────
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },

      // ── Long cache for public images / fonts / icons ──────────
      {
        source: '/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },

      // ── Short cache with SWR for JSON data ────────────────────
      {
        source: '/(.*)\\.(json)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },

  // ── URL Redirects (unchanged) ────────────────────────────────────
  async redirects() {
    return [
      { source: '/calendar/:year(\\d{4})', destination: '/malayalam-calendar/:year', permanent: true },
      // 2026 Redirects
      { source: '/calendar/2026/01', destination: '/malayalam-calendar-january-2026', permanent: true },
      { source: '/calendar/2026/02', destination: '/malayalam-calendar-february-2026', permanent: true },
      { source: '/calendar/2026/03', destination: '/malayalam-calendar-march-2026', permanent: true },
      { source: '/calendar/2026/04', destination: '/malayalam-calendar-april-2026', permanent: true },
      { source: '/calendar/2026/05', destination: '/malayalam-calendar-may-2026', permanent: true },
      { source: '/calendar/2026/06', destination: '/malayalam-calendar-june-2026', permanent: true },
      { source: '/calendar/2026/07', destination: '/malayalam-calendar-july-2026', permanent: true },
      { source: '/calendar/2026/08', destination: '/malayalam-calendar-august-2026', permanent: true },
      { source: '/calendar/2026/09', destination: '/malayalam-calendar-september-2026', permanent: true },
      { source: '/calendar/2026/10', destination: '/malayalam-calendar-october-2026', permanent: true },
      { source: '/calendar/2026/11', destination: '/malayalam-calendar-november-2026', permanent: true },
      { source: '/calendar/2026/12', destination: '/malayalam-calendar-december-2026', permanent: true },
      // 2027 Redirects
      { source: '/calendar/2027/01', destination: '/malayalam-calendar-january-2027', permanent: true },
      { source: '/calendar/2027/02', destination: '/malayalam-calendar-february-2027', permanent: true },
      { source: '/calendar/2027/03', destination: '/malayalam-calendar-march-2027', permanent: true },
      { source: '/calendar/2027/04', destination: '/malayalam-calendar-april-2027', permanent: true },
      { source: '/calendar/2027/05', destination: '/malayalam-calendar-may-2027', permanent: true },
      { source: '/calendar/2027/06', destination: '/malayalam-calendar-june-2027', permanent: true },
      { source: '/calendar/2027/07', destination: '/malayalam-calendar-july-2027', permanent: true },
      { source: '/calendar/2027/08', destination: '/malayalam-calendar-august-2027', permanent: true },
      { source: '/calendar/2027/09', destination: '/malayalam-calendar-september-2027', permanent: true },
      { source: '/calendar/2027/10', destination: '/malayalam-calendar-october-2027', permanent: true },
      { source: '/calendar/2027/11', destination: '/malayalam-calendar-november-2027', permanent: true },
      { source: '/calendar/2027/12', destination: '/malayalam-calendar-december-2027', permanent: true },
    ];
  },
};

export default nextConfig;
