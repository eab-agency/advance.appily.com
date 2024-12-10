"use client";
import { PostAuthorDisplay } from "@/components/Blog/PostAuthorDisplay";
import PostDateDisplay from "@/components/Blog/PostDateDisplay";
import { PostHeader } from "@/components/Blog/PostHeader";
import RichText from "@/components/RichText";
import "@/styles/layouts/templates/PostPage.scss";
import { useLivePreview } from "@payloadcms/live-preview-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Post } from "../../../../../../payload-types";
import { useId } from "../../../../../context/idContext";

export const PageClient: React.FC<{
  post: Post;
  relatedPostData: Post[];
}> = ({ post: initialPage, relatedPostData }) => {
  const serverURL = process.env.NEXT_PUBLIC_CMS_URL || "";
  const { docId, setId } = useId(); // Get and set the ID from the context

  const { data } = useLivePreview<Post>({
    initialData: initialPage,
    serverURL: serverURL, // Ensure this URL is correct
    depth: 2,
  });

  useEffect(() => {
    if (data?.id) {
      setId(data?.id); // Store the ID in context
    }
  }, [data?.id, setId]);

  const {
    postFeaturedImage,
    title,
    publishedDate,
    updatedAt,
    createdBy,
    id,
    richText,
  } = data;
  // @ts-ignore
  const sizes = createdBy?.userImage?.sizes;
  const userImageURL =
    sizes?.squareSmall?.url !== null
      ? sizes?.squareSmall?.url
      : // @ts-ignore
        createdBy?.userImage?.url;
console.log(postFeaturedImage)
console.log(relatedPostData)
  return (
    <div className="post-content__wrapper">
      <Link href="/blog" className="back-btn">
        <FaChevronLeft />
        Back to Blog
      </Link>
      <header className="post-header">
        <PostDateDisplay
          publishedDate={publishedDate}
          updatedAt={updatedAt}
          id={id}
        />
        <h1>{title}</h1>
        <PostAuthorDisplay createdBy={createdBy} />
      </header>
      {postFeaturedImage &&
        typeof postFeaturedImage === "object" &&
        "url" in postFeaturedImage && (
          <figure className="post__featured-image">
            {postFeaturedImage?.url && (
              <Image
                src={postFeaturedImage?.url}
                alt={postFeaturedImage.alt}
                width={800}
                height={500}
                priority
                style={{
                  objectPosition: `${postFeaturedImage.focalX}% ${postFeaturedImage.focalY}%`,
                }}
              />
            )}
          </figure>
        )}
      <div className="post-content">
        <RichText content={richText} />
      </div>

      {createdBy && (
        <aside className="post__author-bio">
          <div
            className="author-content-wrapper"
            itemScope
            itemType="https://schema.org/Person"
            >
            <h2>About the Author</h2>
            {userImageURL && (
                <figure className="author-image">
                <Image
                  src={userImageURL}
                  // @ts-ignore
                  alt={createdBy?.userImage?.alt}
                  itemProp="image"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw"
                  />
              </figure>
            )}
            <div className="author-content">
              <header>
                <h3 itemProp="name">
                  {/* @ts-ignore */}
                  {createdBy?.name}
                </h3>
              </header>
              {createdBy && (
                <p itemProp="description">
                  {/* @ts-ignore */}
                  {createdBy?.bio}
                </p>
              )}
            </div>
          </div>
        </aside>
      )}

      <div className="related-posts">
        {relatedPostData?.filter((data) => data.id !== id).length > 0 && (
          <>
            <h2>Related Posts</h2>
            <div className="cards-container">
              {relatedPostData
                ?.filter((data) => data.id !== id)
                .slice(0, 3)
                .map((data, index) => {
                  const { slug, title, publishedDate, updatedAt, createdBy } =
                    data;

                  if (data.id !== id) {
                    return (
                      <article key={index} className="post post__latest">
                        <Link
                          // @ts-ignore
                          href={slug}
                        >
                          <PostHeader
                            title={title}
                            createdBy={createdBy}
                            publishedDate={publishedDate}
                            updatedAt={updatedAt}
                            id={id}
                          />
                        </Link>
                      </article>
                    );
                  }
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
