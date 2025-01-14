import type { Metadata } from 'next'

import type { Page, Post } from '../../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { mergeTwitter } from './mergeTwitter'

export const generateMeta = async (args: { doc: Page | Post}): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    `${doc.meta.image.url}`
  console.log(doc?.meta?.title,'doc?.meta?.title**')
  return {
    title: doc?.meta?.title || '',
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || '',
      description: doc?.meta?.description || '',
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
    twitter: mergeTwitter({
      title: doc?.meta?.title || '',
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
