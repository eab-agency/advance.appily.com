import ImageCard from '@/blocks/ImageCard';
import { Media } from '@/components/Media'
import { StatCard } from '@/components/StatCard';
import React, { Fragment } from 'react'
import RichText from '../RichText';
import { Testimonial } from '../Testimonial';
import AccordionSection from '../commonComponent/AccordionGroup';
import ButtonGroup from '../commonComponent/ButtonGroup';
import ComparisonCard from '../commonComponent/ComparisonCard';

const RenderColumnContent = ({ columns, layoutType }) => {
  return (
    <div className="group group__columns">
      {columns?.map((col, index) => {
        const { blocks, size, halignment, valignment, extendToBorders } = col;
        const hasPercentage = /%/.test(size);

        const stringWithoutPercentage = hasPercentage ? size.replace(/%$/, "") : size;

        const columnClass = `column column__horAligned-${halignment} column__verAligned-${valignment} ${extendToBorders ? 'column__extend-to-borders' : ''}`;

        return (
          <div className={columnClass} style={{ '--column-width': `${stringWithoutPercentage}%` } as any} key={index}>
            {blocks?.map((block, blockIndex) => {
              return (
                <div key={blockIndex} className='block__wrap'>
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
  stats: (block) => <StatCard stats={block.statistics}{...block} />,
  richText: (block) => <RichText content={block.richText} />,
  mediaBlock: (block) => {
    const { media, cornerStyle, enableHighlight } = block;
    return (
      <Media
        resource={media}
        cornerStyle={cornerStyle}
        enableHighlight={enableHighlight}
        priority
      />
    )
  },
  testimonial: (block) => <Testimonial testimonialData={block} />,
  accordion: (block) => <AccordionSection data={block} />,
  comparison: (block) => <ComparisonCard data={block} />,
  ButtonGroup: (block) => <ButtonGroup data={block} />,
  imageCard: (block) => <ImageCard imageCardData={block} />,
};
export default RenderColumnContent;
