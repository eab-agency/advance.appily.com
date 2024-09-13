import { fetchPost, fetchPosts, fetchPostsByCategory } from "@/app/graphql";
import { PostAuthorDisplay } from "@/components/Blog/PostAuthorDisplay";
import PostDateDisplay from "@/components/Blog/PostDateDisplay";
import { PostHeader } from "@/components/Blog/PostHeader";
import RichText from "@/components/RichText";
import AccordionSection from "@/components/commonComponent/AccordionGroup";
import ButtonGroup from "@/components/commonComponent/ButtonGroup";
import { generateMeta } from "@/seo/generateMeta";
import "@/styles/layouts/templates/PostPage.scss";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { Category, Post } from "../../../../../../payload-types";

const blockRenderers = {
  accordion: (block) => <AccordionSection data={block} />,
  ButtonGroup: (block) => <ButtonGroup data={block} />,
};

export async function generateStaticParams() {
  try {
    const posts = await fetchPosts();
    return posts.map(({ slug }) => ({ params: { slug } }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; post: string };
}): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();
  const { slug, post } = params;
  let postData: Post | null = null;

  try {
    postData = await fetchPost(post);
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
  if (postData) {
    return generateMeta({ doc: postData });
  } else {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}

interface PostComponentProps {
  params: { slug: string; post: string };
}

const PostComponent = async ({ params }: PostComponentProps) => {
  const { post } = params;
  let postData: Post | null = null;
  let relatesPosts: Post[] | null = [];

  try {
    postData = await fetchPost(post);

    if (postData) {
      const catID: Category["id"] = postData?.category
        ? (postData?.category[0] as Category)?.id
        : "";
      if (catID) {
        relatesPosts = await fetchPostsByCategory(catID);
      }
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (!postData) {
    notFound();
  }

  const {
    postFeaturedImage,
    title,
    publishedDate,
    updatedAt,
    createdBy,
    id,
    richText,
  } = postData;
  // const layout = [];

  // richText?.root?.children.forEach((obj) => {
  //   if (obj.type === "block") {
  //     layout.push(obj?.fields);
  //   }
  // });

  // @ts-ignore
  const sizes = createdBy?.userImage?.sizes;
  const userImageURL =
    sizes?.squareSmall?.url !== null
      ? sizes?.squareSmall?.url
      // @ts-ignore
      : createdBy?.userImage?.url;

  return (
    <div className="post-content__wrapper">
      <Link href="/blog" className="back-btn">
        <FaChevronLeft />
        Back to Blog
      </Link>
      <header className="post-header">
        <PostDateDisplay publishedDate={publishedDate} updatedAt={updatedAt} id={id} />
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
                style={
                  {
                    objectPosition: `${postFeaturedImage.focalX}% ${postFeaturedImage.focalY}%`,
                  }
                }
              />
            )}
          </figure>
        )}
      <div className="post-content">
        <RichText content={richText} />
      </div>

      {createdBy && (
        <aside className="post__author-bio">
          <h2>About the Author</h2>
          <div
            className="author-content-wrapper"
            itemScope
            itemType="https://schema.org/Person"
          >
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
            <div className="author-content">
              <header>
                <h3 itemProp="name"
                // @ts-ignore
                > {createdBy?.name}</h3>
                {/* <p itemProp="jobTitle">{createdBy?.roles}</p> */}
              </header>
              <p itemProp="description"
              // @ts-ignore
              >{createdBy?.bio}</p>
            </div>
          </div>
        </aside>
      )}

      <div className="related-posts">
        {relatesPosts?.filter((data) => data.id !== id).length > 0 && (
          <>
            <h2>Related Posts</h2>
            <div className="cards-container">
              {relatesPosts?.length > 0 &&
                relatesPosts.map((data, index) => {
                  const { slug, title, publishedDate, updatedAt, createdBy } =
                    data;

                  if (data.id !== id) {
                    return (
                      <article key={index} className="post post__latest">
                        <Link
                          // @ts-ignore
                          href={slug}>
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

export default PostComponent;
