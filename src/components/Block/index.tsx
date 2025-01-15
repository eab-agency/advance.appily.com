import React from "react";

import CalloutSection from '@/commonBlocks/CalloutSection';
import { Page } from "../../../payload-types.js";
import HighlightedCtaSection from '../../commonBlocks/HighlightCTASection';
import StatisticsSection from '../../commonBlocks/StatisticsSection';
import SubNavigation from "../../commonBlocks/SubNavigation";
import TabSection from '../../commonBlocks/TabSection';
import Testimonial from '../../commonBlocks/TestimonialBlock';
// import { CallToActionBlock } from '../../blocks/CallToAction'
import { ContentBlock } from "../../commonBlocks/Content";
import { GlobalBlock } from "../../commonBlocks/GlobalBlock";
import { MediaBlock } from "../../commonBlocks/MediaBlock";
import StickyCta from "../../commonBlocks/StickyCTASection";
import CarouselWithForm from '../CarouselWithForm/CarouselWithForm';


const blockComponents = {
  section: ContentBlock,
  mediaBlock: MediaBlock,
  statistics: StatisticsSection,
  testimonial: Testimonial,
  highlightCTA: HighlightedCtaSection,
  callout: CalloutSection,
  tabsection: TabSection,
  Schoolcarousel: CarouselWithForm,
  subNavigation: SubNavigation,
  stickyCTA: StickyCta,
  globalBlock: GlobalBlock
}

export const Blocks: React.FC<{
  blocks: (Page['layout'][0])[]
  disableTopPadding?: boolean
}> = props => {
  const { disableTopPadding, blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;
  if (hasBlocks) {
    return (
      <div className="layout-blocks">
        {blocks.map((block, index) => {
          const { blockType } = block;
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];
            if (Block) {
              return (
                <Block {...block} key={index} />
              )
            }
          }
          return null;
        })}
      </div>
    )
  }

  return null;
};
