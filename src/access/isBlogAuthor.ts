import type { AccessArgs } from 'payload'

import { checkRole } from '../collections/Users/checkRole'
import type { User } from '../payload-types'

type isBlogAuthor = (args: AccessArgs<User>) => boolean

export const isBlogAuthor: isBlogAuthor = ({ req: { user } }) => {
  return user ? checkRole(['blogAuthor'], user) : false;
}
