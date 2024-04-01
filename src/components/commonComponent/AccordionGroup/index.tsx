import { Accordion } from "./Accordion";
import Image from "next/image";

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
				  appearance?: 'default' | 'primary' | 'secondary';
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
	console.log(data,'data**')
	return (
					<div className="accordion-group">
						{data.accordions.map((val, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<Accordion key={index} title={val.title} richText={val.richText}/>
							
							
						))}
					</div>
				
	);
}
