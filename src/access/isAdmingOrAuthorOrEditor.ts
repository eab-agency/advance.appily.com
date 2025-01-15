
// export const isAdminOrAuthorOrEditor: Access = ({ req: { user } }: AccessArgs) => {
//   if (user) {
//     // Check if the user is an admin or blog editor
//     if (user.roles?.includes('admin') || user.roles?.includes('blogEditor')) {
//       return true; // Full access
//     }


//     // Check if the user is a blog author
//   //   if (user.roles?.includes('blogAuthor')) {
//   //     return {
//   //       or: [
//   //         {
//   //           createdBy: {
//   //             equals: user.id,
//   //           },
//   //         },
//   //       ],
//   //     };
//   //   }

//   //   // Default case: Allow the user to access their own posts
//   //   return {
//   //     createdBy: {
//   //       equals: user.id,
//   //     },
//   //   };
//   }

//   // If no user is found, explicitly deny access
//   return false;
// };

import type { Access } from 'payload';

export const isAdminOrAuthorOrEditor: Access = async ({ req, id }) => {
  const { user } = req;

  // Ensure `id` is defined before proceeding with the query
  // if (!id) {
  //   return false;
  // }

  // Fetch the post by ID
  const result = await req.payload.find({
    collection: 'posts',
    limit: 1, // Limit to one document for efficiency
    depth: 0,
    where: {
      id: { equals: id },
    },
  });

  const post = result?.docs?.[0];
  if (user) {
    // Check if the user has admin or blog editor roles
    if (user.roles?.includes('admin') || user.roles?.includes('blogEditor')) {
      return true; // Full access
    }

    // Check if the user is a blog author and created the post
    if (user.roles?.includes('blogAuthor')) {
      if (post?.createdBy === user.id) {
        return true; // Access granted if the user created the post
      }
      return false; // Access denied if the post was not created by the user
    }
  }

  // If no user is found or no conditions match, deny access
   return false;
};

