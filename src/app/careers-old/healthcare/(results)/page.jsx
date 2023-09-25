/* eslint-disable no-unused-vars */

'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

import Stats from '@components/Stats'
import CarouselWithForm from '@components/CarouselWithForm'

import styles from '@styles/global/layouts/SeoPage.module.scss'
import { Button } from '@components/Button'
import StickyCta from '@components/StickyCta'
import { useUser } from '@context/context'
import { useSearchParams } from 'next/navigation'
import data from '@data/seopage.json'

/* eslint-disable react/no-danger */
const SeoPage = () => {
  const { setUtmSource, utmSource } = useUser()
  const searchParams = useSearchParams()

  const search = searchParams.get('utm_source')
  useEffect(() => {
    if (search) {
      console.log('🚀 ~ file: page.jsx:28 ~ useEffect ~ search:', search)
      setUtmSource(search)
    }
  }, [search])

  const reasonsArray = data.whyChoose[1].reasons
  const reasonsList = reasonsArray.map((reason, index) => (
    <li key={index}>
      <h3>{reason.title}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: reason.description,
        }}
      />
    </li>
  ))

  const rightCareerArray = data.rightCareer[0].reasons
  const rightCareerList = rightCareerArray.map((reason, index) => (
    <li key={index}>
      <p
        dangerouslySetInnerHTML={{
          __html: reason.description,
        }}
      />
    </li>
  ))

  const cappexFacts = data.whatIsCappex.facts
  const cappexFactsList = cappexFacts.map((fact, index) => (
    <li key={index}>
      <p
        dangerouslySetInnerHTML={{
          __html: fact.fact,
        }}
      />
    </li>
  ))

  const carouselRef = useRef(null)

  return (
    <>
      <div className={styles.pageLayout}>
        <main className="page-layout__container">
          <div className="page-layout__content">
            <div className={styles.container}>
              <div className={styles.content}>
                <section className={styles.pageHero}>
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: data.pageTitle,
                    }}
                  />
                  <figure>
                    <Image
                      src="/images/which-health-care-career.jpg"
                      width={800}
                      height={480}
                      alt="Health care professional in a laboratory"
                    />
                  </figure>
                </section>
                <section className={styles.quizSection}>
                  <figure>
                    <Image
                      src="/images/profesional-man-researching-online.jpg"
                      width={800}
                      height={480}
                      alt="Profesional man researching online"
                    />
                  </figure>

                  <div className={styles.intro}>
                    <h2>{data.quizSection.title}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.quizSection.content,
                      }}
                    />
                    <Button
                      type="primary"
                      label={data.quizSection.buttonText}
                      href="/quiz"
                      className={styles.button}
                    />
                  </div>
                </section>
                <Stats stats={data.stats} source={data.statsSource} className={styles.stats} />
                <section className={styles.whyChoose}>
                  <div className={styles.intro}>
                    <h2>{data.whyChoose[0].title}</h2>
                  </div>
                  <div className={styles.whyChooseContent}>
                    <ul>{reasonsList}</ul>
                    <figure>
                      <Image
                        src="/images/doctor-wearing-mas-and-sthethoscope.jpg"
                        width={478}
                        height={284}
                        alt="Doctor wearing mask and a sthethoscope"
                      />
                    </figure>
                  </div>
                </section>
                <section className={styles.testimonial}>
                  <div className={styles.quotation}>
                    <blockquote>
                      <p>{data.testimonial.text}</p>
                      <div className={styles.testimonialAuthor}>
                        <p>{data.testimonial.author}</p>
                        <small>{data.testimonial.authorTitle}</small>
                      </div>
                    </blockquote>
                  </div>
                </section>
                <section className={styles.rightCareer}>
                  <div className={styles.intro}>
                    <h2>{data.rightCareer[0].title}</h2>
                    <p>{data.rightCareer[0].description}</p>
                  </div>
                  <ul>{rightCareerList}</ul>
                </section>
                <div id="explore-your-school-matches" ref={carouselRef}>
                  <CarouselWithForm />
                </div>
                <section className={styles.whatIsCappex}>
                  <div className={styles.intro}>
                    <h2>{data.whatIsCappex.title}</h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data.whatIsCappex.intro,
                      }}
                    />
                  </div>
                  <div className={styles.content}>
                    <figure>
                      <Image
                        src="/images/college-search.png"
                        width={536}
                        height={361}
                        alt="What is Cappex"
                      />
                    </figure>
                    <div className={styles.cappexFacts}>
                      <h3>{data.whatIsCappex.subtitle}</h3>
                      <ul>{cappexFactsList}</ul>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.whatIsCappex.content,
                        }}
                      />
                    </div>
                  </div>
                </section>
                <Stats stats={data.cappexStats} className={styles.stats} />
                <section className={styles.takeQuiz}>
                  <div className={styles.content}>
                    <h2>{data.takeQuiz.title}</h2>
                    <p>{data.takeQuiz.description}</p>
                    <Button
                      type="primary"
                      label={data.takeQuiz.buttonText}
                      href="/quiz"
                      className={styles.button}
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
      <StickyCta trackedElement={carouselRef} />
    </>
  )
}

export default SeoPage
