'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'

import styles from '@styles/modules/NavBar.module.scss'

const links = [
  {
    href: '/practitioner',
    label: 'Practitioner',
  },
  {
    href: '/analyst',
    label: 'Analyst',
  },
  {
    href: '/educator',
    label: 'Educator',
  },
  {
    href: '/executive',
    label: 'Executive',
  },
  {
    href: '/scientist',
    label: 'Scientist',
  },
]

export default function NabBar() {
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Note: AO - Prevent scrolling when the menu is open.

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      // pageBody.style.overflow = 'visible';
    } else {
      setIsMenuOpen(true)
      // pageBody.style.overflow = 'hidden';
    }
  }

  return (
    <nav className={styles.navigation}>
      <button
        type="button"
        className={isMenuOpen ? styles.hamburgerOpen : styles.hamburgerClose}
        onClick={toggleMenu}
      >
        {isMenuOpen ? <MdClose /> : <MdMenu />}
      </button>
      <ul className={isMenuOpen ? styles.menuOpen : styles.menuClosed}>
        {links.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <li key={`${href}${label}`}>
              <Link
                href={href}
                className={isActive ? styles.active : styles.nonActive}
                onClick={toggleMenu}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
