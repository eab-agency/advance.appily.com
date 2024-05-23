import { Button } from "@/components/Button";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import "@/styles/blocks/ComparisonCard.scss";
// import Image from "next/image";
import React from "react";
import ButtonGroup from "../ButtonGroup";
import { Icon } from "./Icon";

interface ComparisonCardProps {
  data: {
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
    darkicon: {
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
  console.log('Comparison Card data:', data)
  return (
    <article className="comparison-card">
      <div className="group column center-aligned center-justified">
        <div className="icon-card__wrapper">
          <div className="roi-card icon-card">
            <header className="icon-card-head">
              <Icon icon={data?.icon} darkicon={data?.darkicon} />
              <h3 className="icon-card-title">{data?.title} </h3>
            </header>
            <RichText content={data?.richText} />
            {data?.comparisonLinks?.length > 0 &&
              (data?.comparisonLinks || []).map(({ link }, index) => {
                return (

                  <CMSLink key={index} {...link} className="button btn-primary btn-click-quiz" />

                )
              })
            }
          </div>
        </div>
      </div>
    </article>
  );
};



// comparisonBlock //

