/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  removeConsole: process.env.NODE_ENV === 'production',
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: false,
  },
}

module.exports = nextConfig
