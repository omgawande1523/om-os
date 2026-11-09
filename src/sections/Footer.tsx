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
  IdCard,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/profile';
import { leadership } from '../data/leadership';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub', handle: `@${profile.githubUsername}`, href: profile.links.github, icon: Github, colorClass: 'hover:bg-neo-blue' },
  { name: 'LinkedIn', handle: profile.name, href: profile.links.linkedin, icon: Linkedin, colorClass: 'hover:bg-neo-pink' },
  { name: 'ORCID', handle: profile.links.orcid.replace('https://orcid.org/', ''), href: profile.links.orcid, icon: IdCard, colorClass: 'hover:bg-neo-mint' },
  { name: 'Email', handle: profile.email, href: `mailto:${profile.email}`, icon: Mail, colorClass: 'hover:bg-neo-yellow' },
];

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '';

interface FormFields {
  name: string;
  email: string;
  message: string;
}
type FormStatus = 'idle' | 'invalid' | 'sending' | 'success' | 'error' | 'no-key';

const emptyForm: FormFields = { name: '', email: '', message: '' };

const fields: { name: keyof FormFields; label: string; placeholder: string; autoComplete?: string }[] = [
  { name: 'name', label: 'Your name', placeholder: 'Jane Doe', autoComplete: 'name' },
  { name: 'email', label: 'Your email', placeholder: 'jane@example.com', autoComplete: 'email' },
  { name: 'message', label: 'Message', placeholder: 'What would you like to talk about?' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: FormFields) {
  const errors: Partial<Record<keyof FormFields, string>> = {};
  if (!f.name.trim()) errors.name = 'Please enter your name.';
  if (!f.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(f.email.trim())) errors.email = 'That email address does not look valid.';
  if (!f.message.trim()) errors.message = 'Please write a message.';
  return errors;
}

function buildMailto(f: FormFields) {
  const subject = encodeURIComponent(f.name ? `Portfolio message from ${f.name}` : 'Hello from your portfolio');
  const body = encodeURIComponent(f.message + (f.email ? `\n\n— ${f.name} <${f.email}>` : ''));
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormFields>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

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

  const mailtoHref = buildMailto(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(formData);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('invalid');
      return;
    }
    // Honeypot: real people never fill the hidden field.
    const botcheck = new FormData(e.currentTarget).get('botcheck');
    if (botcheck) {
      setStatus('success');
      return;
    }
    if (!WEB3FORMS_KEY) {
      setStatus('no-key');
      window.location.href = mailtoHref;
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio message from ${formData.name}`,
          from_name: 'om-os.vercel.app',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error(`Web3Forms responded ${res.status}`);
      setStatus('success');
      setFormData(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  const update = (field: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="w-full pt-24 pb-8 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div ref={headingRef}>
          <SectionHeading id="contact" />
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
              noValidate
              className="lg:col-span-7 bg-neo-surface border-[2.5px] border-black p-6 space-y-5 shadow-neo"
            >
              {/* Honeypot: hidden from people and assistive tech */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-botcheck">Leave this empty</label>
                <input id="contact-botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
              </div>

              {fields.map((f) => {
                const id = `contact-${f.name}`;
                const errorId = `${id}-error`;
                const common = {
                  id,
                  name: f.name,
                  value: formData[f.name],
                  onChange: update(f.name),
                  required: true,
                  'aria-invalid': errors[f.name] ? true : undefined,
                  'aria-describedby': errors[f.name] ? errorId : undefined,
                  className:
                    'w-full bg-neo-bg border-[2.5px] border-black px-4 py-3 font-mono text-xs text-black focus:bg-neo-yellow/10 transition-all rounded-none',
                  placeholder: f.placeholder,
                };
                return (
                  <div key={f.name} className="space-y-1">
                    <label htmlFor={id} className="font-mono text-xs font-bold text-black uppercase block">
                      {f.label}
                    </label>
                    {f.name === 'message' ? (
                      <textarea {...common} rows={5} className={`${common.className} resize-y`} />
                    ) : (
                      <input {...common} type={f.name === 'email' ? 'email' : 'text'} autoComplete={f.autoComplete} />
                    )}
                    {errors[f.name] && (
                      <p id={errorId} className="font-mono text-[11px] font-bold text-red-700">
                        {errors[f.name]}
                      </p>
                    )}
                  </div>
                );
              })}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 font-mono text-xs font-bold bg-black text-neo-bg px-6 py-3 border-2 border-black hover:bg-neo-bg hover:text-black transition-all shadow-neo hover:shadow-none disabled:opacity-60 disabled:cursor-wait"
              >
                <Send size={12} aria-hidden="true" />
                <span>{status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}</span>
              </button>

              <div role="status" aria-live="polite" className="font-mono text-xs min-h-[1.25rem]">
                {status === 'success' && <p className="font-bold text-emerald-700">Message sent. I&apos;ll reply by email.</p>}
                {status === 'invalid' && <p className="font-bold text-red-700">Please fix the highlighted fields.</p>}
                {status === 'error' && (
                  <p className="font-bold text-red-700">
                    Sending failed.{' '}
                    <a href={mailtoHref} className="underline">
                      Email me directly
                    </a>{' '}
                    instead.
                  </p>
                )}
                {status === 'no-key' && (
                  <p className="font-bold text-black">
                    Opening your email app.{' '}
                    <a href={mailtoHref} className="underline">
                      Click here
                    </a>{' '}
                    if nothing happened, or write to {profile.email}.
                  </p>
                )}
              </div>
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
                          <Icon size={14} aria-hidden="true" />
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
                  {profile.location.city}, {profile.location.region}, {profile.location.country} (IST, UTC+5:30)
                </p>
                {profile.lookingFor && (
                  <p className="font-mono text-[9px] text-black/70 font-bold mt-2 uppercase">{profile.lookingFor}</p>
                )}
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
                {profile.name.toUpperCase()} // {profile.role.toUpperCase()} // {leadership[0].org.toUpperCase()} //
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-silver select-none pt-4">
          <p className="flex items-center gap-1.5 font-semibold">
            Built with <Heart size={10} className="text-neo-pink fill-neo-pink animate-pulse" aria-hidden="true" /> by {profile.name}
          </p>
          <p className="font-semibold">
            © {new Date().getFullYear()} OM_OS v1.0.4. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
