'use client'
import "@/styles/layouts/templates/BlogPage.scss";
import {  fetchPostsByTag } from "@/app/graphql";
import React, { useEffect, useState } from "react";
import { Post } from "../../../../../../payload-types";
import { usePathname, useSearchParams } from 'next/navigation';



export function TagComponent (){
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');
  
  const [posts, setPosts] = useState<Post[]>([]);
  const slug = pathname?.split('/').pop(); 
  const slugTitle = slug ? slug?.charAt(0).toUpperCase() + slug?.slice(1): '';

  useEffect(() => {
    const fetchData = async () => {
        try {
          if(id) {
          const posts = await fetchPostsByTag(id);
          setPosts(posts);
          }
          }
         catch (error) {
          console.error('Error fetching posts:', error);
        }
    };
  
    fetchData();
  }, []);
  
  return (
    <>
      <header className="blog-header">
        <h1>{`Blog ${slugTitle} Tag`}</h1>
      </header>
      <div className="container">
      {posts?.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <span>{post.publishedDate}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TagComponent;
