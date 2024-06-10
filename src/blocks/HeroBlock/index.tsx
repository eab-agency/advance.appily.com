import React from 'react'
import { Page } from '../../../payload-types'
import { LandingPageHero } from '@/components/Heros/LandingPageHero'
import { ResultPageHero } from '@/components/Heros/ResultPageHero'

const heroes = {
  landingPage: LandingPageHero,
  resultPage: ResultPageHero,
}

export const Hero: React.FC<Page['hero']> = props => {
  const { type } = props || {}
  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]
  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}