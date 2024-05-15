'use client'
import React from 'react';
import { Page } from '../../../../payload-types';
import { Hero } from '../../../blocks/HeroBlock';
import { Blocks } from '@/components/Block'; // Check if this import is correct
import { useLivePreview } from '@payloadcms/live-preview-react';

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
