import { format } from 'date-fns';

const formatDate = (dateString) => {
  return format(new Date(dateString), 'MMMM d, yyyy');
};

const PostDateDisplay = ({ publishedDate, updatedAt }) => {
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
