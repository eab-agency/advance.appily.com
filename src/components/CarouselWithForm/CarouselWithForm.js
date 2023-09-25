'use client'
import { useState } from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri'

import Form from '@components/Form'
import SchoolCarousel from '@components/SchoolCarousel'
import styles from '@styles/global/components/CarouselWithForm.module.scss'

const CarouselWithForm = ({ formId }) => {
  const [visibleForm, setVisibleForm] = useState(false)
  // const { user, location } = useUser()

  const user = {}
  const location = {
    notUS: false,
  }

  const [selectedSchool, setSelectedSchool] = useState(null)

  const onCarouselClick = school => {
    // if location.notUS === true, then redirect to selectedSchool.link
    if (location.notUS) {
      window.open(school.link, '_blank')
    } else {
      setSelectedSchool(school)
      setVisibleForm(!visibleForm)
    }
  }
  return (
    <section className={styles.matchedSchools}>
      <div className={styles.intro}>
        <h2>Explore Your School Matches</h2>
      </div>

      <div className={styles.container}>
        <SchoolCarousel
          handleClick={school => onCarouselClick(school)}
          className={`${visibleForm ? styles.hide : ''}`}
        />

        {visibleForm && (
          <div className={styles.carouselForm}>
            <button className={styles.closeBtn} type="button" onClick={() => onCarouselClick()}>
              Back{' '}
              <i>
                <RiArrowGoBackFill />
              </i>
            </button>

            <div className={styles.intro}>
              {/* <h3>Let's Get Started</h3> */}
              <p>
                Let us know the best way to contact you with helpful information and potential
                college or university matches.
              </p>
            </div>
            <Form
              school={selectedSchool}
              redirectTo={selectedSchool.link}
              user={user}
              id={formId || '4'}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default CarouselWithForm
