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
    <div className='group'>
      {columns &&
        columns.map((col, index) => {
          const { blocks, size } = col;
          let style;

          // Determine the column width based on the size
          switch (size) {
            case 'oneThird':
              style = classes.oneThird;
              break;
            case 'half':
              style = classes.half;
              break;
            case 'twoThirds':
              style = classes.twoThirds;
              break;
            case 'full':
              style = classes.full;
              break;
            default:
              style = classes.half; // Default to half width
          }

          return (
            <div className={`column ${classes.cell} ${style}`} key={index}>
              {blocks &&
                blocks.map((block, blockIndex) => {
                  console.log(block,'block**')
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
  statistics: (block) => <Stats data={block} />,
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