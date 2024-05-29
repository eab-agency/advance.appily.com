import RenderColumncontent from '@/components/RenderColumnContent'
import RenderRowcontent from '@/components/RenderRowContent'
import '@/styles/layouts/Section.scss'
import { sectionClassNames } from '@/utilities/sectionClassNames'
import React from 'react'
import { Page } from '../../../payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'section' }>

export const ContentBlock: React.FC<
  Props & {
    id?: string
  }
> = props => {
  const {
    columns,
    rows,
    enableHighlight,
    layoutWidth,
    backgroundColor,
    type
  } = props;

  return (
    <section className={sectionClassNames({ backgroundColor, enableHighlight, layoutWidth })}>
      {type === 'row' ? (
        <>
          {rows && rows.length > 0 && (
            <RenderRowcontent rows={rows} />
          )}
        </>
      ) : (
        <>
          {columns && columns.length > 0 && (
            <RenderColumncontent columns={columns} layoutType={type} />
          )}
        </>
      )}
    </section>
  )
}
