import type { GlobalConfig } from 'payload';

import { anyone } from '../access/anyone';
import link from '../fields/link';

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    hidden: (args: { user: any }) => {
      const isEditorORAuthor = args.user?.roles[0] === 'blogEditor' || args.user?.roles[0] === 'blogAuthor';
      return isEditorORAuthor;
    },
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
