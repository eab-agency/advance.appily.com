'use client'
import { Blocks } from '@/components/Block';
import { useLivePreview } from '@payloadcms/live-preview-react';
import React from 'react';
import { Page } from '../../../../payload-types';
import { Hero } from '../../../blocks/HeroBlock';

export const PageClient: React.FC<{
  page: Page
}> = ({ page: initialPage }) => {
  const serverURL = process.env.NEXT_PUBLIC_CMS_URL || '';
  const { data } = useLivePreview<Page>({
    initialData: initialPage,
    serverURL: serverURL, // Ensure this URL is correct
    depth: 2,
  });
  return (
    <React.Fragment>
      <Hero {...data?.hero} />
      <Blocks blocks={data?.layout} />
    </React.Fragment>
  );
};
