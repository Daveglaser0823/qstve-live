/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/bl9/2026-palmetto-cup',
        destination: '/bl9-static/2026-palmetto-cup/index.html',
      },
    ];
  },
};
module.exports = nextConfig;
