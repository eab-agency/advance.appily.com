import React from "react";

import CalloutSection from '@/blocks/CalloutSection';
import HighlightedCtaSection from '@/blocks/HighlightCTASection';
import StatisticsSection from '@/blocks/StatisticsSection/';
import SubNavigation from "@/blocks/SubNavigation";
import TabSection from '@/blocks/TabSection';
import Testimonial from '@/blocks/TestimonialBlock';
import { Page } from "../../../payload-types.js";
// import { CallToActionBlock } from '../../blocks/CallToAction'
import { GlobalBlock } from "@/blocks/GlobalBlock";
import StickyCta from "@/blocks/StickyCTASection";
import { ContentBlock } from "../../blocks/Content";
import { MediaBlock } from "../../blocks/MediaBlock";
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
