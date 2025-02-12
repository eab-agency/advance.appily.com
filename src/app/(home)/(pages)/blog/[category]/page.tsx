import { fetchCategoryIDByTitle, fetchPostsByCategory } from "@/app/graphql";
import { PostHeader } from "@/components/Blog/PostHeader";
import RichText from "@/components/RichText";
import "@/styles/layouts/templates/BlogPage.scss";
import Link from "next/link";

import { redirect } from "next/navigation";
import { Post } from "../../../../../../payload-types";

export default async function CategoryComponent({ params }) {
  const { category } = params;
  const formattedSlug = category?.replace(/-/g, " ") || "";
  const slugTitle = formattedSlug
    ? formattedSlug.charAt(0).toUpperCase() + formattedSlug.slice(1)
    : "";

  let posts: Post[] = [];
  let categoryData;
  try {
    categoryData = await fetchCategoryIDByTitle(category);
    if (categoryData?.length) {
      posts = await fetchPostsByCategory(categoryData[0].id);
    } else {
      redirect("/blog");
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="blog__landing blog-category__landing">
      <header className="blog__archive-header">
        <h1>{slugTitle}</h1>
      </header>
      <div className="blog__archive">
        {posts?.map((post) => {
          const {
            slug,
            title,
            publishedDate,
            updatedAt,
            createdBy,
            richText,
            id,
          } = post;
          const href = `/blog/${category}/${slug}`;
          return (
            <article key={id} className="post post__latest">
              <Link href={href}>
                <PostHeader
                  id={id}
                  title={title}
                  createdBy={createdBy}
                  publishedDate={publishedDate}
                  updatedAt={updatedAt}
                />
                <RichText content={richText} extractFirstParagraph={true} />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}