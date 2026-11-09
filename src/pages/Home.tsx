import Header from '../components/Header';
import CustomCursor from '../components/CustomCursor';
import BootOverlay from '../components/BootOverlay';
import KeyboardShortcuts from '../components/KeyboardShortcuts';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Skills from '../sections/Skills';
import Leadership from '../sections/Leadership';
import Certifications from '../sections/Certifications';
import GitHubStats from '../sections/GitHubStats';
import ResumeViewer from '../sections/ResumeViewer';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-neo-bg">
      <BootOverlay />
      <CustomCursor />
      <KeyboardShortcuts />
      <Header />
      <main className="relative pt-11">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Leadership />
        <Certifications />
        <GitHubStats />
        <ResumeViewer />
        <Footer />
      </main>
    </div>
  );
}
