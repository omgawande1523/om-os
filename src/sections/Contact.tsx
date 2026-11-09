import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, IdCard, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/profile';
import { github, formatDate } from '../lib/github';
import { PREFILL_CONTACT_EVENT } from '../lib/events';

const links = [
  { name: 'Email', handle: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { name: 'GitHub', handle: `@${profile.githubUsername}`, href: profile.links.github, icon: Github },
  { name: 'LinkedIn', handle: profile.name, href: profile.links.linkedin, icon: Linkedin },
  { name: 'ORCID', handle: profile.links.orcid.replace('https://orcid.org/', ''), href: profile.links.orcid, icon: IdCard },
];

const SOURCE_URL = `${profile.links.github}/om-os`;


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

export default function Contact() {
  const [formData, setFormData] = useState<FormFields>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  useEffect(() => {
    const prefill = (e: Event) => {
      const message = (e as CustomEvent<string>).detail;
      setFormData((prev) => ({ ...prev, message: prev.message || message }));
      requestAnimationFrame(() => document.getElementById('contact-name')?.focus({ preventScroll: true }));
    };
    window.addEventListener(PREFILL_CONTACT_EVENT, prefill);
    return () => window.removeEventListener(PREFILL_CONTACT_EVENT, prefill);
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
    <>
      <section id="contact" aria-labelledby="contact-title" className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black">
        <div className="max-w-7xl mx-auto space-y-8">
          <SectionHeading id="contact" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="lg:col-span-7 bg-neo-surface border-[2.5px] border-black p-5 md:p-6 space-y-4 shadow-nb"
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
                className="nb-press w-full inline-flex items-center justify-center gap-2 font-mono text-xs font-bold bg-black text-neo-bg px-6 py-3 border-2 border-black shadow-nb-sm hover:bg-neo-yellow hover:text-black disabled:opacity-60 disabled:cursor-wait"
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

            <div className="lg:col-span-5 space-y-4">
              <ul className="border-t-[2.5px] border-black">
                {links.map(({ name, handle, href, icon: Icon }) => (
                  <li key={name} className="border-b border-black/15">
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 py-3 px-1 hover:bg-neo-yellow group"
                    >
                      <Icon size={16} aria-hidden="true" className="shrink-0" />
                      <span className="font-mono text-xs font-bold text-black w-16 shrink-0">{name}</span>
                      <span className="font-mono text-xs text-black/80 truncate">{handle}</span>
                      <ArrowUpRight size={14} aria-hidden="true" className="ml-auto shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2 font-mono text-xs text-black/80">
                <MapPin size={14} aria-hidden="true" />
                {profile.location.city}, {profile.location.region}, {profile.location.country} (IST, UTC+5:30)
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full px-4 md:px-8 lg:px-16 py-6 border-t-[2.5px] border-black bg-neo-bg">
        <p className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-black/80">
          <span>© {__BUILD_YEAR__} {profile.name}</span>
          <span aria-hidden="true">·</span>
          <a href={profile.links.orcid} target="_blank" rel="noopener noreferrer" className="underline hover:bg-neo-yellow">
            ORCID
          </a>
          <span aria-hidden="true">·</span>
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline hover:bg-neo-yellow">
            Source
          </a>
          <span aria-hidden="true">·</span>
          <span>last updated {formatDate(github.generatedAt)}</span>
        </p>
      </footer>
    </>
  );
}
