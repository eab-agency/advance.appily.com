import { Media } from '@/components/Media'
import React, { Fragment } from 'react'
import RichText from '../RichText';
import { Stats } from '../Stats';
import { Testimonial } from '../Testimonial';
import AccordionSection from '../commonComponent/AccordionGroup';
import ButtonGroup from '../commonComponent/ButtonGroup';
import ComparisonCard from '../commonComponent/ComparisonCard';

const RenderColumnContent = ({ columns, layoutType }) => {
  return (
    <div className="group group__columns">
      {columns?.map((col, index) => {
        const { blocks, size, alignment, extendToBorders } = col;
        const hasPercentage = /%/.test(size);

        const stringWithoutPercentage = hasPercentage ? size.replace(/%$/, "") : size;

        const columnClass = `column column__contentAligned-${alignment} ${extendToBorders ? 'column__extend-to-borders' : ''}`;

        const rowClass = `row row__contentAligned-${alignment} ${extendToBorders ? 'row__extend-to-borders' : ''}`

        const className = layoutType === 'rows' ? rowClass : columnClass;

        console.log("the layout type:", layoutType);

        return (
          <div className={className} style={{ '--column-width': `${stringWithoutPercentage}%` } as any} key={index}>
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
  stats: (block) => <Stats stats={block.statistics}{...block} />,
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
  ButtonGroup: (block) => <ButtonGroup data={block} />
};
export default RenderColumnContent;
