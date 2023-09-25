import styles from '@styles/modules/PageHeader.module.scss'
import React from 'react'
import MainLogo from './MainLogo'
import NavBar from './NavBar'

export const Header: React.FC<{ children?: React.ReactNode }> = ({ links, children }) => {

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
