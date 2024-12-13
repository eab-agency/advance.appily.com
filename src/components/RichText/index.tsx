"use client";

import classes from "./index.module.scss";
import serializeLexicalRichText from "./serialize";

interface RichTextProps {
  className?: string;
  content: any;
  customClassNames?: string;
  extractFirstParagraph?: boolean;
}

const RichText = function ({
  className,
  content,
  customClassNames,
  extractFirstParagraph = false,
}: RichTextProps) {
  if (!content?.root?.children) return "";

  return (
    <div
      className={`${[classes.richText, className].filter(Boolean).join(" ")} `}
    >
      {serializeLexicalRichText({
        children: content.root.children,
        customClassNames,
        extractFirstParagraph,
      })}
    </div>
  );
};

export default RichText;
