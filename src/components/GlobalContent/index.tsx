import ImageCard from '@/blocks/ImageCard';
import { StatCard } from '@/components/StatCard';
import { Fragment } from 'react';
import RichText from '../RichText';
import { Testimonial } from '../Testimonial';
import AccordionSection from '../commonComponent/AccordionGroup';
import ButtonGroup from '../commonComponent/ButtonGroup';
import ComparisonCard from '../commonComponent/ComparisonCard';

const GlobalContent = ({ blocks }) => {
  return (
    <div >
      {blocks?.map((block, blockIndex) => {
        return (
          <div key={blockIndex}>
            {block.Block?.map((data, index) => {
              console.log(data, 'data**')
              return (
                <Fragment key={index}>
                  {blockRenderers[data.blockType](data)}
                </Fragment>
              )
            })}
          </div>
        )
      })}
    </div>
  );
};

const blockRenderers = {
  stats: (block) => <StatCard stats={block.statistics}{...block} />,
  richText: (block) => <RichText content={block.richText} />,
  testimonial: (block) => <Testimonial testimonialData={block} />,
  accordion: (block) => <AccordionSection data={block} />,
  comparison: (block) => <ComparisonCard data={block} />,
  ButtonGroup: (block) => <ButtonGroup data={block} />,
  imageCard: (block) => <ImageCard imageCardData={block} />,
}

export default GlobalContent;
