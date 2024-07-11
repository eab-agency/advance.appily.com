'use client'
import "@/styles/layouts/templates/BlogPage.scss";
import { fetchFirstFivePosts, fetchAllCategories, fetchAllTags } from "@/app/graphql";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { Post, Category, Tag } from "../../../../payload-types";
import Link from 'next/link';

const BlogTab = dynamic(() => import("@/components/BlogTab"), { ssr: false });

const BlogComponent =  () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags,setTags] = useState<Tag[]>([]);

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
  return (
    <>
      <header className="blog-header">
        <h1>Blog</h1>
        <p>Blog Description</p>
      </header>
      <div className="container">
        <div className="row first-row">
          {posts?.length > 0 && posts.slice(0, 1).map((post, index) => (
            <div key={index}  className="item">
              {post.title}
            </div>
          ))}
        </div>
        <div className="row second-row">
          {posts?.slice(1, 5).map((post,index) => (
            <div key={index} className="item">
              {post.title}
            </div>
          ))}
        </div>
      </div>
     {categories.length > 0 && ( <BlogTab  tabs={categories}/>)}
     <div className="category-container">
      <div className="category-heading">{"Categories"}</div>
      {categories.length > 0 &&
        categories.map((cat, index) => (
          // <button key={index} className="category-button">
          //   {cat.title}
          // </button>
          <Link href="/blog/category/[category]?id=123" as={`/blog/category/${cat.title}?id=${cat.id}`} key={index}>
  {cat.title}
</Link>
        ))}

     <div className="category-container">
      <div className="category-heading">{"Tags"}</div>
      {tags.length > 0 &&
        tags.map((tag, index) => (
         
          <Link href="/blog/category/[tag]?id=123" as={`/blog/tag/${tag.title}?id=${tag.id}`} key={index}>
        {tag.title}
      </Link>
        ))}
        </div>
    </div>

    </>
  );
};

export default BlogComponent;
