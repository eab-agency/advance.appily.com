"use client";

import Link from "next/link";
import React from "react";

import { Page } from "../../../payload-types";
import { Button } from "../Button";

import { useUtmHref } from "@/hooks/useUtmHref";

type CMSLinkType = {
  type?: "custom" | "reference";
  url?: string;
  newTab?: boolean;
  reference?: {
    value: string | Page;
    relationTo: "pages";
  };
  label?: string;
  appearance?: "default" | "primary" | "secondary" | "tertiary";
  children?: React.ReactNode;
  className?: string;
};

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  url,
  newTab,
  reference,
  label,
  appearance,
  children,
  className,
}) => {
  const href =
    type === "reference" && reference && typeof reference.value === "object"
      ? `/${reference.value.breadcrumbs?.[
          reference.value.breadcrumbs.length - 1
        ]?.url?.replace(/^\/|\/$/g, "")}`
      : type === "custom" && url
        ? url.startsWith("http://") ||
          url.startsWith("https://") ||
          url.startsWith("#")
          ? url
          : `/${url.replace(/^\/|\/$/g, "")}`
        : null;

  const isCustomType = type === "custom";
  const linkProps = {
    ...(newTab && { target: "_blank", rel: "noopener noreferrer" }),
    className: `${
      appearance === "default"
        ? `btn-${appearance}`
        : `button btn-${appearance || "default"}`
    } ${className || ""}`,
  };

  const finalHref = useUtmHref(href);

  if (isCustomType && finalHref) {
    return (
      <a href={finalHref} {...linkProps}>
        <div className="btn-content">
          <span className="btn-label">
            {label}
            {children}
          </span>
        </div>
      </a>
    );
  }

  if (finalHref) {
    return (
      <Link href={finalHref} {...linkProps}>
        <div className="btn-content">
          <span className="btn-label">
            {label}
            {children}
          </span>
        </div>
      </Link>
    );
  }

  const buttonProps = {
    newTab,
    href: finalHref,
    appearance,
    label,
  };

  return (
    <Button
      {...buttonProps}
      href={finalHref || undefined}
      label={buttonProps.label ?? ""}
    />
  );
};
