import type { Access } from 'payload';

export const isAdminorBlogEditor: Access = ({ req: {user}}) => {

  if(user) {

    if(user?.roles?.includes('admin')) return true;

    if(user?.roles?.includes('blogEditor')) {
      return true;
    }
  }
  return false;
} 