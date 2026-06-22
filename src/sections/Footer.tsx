import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ArrowUpRight,
  Send,
  Heart,
  MessageSquare,
  Activity,
  Phone,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@omgawande1523',
    href: 'https://github.com/omgawande1523',
    icon: Github,
    colorClass: 'hover:bg-neo-blue',
  },
  {
    name: 'LinkedIn',
    handle: 'Om Gawande',
    href: 'https://linkedin.com/in/om-gawande-601081242',
    icon: Linkedin,
    colorClass: 'hover:bg-neo-pink',
  },
  {
    name: 'Email',
    handle: 'gawandeom2005@gmail.com',
    href: 'mailto:gawandeom2005@gmail.com',
    icon: Mail,
    colorClass: 'hover:bg-neo-yellow',
  },
  {
    name: 'Phone',
    handle: '+91 8010173681',
    href: 'tel:+918010173681',
    icon: Phone,
    colorClass: 'hover:bg-neo-mint',
  },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="w-full pt-24 pb-8 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div ref={headingRef} className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-silver">
          <span>08 / CONTACT_CONSOLE.EXE</span>
        </div>

        {/* Contact Console OS Window */}
        <div
          ref={containerRef}
          className="os-window flex flex-col bg-neo-surface"
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="os-window-header-pink">
            <div className="flex items-center gap-2 font-mono text-sm">
              <MessageSquare size={14} />
              <span>contact_console_wizard.sys</span>
            </div>
            <div className="window-dots">
              <span className="window-dot bg-red-400"></span>
              <span className="window-dot bg-yellow-400"></span>
              <span className="window-dot bg-emerald-400"></span>
            </div>
          </div>

          {/* Sub Toolbar */}
          <div className="border-b-[2px] border-black bg-neo-surface px-4 py-2 flex items-center justify-between font-mono text-xs select-none border-t-0">
            <div className="flex items-center gap-4 text-black/60 font-semibold">
              <span>Send_Prompt</span>
              <span>Coordinates</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px]">
              <Activity size={12} className="animate-pulse" />
              <span>LOG_DAEMON_ACTIVE</span>
            </div>
          </div>

          {/* Form and info split content */}
          <div className="p-6 md:p-8 bg-neo-bg grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Contact Form Column */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 bg-neo-surface border-[2.5px] border-black p-6 space-y-5 shadow-neo hover:shadow-neo-md transition-all"
            >
              <div className="space-y-1">
                <label className="font-mono text-xs font-bold text-black uppercase block">
                  Sender Identity Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-neo-bg border-[2.5px] border-black px-4 py-3 font-mono text-xs text-black focus:outline-none focus:bg-neo-yellow/10 focus:border-neo-pink transition-all rounded-none"
                  placeholder="e.g., Captain John Doe"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs font-bold text-black uppercase block">
                  Return Mail Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-neo-bg border-[2.5px] border-black px-4 py-3 font-mono text-xs text-black focus:outline-none focus:bg-neo-yellow/10 focus:border-neo-pink transition-all rounded-none"
                  placeholder="e.g., john@company.ai"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs font-bold text-black uppercase block">
                  Message Data Block
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-neo-bg border-[2.5px] border-black px-4 py-3 font-mono text-xs text-black focus:outline-none focus:bg-neo-yellow/10 focus:border-neo-pink transition-all resize-none rounded-none"
                  placeholder="Write your project prompts or message details here..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 font-mono text-xs font-bold bg-black text-neo-bg px-6 py-3 border-2 border-black hover:bg-neo-bg hover:text-black transition-all shadow-neo hover:shadow-none"
              >
                {submitted ? (
                  <>SYSTEM: PROMPT SENT SUCCESSFULLY!</>
                ) : (
                  <>
                    <Send size={12} />
                    <span>TRANSMIT_MESSAGE_PROMPT</span>
                  </>
                )}
              </button>
            </form>

            {/* Social Links & Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {/* Social Cards */}
              <div className="grid grid-cols-1 gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`border-[2.5px] border-black bg-neo-surface p-4 flex items-center justify-between group shadow-neo hover:shadow-none transition-all ${link.colorClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 border border-black bg-black text-neo-bg">
                          <Icon size={14} />
                        </div>
                        <div>
                          <p className="font-mono text-xs font-bold text-black">
                            {link.name}
                          </p>
                          <p className="font-mono text-[10px] text-silver font-semibold mt-0.5">
                            {link.handle}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  );
                })}
              </div>

              {/* Location Card */}
              <div className="border-[2.5px] border-black bg-neo-mint p-4 shadow-neo">
                <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-black select-none">
                  <MapPin size={14} className="text-black" />
                  <span>LOCATION_COORDS</span>
                </div>
                <p className="font-body text-xs text-black/85 leading-relaxed font-semibold">
                  Nagpur, Maharashtra, India (IST +5:30)
                </p>
                <p className="font-mono text-[9px] text-black/60 font-bold mt-2 uppercase">
                  STATUS: AVAILABLE FOR REMOTE / HYBRID ROLES
                </p>
              </div>
            </div>
          </div>

          {/* Footer bar */}
          <div className="border-t-[2.5px] border-black bg-black text-neo-bg px-4 py-2 font-mono text-[10px] text-right flex justify-between select-none">
            <span className="text-neo-yellow">CONSOLE: INCOMING_SOCKET_OPEN</span>
            <span>SYSTEM_OUT: DISPATCH_READY</span>
          </div>
        </div>

        {/* Text Marquee Bar */}
        <div className="border-y-[2.5px] border-black py-4 bg-neo-yellow/30 overflow-hidden select-none">
          <div className="flex animate-marquee whitespace-nowrap font-mono text-xs font-bold tracking-widest text-black">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="mx-4">
                OM GAWANDE // AI & ML ENGINEER // FORUM PRESIDENT // CLASS REPRESENTATIVE // TECHNICAL LEADER //
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-silver select-none pt-4">
          <p className="flex items-center gap-1.5 font-semibold">
            Built with <Heart size={10} className="text-neo-pink fill-neo-pink animate-pulse" /> by Om Gawande
          </p>
          <p className="font-semibold">
            © {new Date().getFullYear()} OM_OS v1.0.4. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
