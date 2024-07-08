import React from 'react'
import { Page, } from '../../../../payload-types'
import { Media } from '../../Media'
import RichText from '../../RichText'

export const PostHero: React.FC<Page['hero']> = ({ media }) => {

  return (
    <div className="post-hero">
      {media !== null && (
        <div className="heroImage">
          {typeof media === 'object' && (
            <>
              <Media
                resource={media}
                priority
              />
              {media?.caption && <RichText content={media?.caption} />}
            </>
          )}
        </div>
      )}
    </div>
  )
}
