/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 13.4+
  // No Nextra wrapping - using App Router for all new content
  experimental: {
    // App Router is stable in 13.5
  },
  images: {
    remotePatterns: [],
  },
  // Disable x-powered-by header
  poweredByHeader: false,
}

module.exports = nextConfig
