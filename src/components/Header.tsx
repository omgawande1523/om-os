import { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail, Menu, X, Terminal, Cpu, Clock, Wifi, Sun, Moon, Phone } from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { label: 'About', href: '#about', shortcut: '⌘A' },
  { label: 'Skills', href: '#skills', shortcut: '⌘S' },
  { label: 'Experience', href: '#experience', shortcut: '⌘E' },
  { label: 'Projects', href: '#projects', shortcut: '⌘P' },
  { label: 'Contact', href: '#contact', shortcut: '⌘C' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState('');
  const headerRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
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
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[100] bg-neo-bg border-b-[2.5px] border-black text-black select-none font-mono"
      style={{ opacity: 0 }}
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
            <Terminal size={12} />
            <span>OM_OS v1.0.4</span>
          </a>
          <div className="flex items-center gap-1.5 text-xs text-black/60 hidden sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] tracking-wide uppercase font-semibold">System: Online</span>
          </div>
        </div>

        {/* Center: Desktop Nav Menus */}
        <nav className="hidden md:flex items-center gap-1 text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1 hover:bg-black hover:text-neo-bg transition-colors relative group font-semibold uppercase tracking-wider"
            >
              {link.label}
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity bg-black text-neo-bg px-1 pointer-events-none">
                {link.shortcut}
              </span>
            </a>
          ))}
        </nav>

        {/* Right Side: Status Widgets & Links */}
        <div className="flex items-center gap-3">
          {/* Quick social actions */}
          <div className="hidden sm:flex items-center gap-2 border-r border-black/20 pr-3">
            <a
              href="https://github.com/omgawande1523"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-black hover:bg-neo-blue hover:border border-black transition-all"
              title="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="https://linkedin.com/in/om-gawande-601081242"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-black hover:bg-neo-pink hover:border border-black transition-all"
              title="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="mailto:gawandeom2005@gmail.com"
              className="p-1 text-black hover:bg-neo-yellow hover:border border-black transition-all"
              title="Email"
            >
              <Mail size={14} />
            </a>
            <a
              href="tel:+918010173681"
              className="p-1 text-black hover:bg-neo-mint hover:border border-black transition-all"
              title="Phone"
            >
              <Phone size={14} />
            </a>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 border-[2px] border-black hover:bg-black hover:text-neo-bg transition-all bg-neo-surface dark:bg-[#111111] dark:text-white flex items-center justify-center shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            data-cursor="GO"
          >
            {theme === 'light' ? (
              <Moon size={13} className="text-black dark:text-white transition-transform duration-500 hover:-rotate-12" />
            ) : (
              <Sun size={13} className="text-black dark:text-white transition-transform duration-500 hover:rotate-90" />
            )}
          </button>

          {/* System Info */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1 hidden xs:flex">
              <Wifi size={13} className="text-black" />
              <Cpu size={13} className="text-black" />
            </div>
            <div className="flex items-center gap-1.5 bg-neo-bg py-0.5 px-2 border border-black/25">
              <Clock size={12} className="text-black/70" />
              <span className="text-[11px] font-bold tracking-tight">{time}</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 border border-black hover:bg-black hover:text-neo-bg transition-colors"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-[2.5px] border-black bg-neo-bg text-xs">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-6 py-3 border-b border-black/10 hover:bg-black hover:text-neo-bg transition-colors font-bold uppercase tracking-wider flex justify-between items-center"
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-black/40 group-hover:text-neo-bg/40">{link.shortcut}</span>
              </a>
            ))}
            <div className="flex items-center gap-4 px-6 py-4 bg-black/5">
              <span className="font-bold text-black/60">Socials:</span>
              <a
                href="https://github.com/omgawande1523"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-black border border-black hover:bg-black hover:text-neo-bg transition-all"
              >
                <Github size={14} />
              </a>
              <a
                href="https://linkedin.com/in/om-gawande-601081242"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-black border border-black hover:bg-black hover:text-neo-bg transition-all"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="mailto:gawandeom2005@gmail.com"
                className="p-1 text-black border border-black hover:bg-black hover:text-neo-bg transition-all"
              >
                <Mail size={14} />
              </a>
              <a
                href="tel:+918010173681"
                className="p-1 text-black border border-black hover:bg-black hover:text-neo-bg transition-all"
              >
                <Phone size={14} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
