'use client'
import { fetchAllCategories, fetchAllTags, fetchFirstFivePosts } from "@/app/graphql";
import { PostHeader } from "@/components/Blog/PostHeader";
import RichText from '@/components/RichText';
import "@/styles/layouts/templates/BlogPage.scss";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { Category, Post, Tag } from "../../../../payload-types";

const BlogTab = dynamic(() => import("@/components/Blog/BlogTab"), { ssr: false });

const BlogComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPosts, fetchedCategories, fetchTags] = await Promise.all([
          fetchFirstFivePosts(),
          fetchAllCategories(),
          fetchAllTags()
        ]);
        setPosts(fetchedPosts);
        setCategories(fetchedCategories);
        setTags(fetchTags);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  console.log(posts);

  return (
    <div className="blog__landing">
      <header className="blog__archive-header">
        <h1>Blog</h1>
        <p>Dive into our comprehensive collection of articles designed to guide you through career changes at any age. Whether you&apos;re considering a shift into nursing, tech, or another field, we provide insights, practical steps, and personal stories to help you navigate your journey. Discover top master&apos;s degrees for career changers, learn how to start a healthcare career after 40, and explore the best jobs for midlife career transitions.</p> <p>Our resources are tailored to support you in making informed decisions and achieving your professional goals. <strong>Ready for a fresh start? Let Appily Advance be your guide.</strong></p>
      </header>
      <div className="blog__featured-posts">

        {posts?.length > 0 && posts.slice(0, 1).map((post, index) => {
          const {
            postFeaturedImage,
            slug,
            title,
            publishedDate,
            updatedAt,
            richText,
            createdBy
          } = post;

          return (
            <article key={index} className="post post__featured">
              <Link href={`blog/${slug}`}>
                <div className="post__content">
                  <PostHeader
                    title={title}
                    createdBy={createdBy}
                    publishedDate={publishedDate}
                    updatedAt={updatedAt}
                  />

                  <RichText content={richText} extractFirstParagraph={true} />
                </div>
                {postFeaturedImage && (
                  <figure className="post__featured-image">
                    {postFeaturedImage?.url && (
                      <Image src={postFeaturedImage.url} alt={postFeaturedImage.alt} fill />
                    )}
                  </figure>)}
              </Link>
            </article>
          )
        })}

        <div className="posts__secondary">
          {posts?.slice(1, 5).map((post, index) => {
            const {
              slug,
              title,
              publishedDate,
              updatedAt,
              createdBy,
              richText
            } = post;

            return (
              <article key={index} className="post post__latest">
                <Link href={`blog/${slug}`}>
                  <PostHeader
                    title={title}
                    createdBy={createdBy}
                    publishedDate={publishedDate}
                    updatedAt={updatedAt}
                  />

                  <RichText content={richText} extractFirstParagraph={true} />
                </Link>
              </article>
            )
          }
          )}
        </div>
      </div>

      <div className="blog-filter">

        {categories.length > 0 && (<BlogTab tabs={categories} />)}

        <div className="categories-tags">
          <div className="category-container">
            <div className="category-heading">{"Categories"}</div>
            {categories.length > 0 &&
              categories.map((cat, index) => (
                <Link href="/blog/category/[category]" as={`/blog/category/${cat?.title}`} key={index}>
                  {cat.title}
                </Link>
              ))}
          </div>

          {/* Note: Remove this section if tags are not needed */}
          {/*<div className="category-container">
            <div className="category-heading">{"Tags"}</div>
            {tags.length > 0 &&
              tags.map((tag, index) => (

                <Link href="/blog/category/[tag]?id=123" as={`/blog/tag/${tag.title}?id=${tag.id}`} key={index}>
                  {tag.title}
                </Link>
              ))}
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default BlogComponent;
