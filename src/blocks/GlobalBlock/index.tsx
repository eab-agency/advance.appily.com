import GlobalContent from '@/components/GlobalContent';
import '@/styles/layouts/Section.scss';
import React from 'react';
import { Block, Page } from '../../../payload-types';


type Props = Extract<Page['layout'][0], { blockType: 'globalBlock' }> & {
  globalBlocks?: Block[];
  id?: string;
};
export const GlobalBlock: React.FC<
  Props & {
    id?: string
  }
> = props => {
  const {
    globalBlocks
  } = props;
  return (
    <section>
      <>
        {globalBlocks && globalBlocks.length > 0 && (
          <GlobalContent blocks={globalBlocks} />
        )}
      </>
    </section>
  )
}
