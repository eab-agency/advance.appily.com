"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Page } from "../../../payload-types";
import { Button } from "../Button";

import OnetrustActiveGroups from "@/hooks/useOneturstActiveGroups";
import { UTM_PARAMS } from "@/middleware";
import { useCookies } from "react-cookie";

var trackingCookieCategory = "C0004";

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
      : "";

  const isCustomType = type === "custom";
  const linkProps = {
    ...(newTab && { target: "_blank", rel: "noopener noreferrer" }),
    className: `${
      appearance === "default"
        ? `btn-${appearance}`
        : `button btn-${appearance || "default"}`
    } ${className || ""}`,
  };

  const [cookies, _, removeCookie] = useCookies([UTM_PARAMS]);
  const [finalHref, setFinalHref] = useState(href);
  const activeGroups = OnetrustActiveGroups();

  // detect if activeGroups changes and if it does not include trackingCookieCategory, remove the UTM_PARAMS cookie
  useEffect(() => {
    if (activeGroups && !activeGroups.includes(trackingCookieCategory)) {
      removeCookie(UTM_PARAMS);
    }
  }, [activeGroups, removeCookie]);

  // State to determine if the effect should run
  const [shouldRunEffect, setShouldRunEffect] = useState(false);

  // Update the state based on isCustomType
  useEffect(() => {
    if (isCustomType) {
      setShouldRunEffect(true);
    }
  }, [isCustomType]);

  // Effect to handle the custom type logic
  useEffect(() => {
    if (shouldRunEffect) {
      const utmParams = cookies[UTM_PARAMS] || "";
      try {
        const url = new URL(href);
        const utmParamsObj = new URLSearchParams(utmParams);
        utmParamsObj.forEach((value, key) => {
          url.searchParams.append(key, value);
        });
        setFinalHref(url.toString());
      } catch (error) {
        console.error("Invalid URL:", error);
        setFinalHref(href);
      }
    }
  }, [shouldRunEffect, href, cookies]);

  if (isCustomType) {
    return (
      <a href={finalHref} {...linkProps}>
        <div className="btn-content">
          <span className="btn-label">
            {finalHref} {label}
            {children}
          </span>
        </div>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} {...linkProps}>
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
    href,
    appearance,
    label,
  };

  return <Button {...buttonProps} label={buttonProps.label ?? ""} />;
};
