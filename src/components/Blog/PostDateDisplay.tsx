"use client";
import { format } from "date-fns";
import { useEffect } from "react";
import { useId } from "../../context/idContext";

const formatDate = (dateString) => {
  return format(new Date(dateString), "MMMM d, yyyy");
};

const PostDateDisplay = ({ publishedDate, updatedAt, id }) => {
  const { docId, setId } = useId(); // Get and set the ID from the context
  useEffect(() => {
    if (id !== null) {
      setId(id); // Store the ID in context
    }
  }, [id, setId]);

  if (!publishedDate && !updatedAt) return null;

  const renderDate = () => {
    const mostRecentDate = updatedAt && updatedAt > publishedDate ? updatedAt : publishedDate; //temporarily unused.

    return (
      <div className="post__published-date">
      <span className="date-label">Published:</span>
      <span className="date-value">{formatDate(publishedDate)}</span>
      </div>
    )

  };

  return renderDate();

};

export default PostDateDisplay;
