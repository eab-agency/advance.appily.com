'use client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useUser } from '../../context/context'
// import { allStates } from '../../helpers/getMatchedSchool'
import PageFooter from '../PageFooter'
import PageHeader from '../PageHeader'

const LocationInDevMode = () => {
  const { location, setLocation } = useUser()

  const setInputLocation = selectedLocation => {
    setLocation({ region_iso_code: selectedLocation })
  }
  // only return if in dev mode
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const styles = {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '9999',
    backgroundColor: 'white',
    padding: '1rem',
  }

  return (
    <div style={styles}>
      {location ? <p>Location: {location.region_iso_code}</p> : <p>Location: loading...</p>}
      <label htmlFor="location">Change Location:</label>
      <select id="location" onChange={e => setInputLocation(e.target.value)}>
        {allStates.map(state => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  )
}

export function PageLayout({ children }) {
  const { setUtmSource } = useUser()
  const router = useRouter()

  const [resultsPage, setResultsPage] = useState(false)

  const { pathname } = router

  useEffect(() => {
    if (pathname === '/') {
      setResultsPage(false)
    } else {
      setResultsPage(true)
    }
  }, [pathname])

  useEffect(() => {
    if (router.query.utm_source) {
      setUtmSource(router.query.utm_source)
    }
  }, [router.query.utm_source, setUtmSource])

  return (
    <>
      <div className="page-layout">
        {resultsPage && <PageHeader pageType="results" />}
        <main className="page-layout__container">
          {/* <LocationInDevMode /> */}
          <div className="page-layout__content">{children}</div>
        </main>
      </div>
      {resultsPage && <PageFooter />}
    </>
  )
}
