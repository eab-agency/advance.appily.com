import React, { Fragment } from 'react'

import { Page } from '../../../payload-types.js'
// import { CallToActionBlock } from '../../blocks/CallToAction'
import { ContentBlock } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/MediaBlock'

import { BackgroundColor } from '../BackgroundColor'
import { VerticalPadding, VerticalPaddingOptions } from '../VerticalPadding'
import Statistic from '../../blocks/StatisticBlock'
import Testimonial from '@/blocks/TestimonialBlock'
import HighlightedCtaSection from '@/blocks/HighlightCTASection'
import CalloutSection from '@/blocks/CalloutSection'
import TabSection from '@/blocks/TabSection'
import CarouselWithForm from '../CarouselWithForm/CarouselWithForm'


const blockComponents = {
  section: ContentBlock,
  mediaBlock: MediaBlock,
  statistics: Statistic,
  testimonial: Testimonial,
  highlightCTA: HighlightedCtaSection,
  callout: CalloutSection,
  tabsection: TabSection,
  Schoolcarousel: CarouselWithForm
}

export const Blocks: React.FC<{
  blocks: (Page['layout'][0])[]
  disableTopPadding?: boolean
}> = props => {
  const { disableTopPadding, blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;
  
  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            console.log(block,'val**')
            if (Block) {
              return (
                <>
                  <Block {...block} />
                </>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}