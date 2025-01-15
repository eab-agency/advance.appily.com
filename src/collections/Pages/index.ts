import type { CollectionConfig } from 'payload'
import { admins } from '../../access/admins'
// import { adminsOrPublished } from '../../access/adminsOrPublished'
import { anyone } from '../../access/anyone'
import { Archive } from '../../blocks/Archive'
import { CalloutSection } from '../../blocks/CalloutSection'
import { CallToAction } from '../../blocks/CallToAction'
import { CarouselSection } from '../../blocks/CarouselSection'
import { FormBlock } from '../../blocks/Form'
import { GlobalBlocks } from '../../blocks/GlobalBlocks'
import { HighlightCTA } from '../../blocks/HighlightCTASection'
import { MediaBlock } from '../../blocks/Media'
import { Section } from '../../blocks/Section'
import { Statistics } from '../../blocks/Statistics'
import { StickyCTA } from '../../blocks/StickyCTASection'
import { SubNav } from '../../blocks/SubNavSection'
import { Tabsection } from '../../blocks/TabSection'
import { Testimonial } from '../../blocks/Testimonial'
import { hero } from '../../fields/hero'
import lastModifiedBy from '../../fields/lastModifiedBy'
import { slugField } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { revalidatePage } from '../../hooks/revalidatePage'
import { checkRole } from '../Users/checkRole'


export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'fullPath', 'updatedAt'],
    livePreview: {
      // Define the live preview URL for pages based on their slug
      url: ({ data }) => {
        const baseUrl = process.env.PAYLOAD_PUBLIC_SITE_URL || ''
        let slug = ''
        if (data?.breadcrumbs) {
          const { url: lastCrumbURL = '' } = data?.breadcrumbs?.[data?.breadcrumbs.length - 1] || {} // last crumb
          slug = lastCrumbURL
        } else {
          slug = data?.slug
        }
        return `${baseUrl}${slug}`
      },
    },
    hidden: (args: { user: any }) => {
      const isEditorORAuthor =
        args.user?.roles[0] === 'blogEditor' || args.user?.roles[0] === 'blogAuthor'
      return isEditorORAuthor
    },
    group: 'Collections',
  },
  hooks: {
    beforeChange: [populatePublishedDate],
    // afterRead: [populateArchiveBlock],
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
    update: admins,
    create: admins,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    lastModifiedBy(),
    {
      name: 'fullPath',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Mutate the sibling data to prevent DB storage
            delete siblingData.fullPath
          },
        ],
        afterRead: [
          async ({ data }) => {
            return data?.breadcrumbs.slice(-1)[0]?.url || `/${data?.slug || ''}`
          },
        ],
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                CallToAction,
                Section,
                FormBlock,
                MediaBlock,
                Archive,
                Statistics,
                Testimonial,
                CalloutSection,
                HighlightCTA,
                CarouselSection,
                Tabsection,
                SubNav,
                StickyCTA,
                GlobalBlocks,
              ],
              validate: async (value: unknown) => {
                // Narrow the type of `value` to `{ blockType?: string }[] | undefined`
                if (Array.isArray(value)) {
                  const stickyCtaBlocks = value.filter(
                    (block) => typeof block === 'object' && block?.blockType === 'stickyCTA'
                  );
              
                  if (stickyCtaBlocks.length > 1) {
                    return 'Only one Sticky CTA is allowed';
                  }
                }
              
                return true; // Validation passed
              },
              
            },
          ],
        },
        // {
        //   name: 'meta',
        //   label: 'SEO',
        //   fields: [
        //     MetaTitleField({
        //       hasGenerateFn: true,
        //     })
        //   ]
        // }
      ],
    },
    slugField(),

  ],
}
