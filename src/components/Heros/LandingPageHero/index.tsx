// 'use client'
// import { Button } from "@/components";
import { CMSLink } from "@/components/Link"
import React, { Fragment } from 'react'
import { Page, } from '../../../../payload-types'
import { Media } from '../../Media'
import RichText from '../../RichText'

import "@/styles/components/modules/PageHero.scss"

export const LandingPageHero: React.FC<Page['hero']> = ({ richText, media, links }) => {

  return (
    <section className="pageHero">
      <div className="group">
        <div className="hero-content">
          <RichText content={richText} />
          {(links || []).map(({ link }, i) =>
            <CMSLink
              key={i}
              {...link} />
          )}
        </div>
        {media !== null && (
          <div className="heroImage">
            {typeof media === 'object' && (
              <Fragment>
                <Media
                  resource={media}
                  priority
                />
                {media?.caption && <RichText content={media?.caption} />}
              </Fragment>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
