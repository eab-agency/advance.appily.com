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
    buttonText?: string;
    buttonLink?: string;
    accordions: {
      title: string;
      richText?: {
        [k: string]: unknown;
      }[];
      links?: {
        link: {
          type?: 'reference' | 'custom';
          newTab?: boolean;
          reference: {
            value: string;
            relationTo: 'pages';
          };
          url: string;
          label: string;
          appearance?: 'default' | 'primary' | 'secondary' | 'tertiary';
        };
        id?: string;
      }[];
    }[];
    image?: {
      path: string;
      altText: string;
    };
  };
}

export default function AccordionSection({
  data,
  id,
  newTab = false,
}: AccordionSectionProps) {
  return (
    <div className="accordion-group">
      {data.accordions.map((val, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Accordion key={index} title={val.title} richText={val.richText} links={val} />

      ))}
    </div>

  );
}
