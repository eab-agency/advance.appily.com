import React from 'react'
import { Page } from '../../../payload-types'
import classes from './index.module.scss'
import RenderRowcontent from '@/components/RenderRowContent'
import RendeColumncontent from '@/components/RenderColumnContent'

type Props = Extract<Page['layout'][0], { blockType: 'section' }>

export const ContentBlock: React.FC<
  Props & {
    id?: string
  }
> = props => {
  const { columns, rows } = props;
  return (
    <section className={classes.content}>
          {rows && 
          rows?.length > 0 && 
          (
          <RenderRowcontent rows={rows}/>
          ) }
          {columns && 
          columns?.length > 0 && 
          (
          
          <RendeColumncontent columns={columns}/>
          ) }
    </section>
  )
}
