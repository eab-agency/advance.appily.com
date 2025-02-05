import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { fetchPages, fetchPosts } from '../../graphql';

// Function to generate the page URL
const generateUrl = (slug) => {
  return new URL(slug, `https://advance.appily.com`).toString();
};

// Generate metadata for the page (SEO)
export async function generateMetadata() {
  return {
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap`,
    },
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  try {
    const [pagesRes, blogsRes] = await Promise.all([fetchPages(), fetchPosts()]);

    if (!Array.isArray(pagesRes) || !Array.isArray(blogsRes)) {
      throw new Error('Invalid data format. Expected arrays for pages and blogs.');
    }

    const pageLinks = pagesRes.map((entry) => ({
      url: generateUrl(entry?.fullPath),
      title: entry?.title || entry?.fullPath,
      lastmod: entry?.updatedAt,
    }));

    const blogLinks = blogsRes.map((entry) => {
      const category = entry?.category[0];
      const categorySlug = typeof category === 'object' && category?.slug ? category.slug : category;
      return {
        url: generateUrl(`/blog/${categorySlug}/${entry.slug}`),
        title: entry?.title,
        lastmod: entry?.updatedAt,
      };
    });

    return [...pageLinks, ...blogLinks];
  } catch (error) {
    console.error('Failed to fetch sitemap data:', error);
    return [];
  }
}

export default async function SitemapPage() {
  const sitemapLinks = await generateStaticParams();

  if (!sitemapLinks.length) {
    return notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Website Sitemap",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Script
        id="sitemap-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Website Sitemap</h1>
        <p>Find all available pages and blog posts below:</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {sitemapLinks.map((link, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <Link href={link.url}>
               {link.title}
              </Link>
              <br />
              <small>Last Updated: {new Date(link.lastmod).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
