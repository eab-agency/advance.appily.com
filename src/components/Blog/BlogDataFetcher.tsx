"use client";

import {
  fetchAllCategories,
  fetchAllTags,
  fetchFirstFivePosts,
} from "@/app/graphql";
import { useEffect, useState } from "react";
import { Category, Post, Tag } from "../../../payload-types";
import BlogComponent from "./BlogComponent";

const BlogDataFetcher = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPosts, fetchedCategories, fetchTags] = await Promise.all([
          fetchFirstFivePosts(),
          fetchAllCategories(),
          fetchAllTags(),
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

  return <BlogComponent posts={posts} categories={categories} tags={tags} />;
};

export default BlogDataFetcher;
