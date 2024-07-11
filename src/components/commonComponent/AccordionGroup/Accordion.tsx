"use client";
import React, { Fragment, useState } from "react";
import { BiSolidMinusCircle, BiSolidPlusCircle } from "react-icons/bi";

// import styles from "@/styles/components/Accordion.module.scss";
import RichText from "../../RichText";
import ButtonGroup from "../ButtonGroup";
import { Media } from '@/components/Media'

const blockRenderers = {
  richText: (block) => <RichText content={block.richText} />,
  mediaBlock: (block) => {
    const { media, cornerStyle, enableHighlight } = block;
    return (
      <Media
        resource={media}
        cornerStyle={cornerStyle}
        enableHighlight={enableHighlight}
        priority
      />
    )
  },
  ButtonGroup: (block) => <ButtonGroup data={block} />,
};

export const Accordion = ({
  title,
  blocks
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion">
      <div
        className="accordion-header"
        onClick={togglePanel}
        onKeyDown={togglePanel}
        role="button"
        tabIndex={0}
      >
        <h3 className={isExpanded ? "expanded" : ""}>
          <span>{title}</span>{" "}
          {isExpanded ? (
            <i>
              <BiSolidMinusCircle />
            </i>
          ) : (
            <i>
              <BiSolidPlusCircle />
            </i>
          )}
        </h3>
      </div>

      {isExpanded && <div className="accordion-body">
        {/* <RichText content={richText} /> */}
        <div className="column">
          {blocks?.map((block, blockIndex) => {
            return (
              <Fragment key={blockIndex}>
                {blockRenderers[block.blockType](block)}
              </Fragment>
            );
          })}

        </div>
      </div>}

      {/* <ButtonGroup data={links} /> */}

    </div>
  );
};
