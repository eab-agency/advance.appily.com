import type { CollectionAfterReadHook } from 'payload';
import type { Page } from '../payload-types';

export const populateArchiveBlock: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  const layoutWithArchive = await Promise.all(
    doc.layout.map(async (block: Page['layout'][0]) => {
      if (block.blockType === 'archive') {
        const archiveBlock = block as Extract<Page['layout'][0], { blockType: 'archive' }> & {
          populatedDocs: Array<{
            relationTo: 'pages';
            value: string;
          }>;
        };

        // if (archiveBlock.populateBy === 'collection') {
        //   const res: { totalDocs: number; docs: Post[] } = await payload.find({
        //     collection: archiveBlock.relationTo,
        //     limit: archiveBlock.limit || 10,
        //     where: {
        //       ...(archiveBlock?.categories?.length > 0
        //         ? {
        //             categories: {
        //               in: archiveBlock.categories
        //                 .map(cat => {
        //                   if (typeof cat === 'string') return cat
        //                   return cat.id
        //                 })
        //                 .join(','),
        //             },
        //           }
        //         : {}),
        //     },
        //     sort: '-publishedDate',
        //   })

        //   return {
        //     ...block,
        //     populatedDocsTotal: res.totalDocs,
        //     populatedDocs: res.docs.map((thisDoc: Post) => ({
        //       relationTo: archiveBlock.relationTo,
        //       value: thisDoc.id,
        //     })),
        //   }
        // }
      }

      return block
    }),
  )

  return {
    ...doc,
    layout: layoutWithArchive,
  }
}