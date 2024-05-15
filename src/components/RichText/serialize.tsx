// import React, { Fragment } from 'react'
// import escapeHTML from 'escape-html'
// import { Text } from 'slate'

// import { Label } from '../Label'
// import { LargeBody } from '../LargeBody'

// // eslint-disable-next-line no-use-before-define
// type Children = Leaf[]

// type Leaf = {
//   type: string
//   value?: {
//     url: string
//     alt: string
//   }
//   children?: Children
//   url?: string
//   [key: string]: unknown
// }

// const serialize = (children?: Children): React.ReactNode[] =>
//   children?.map((node, i) => {
//     if (Text.isText(node)) {
//       let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />

//       if (node.bold) {
//         text = <strong key={i}>{text}</strong>
//       }

//       if (node.code) {
//         text = <code key={i}>{text}</code>
//       }

//       if (node.italic) {
//         text = <em key={i}>{text}</em>
//       }

//       if (node.underline) {
//         text = (
//           <span style={{ textDecoration: 'underline' }} key={i}>
//             {text}
//           </span>
//         )
//       }

//       if (node.strikethrough) {
//         text = (
//           <span style={{ textDecoration: 'line-through' }} key={i}>
//             {text}
//           </span>
//         )
//       }

//       return <Fragment key={i}>{text}</Fragment>
//     }

//     if (!node) {
//       return null
//     }

//     switch (node.type) {
//       case 'h1':
//         return <h1 key={i}>{serialize(node?.children)}</h1>
//       case 'h2':
//         return <h2 key={i}>{serialize(node?.children)}</h2>
//       case 'h3':
//         return <h3 key={i}>{serialize(node?.children)}</h3>
//       case 'h4':
//         return <h4 key={i}>{serialize(node?.children)}</h4>
//       case 'h5':
//         return <h5 key={i}>{serialize(node?.children)}</h5>
//       case 'h6':
//         return <h6 key={i}>{serialize(node?.children)}</h6>
//       case 'quote':
//         return <blockquote key={i}>{serialize(node?.children)}</blockquote>
//       case 'ul':
//         return <ul key={i}>{serialize(node?.children)}</ul>
//       case 'ol':
//         return <ol key={i}>{serialize(node.children)}</ol>
//       case 'li':
//         return <li key={i}>{serialize(node.children)}</li>
//       case 'link':
//         return (
//           <a
//             key={i}
//             type={node.linkType === 'internal' ? 'reference' : 'custom'}
//             href={node.url}
//             // reference={node.doc as any}
//             // newTab={Boolean(node?.newTab)}
//           >
//             {serialize(node?.children)}
//           </a>
//         )

//       case 'label':
//         return <Label key={i}>{serialize(node?.children)}</Label>

//       case 'large-body': {
//         return <LargeBody key={i}>{serialize(node?.children)}</LargeBody>
//       }

//       default:
//         return <p key={i}>{serialize(node?.children)}</p>
//     }
//   }) || []

// export default serialize

import escapeHTML from "escape-html";
import React, { Fragment } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;
export const IS_CODE = 1 << 4;
export const IS_SUBSCRIPT = 1 << 5;
export const IS_SUPERSCRIPT = 1 << 6;
export const IS_HIGHLIGHT = 1 << 7;

function generateTextAlign(node) {
  if (node.format === "right") return "text-right";
  if (node.format === "center") return "text-center";
  else return "";
}

export default function serializeLexicalRichText({
  children,
  customClassNames,

  parentNode = {},
}) {
  return children
    ?.map((node, i) => {
      const classNames = {
        h1: "mt-6 text-5xl font-bold",
        h2: "mt-5 text-4xl font-bold",
        h3: "mt-4 text-3xl font-bold",
        h4: "mt-3 text-2xl font-bold",
        h5: "mt-2 text-xl font-bold",
        h6: "mt-1 text-lg font-bold",
        p: "text-base",
        ul: "list-disc",
        ol: "list-decimal",
        li: "list-item",
        blockquote: "font-bold text-lg text-gray-600",
        a: "text-blue-500 underline",
      };

      if (node.type === "text") {
        let text = node.text ? (
          <span className="">{node.text}</span>
        ) : (
          <span className="opacity-0">&nbsp;</span>
        );

        if (node.format & IS_BOLD) {
          text = <strong key={i}>{text}</strong>;
        }

        if (node.format & IS_CODE) {
          text = <code key={i}>{text}</code>;
        }

        if (node.format & IS_ITALIC) {
          text = <em key={i}>{text}</em>;
        }

        if (node.format & IS_UNDERLINE) {
          text = (
            <span className="underline" key={i}>
              {text}
            </span>
          );
        }

        if (node.format & IS_STRIKETHROUGH) {
          text = (
            <span className="line-through" key={i}>
              {text}
            </span>
          );
        }

        return <Fragment key={i}>{text}</Fragment>;
      }

      if (!node) {
        return null;
      }

      if (node.type === "heading") {
        return (
          <node.tag
            className={`${classNames[node.tag]} ${generateTextAlign(node)}`}
            key={i}
          >
            {serializeLexicalRichText({ children: node.children })}
          </node.tag>
        );
      }

      if (node.type === "list") {
        if (node.listType === "bullet") {
          return (
            <ul className={`${classNames.ul}`} key={i}>
              {serializeLexicalRichText({
                children: node.children,
                parentNode: node,
              })}
            </ul>
          );
        } else if (node.listType === "check") {
          return (
            <ul className={`${classNames.ul} list-none`} key={i}>
              {serializeLexicalRichText({
                children: node.children,
                parentNode: node,
              })}
            </ul>
          );
        } else if (node.listType === "number") {
          return (
            <ol className={`${classNames.ol}`} key={i}>
              {serializeLexicalRichText({
                children: node.children,
                parentNode: node,
              })}
            </ol>
          );
        }
      }

      if (node.type === "listitem" && node.checked) {
        return (
          <li className={`${classNames.li} flex gap-1`} key={i}>
            <div>
              <MdCheckBox className="w-4 h-4 text-green-500" />
            </div>
            <div className="line-through">
              {serializeLexicalRichText({ children: node.children })}
            </div>
          </li>
        );
      } else if (node.type === "listitem" && parentNode?.listType === "check") {
        return (
          <li className={`${classNames.li} flex gap-1`} key={i}>
            <div>
              <MdCheckBoxOutlineBlank className="w-4 h-4 text-green-500" />
            </div>
            <div className="">
              {serializeLexicalRichText({ children: node.children })}
            </div>
          </li>
        );
      } else if (node.type === "listitem") {
        return (
          <li className={`${classNames.li}`} key={i}>
            {serializeLexicalRichText({ children: node.children })}
          </li>
        );
      }

      switch (node.type) {
        case "quote":
          return (
            <blockquote className={`${classNames.blockquote}`} key={i}>
              {serializeLexicalRichText({ children: node.children })}
            </blockquote>
          );

        case "link":
          return (
            <a
              className={`${classNames.a}`}
              href={escapeHTML(
                node.fields?.linkType === "custom" ? node?.fields?.url : ""
              )}
              target={node.fields?.newTab ? "_blank" : "_self"}
              key={i}
            >
              {serializeLexicalRichText({ children: node.children })}
            </a>
          );

        default:
          return (
            <p className={`${classNames.p} ${generateTextAlign(node)}`} key={i}>
              {serializeLexicalRichText({ children: node.children })}
            </p>
          );
      }
    })
    .filter((node) => node !== null);
}
