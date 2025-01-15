import type { Access } from 'payload';

export const isAdminorBlogAuthor: Access = ({ req: {user}}) => {

  if(user) {

    if(user?.roles?.includes('admin')) return true;

    if(user?.roles?.includes('blogAuthor')) {
      return true;
    }
  }
  return false; // Explicitly return false if the conditions are not met

} 