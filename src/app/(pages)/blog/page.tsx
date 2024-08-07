'use client'
import { fetchAllCategories, fetchAllTags, fetchFirstFivePosts } from "@/app/graphql";
import { PostHeader } from "@/components/Blog/PostHeader";
import RichText from '@/components/RichText';
import "@/styles/layouts/templates/BlogPage.scss";
import dynamic from 'next/dynamic';
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
        <p>Pariatur incididunt sit esse magna. Magna ut et in elit voluptate elit sint mollit eiusmod ipsum cupidatat. Magna esse quis excepteur reprehenderit elit esse quis sit velit cupidatat incididunt aliqua irure. Minim culpa commodo cillum excepteur consectetur ipsum cillum reprehenderit duis occaecat ex dolor deserunt. Ex velit deserunt ullamco cillum nostrud. Consectetur nostrud in tempor aliquip laborum magna ad velit minim magna irure voluptate occaecat excepteur laboris. Quis eiusmod proident proident exercitation ad amet laborum non duis labore non quis.</p>
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
                      <img src={postFeaturedImage.url} alt={postFeaturedImage.alt} />
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

          {/* <div className="category-container">
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
