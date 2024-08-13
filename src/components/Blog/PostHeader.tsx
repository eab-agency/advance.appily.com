import { PostAuthorDisplay } from './PostAuthorDisplay'
import PostDateDisplay from './PostDateDisplay'

export const PostHeader = ({ title, createdBy, publishedDate, updatedAt }) => {
  return (
    <header className="post__content-head">
      <PostDateDisplay publishedDate={publishedDate} updatedAt={updatedAt} />
      <h2>{title}</h2>
      <PostAuthorDisplay createdBy={createdBy} />
    </header>
  )
}

