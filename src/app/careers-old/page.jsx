/* eslint-disable no-unused-vars */

'use client'
import React, { useEffect, useRef } from 'react';

/* eslint-disable react/no-danger */
const SeoPage = () => {
    const { setUtmSource, utmSource } = useUser();
    const searchParams = useSearchParams()

  const search = searchParams.get('utm_source')
  useEffect(() => {
    if (search) {
      setUtmSource(search)
    }
  }, [search])



    return (
        <>
         <h1>need content for careers root page</h1>
        </>
    );
};

export default SeoPage;
