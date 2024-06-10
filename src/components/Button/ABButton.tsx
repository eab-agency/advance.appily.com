"use client";

import { Button as ButtonComponent } from "@/components";
import { Suspense, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UTM_PARAMS } from "@/middleware";
import OnetrustActiveGroups from "@/hooks/useOneturstActiveGroups";

var trackingCookieCategory = "C0004";

function Button({ label, appearance, href, className }) {
  const [cookies, _, removeCookie] = useCookies([UTM_PARAMS]);
  const [finalHref, setFinalHref] = useState(href);
  const activeGroups = OnetrustActiveGroups();

  // detect if activeGroups changes and if it does not include trackingCookieCategory, remove the UTM_PARAMS cookie
  useEffect(() => {
    if (activeGroups && !activeGroups.includes(trackingCookieCategory)) {
      removeCookie(UTM_PARAMS);
    }
  }, [activeGroups, removeCookie]);

  useEffect(() => {
    // Check if cookies[UTM_PARAMS] is defined, otherwise default to an empty string
    const utmParams = cookies[UTM_PARAMS] || "";
    setFinalHref(`${href}${utmParams}`);
  }, [href, cookies]);

  return (
    <ButtonComponent
      label={label}
      appearance={appearance}
      href={finalHref}
      className={className}
    />
  );
}

export default function ABButton({ label, appearance, href, className }) {
  return (
    <Suspense
      fallback={
        <ButtonComponent
          label={label}
          appearance={appearance}
          href={href}
          className={className}
        />
      }
    >
      <Button
        label={label}
        appearance={appearance}
        href={href}
        className={className}
      />
    </Suspense>
  );
}
