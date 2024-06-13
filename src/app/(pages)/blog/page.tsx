'use client'
import "@/styles/layouts/templates/BlogPage.scss";
import { fetchFirstFivePosts, fetchAllCategories } from "@/app/graphql";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { Post, Category } from "../../../../payload-types";

const BlogTab = dynamic(() => import("@/components/BlogTab"), { ssr: false });

const BlogComponent =  () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPosts, fetchedCategories] = await Promise.all([
          fetchFirstFivePosts(),
          fetchAllCategories()
        ]);
        setPosts(fetchedPosts);
        setCategories(fetchedCategories);
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
          {posts.length > 0 && posts.slice(0, 1).map((post) => (
            <div key={post.id} className="item">
              {post.title}
            </div>
          ))}
        </div>
        <div className="row second-row">
          {posts.slice(1, 5).map((post) => (
            <div key={post.id} className="item">
              {post.title}
            </div>
          ))}
        </div>
      </div>
     {categories.length > 0 && ( <BlogTab  tabs={categories}/>)}{/* Assuming this is the correct component */}
    </>
  );
};

export default BlogComponent;
