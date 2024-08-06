import { fetchPost, fetchPosts, fetchPostsByCategory } from "@/app/graphql";
import { PostAuthorDisplay } from "@/components/Blog/PostAuthorDisplay";
import PostDateDisplay from "@/components/Blog/PostDateDisplay";
import { PostHeader } from "@/components/Blog/PostHeader";
import RichText from "@/components/RichText";
import AccordionSection from '@/components/commonComponent/AccordionGroup';
import ButtonGroup from '@/components/commonComponent/ButtonGroup';
import { generateMeta } from "@/seo/generateMeta";
import "@/styles/layouts/templates/PostPage.scss";
import { Metadata } from "next";
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from "next/navigation";
import { Category, Post } from "../../../../../payload-types";

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
  params: { slug: string };
}): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();
  const { slug } = params;
  let post: Post | null = null;

  try {
    post = await fetchPost(slug);
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
  if (post) {
    return generateMeta({ doc: post });
  } else {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}

interface PostComponentProps {
  params: { slug: string };
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const PostComponent = async ({ params: { slug = "" } }: PostComponentProps) => {
  let post: Post | null = null;
  let relatesPosts: Post[] | null = [];
  try {
    post = await fetchPost(slug);
    if (post) {
      const catID: Category["id"] = post?.category
        ? (post?.category[0] as Category)?.id
        : "";
      if (catID) {
        relatesPosts = await fetchPostsByCategory(catID);
      }
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (!post) {
    notFound();
  }


  const {
    postFeaturedImage,
    title,
    publishedDate,
    updatedAt,
    createdBy,
    id,
    richText
  } = post;
  const layout = [];

  richText?.root?.children.forEach(obj => {
    if (obj.type === 'block') {
      layout.push(obj?.fields);
    }
  });

  const sizes = createdBy?.userImage?.sizes;

  return (
    <div className="post-content__wrapper">
      <header className="post-header">
        <PostDateDisplay publishedDate={publishedDate} updatedAt={updatedAt} />
        <h1>{title}</h1>
        <PostAuthorDisplay createdBy={createdBy} />
      </header>
      {postFeaturedImage && (
        <figure className="post__featured-image">
          {postFeaturedImage?.url && (
            <img src={postFeaturedImage?.url} alt={postFeaturedImage.alt} />
          )}
        </figure>)
      }
      <div className="post-content">
        <RichText content={richText} />
      </div>

      <aside className="post__author-bio">
        <h2>About the Author</h2>
        <div className="author-content-wrapper" itemScope itemType="https://schema.org/Person">
          <figure className="author-image">
            <img src={sizes?.squareSmall.url} alt={createdBy?.name} itemProp="image" />
          </figure>
          <div className="author-content">
            <header>
              <h3 itemProp="name">{createdBy?.name}</h3>
              <p itemProp="jobTitle">{createdBy?.roles}</p>
            </header>
            <p itemProp="description">{createdBy?.bio}</p>
          </div>
        </div>
      </aside>

      <div className="related-posts">
        <h2>Related Posts</h2>
        <div className="cards-container">
          {relatesPosts?.length > 0 && relatesPosts.map((data, index) => {
            const {
              slug,
              title,
              publishedDate,
              updatedAt,
              createdBy
            } = data;

            if (data.id !== id) {
              return (
                <article key={index} className="post post__latest">
                  <Link href={`blog/${slug}`}>
                    <PostHeader
                      title={title}
                      createdBy={createdBy}
                      publishedDate={publishedDate}
                      updatedAt={updatedAt}
                    />
                  </Link>
                </article>
              )
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
