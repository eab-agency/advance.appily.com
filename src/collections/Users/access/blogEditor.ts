import type { AccessArgs } from 'payload'

import type { User } from '../../../payload-types'
import { checkRole } from '../checkRole'

type isEditor = (args: AccessArgs<User>) => boolean

export const isBlogEditor: isEditor = ({ req: { user } }) => {
  return checkRole(['blogEditor'], user)
}
