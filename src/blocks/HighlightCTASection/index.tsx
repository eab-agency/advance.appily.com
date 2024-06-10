/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@/components";
import { CMSLink } from "@/components/Link";
import { Media as Image } from "@/components/Media";
import RichText from "@/components/RichText";
import Link from "next/link";
import React from "react";
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
      type?: "reference" | "custom";
      newTab?: boolean;
      reference: {
        value: string;
        relationTo: "pages";
      };
      url: string;
      label: string;
      appearance?: "default" | "primary" | "secondary";
    };
    id?: string;
  }[];
}

export default function HighlightedCtaSection({
  title,
  image,
  richText,
  highlightedctaLinks,
}: highlightedCtaSectionData) {
  return (
    <section className="takeQuiz full-content">
      <div className="group row">
        <div className="column">
          <figure>
            <Image resource={image} priority width={480} height={480} />
          </figure>
        </div>
        <div className="content column">
          <h2>{title}</h2>
          <RichText content={richText} />
          {highlightedctaLinks &&
            highlightedctaLinks.length > 0 &&
            (highlightedctaLinks || []).map(({ link }, index) => {
              return (
                <CMSLink key={index} {...link} className="button btn-primary" />
              );
            })}
        </div>
      </div>
    </section>
  );
}
