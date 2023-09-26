'use client'

import Image from 'next/image'
import React from 'react'
import { MdHelpOutline, MdOutlinePrivacyTip } from 'react-icons/md'
import { Reoverlay } from 'reoverlay'

import { HelpModal, PrivacyModal } from '@/components/Modals'
import styles from '@/styles/modules/PageFooter.module.scss'

const Footer: React.FC = () => {
  const helpClick = () => {
    Reoverlay.showModal(HelpModal, {})
  }
  const privacyClick = () => {
    Reoverlay.showModal(PrivacyModal, {})
  }

  return (
    <footer className={styles['page-footer']}>
      <div className={styles.wrapper}>
        <figure className={styles.logo}>
          <Image src="/images/cappex-footer-logo.svg" alt="Cappex Logo" fill />
        </figure>
        <div className="copyright">
          <p>
            © 2023 All rights reserved. <a href="https://www.cappex.com">www.Cappex.com</a>
          </p>
        </div>
        <div className="help-privacy">
          <ul>
            <li>
              <button type="button" className={styles.helpPrivBtn} onClick={helpClick}>
                <MdHelpOutline />
                Help
              </button>
            </li>
            <li>
              <button type="button" className={styles.helpPrivBtn} onClick={privacyClick}>
                <MdOutlinePrivacyTip />
                Privacy
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
