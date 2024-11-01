'use client'
import { fetchPosts, fetchPostsByCategory } from "@/app/graphql";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Post } from "../../../../payload-types";
import { PostHeader } from "../PostHeader";

const ALL_POST = "All Posts";

const BlogTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(ALL_POST);
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const filterTabsRef = useRef(null);
  const [currentViewportWidth, setCurrentViewportWidth] = useState(0); // Initialize with a default value

  // This useEffect initializes the viewport width correctly on the client-side
  useEffect(() => {
    const updateViewportWidth = () => {
      setCurrentViewportWidth(window.innerWidth);
    };

    // Set initial viewport width
    updateViewportWidth();

    // Add event listener to update on resize
    window.addEventListener('resize', updateViewportWidth);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', updateViewportWidth);
    };
  }, []);

  const [viewportWidth, setViewportWidth] = useState(0); // Initialize with a default value

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (currentViewportWidth !== viewportWidth) {
      setViewportWidth(currentViewportWidth);

      if (filterTabsRef.current) {
        //@ts-ignore
        const filterTabsRect = filterTabsRef.current.getBoundingClientRect();
        const filterAbsoluteTop = filterTabsRect.top + window.scrollY;
        const remInPixels = parseFloat(
          getComputedStyle(document.documentElement).fontSize
        );
        const targetOffset = remInPixels * 5.2; // 5.2rem in pixels
        const scrollBack = filterAbsoluteTop - targetOffset;

        setScrollPosition(scrollBack);
      }
    }
  }, [currentViewportWidth, viewportWidth]);

  const fetchAllPosts = async () => {
    try {
      const allPosts = await fetchPosts();
      setFetchedPosts(allPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchPostsForCategory = async (tab) => {
    try {
      const posts = await fetchPostsByCategory(tab.id);
      setFetchedPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const handleClick = async (tab) => {
    setCategoriesOpen(false);

    // Fetch posts and update the content
    if (tab === ALL_POST) {
      await fetchAllPosts();
      setActiveTab(ALL_POST);
    } else {
      await fetchPostsForCategory(tab);
      setActiveTab(tab.title);
    }

    if (currentViewportWidth < 768) {
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="blog-filter__content">
      <div className="blog-filter__tabs" ref={filterTabsRef}>
        <button
          onClick={toggleCategories}
          className={`mobile-categories-btn ${categoriesOpen ? "toggled" : ""}`}
        >
          Categories
        </button>
        <div className={`blog-categories ${categoriesOpen ? "open" : ""}`}>
          <button
            className={`button-tab ${activeTab === ALL_POST ? "button-tab__active" : ""}`}
            onClick={() => handleClick(ALL_POST)}
          >
            {ALL_POST}
          </button>
          {tabs?.map((tab) => (
            <button
              key={tab.id}
              className={`button-tab ${activeTab === tab.title ? "button-tab__active" : ""}`}
              onClick={() => handleClick(tab)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      <div className="all-posts-container">
        {fetchedPosts?.map((post) => {
          const {
            id,
            title,
            createdBy,
            publishedDate,
            updatedAt,
            slug,
            category,
          } = post;
          const catTitle =
            Array.isArray(category) &&
              typeof category[0] === "object" &&
              "slug" in category[0]
              ? category[0]?.slug ?? ""
              : "";
          return (
            <article key={id} className="post">
              <Link href={`blog/${catTitle}/${slug}`}>
                <PostHeader
                  title={title}
                  createdBy={createdBy}
                  publishedDate={publishedDate}
                  updatedAt={updatedAt}
                />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default BlogTabs;
