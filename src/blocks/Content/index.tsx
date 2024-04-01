import { Cell, Grid } from '@faceless-ui/css-grid'
import React from 'react'

import { Page } from '../../../payload-types'
import { Gutter } from '../../components/Gutter'
import { CMSLink } from '../../components/Link'
import RichText from '../../components/RichText'

import classes from './index.module.scss'
import RenderRowcontent from '@/components/RenderRowContent'
import RendeColumncontent from '@/components/RenderColumnContent'

type Props = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<
  Props & {
    id?: string
  }
> = props => {
  const { columns, rows } = props
  return (
    <Gutter className={classes.content}>
      
     
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
    </Gutter>
  )
}
