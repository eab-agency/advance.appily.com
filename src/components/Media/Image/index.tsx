"use client";

import NextImage, { StaticImageData } from "next/image";
import React from "react";

import cssVariables from "../../../../cssVariables";
import { Props as MediaProps } from "../types";

import classes from "./index.module.scss";

const { breakpoints } = cssVariables;

export const Image: React.FC<MediaProps> = (props) => {
  const {
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    resource,
    priority,
    fill,
    src: srcFromProps,
    alt: altFromProps,
  } = props;

  // console.log("mediapropds:", cornerStyle);

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined | null;
  let height: number | undefined | null;
  let alt = altFromProps || "";
  let src: StaticImageData | string = srcFromProps || "";

  if (!src && resource && typeof resource !== "string") {
    const {
      width: fullWidth,
      height: fullHeight,
      filename: fullFilename,
      alt: altFromResource,
    } = resource;

    width = fullWidth;
    height = fullHeight;
    alt = altFromResource;
    const filename = fullFilename;

    src = `${process.env.NEXT_PUBLIC_CMS_URL}/media/${filename}`;
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = Object.entries(breakpoints)
    .map(([, value]) => `(max-width: ${value}px) ${value}px`)
    .join(', ')

  return (
    <>
      <NextImage
        className={[isLoading && classes.placeholder, classes.image, imgClassName]
          .filter(Boolean)
          .join(' ')}
        src={src}
        alt={alt || ''}
        onClick={onClick}
        onLoad={() => {
          setIsLoading(false)
          if (typeof onLoadFromProps === 'function') {
            onLoadFromProps()
          }
        }}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
      />
    </>
  )
}
