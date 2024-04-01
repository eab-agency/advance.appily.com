import React, { Fragment } from 'react'

import { Page } from '../../../payload-types.js'
// import { CallToActionBlock } from '../../blocks/CallToAction'
import { ContentBlock } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/MediaBlock'

import { BackgroundColor } from '../BackgroundColor'
import { VerticalPadding, VerticalPaddingOptions } from '../VerticalPadding'


const blockComponents = {
  content: ContentBlock,
  mediaBlock: MediaBlock
}

export const Blocks: React.FC<{
  blocks: (Page['layout'][0])[]
  disableTopPadding?: boolean
}> = props => {
  const { disableTopPadding, blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            // the cta block is containerized, so we don't consider it to be inverted at the block-level
            const blockIsInverted =
              'invertBackground' in block && blockType !== 'cta' ? block.invertBackground : false
            const prevBlock = blocks[index - 1]

            const prevBlockInverted =
              prevBlock && 'invertBackground' in prevBlock && prevBlock?.invertBackground

            const isPrevSame = Boolean(blockIsInverted) === Boolean(prevBlockInverted)

            let paddingTop: VerticalPaddingOptions = 'large'
            let paddingBottom: VerticalPaddingOptions = 'large'

            if (prevBlock && isPrevSame) {
              paddingTop = 'none'
            }

            if (index === blocks.length - 1) {
              paddingBottom = 'large'
            }

            if (disableTopPadding && index === 0) {
              paddingTop = 'none'
            }
            if (Block) {
              return (
                <BackgroundColor key={index} >
                  <VerticalPadding top={paddingTop} bottom={paddingBottom}>
                    <Block {...block} />
                  </VerticalPadding>
                </BackgroundColor>
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