import { fetchPost, fetchPosts, fetchPostsByCategory } from "@/app/graphql";
import { Blocks } from '@/components/Block';
import "@/styles/layouts/templates/PostPage.scss"
import { notFound } from "next/navigation";
import React from "react";
import { Category, Post } from "../../../../../payload-types";
import { Hero } from '../../../../blocks/HeroBlock';
import Link from 'next/link';
import { Metadata } from "next";
import { draftMode } from 'next/headers'
import { generateMeta } from "@/seo/generateMeta";

export async function generateStaticParams() {
  try {
    const posts = await fetchPosts();
    return posts.map(({ slug }) => ({ params: { slug } }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string;} }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();
  const { slug } =  params;
  let post: Post | null = null;

  try {
    post = await fetchPost(slug);
  } catch (error) {
    console.error('Error fetching post data:', error);
  }
  if (post) {
    return generateMeta({doc:post});
  } else {
    return {
      title: 'Default Title',
      description: 'Default Description',
    };
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
  let relatesPosts: Post[] | null = [];
  try {
    post = await fetchPost(slug);
    if(post){
    const catID: Category['id'] = post?.category ? (post?.category[0] as Category)?.id : '';
    if(catID) {
      relatesPosts = await fetchPostsByCategory(catID);
      }
    }
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
    updatedAt,
    id
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
      <div className="content">
      <p>{'Related Posts'}</p>
      <div className="card-container">
      {relatesPosts?.length > 0 && relatesPosts.map((data,index)=>{
        if(data.id !== id) {
        return(
          <div className="card" key={index}>
         <div className="card-content">
        <h3 className="card-title">
          <Link href={`/blog/${data.slug}`}>
            {data.title}
          </Link>
        </h3>
      </div>
      </div>
        )}
      })}
      </div>
      </div>
    </>
  );
};

export default PostComponent;
