import BlogDataFetcher from "@/components/Blog/BlogDataFetcher";
import { mergeOpenGraph, mergeTwitter } from "@/seo";
import "@/styles/layouts/templates/BlogPage.scss";
import { Metadata } from "next";

const title = "Blog Archive | Career Change Insights and Guidance";
const description =
  "Explore the Appily Advance blog archive for articles on career changes at any age. Get insights, practical steps, and personal stories to help you transition into new fields like nursing, tech, and healthcare. Start your journey today!";

export const metadata: Metadata = {
  openGraph: mergeOpenGraph({
    title: title,
    description: description,
  }),
  twitter: mergeTwitter({
    title: title,
    description: description,
  }),
  title: title,
  description: description,
};

const BlogPage = () => {
  return <BlogDataFetcher />;
};

export default BlogPage;
