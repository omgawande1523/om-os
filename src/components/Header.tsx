import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Menu, X, Terminal, Clock, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { sections } from '../data/sections';
import { RESUME_PDF } from '../data/resume';
import { OPEN_PALETTE_EVENT, preloadPalette } from '../lib/events';
import { profile } from '../data/profile';

const navLinks = sections.map((s) => ({ label: s.nav, href: `#${s.id}` }));

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] bg-neo-bg border-b-[2.5px] border-black text-black select-none font-mono"
    >
      <div className="flex items-center justify-between h-11 px-4 md:px-6">
        {/* Left Side: Logo/System Status */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 font-bold text-sm bg-black text-neo-bg px-2 py-0.5 border border-black hover:bg-neo-bg hover:text-neo-text transition-colors"
          >
            <Terminal size={12} aria-hidden="true" />
            <span>OM_OS v1.0.4</span>
          </a>
        </div>

        {/* Center: Desktop Nav Menus */}
        <nav className="hidden lg:flex items-center gap-0.5 text-[11px]" aria-label="Sections">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-2 py-1 hover:bg-black hover:text-neo-bg transition-colors font-semibold uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side: Status Widgets & Links */}
        <div className="flex items-center gap-3">
          {/* Quick social actions */}
          <div className="hidden sm:flex items-center gap-2 border-r border-black/20 pr-3">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-black hover:bg-neo-blue hover:border border-black transition-all"
              title="GitHub"
              aria-label="GitHub"
            >
              <Github size={14} aria-hidden="true" />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-black hover:bg-neo-pink hover:border border-black transition-all"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-1 text-black hover:bg-neo-yellow hover:border border-black transition-all"
              title="Email"
              aria-label="Email"
            >
              <Mail size={14} aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            onPointerEnter={preloadPalette}
            onFocus={preloadPalette}
            aria-label="Open command palette (Ctrl+K or Command+K)"
            aria-keyshortcuts="Control+K Meta+K"
            className="nb-press inline-flex items-center gap-1 font-mono text-[11px] font-bold border-[2px] border-black px-2 py-1 bg-neo-surface text-black shadow-nb-sm hover:bg-neo-yellow"
          >
            <span aria-hidden="true">⌘K</span>
          </button>

          <a
            href={RESUME_PDF}
            download
            className="nb-press hidden sm:inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase border-[2px] border-black px-2 py-1 bg-neo-yellow text-black shadow-nb-sm"
          >
            Resume <span aria-hidden="true">↓</span>
          </a>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 border-[2px] border-black text-black hover:bg-black hover:text-neo-bg focus-visible:bg-black focus-visible:text-neo-bg transition-all bg-neo-surface dark:bg-[#111111] flex items-center justify-center shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            type="button"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            data-cursor="GO"
          >
            {theme === 'light' ? (
              <Moon size={13} aria-hidden="true" />
            ) : (
              <Sun size={13} aria-hidden="true" />
            )}
          </button>

          {/* System Info */}
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold" aria-hidden="true">
            <div className="flex items-center gap-1.5 bg-neo-bg py-0.5 px-2 border border-black/25">
              <Clock size={12} className="text-black/70" />
              <span className="text-[11px] font-bold tracking-tight">{time}</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="lg:hidden p-1 border border-black hover:bg-black hover:text-neo-bg transition-colors"
          >
            {mobileOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="lg:hidden border-t-[2.5px] border-black bg-neo-bg text-xs">
          <nav className="flex flex-col" aria-label="Sections">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-6 py-3 border-b border-black/10 hover:bg-black hover:text-neo-bg transition-colors font-bold uppercase tracking-wider flex justify-between items-center"
              >
                <span>{link.label}</span>
              </a>
            ))}
            <a
              href={RESUME_PDF}
              download
              className="px-6 py-3 border-b border-black/10 hover:bg-black hover:text-neo-bg transition-colors font-bold uppercase tracking-wider"
            >
              Resume <span aria-hidden="true">↓</span>
            </a>
            <div className="flex items-center gap-4 px-6 py-4 bg-black/5">
              <span className="font-bold text-black/60">Socials:</span>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-1 text-black border border-black hover:bg-black hover:text-neo-bg transition-all"
              >
                <Github size={14} aria-hidden="true" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-1 text-black border border-black hover:bg-black hover:text-neo-bg transition-all"
              >
                <Linkedin size={14} aria-hidden="true" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="p-1 text-black border border-black hover:bg-black hover:text-neo-bg transition-all"
              >
                <Mail size={14} aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
