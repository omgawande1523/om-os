import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CustomCursor from '../components/CustomCursor';
import Hero from '../sections/Hero';
import ImpactDashboard from '../sections/ImpactDashboard';
import Projects from '../sections/Projects';
import Leadership from '../sections/Leadership';
import About from '../sections/About';
import Skills from '../sections/Skills';
import GitHubStats from '../sections/GitHubStats';
import Experience from '../sections/Experience';
import ResumeViewer from '../sections/ResumeViewer';
import Certifications from '../sections/Certifications';
import Footer from '../sections/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading with progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[1000] bg-neo-bg flex flex-col items-center justify-center font-mono">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black tracking-tight">
            OM<span className="text-neo-pink">.</span>OS
          </h1>
          <div className="space-y-2">
            <p className="text-xs text-silver uppercase tracking-widest">
              Initializing Core Modules
            </p>
            <div className="w-64 h-[8px] bg-black/10 mx-auto overflow-hidden border border-black p-0.5">
              <div
                className="h-full bg-black transition-all duration-200"
                style={{ width: `${Math.min(loadingProgress, 100)}%` }}
              />
            </div>
            <p className="text-sm text-black font-bold">
              BOOTING_SYS: {Math.min(Math.round(loadingProgress), 100)}%
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neo-bg cursor-none">
      <CustomCursor />
      <Header />
      <main className="relative pt-11">
        <Hero />
        <ImpactDashboard />
        <Projects />
        <Leadership />
        <About />
        <Skills />
        <GitHubStats />
        <Experience />
        <ResumeViewer />
        <Certifications />
        <Footer />
      </main>
    </div>
  );
}
