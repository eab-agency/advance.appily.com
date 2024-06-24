import "@/styles/blocks/Accordion.scss";
import Image from "next/image";
import { Accordion } from "./Accordion";

interface AccordionSectionProps {
  id?: string;
  newTab?: boolean;
  data: {
    title: string;
    description: string;
    numberedItems: boolean;
    accordions: {
      title: string;
      blocks: {
        type: string;
        richText?: string;
        buttonGroup?: {
          buttons: {
            text: string;
            link: string;
            type: string;
          }[];
        }
      }[];
    }[];
  };
}

export default function AccordionSection({
  data,
  id,
  newTab = false,
}: AccordionSectionProps) {
  return (
    <div className={`accordion-group ${data.numberedItems && 'numbered-accordion'}`}>
      {data.accordions.map((val, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Accordion key={index} title={val.title} blocks={val.blocks} />

      ))}
    </div>

  );
}
