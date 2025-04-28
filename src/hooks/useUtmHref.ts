import { UTM_PARAMS } from '@/middleware';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import useOnetrustActiveGroups from './useOneturstActiveGroups';

var trackingCookieCategory = "C0004";

export function useUtmHref(href: string | null) {
  const [cookies, _, removeCookie] = useCookies([UTM_PARAMS]);
  const [finalHref, setFinalHref] = useState<string | null>(href);
  const activeGroups = useOnetrustActiveGroups();

  // detect if activeGroups changes and if it does not include trackingCookieCategory, remove the UTM_PARAMS cookie
  useEffect(() => {
    if (activeGroups && !activeGroups.includes(trackingCookieCategory)) {
      removeCookie(UTM_PARAMS);
    }
  }, [activeGroups, removeCookie]);

  useEffect(() => {
    let processed = href;
    if (!processed) {
      setFinalHref(null);
      return;
    }

    if (processed.startsWith("http")) {
      try {
        const url = new URL(processed);
        const utmParams = cookies[UTM_PARAMS] || "";
        const utmParamsObj = new URLSearchParams(utmParams);
        utmParamsObj.forEach((value, key) => {
          url.searchParams.append(key, value);
        });
        processed = url.toString();
      } catch (error) {
        console.error("Invalid URL:", error);
      }
    }
    setFinalHref(processed);
  }, [href, cookies]);

  return finalHref;
}
