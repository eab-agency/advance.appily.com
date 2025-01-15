import type { User } from '../../payload-types';

export const checkRole = (allRoles: User['roles'] = [], user?: User | null): boolean => {
  // If no user or roles are provided, return false
  if (!user || !user.roles) {
    return false;
  }

  // Check if any of the user's roles match the allowed roles
  return allRoles?.some(role => user.roles?.includes(role)) || false;
};
