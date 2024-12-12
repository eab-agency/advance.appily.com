import escapeHTML from "escape-html";
import { Fragment } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

import ImageCard from '@/blocks/ImageCard';
import { Media } from '@/components/Media';
import { StatCard } from '@/components/StatCard';
import RichText from '../RichText';
import { Testimonial } from '../Testimonial';
import AccordionSection from '../commonComponent/AccordionGroup';
import ButtonGroup from '../commonComponent/ButtonGroup';
import ComparisonCard from '../commonComponent/ComparisonCard';


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

function stripAnchorTags(node) {
  if (node.type === "link") {
    return node.children.map(stripAnchorTags).join(""); // Remove the link tag but keep its text content
  }
  if (node.type === "text") {
    return node.text || "";
  }

  if (node.children && node.children.length > 0) {
    return node.children.map(stripAnchorTags).join("");
  }

  return "";
}

// ======================================
// Block rendering
const blockRenderers = {
  stats: (block) => <StatCard stats={block.statistics}{...block} />,
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
  testimonial: (block) => <Testimonial testimonialData={block} />,
  accordion: (block) => <AccordionSection data={block} />,
  comparison: (block) => <ComparisonCard data={block} />,
  ButtonGroup: (block) => <ButtonGroup data={block} />,
  imageCard: (block) => <ImageCard imageCardData={block} />,
};
// ======================================

interface ParentNode {
  listType?: string; // Optional because not all nodes may have this property
}

export default function serializeLexicalRichText({
  children,
  customClassNames = {},
  extractFirstParagraph = false,
  parentNode = {},
}: {
  children: any;
  customClassNames?: any;
  extractFirstParagraph?: boolean;
  parentNode?: ParentNode; // Use the interface for typing
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
      console.log("node:",node);
      return (
        <p className={`${classNames.p} ${generateTextAlign(node)}`} key={i}>
          {serializeLexicalRichText({ children: node.children })}
        </p>
      );
    }

    if (node.type === "linebreak") {
      return <br key={i} />;
    }

    // handling uploaded images
    if (node.type === "upload") {
      return (
        <img
          className="w-full"
          src={node.value?.url}
          alt={node.value?.alt}
          key={i}
        />
      );
    }

    // handling inline blocks
    if (node.type === "block") {
      const blocks = node.fields;

      return (
        <Fragment key={i}>
          {blockRenderers[blocks.blockType](blocks)}
        </Fragment>
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
              node.fields?.linkType === "custom"
                ? node?.fields?.url
                : node.fields?.linkType === "internal" && node?.fields?.doc?.value?.fullPath
                  ? node?.fields?.doc?.value?.fullPath
                  : "#"  // Fallback to a default if fullPath is not available
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

        const strippedParagraph = stripAnchorTags(node);
        return <p className="text-base">{strippedParagraph}</p>;
      }
    }
  }

  return children?.map((node, i) => processNode(node, i)).filter(node => node !== null);
}
