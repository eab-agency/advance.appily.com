import type { FieldAccess } from 'payload';

export const isAdmin: FieldAccess = ({ req }) => {
  const { user } = req;

  if (user && user.roles?.includes('admin')) {
    return true;
  }

  return false; // Deny access if the user is not an admin
};