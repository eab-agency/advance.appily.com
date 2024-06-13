import { fetchPost, fetchPosts } from "@/app/graphql";
import { Blocks } from '@/components/Block';
import "@/styles/layouts/templates/PostPage.scss"
import { notFound } from "next/navigation";
import React from "react";
import { Post } from "../../../../../payload-types";
import { Hero } from '../../../../blocks/HeroBlock';

export async function generateStaticParams() {
  try {
    const posts = await fetchPosts();
    console.log(posts,'posts**')
    return posts.map(({ slug }) => ({ params: { slug } }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

interface PostComponentProps {
  params: { slug: string };
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
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

  const {
    postFeaturedImage,
    layout,
    title,
    publishedDate,
    updatedAt
  } = post;

  return (
    <>
      <header className="post-header">
        <h1>{title}</h1>
        <p className="post-dates">
          {publishedDate && `Published: ${formatDate(publishedDate)}`}
          {publishedDate && updatedAt && ' | '}
          {updatedAt && `Updated: ${formatDate(updatedAt)}`}
        </p>
      </header>
      {postFeaturedImage &&
        <Hero {...postFeaturedImage} />
      }
      <Blocks blocks={layout} />
    </>
  );
};

export default PostComponent;
