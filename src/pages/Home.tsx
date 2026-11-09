import { lazy, Suspense } from 'react';
import Header from '../components/Header';
import KeyboardShortcuts from '../components/KeyboardShortcuts';
import Hero from '../sections/Hero';
import Work from '../sections/Work';

// Below the fold: separate chunks so the first screen parses less JS.
const Experience = lazy(() => import('../sections/Experience'));
const Publications = lazy(() => import('../sections/Publications'));
const Skills = lazy(() => import('../sections/Skills'));
const Leadership = lazy(() => import('../sections/Leadership'));
const Contact = lazy(() => import('../sections/Contact'));

export default function Home() {
  return (
    <div className="min-h-screen bg-neo-bg">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <KeyboardShortcuts />
      <Header />
      <main id="main" tabIndex={-1} className="relative pt-11 outline-none">
        <Hero />
        <Work />
        <Suspense fallback={null}>
          <Experience />
          <Publications />
          <Skills />
          <Leadership />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}
