/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@/components";
import { CMSLink } from "@/components/Link";
import { Media as Image } from "@/components/Media";
import RichText from "@/components/RichText";
import "@/styles/layouts/HighlightedSection.scss";
import Link from "next/link";
import React from "react";
import { Media } from "../../../payload-types";

interface highlightedCtaSectionData {
  richText?: {
    [k: string]: unknown;
  }[];
  image: Media | string;
  imageAlignment: "left" | "right";
  highlightCTABackgroundColor: string;
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
}: highlightedCtaSectionData) {

  const renderImage = () => {
    return (
      <div className="column">
        <figure>
          <Image resource={image} width={480} height={480} />
        </figure>
      </div>
    );
  }

  return (
    <section className="highlightedCtasSection">
      <div className="group row">
        {imageAlignment === "left" && renderImage()}
        <div className="content column">
          <RichText content={richText} />
          {highlightedSectionCTALinks &&
            highlightedSectionCTALinks.length > 0 &&
            (highlightedSectionCTALinks || []).map(({ link }, index) => {
              return (
                <CMSLink key={index} {...link} className="button btn-primary" />
              );
            })}
        </div>
        {imageAlignment === "right" && renderImage()}
      </div>
    </section>
  );
}
