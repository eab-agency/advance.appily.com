import escapeHTML from "escape-html";
import { Fragment } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

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
  extractFirstParagraph = false,
  parentNode = {},
}) {

  const processNode = (node, i) => {
    const classNames = {
      h1: "mt-6 text-5xl",
      h2: "mt-5 text-4xl",
      h3: "mt-4 text-3xl",
      h4: "mt-3 text-2xl",
      h5: "mt-2 text-xl",
      h6: "mt-1 text-lg",
      p: "text-base",
      ul: "list-disc",
      ol: "list-decimal",
      li: "list-item",
      blockquote: "text-lg text-gray-600",
      a: "underline",
    };

    if (node.type === "text") {
      let text = node.text ? (
        <Fragment>{node.text}</Fragment>
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
      const ListTag = node.listType === "number" ? "ol" : "ul";
      return (
        <ListTag className={classNames[ListTag === "ol" ? "ol" : "ul"]} key={i}>
          {serializeLexicalRichText({
            children: node.children,
            parentNode: node,
          })}
        </ListTag>
      );
    }

    if (node.type === "listitem") {
      const isCheckList = parentNode?.listType === "check";
      const ListItemContent = (
        <>
          {isCheckList ? (
            <MdCheckBoxOutlineBlank className="w-4 h-4 text-green-500" />
          ) : null}
          <div>
            {serializeLexicalRichText({ children: node.children })}
          </div>
        </>
      );

      return (
        <li className={`${classNames.li} ${isCheckList ? "flex gap-1" : ""}`} key={i}>
          {ListItemContent}
        </li>
      );
    }

    // Handling paragraphs and avoiding <p> nesting
    if (node.type === "paragraph") {
      return (
        <p className={`${classNames.p} ${generateTextAlign(node)}`} key={i}>
          {serializeLexicalRichText({ children: node.children })}
        </p>
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
          <span className={`${classNames.p} ${generateTextAlign(node)}`} key={i}>
            {serializeLexicalRichText({ children: node.children })}
          </span>
        );
    }
  };

  if (extractFirstParagraph) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (node.type === "paragraph" && node.children && node.children.length > 0) {
        return [processNode(node, i)];
      }
    }
  }

  return children?.map((node, i) => processNode(node, i)).filter(node => node !== null);
}
