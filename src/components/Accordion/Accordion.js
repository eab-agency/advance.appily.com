'use client'
import React, { useState } from 'react'
import {BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/Bi'

import styles from '@/styles/components/Accordion.module.scss'

const Accordion = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const togglePanel = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={styles.accordion}>
      <div
        className={styles['accordion-header']}
        onClick={togglePanel}
        onKeyDown={togglePanel}
        role="button"
        tabIndex={0}
      >
        <h2 className={isExpanded && styles.expanded}>
          <span>{title}</span>{' '}
          {isExpanded ? (
            <i>
              <BiSolidMinusCircle />
            </i>
          ) : (
            <i>
              <BiSolidPlusCircle />
            </i>
          )}
        </h2>
      </div>

      {isExpanded && <div className={styles['accordion-body']}>{children}</div>}
    </div>
  )
}

export default Accordion
