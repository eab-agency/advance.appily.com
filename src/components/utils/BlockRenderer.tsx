import ImageCard from '@/blocks/ImageCard';
import { Media } from '@/components/Media';
import { StatCard } from '@/components/StatCard';
// import RichText from '../RichText';
import { Testimonial } from '../Testimonial';
import AccordionSection from '../commonComponent/AccordionGroup';
import ButtonGroup from '../commonComponent/ButtonGroup';
import ComparisonCard from '../commonComponent/ComparisonCard';

const BLOCK_COMPONENTS = {
  stats: StatCard,
  // richText: RichText,
  mediaBlock: (props) => <Media priority {...props} />,
  testimonial: Testimonial,
  accordion: AccordionSection,
  comparison: ComparisonCard,
  ButtonGroup: ButtonGroup,
  imageCard: ImageCard,
};

const BlockRenderer = ({ block }) => {
  const { blockType, ...blockProps } = block.fields || {};
  const BlockComponent = BLOCK_COMPONENTS[blockType];

  if (!BlockComponent) {
    console.warn(`No renderer defined for block type: ${blockType}`);
    return null;
  }

  return <BlockComponent {...blockProps} />;
};

export default BlockRenderer;
