import styles from '@/styles/modules/PageHeader.module.scss'
import React from 'react'
import MainLogo from './MainLogo'
import NavBar from './NavBar'

interface HeaderProps {
  links: string[] // replace string[] with the actual type of your links
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
