import { fetchPost, fetchPosts, fetchPostsByCategory } from "@/app/graphql";
import { generateMeta } from "@/seo/generateMeta";
import "@/styles/layouts/templates/PostPage.scss";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Category, Post } from "../../../../../../payload-types";
import { PageClient } from './page.client';


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

  // const layout = [];

  // richText?.root?.children.forEach((obj) => {
  //   if (obj.type === "block") {
  //     layout.push(obj?.fields);
  //   }
  // });




  return (
    <PageClient post={postData} relatedPostData={relatesPosts} />
  );
};

export default PostComponent;
