import { Access } from 'payload';

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.roles?.includes('admin')) {
      return true;
    }

    // If user is a blog author
    if (user.roles?.includes('blogAuthor')) {
      // return {
      //   or: [
      //     {
      //       id: {
      //         equals: user.id,
      //       }
      //     },
      //     {
      //       roles: {
      //         not_equals: 'blogEditor',
      //       }
      //     },
      //     {
      //       roles: {
      //         not_equals: 'admin',
      //       }
      //     }
      //   ]
      // }
      return {
        id: {
          equals: user.id,
        }
      }
    }

    // If user is a blog editor
    if (user.roles?.includes('blogEditor')) {
      return {
        id: {
          equals: user.id,
        }
      }
    }

    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      }
    }
  }

  // Reject everyone else
  return false;
};
