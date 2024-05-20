"use client";

import serializeLexicalRichText from "./serialize";
import classes from "./index.module.scss";
import React from "react";

interface RichTextProps {
  className?: string;
  content: any;
  customClassNames?: string;
}
export default function ({ className, content,customClassNames }: RichTextProps) {
  if (!content?.root?.children) return "";

  return (
    <div
      className={`${[classes.richText, className].filter(Boolean).join(" ")} `}
    >
      {serializeLexicalRichText({
        children: content.root.children,
        customClassNames,  
      })}
    </div>
  );
}
