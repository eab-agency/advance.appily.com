import { fetchPost, fetchPosts, fetchPostsByCategory } from "@/app/graphql";
import "@/styles/layouts/templates/PostPage.scss";
import 'react-toastify/dist/ReactToastify.css';
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
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string; post: string; category: string };
// }): Promise<Metadata> {
//   const { isEnabled: isDraftMode } = draftMode();
//   const { slug, post } = params;
//   let postData: Post | null = null;
//   try {
//     postData = await fetchPost(post);
//   } catch (error) {
//     console.error("Error fetching post data:", error);
//   }
//   if (postData) {
//     return generateMeta({ doc: postData });
//   } else {
//     return {
//       title: "Default Title",
//       description: "Default Description",
//     };
//   }
// }
interface PostComponentProps {
  params: { slug: string; post: string; category: string };
}
const PostComponent = async ({ params }: PostComponentProps) => {
  const awaitedParams = await params;
  const { post, category } = awaitedParams;

  // const { post, category } = params;
  let postData: Post | null = null;
  let relatesPosts: Post[] | null = [];
  let actualCategorySlug: string | null = null;
  let toastMessage: string | null = null;

  try {
    postData = await fetchPost(post);

    if (postData) {
      actualCategorySlug = postData?.category && postData.category.length > 0
        ? (postData.category[0] as Category)?.slug || null
        : null;
      // Compare the URL category with the actual category slug
      const catID: Category["id"] = postData?.category
        ? (postData?.category[0] as Category)?.id
        : "";
      if (catID) {
        relatesPosts = await fetchPostsByCategory(catID);
        console.log(relatesPosts, 'relatesPosts**')
      }
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (actualCategorySlug !== category && postData) {
    toastMessage = `This page is not found. Redirecting to the blog Category.`;
  }
  if (actualCategorySlug !== category && !postData) {
    toastMessage = `This page is not found. Redirecting to the blog Category.`;
  }

  return (
    <PageClient post={postData} relatedPostData={relatesPosts} toastMessage={toastMessage} />
  );
};
export default PostComponent;
