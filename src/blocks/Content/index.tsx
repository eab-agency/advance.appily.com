import RenderColumncontent from '@/components/RenderColumnContent'
import RenderRowcontent from '@/components/RenderRowContent'
import '@/styles/layouts/Section.scss'
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
  } = props;

  function sectionClassNames() {
    const classNames = ['section-content']

    if (enableHighlight) {
      classNames.push('section__highlight')
    }
    if (layoutWidth) {
      classNames.push(`section__layoutwidth-${layoutWidth}`)
    }
    if (backgroundColor && backgroundColor !== 'default') {
      classNames.push(`section__bg-${backgroundColor}`)
    }
    return classNames.join(' ')
  }


  return (
    <section className={sectionClassNames()}>
      {rows &&
        rows?.length > 0 &&
        (
          <RenderRowcontent rows={rows} />
        )}
      {columns &&
        columns?.length > 0 &&
        (

          <RenderColumncontent columns={columns} />
        )}
    </section>
  )
}
