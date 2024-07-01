import RichText from "@/components/RichText";
import React from "react";
import { Media } from '@/components/Media'

interface ImageCardProps {
  imageCardData: ImageCardData;
}

interface ImageCardData {
  title?: string;
  richText?: {
    [k: string]: unknown;
  }[];
  imageCardBlockBackgroundColor?: string;
  image?: {
    id: string;
    url: string;
    alt: string;
    updatedAt: string;
    createdAt: string;
  };
}

function ImageCard({ imageCardData }: ImageCardProps) {

  const { image, richText, title } = imageCardData;

  return (
    <article className="image-card">
      <div className="group">
        <figure>
          {image !== null && (
            <div className="heroImage">
              {typeof image === 'object' && (

                <Media
                  resource={image}
                  priority
                />

              )}
            </div>
          )}
          <figcaption>
            <h3>{title}</h3>
            <RichText content={richText} />
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

export default ImageCard;
