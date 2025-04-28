import { UTM_PARAMS } from '@/middleware';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export function useUtmHref(href: string) {
  const [cookies] = useCookies([UTM_PARAMS]);
  const [finalHref, setFinalHref] = useState(href);

  useEffect(() => {
    if (href && href.startsWith("http")) {
      try {
        const url = new URL(href);
        const utmParams = cookies[UTM_PARAMS] || "";
        const utmParamsObj = new URLSearchParams(utmParams);
        utmParamsObj.forEach((value, key) => {
          url.searchParams.append(key, value);
        });
        setFinalHref(url.toString());
      } catch (error) {
        console.error("Invalid URL:", error);
        setFinalHref(href);
      }
    } else {
      setFinalHref(href);
    }
  }, [href, cookies]);

  return finalHref;
}
