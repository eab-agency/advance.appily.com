import { CMSLink } from "@/components/Link";
import RichText from "@/components/RichText";
import React from 'react';
import { Media } from "../../../payload-types";
import { sectionClassNames } from "@/utilities/sectionClassNames";
import "@/styles/layouts/CallOutSection.scss";


interface callOutSection {
  title?: string;
  kicker?: string;
  richText?: {
    [k: string]: unknown;
  }[];
  image: Media | string;
  callOutBackgroundColor: string;
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
      appearance?: 'default' | 'primary' | 'secondary' | 'tertiary';
    };
    id?: string;
  }[];

}

export default function CalloutSection({
  title,
  kicker,
  richText,
  calloutLinks,
  callOutBackgroundColor: backgroundColor
}: callOutSection) {
  export default function CalloutSection({
    title,
    kicker,
    richText,
    calloutLinks,
    callOutBackgroundColor: backgroundColor
  }: callOutSection) {
    return (
      <section className={`${sectionClassNames({ backgroundColor })}  callout-section`}>
        <div className="group row">
          <div className="column">
            <h2>
              {kicker && <span className="kicker">{kicker}&nbsp;</span>}
              <span className="title">{title}</span>
            </h2>
            <RichText content={richText} />
          </div>
          {calloutLinks?.length && (
            <div className="column">
              {calloutLinks && calloutLinks?.length > 0 &&
                (calloutLinks || []).map(({ link }, index) => {
                  return (
                    <CMSLink key={index} {...link} />
                  )
                })
              }
            </div>
          )}
        </div>
      </section>
    )
  }
