import RichText from '../RichText';
import { Stats } from '../Stats';
import classes from './index.module.scss';
import { Cell, Grid } from '@faceless-ui/css-grid'
import { Media } from '@/components/Media'
import React, {Fragment} from 'react'
import { Testimonial } from '../Testimonial';
import  AccordionSection  from '../commonComponent/AccordionGroup';
import { ComparisonCard } from '../commonComponent/ComparisonCard';

const RenderColumncontent = ({ columns }) => {


  return (
    <Grid className={classes.grid}>
                   {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
          
            const { blocks, size } = col
         
            let cols

            if (size === 'oneThird') cols = 4
            if (size === 'half') cols = 6
            if (size === 'twoThirds') cols = 8
            if (size === 'full') cols = 12

            return (
              <Cell cols={cols} colsM={4} key={index}>
              
               {blocks &&
                blocks.map((block, blockIndex) => {
                  return (
                    <div key={blockIndex}>
                       {blockRenderers[block.blockType](block)}
                    </div>
                  );
                })}
              </Cell>
              
            )
        })}
</Grid>  );
};

const blockRenderers = {
    stats: (block) => <Stats stats={block} />,
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
  };
export default RenderColumncontent;