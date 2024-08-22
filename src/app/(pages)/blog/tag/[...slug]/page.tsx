"use client";
import { fetchPostsByTag } from "@/app/graphql";
import { PostHeader } from "@/components/Blog/PostHeader";
import RichText from "@/components/RichText";
import "@/styles/layouts/templates/BlogPage.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "../../../../../../payload-types";

export function TagComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const [posts, setPosts] = useState<Post[]>([]);
  const slug = pathname?.split("/").pop();
  const decodedSlug = slug ? decodeURIComponent(slug) : "";
  const slugTitle = decodedSlug
    ? decodedSlug.charAt(0).toUpperCase() + decodedSlug.slice(1)
    : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const posts = await fetchPostsByTag(id);
          setPosts(posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [id]);

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

          const href = `${window.location.origin}/blog/${slug}`;

          return (
            <article key={id} className="post post__latest">
              <Link href={href}>
                <PostHeader
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

export default TagComponent;
