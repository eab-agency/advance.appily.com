import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import Image from "next/image";
import React from "react";
import ButtonGroup from "../ButtonGroup";
import { CMSLink } from "@/components/Link";
import { Button } from "@/components/Button";

interface ComparisonCardProps {
  data:{
    title: string;
  richText?: {
    [k: string]: unknown;
    }[];
  icon: {
      mimeType: string;
      filename: string,
      width: number;
      height: number;
      alt: string;
  }
  comparisonLinks?: {
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
  };
}
export default function ComparisonCard({
	data
}: ComparisonCardProps) {

  return (
    <section className="comparison">
      <div className="group column center-aligned center-justified">
        <div className="infograph">
          <div className="roi-card icon-card">
            <header className="icon-card-head">
              <Media
                resource={data.icon}
                priority
                width={480}
                height={480}
                alt={data.icon.alt ?? ""}
              />
              <h3 className="icon-card-title">{data?.title} </h3>
            </header>
            <RichText content={data.richText} />
            {data?.comparisonLinks.length> 0 &&
            (data?.comparisonLinks || []).map(({ link }, index)=>{
              return(
                
                <CMSLink key={index} {...link} className="button btn-primary btn-click-quiz" />
              
              )
            })
            }
          </div>
        </div>
      </div>
    </section>
  );
};
