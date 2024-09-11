'use client'
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useId } from '../../context/idContext';

const formatDate = (dateString) => {
  return format(new Date(dateString), 'MMMM d, yyyy');
};

const PostDateDisplay = ({ publishedDate, updatedAt, id }) => {
  const { docId, setId } = useId(); // Get and set the ID from the context
  useEffect(() => {
    if (id !== null) {
      setId(id); // Store the ID in context
    }
  }, [setId]);

  if (!publishedDate && !updatedAt) return null;

  return (
    <div className="post__published-date">
      {publishedDate ? (
        <>
          <span className="date-label">Published: </span>
          <span className="date-value">{formatDate(publishedDate)}</span>
        </>
      ) : (
        <>
          <span className="date-label">Updated: </span>
          <span className="date-value">{formatDate(updatedAt)}</span>
        </>
      )}
    </div>
  );
};

export default PostDateDisplay;
