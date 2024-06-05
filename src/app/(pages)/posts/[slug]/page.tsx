import { fetchPosts, fetchPost } from "@/app/graphql";
import { notFound } from "next/navigation";
import React from "react";
import { Post } from "../../../../../payload-types";
import { Hero } from '../../../../blocks/HeroBlock';
import { Blocks } from '@/components/Block';

export async function generateStaticParams() {
  try {
    const posts = await fetchPosts();
    return posts.map(({ slug }) => ({ params: { slug } }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

interface PostComponentProps {
  params: { slug: string };
}

const PostComponent = async ({ params: { slug = '' } }: PostComponentProps) => {
  let post: Post | null = null;

  try {
    post = await fetchPost(slug);
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    notFound();
  }

  

  return (
    <React.Fragment>
      {post.hero && <Hero {...post.hero} />}
      <Blocks blocks={post.layout} />
    </React.Fragment>
  );
};

export default PostComponent;
