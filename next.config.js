/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL: 6000,
    domains: ['localhost', process.env.NEXT_PUBLIC_CMS_URL],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'localhost',
    //     port: '3000',
    //     pathname: '/media/**',
    //   },
    // ],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  webpack: config => {
    const configCopy = { ...config }
    configCopy.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    }
    configCopy.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/css'),
      '@components': path.resolve(__dirname, './src/components'),
      '@cloud': path.resolve(__dirname, './src/app/cloud'),
      '@forms': path.resolve(__dirname, './src/forms'),
      '@blocks': path.resolve(__dirname, './src/blocks'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@icons': path.resolve(__dirname, './src/icons'),
      '@utilities': path.resolve(__dirname, './src/utilities'),
      '@types': path.resolve(__dirname, './payload-types.ts'),
      '@graphics': path.resolve(__dirname, './src/graphics'),
      '@graphql': path.resolve(__dirname, './src/graphql'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@data': path.resolve(__dirname, './src/data'),
      '@lib': path.resolve(__dirname, './src/lib'),
      // IMPORTANT: the next lines are for development only
      // keep them commented out unless actively developing local react modules
      // modify their paths according to your local directory
      // "payload-admin-bar": path.join(__dirname, "../payload-admin-bar"),
    }
    return configCopy
  },
  async headers() {
    const headers = []

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      })
    }
    return headers
  },
}

module.exports = nextConfig
