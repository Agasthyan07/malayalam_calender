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

  // ── URL Redirects ────────────────────────────────────
  async redirects() {
    return [
      // Redirect plain (non-www) to canonical www domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'malayalamcalendar.site' }],
        destination: 'https://www.malayalamcalendar.site/:path*',
        permanent: true,
      },
      { source: '/today', destination: '/', permanent: true },

      // New Hierarchical Redirects
      { source: '/malayalam-calendar/:year(\\d{4})', destination: '/:year', permanent: true },
      { source: '/calendar/:year(\\d{4})', destination: '/:year', permanent: true },
      { source: '/calendar-2026', destination: '/2026', permanent: true },
      { source: '/malayalam-calendar-2026', destination: '/2026', permanent: true },
      { source: '/calendar-2027', destination: '/2027', permanent: true },
      { source: '/malayalam-calendar-2027', destination: '/2027', permanent: true },

      // Flexible Month Redirects (malayalam-calendar-january-2026 -> /2026/january)
      {
        source: '/malayalam-calendar-:month(january|february|march|april|may|june|july|august|september|october|november|december)-:year(\\d{4})',
        destination: '/:year/:month',
        permanent: true,
      },

      // Old numeric redirects (calendar/2026/01 -> /2026/january)
      { source: '/calendar/:year/01', destination: '/:year/january', permanent: true },
      { source: '/calendar/:year/02', destination: '/:year/february', permanent: true },
      { source: '/calendar/:year/03', destination: '/:year/march', permanent: true },
      { source: '/calendar/:year/04', destination: '/:year/april', permanent: true },
      { source: '/calendar/:year/05', destination: '/:year/may', permanent: true },
      { source: '/calendar/:year/06', destination: '/:year/june', permanent: true },
      { source: '/calendar/:year/07', destination: '/:year/july', permanent: true },
      { source: '/calendar/:year/08', destination: '/:year/august', permanent: true },
      { source: '/calendar/:year/09', destination: '/:year/september', permanent: true },
      { source: '/calendar/:year/10', destination: '/:year/october', permanent: true },
      { source: '/calendar/:year/11', destination: '/:year/november', permanent: true },
      { source: '/calendar/:year/12', destination: '/:year/december', permanent: true },
    ];
  },
};

export default nextConfig;
