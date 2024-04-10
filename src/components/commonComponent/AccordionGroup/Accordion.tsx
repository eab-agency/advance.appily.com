"use client";
import React, { useState } from "react";
import { BiSolidMinusCircle, BiSolidPlusCircle } from "react-icons/bi";

import styles from "@/styles/components/Accordion.module.scss";
import RichText from "../../RichText";
import ButtonGroup from "../ButtonGroup";

export const Accordion = ({ title, richText, links }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.accordion}>
      <div
        className={styles["accordion-header"]}
        onClick={togglePanel}
        onKeyDown={togglePanel}
        role="button"
        tabIndex={0}
      >
        <h3 className={isExpanded ? styles.expanded : undefined}>
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

      {isExpanded && <div className={styles["accordion-body"]}>
        <RichText content={richText} />
      </div>}

      {/* <ButtonGroup data={links} /> */}

    </div>
  );
};
