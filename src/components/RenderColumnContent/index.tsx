import RichText from '../RichText';
import { Stats } from '../Stats';
import classes from './index.module.scss';
import { Cell, Grid } from '@faceless-ui/css-grid'
import { Media } from '@/components/Media'
import React, {Fragment} from 'react'
import { Testimonial } from '../Testimonial';
import  AccordionSection  from '../commonComponent/AccordionGroup';
import ComparisonCard  from '../commonComponent/ComparisonCard';
import ButtonGroup from '../commonComponent/ButtonGroup';

const RenderColumnContent = ({ columns }) => {
  return (
    <div className='group center-aligned'>
      {columns &&
        columns.map((col, index) => {
          const { blocks, size } = col;
          const hasPercentage = /%/.test(size);

          const stringWithoutPercentage = hasPercentage ? size.replace(/%$/, ""): size;
          return (
            <div className={`column ${classes.columnWidth}`}  style={{ '--box-width' : `${stringWithoutPercentage}%` } as any} key={index}>
              {blocks &&
                blocks.map((block, blockIndex) => {
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
testimonial: (block) => <Testimonial testimonialData={block}/>,
accordion: (block) => <AccordionSection data={block} />,
comparison: (block) => <ComparisonCard data={block} />,
ButtonGroup:(block) => <ButtonGroup data={block} />
};
export default RenderColumnContent;