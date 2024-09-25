/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || "https://advance.appily.com",
	generateRobotsTxt: true,
	exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://advance.appily.com/server-sitemap.xml`, // <==== Add here
    ],
  },
};
