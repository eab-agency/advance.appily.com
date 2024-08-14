/** @type {import('next').NextConfig} */
const path = require("path");

const robotHeader = {
  headers: [
    {
      key: "X-Robots-Tag",
      value: "noindex",
    },
  ],
  source: "/(career/healthcare|career/business)/:path*",
};

const strictTransportHeader = {
  source: "/(.*)",
  headers: [
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
  ],
};

// function to trip https:// from the front of the url
function stripHttps(url) {
  return url.replace(/^https?:\/\//, "");
}

const nextConfig = {
  // https://github.com/aws-amplify/amplify-hosting/issues/3707
  // cacheHandler: require.resolve('./cache-handler.mjs'),
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: "/adult-degree-completion/:slug*",
        destination: "/degree-completion/:slug*",
        permanent: true,
      },
    ];
  },
  env: {
    ACS_PUBLIC_KEY: process.env.ACS_PUBLIC_KEY,
    ACS_PRIVATE_KEY: process.env.ACS_PRIVATE_KEY,
  },
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "https",
        hostname: "qa-appily-cms.payloadcms.app",
      },
      {
        protocol: "https",
        hostname: "qa-appily-cms.payloadcms.app",
      },
      {
        protocol: "https",
        hostname: "advance-cms.appily.com", // port: "3000",
      },
      {
        protocol: "https",
        hostname: "**-eab-agency.vercel.app",
      },
      {
        protocol: "https",
        hostname: "advance.appily.com",
      },
      {
        protocol: "https",
        hostname: "**.amplifyapp.com",
      },
      {
        protocol: "https",
        hostname: stripHttps(process.env.NEXT_PUBLIC_CMS_URL),
        // port: "3000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "advance-cms.appily.com", // port: "3000",
      },
      {
        protocol: "https",
        hostname: "qa-appily-cms.payloadcms.app",
      },
      {
        protocol: "https",
        hostname: "**-eab-agency.vercel.app",
      },
      {
        protocol: "https",
        hostname: "advance.appily.com",
      },
      {
        protocol: "https",
        hostname: "**.amplifyapp.com",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    sourceMap: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/submit:path*",
        destination: "https://go.advance.appily.com/form/submit:path*",
      },
      {
        source: "/api/acs/:slug",
        destination: "https://go.advance.appily.com/api/:slug",
      },
    ];
  },
  async headers() {
    const headers = [];

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push(robotHeader);
    }

    headers.push(strictTransportHeader);

    return headers;
  },
};

module.exports = nextConfig;
