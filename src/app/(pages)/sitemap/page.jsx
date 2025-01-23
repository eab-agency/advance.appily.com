import Link from 'next/link';
import { fetchPages, fetchPosts } from '../../graphql';

export async function generateStaticParams() {
  try {
    // Fetch both pages and blogs
    const [pagesRes, blogsRes] = await Promise.all([fetchPages(), fetchPosts()]);

    if (!Array.isArray(pagesRes) || !Array.isArray(blogsRes)) {
      throw new Error('Invalid data format. Expected arrays for pages and blogs.');
    }

    // Prepare sitemap links
    const pageLinks = pagesRes.map((entry) => ({
      url: `https://advance.appily.com${entry?.fullPath}`,
      title: entry?.title || entry?.fullPath,
      lastmod: entry?.updatedAt,
    }));

    const blogLinks = blogsRes.map((entry) => {
      const category = entry?.category[0];
      const categorySlug = typeof category === 'object' && category?.slug ? category.slug : category;
      return {
        url: `https://advance.appily.com/blog/${categorySlug}/${entry.slug}`,
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

export default async function Sitemap() {
  const sitemapLinks = await generateStaticParams();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Website Sitemap</h1>
      <p>Find all available pages and blog posts below:</p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {sitemapLinks.length > 0 ? (
          sitemapLinks.map((link, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <Link href={link.url}>
                {link.title}
              </Link>
              <br />
              <small>Last Updated: {new Date(link.lastmod).toLocaleDateString()}</small>
            </li>
          ))
        ) : (
          <p>No pages found.</p>
        )}
      </ul>
    </div>
  );
}
