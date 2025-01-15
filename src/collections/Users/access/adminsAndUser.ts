// import type { Access } from 'payload';

// export const imageAccess: Access = ({ req: {user}}) => {

//   if(user) {

//     if(user?.roles?.includes('admin')) return true;

//     if (user.roles?.includes('blogAuthor') || user.roles?.includes('blogEditor') ) {
//         return {
//           or: [
//             {
//               'uploaded_by': {
//                 equals: user.id,
//               }
//             },
//           ]
//         };
//       }
  
//       // Default to allowing users to see their own created posts
//       return {
//         'uploaded_by': {
//           equals: user.id,
//         }
//       };
    
//   }
//   return false;
// } 