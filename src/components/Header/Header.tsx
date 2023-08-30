import styles from '@scss/modules/PageHeader.module.scss'
import React from 'react'
import MainLogo from './MainLogo'
import NavBar from './NavBar'

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

  return (
      <header>
        <div className={styles.container}>
            <div className={styles['page-header-results']}>
              <MainLogo />
              <NavBar />
            </div>
        </div>
      </header>
  )
}

export default Header