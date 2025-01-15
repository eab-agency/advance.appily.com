import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { fetchPages, fetchPosts } from '../graphql';

export async function GET() {
  try {
    // Fetch both pages and blogs
    const [pagesRes, blogsRes] = await Promise.all([
      fetchPages(), fetchPosts()
    ]);

    if (!Array.isArray(pagesRes) || !Array.isArray(blogsRes)) {
      throw new Error("Invalid data format. Expected arrays for pages and blogs.");
    }

    // Map over pages and blogs to create fields
    const pageFields: ISitemapField[] = pagesRes.map((entry) => ({
      loc: `${`https://advance.appily.com`}${entry?.fullPath}`,
      lastmod: entry?.updatedAt,
      changefreq: 'daily',
      priority: 0.7
    }));

    const blogFields: ISitemapField[] = blogsRes.map((entry) => {
      const category = entry?.category[0];
    
      // Check if category is an object and has a slug property
      const categorySlug = typeof category === 'object' && category?.slug ? category.slug : category;
    
      return {
        loc: `https://advance.appily.com/blog/${categorySlug}/${entry.slug}`,
        lastmod: entry.updatedAt,
        changefreq: 'daily',
        priority: 0.7
      };
    });
    

    // Merge both sets of fields
    const fields = [...pageFields, ...blogFields];

    return getServerSideSitemap(fields);
  } catch (error) {
    return { notFound: true };  
  }
}
