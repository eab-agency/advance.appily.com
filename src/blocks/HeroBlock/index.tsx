import { LandingPageHero } from '@/components/Heros/LandingPageHero'
import { PostHero } from '@/components/Heros/PostHero'
import { ResultPageHero } from '@/components/Heros/ResultPageHero'
import React from 'react'
import { Page } from '../../../payload-types'

const heroes = {
  landingPage: LandingPageHero,
  resultPage: ResultPageHero,
}

export const Hero: React.FC<Page['hero']> = props => {
  const { type } = props || {}
  // if (!type || type === 'none') return null

  const HeroToRender = heroes[type]
  if (!HeroToRender) return <PostHero {...props} />

  return <HeroToRender {...props} />
}
