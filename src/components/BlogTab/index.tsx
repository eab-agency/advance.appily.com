import { useState, useEffect } from 'react';
import classes from './index.module.scss';
import { fetchPostsByCategory, fetchAllCategories, fetchPosts } from "@/app/graphql";
import { Post, Category } from "../../../payload-types";

const ALL_POST = 'All Posts';

const BlogTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(ALL_POST);
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const allPosts = await fetchPosts();
       setFetchedPosts(allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchPostsForCategory = async (tab) => {
    
    try {
      const posts = await fetchPostsByCategory(tab.id);
      setFetchedPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleClick = async (tab) => {
    setActiveTab(tab.title);
    if (tab.title === ALL_POST) {
      fetchPosts();
    } 
    else {
      fetchPostsForCategory(tab);
    }
  };

  return (
    <>
    <div className={classes.tabHeader}>
      <button
        className={`${classes.tabButton} ${activeTab === ALL_POST ? classes.active : ''}`}
        onClick={() => handleClick(ALL_POST)}
      >
        {ALL_POST}
      </button>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${classes.tabButton} ${activeTab === tab.title ? classes.active : ''}`}
          onClick={() => handleClick(tab)}
        >
          {tab.title}
        </button>
      ))}
      </div>
      <div className={classes.postContainer}>
        {fetchedPosts?.map(post => (
          <div key={post.id} className={classes.post}>
            <h3>{post.title}</h3>
            {/* <p>{post.content}</p> */}
          </div>
        ))}
      </div>
      </>
  );
};

export default BlogTabs;
