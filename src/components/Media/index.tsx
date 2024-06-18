import React, { ElementType, Fragment } from "react";

import { Image } from "./Image";
import { Video } from "./Video";
import { Props } from "./types";

import "@/styles/blocks/MediaBlock.scss";

export const Media: React.FC<Props> = (props) => {
  const {
    className,
    resource,
    htmlElement = "figure",
    cornerStyle,
    enableHighlight,
  } = props;

  const isVideo =
    typeof resource !== "string" && resource?.mimeType?.includes("video");
  const Tag = (htmlElement as ElementType) || Fragment;

  const mediaClasses = {
    className: `mediaElement ${className} ${enableHighlight ? "mediaElement__highlight" : ""
      } ${cornerStyle ? `mediaElement__${cornerStyle}` : ""}`,
  };

  return (
    <Tag
      {...(htmlElement !== null
        ? {
          ...mediaClasses,
        }
        : {})}
    >
      {isVideo ? (
        <Video {...props} />
      ) : (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image {...props} />
      )}
    </Tag>
  );
};
