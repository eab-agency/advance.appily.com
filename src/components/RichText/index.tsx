"use client";

// import React from 'react'

// import serialize from './serialize'

// const RichText: React.FC<{ className?: string; content: any }> = ({ className, content }) => {
//   if (!content) {
//     return null
//   }

//   return (
//     <div className={[classes.richText, className].filter(Boolean).join(' ')}>
//       {serialize(content)}
//     </div>
//   )
// }

// export default RichText
import serializeLexicalRichText from "./serialize";
import classes from "./index.module.scss";
import React from "react";

export default function RichText({ className, content, customClassNames }) {
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
