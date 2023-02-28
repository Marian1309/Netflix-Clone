/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: []
  },
  compiler: {
    removeConsole: {
      exclude: ['log', 'warn', 'error']
    }
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  trailingSlash: false
}

module.exports = nextConfig
