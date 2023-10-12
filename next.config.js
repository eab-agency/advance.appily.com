/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	images: {
		minimumCacheTTL: 6000,
		domains: ["localhost", process.env.NEXT_PUBLIC_CMS_URL],
		remotePatterns: [
			{
				protocol: "https",
				hostname: process.env.NEXT_PUBLIC_CMS_URL,
				// port: "3000",
				pathname: "/media/**",
			},
			{
				protocol: "https",
				hostname: "advance-cms.appily.com", // port: "3000",
			},
			{
				protocol: "https",
				hostname: "**-eab-agency.vercel.app",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/submit:path*",
				destination: "https://go.cappexhealth.com/form/submit:path*",
			},
			{
				source: "/api/acs/:slug",
				destination: "https://go.cappexhealth.com/api/:slug",
			},
		];
	},
	async headers() {
		const headers = [];

		if (!process.env.NEXT_PUBLIC_IS_LIVE) {
			headers.push({
				headers: [
					{
						key: "X-Robots-Tag",
						value: "noindex",
					},
				],
				source: "/:path*",
			});
		}
		return headers;
	},
};

module.exports = nextConfig;
