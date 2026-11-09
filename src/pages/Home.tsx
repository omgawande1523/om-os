import Header from '../components/Header';
import CustomCursor from '../components/CustomCursor';
import KeyboardShortcuts from '../components/KeyboardShortcuts';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import { lazy, Suspense } from 'react';

// Below the fold: separate chunks so the first screen parses less JS.
const Experience = lazy(() => import('../sections/Experience'));
const Publications = lazy(() => import('../sections/Publications'));
const Skills = lazy(() => import('../sections/Skills'));
const Leadership = lazy(() => import('../sections/Leadership'));
const Certifications = lazy(() => import('../sections/Certifications'));
const GitHubStats = lazy(() => import('../sections/GitHubStats'));
const ResumeViewer = lazy(() => import('../sections/ResumeViewer'));
const Footer = lazy(() => import('../sections/Footer'));

export default function Home() {
  return (
    <div className="min-h-screen bg-neo-bg">
      <CustomCursor />
      <KeyboardShortcuts />
      <Header />
      <main className="relative pt-11">
        <Hero />
        <About />
        <Projects />
        <Suspense fallback={null}>
          <Experience />
          <Publications />
          <Skills />
          <Leadership />
          <Certifications />
          <GitHubStats />
          <ResumeViewer />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
