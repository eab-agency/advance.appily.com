export const PostAuthorDisplay = ({ createdBy }) => {
  if (!createdBy) return null;

  return (
    <div className="post__date-author">
      <div className="post__author">By {createdBy.name}</div>
    </div>
  )
}
