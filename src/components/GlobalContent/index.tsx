import ImageCard from "@/blocks/ImageCard";
import { StatCard } from "@/components/StatCard";
import AccordionSection from "../commonComponent/AccordionGroup";
import ButtonGroup from "../commonComponent/ButtonGroup";
import ComparisonCard from "../commonComponent/ComparisonCard";
import RichText from "../RichText";
import { Testimonial } from "../Testimonial";

const GlobalContent = ({ blocks }) => {
  if (!Array.isArray(blocks?.Block)) {
    return <div>No blocks available</div>;
  }

  return (
    <>
      {blocks.Block.map((block, blockIndex) => (
        <div key={blockIndex} className={block.blockType}>
          {blockRenderers[block.blockType](block)}
        </div>
      ))}
    </>
  );
};

const blockRenderers = {
  stats: (block) => <StatCard stats={block.statistics} {...block} />,
  richText: (block) => <RichText content={block.richText} />,
  testimonial: (block) => <Testimonial testimonialData={block} />,
  accordion: (block) => <AccordionSection data={block} />,
  comparison: (block) => <ComparisonCard data={block} />,
  ButtonGroup: (block) => <ButtonGroup data={block} />,
  imageCard: (block) => <ImageCard imageCardData={block} />,
};

export default GlobalContent;
