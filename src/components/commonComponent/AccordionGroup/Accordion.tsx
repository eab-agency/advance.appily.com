"use client";
import React, { useState } from "react";
import { BiSolidMinusCircle, BiSolidPlusCircle } from "react-icons/bi";

// import styles from "@/styles/components/Accordion.module.scss";
import RichText from "../../RichText";
import ButtonGroup from "../ButtonGroup";

export const Accordion = ({ title, richText, links }) => {
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
        <RichText content={richText} />
      </div>}

      {/* <ButtonGroup data={links} /> */}

    </div>
  );
};
