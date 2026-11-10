import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import App from './App'
import { profile } from './data/profile'
import { education } from './data/experience'

/** Render the full page to HTML at build time, waiting for lazy sections. */
export async function render(): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <App />
    </StrictMode>
  )
  return new Response(prelude).text()
}

/** schema.org Person, generated from src/data so it never drifts from the page. */
export function personJsonLd(): string {
  const sameAs = [profile.links.github, profile.links.linkedin, profile.links.orcid, profile.links.googleScholar].filter(Boolean)
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: profile.siteUrl,
    email: profile.email,
    image: new URL('/img/om-gawande-portrait.webp', profile.siteUrl).href,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: education.institution,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: profile.location.countryCode,
    },
    sameAs,
  })
}
