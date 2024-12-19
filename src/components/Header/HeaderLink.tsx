import Link from 'next/link';
import React from 'react';

import { Page } from '../../../payload-types';
import { Button } from '../Button';

type CMSHeaderLinkType = {
  type?: 'custom' | 'reference';
  url?: string;
  newTab?: boolean;
  reference?: {
    value: string | Page;
    relationTo: 'pages';
  };
  label?: string;
  appearance?: 'default' | 'primary' | 'secondary' | 'tertiary';
  children?: React.ReactNode;
  className?: string;
};

export const CMSHeaderLink: React.FC<CMSHeaderLinkType> = ({
  type,
  url,
  newTab,
  reference,
  label,
  appearance,
  children,
  className,
}) => {
  const href = type === 'reference' && reference && typeof reference.value === 'object'
    ? '/' + reference.value.breadcrumbs?.[reference.value.breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '')
    : type === 'custom' && url
      ? url.startsWith('http://') || url.startsWith('https://')
        ? url
        : '/' + url.replace(/^\/|\/$/g, '')
      : '';

  const isCustomType = type === 'custom';
  const linkProps = {
    ...(newTab && { target: '_blank', rel: 'noopener noreferrer' }),
    className: `${appearance === 'default' ? `btn-${appearance}` : `button btn-${appearance || 'default'}`} ${className || ''}`,
  };

  if (isCustomType) {
    return (
      <Link href={href} {...linkProps}>
        <div className='btn-content'>
          <span className='btn-label'>
            {label}
            {children}
          </span>
        </div>
      </Link>
    );
  }

  if (href) {
    return (
      <Link href={href} {...linkProps}>
        <div className='btn-content'>
          <span className='btn-label'>
            {label}
            {children}
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
  };

  return <Button {...buttonProps} label={buttonProps.label ?? ''} />;
};
