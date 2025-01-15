import type { AccessArgs } from 'payload';
import { checkRole } from '../collections/Users/checkRole';
import type { User } from '../payload-types';

type isAdmin = (args: AccessArgs<User>) => boolean;

export const admins: isAdmin = ({ req: { user } }) => {
  // Ensure the user is not null before passing it to checkRole
  return user ? checkRole(['admin'], user) : false;
};
