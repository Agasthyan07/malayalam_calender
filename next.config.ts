import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
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
