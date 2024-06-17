/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@/components";
import { CMSLink } from "@/components/Link";
import { Media as Image } from "@/components/Media";
import RichText from "@/components/RichText";
import "@/styles/layouts/HighlightedSection.scss";
import { sectionClassNames } from "@/utilities/sectionClassNames";
import Link from "next/link";
import React from "react";
import { Media } from "../../../payload-types";

interface highlightedCtaSectionData {
  richText?: {
    [k: string]: unknown;
  }[];
  image: Media | string;
  imageAlignment: "left" | "right";
  highlightCtaBackgroundColor: string;
  highlightedSectionCTALinks?: {
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
  image,
  imageAlignment,
  richText,
  highlightedSectionCTALinks,
  highlightCtaBackgroundColor: backgroundColor,
}: highlightedCtaSectionData) {

  const renderImage = () => {
    return (
      <div className={"column"}>
        <Image resource={image} width={480} height={480} className={`position-${imageAlignment}`} />
      </div>
    );
  }

  return (
    <section className={`${sectionClassNames({ backgroundColor })}  highlightedCtasSection`}>
      <div className="group row">
        {imageAlignment === "left" && renderImage()}
        <div className="content column">
          <RichText content={richText} />
          {highlightedSectionCTALinks &&
            highlightedSectionCTALinks.length > 0 &&
            (highlightedSectionCTALinks || []).map(({ link }, index) => {
              return (
                <CMSLink key={index} {...link} />
              );
            })}
        </div>
        {imageAlignment === "right" && renderImage()}
      </div>
    </section>
  );
}
