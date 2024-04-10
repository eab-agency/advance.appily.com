import { Button } from "@/components";
import RichText from "@/components/RichText";
import Link from "next/link";
import React from 'react';
import { Media as Image } from "@/components/Media";
import { CMSLink } from "@/components/Link";
import { Media } from "../../../payload-types";


interface highlightedCtaSectionData {
  title?: string;
  richText?: {
    [k: string]: unknown;
  }[];
  image: Media | string;
  highlightCTABackgroundColor: string;
    highlightedctaLinks?: {
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

}

export default function HighlightedCtaSection({ title, image, richText, highlightedctaLinks }: highlightedCtaSectionData) {

  
  return (
    <section className="keepExploring">
      <div className="group column">
        <figure className="backgroundImage">
        <Image
                resource={image}
                priority
                width={480}
                height={480}
              />
        </figure>
        <div className="contentWrapper">
            <h2>{title}</h2>
          <RichText content={richText} />
          {highlightedctaLinks && highlightedctaLinks.length> 0 &&
            (highlightedctaLinks || []).map(({ link }, index)=>{
              return(
                <CMSLink key={index} {...link} className="button btn-primary"/>   
              )
            })
            }
          
        </div>
      </div>
    </section>
  )
}
