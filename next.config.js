/** @type {import('next').NextConfig} */
const path = require("path");
const redirects = require("./redirects");

const robotHeader = {
  headers: [
    {
      key: "X-Robots-Tag",
      value: "noindex",
    },
  ],
  source: "/(careers/healthcare|careers/business|careers/education|careers/degree-completion)/:path+",
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
  if (typeof url !== 'string') {
    throw new TypeError('Expected a string');
  }
  return url.replace(/^https?:\/\//, "");
}

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  redirects,
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
        pathname: "/media/**",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    sourceMap: true,
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
