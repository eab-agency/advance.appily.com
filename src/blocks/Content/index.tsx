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

  console.log("the props:", props)

  // crate a function to set classNames based on the props

  function sectionClassNames() {
    const classNames = [classes.content]

    if (enableHighlight) {
      classNames.push(classes.highlight)
    }
    if (layoutWidth) {
      classNames.push(classes[layoutWidth])
    }
    if (backgroundColor) {
      classNames.push(classes[backgroundColor])
    }
    return classNames.join(' ')
  }

  // const sectionStyles = {


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
