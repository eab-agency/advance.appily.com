import styles from '@/styles/global/components/modules/PageHeader.module.scss'
import React from 'react'
import MainLogo from './MainLogo'
import NavBar from './NavBar'

interface HeaderProps {
  links: Link[] // replace string[] with the actual type of your links
}

interface Link {
  href: string
  label: string
}

export const Header: React.FC<HeaderProps> = ({ links }) => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles['page-header-results']}>
          <MainLogo />
          <NavBar links={links} />
        </div>
      </div>
    </header>
  )
}
