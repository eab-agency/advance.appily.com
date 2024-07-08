import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media'
import RichText from "@/components/RichText";
import "@/styles/components/modules/ImageCard.scss";
import React from "react";

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
      appearance?: 'default' | 'primary' | 'secondary' | 'tertiary';
    };
    id?: string;
  }[];
}

function ImageCard({ imageCardData }: ImageCardProps) {

  const { image, richText, title, links } = imageCardData;

  return (
    <article className="image-card">
      {image !== null && (
        <>
          {typeof image === 'object' && (
            <Media
              resource={image}
              className="image-card__image"
            />
          )}
        </>
      )}

      <div className='image-card__content'>
        <h3>{title}</h3>
        <RichText content={richText} />
        {links?.map(({ link }, index) => {
          return (
            <CMSLink key={index}
              {...link}
            />
          )
        })}
      </div>
    </article>
  );
}

export default ImageCard;
