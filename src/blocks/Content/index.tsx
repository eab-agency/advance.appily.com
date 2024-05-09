import RendeColumncontent from '@/components/RenderColumnContent'
import RenderRowcontent from '@/components/RenderRowContent'
import React from 'react'
import { Page } from '../../../payload-types'
import classes from './index.module.scss'

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
    const classNames = ['content']

    if (enableHighlight) {
      classNames.push('highlight')
    }
    if (layoutWidth) {
      classNames.push(layoutWidth)
    }
    if (backgroundColor && backgroundColor !== 'default') {
      classNames.push(backgroundColor)
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

          <RendeColumncontent columns={columns} />
        )}
    </section>
  )
}
