import styles from '@/styles/components/PageHeader.module.scss'
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
    <header className={styles.pageHeader}>
      <div className={styles.container}>
          <MainLogo />
          <NavBar links={links} />
      </div>
    </header>
  )
}
