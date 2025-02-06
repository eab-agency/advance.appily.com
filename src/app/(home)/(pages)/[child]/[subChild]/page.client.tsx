"use client";
import { Blocks } from "@/components/Block";
import { useLivePreview } from "@payloadcms/live-preview-react";
import React, { useEffect } from "react";
import { Page } from "../../../../../../payload-types";
import { Hero } from "../../../../../blocks/HeroBlock";
import { useId } from "../../../../../context/idContext";

export const PageClient: React.FC<{
  page: Page;
}> = ({ page: initialPage }) => {
  const serverURL = process.env.NEXT_PUBLIC_CMS_URL || "";
  const { docId, setId } = useId(); // Get and set the ID from the context

  const { data } = useLivePreview<Page>({
    initialData: initialPage,
    serverURL: serverURL, // Ensure this URL is correct
    depth: 2,
  });

  useEffect(() => {
    if (data?.id) {
      setId(data?.id); // Store the ID in context
    }
  }, [data?.id, setId]);

  return (
    <React.Fragment>
      <Hero {...data?.hero} />
      <Blocks blocks={data?.layout} />
    </React.Fragment>
  );
};
