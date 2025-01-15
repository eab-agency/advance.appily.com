import type { Access } from 'payload';

export const isBlogEditor: Access = ({ req: {user}}) => {

  if(user) {
    if(user?.roles?.includes('blogEditor')) {
      return true;
    }
  }
  return false; // Explicitly return false if the conditions are not met

} 