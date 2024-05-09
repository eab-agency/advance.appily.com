import { Media } from '@/components/Media'
import React, { Fragment } from 'react'
import RichText from '../RichText';
import { Stats } from '../Stats';
import { Testimonial } from '../Testimonial';
import AccordionSection from '../commonComponent/AccordionGroup';
import ButtonGroup from '../commonComponent/ButtonGroup';
import ComparisonCard from '../commonComponent/ComparisonCard';

const RenderColumnContent = ({ columns }) => {
  return (
    <div className="group">
      {columns?.map((col, index) => {
        const { blocks, size } = col;
        const hasPercentage = /%/.test(size);

        const stringWithoutPercentage = hasPercentage ? size.replace(/%$/, "") : size;
        return (
          <div className="column" style={{ '--column-width': `${stringWithoutPercentage}%` } as any} key={index}>
            {blocks?.map((block, blockIndex) => {
              return (
                <div key={blockIndex}>
                  {blockRenderers[block.blockType](block)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const blockRenderers = {
  stats: (block) => <Stats stats={block.statistics}{...block} />,
  richText: (block) => <RichText content={block.richText} />,
  mediaBlock: (block) => {
    return (
      <Media
        resource={block.media}
        priority
      />
    )
  },
  testimonial: (block) => <Testimonial testimonialData={block} />,
  accordion: (block) => <AccordionSection data={block} />,
  comparison: (block) => <ComparisonCard data={block} />,
  ButtonGroup: (block) => <ButtonGroup data={block} />
};
export default RenderColumnContent;
