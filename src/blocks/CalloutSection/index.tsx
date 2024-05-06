import { Button } from "@/components";
import RichText from "@/components/RichText";
import Link from "next/link";
import React from 'react';
import { Media as Image } from "@/components/Media";
import { CMSLink } from "@/components/Link";
import { Media } from "../../../payload-types";


interface callOutSection {
    calloutTitle?: {
        [k: string]: unknown;
      }[];
  richText?: {
    [k: string]: unknown;
  }[];
  image: Media | string;
  highlightCTABackgroundColor: string;
  calloutLinks?: {
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

export default function CalloutSection({ calloutTitle, richText, calloutLinks }: callOutSection) {

  
  return (
    <section className="takeQuiz full-content">
    <div className="group row">
      <div className="content column">
      <RichText content={calloutTitle} />
             <RichText content={richText} />
       {calloutLinks && calloutLinks.length> 0 &&
            (calloutLinks || []).map(({ link }, index)=>{
              return(
                <CMSLink key={index} {...link} className="button btn-primary btn-click-quiz"/>   
              )
            })
            }
       
      </div>
    </div>
  </section>
  )
}
