import Link from 'next/link'
import React from 'react'

import { Page } from '../../../payload-types'
import { Button } from '../Button'

// import '@/styles/blocks/CMSLinkType.scss'

type CMSLinkType = {
  type?: 'custom' | 'reference' 
  url?: string
  newTab?: boolean
  reference?: {
    value: string | Page
    relationTo: 'pages'
  }
  label?: string
  appearance?: 'default' | 'primary' | 'secondary'
  children?: React.ReactNode
  className?: string
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  url,
  newTab,
  reference,
  label,
  appearance,
  children,
  className,
}) => {
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `/${reference.value.slug}`
      : url
console.log(type,'type***');
  const isCustomType = type === 'custom';
  const linkProps = {
    ...(newTab && { target: '_blank', rel: 'noopener noreferrer' }),
    className: `${appearance === 'default' ? `btn-${appearance}` : `button btn-${appearance || 'default'}`} ${className || ''}`,
  };


  if (isCustomType) {
    return (
      <a href={href} {...linkProps}>
        <div className='btn-content'>
          <span className='btn-label'>
            {label && label}
            {children && children}
          </span>
        </div>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} {...linkProps}>
        <div className='btn-content'>
          <span className='btn-label'>
            {label && label}
            {children && children}
          </span>
        </div>
      </Link>
    );
  }

  const buttonProps = {
    newTab,
    href,
    appearance,
    label,
  }
  return <Button  {...buttonProps} label={buttonProps.label ?? ''} />
}
