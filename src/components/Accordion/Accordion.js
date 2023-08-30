import React, { useState } from 'react'
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi'

import styles from '@scss/global/components/Accordion.module.scss'

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
        <h2>
          <span>{title}</span>{' '}
          {isExpanded ? (
            <i>
              <FiMinusSquare />
            </i>
          ) : (
            <i>
              <FiPlusSquare />
            </i>
          )}
        </h2>
      </div>

      {isExpanded && <div className={styles['accordion-body']}>{children}</div>}
    </div>
  )
}

export default Accordion
