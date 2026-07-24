import { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import useMagnetic from '../hooks/useMagnetic';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const contactLinks = [
  {
    label: 'Email',
    value: 'Hamzamujeeb196@gmail.com',
    href: 'mailto:Hamzamujeeb196@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    value: '+92-335-2868865',
    href: 'tel:+923352868865',
    icon: Phone,
  },
  {
    label: 'GitHub',
    value: 'github.com/Hmz-Mjb',
    href: 'https://github.com/Hmz-Mjb',
    customIcon: GithubIcon,
  },
  {
    label: 'LinkedIn',
    value: 'hamza-mujeeb-303792227',
    href: 'https://linkedin.com/in/hamza-mujeeb-303792227',
    customIcon: LinkedinIcon,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const { style: magneticStyle, handleMouseMove, handleMouseLeave } = useMagnetic({ strength: 0.2 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', text: 'Message sent successfully!' });
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: data.error || 'Something went wrong' });
      }
    } catch {
      setStatus({ type: 'error', text: 'Failed to connect to server' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-40 px-6 bg-dark-surface/50">
      <div className="max-w-5xl mx-auto">
        <div className="fade-in-up text-center mb-20">
          <p className="text-primary font-medium tracking-[0.25em] uppercase text-xs mb-4">
            Get in Touch
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Contact{' '}
            <span className="text-primary">Me</span>
          </h2>
          <div className="section-line mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="slide-left space-y-8">
            <p className="text-text-muted leading-relaxed">
              I'm currently open to software engineering internship and
              full-time opportunities. Whether you have a question or just
              want to say hi, feel free to reach out!
            </p>

            <div className="space-y-3">
              {contactLinks.map((item, i) => {
                const Icon = item.icon;
                const CustomIcon = item.customIcon;
                const isExternal = item.label !== 'Email' && item.label !== 'Phone';
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={`stagger-${i + 1} fade-in-up flex items-center gap-4 p-4 bg-dark-card border border-dark-border rounded-xl hover:border-primary/30 transition-all duration-300 group`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      {CustomIcon ? (
                        <CustomIcon />
                      ) : (
                        Icon && <Icon size={18} className="text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-text-muted/60 text-[11px] uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-white font-medium text-sm mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="slide-right">
            <form
              className="space-y-5 p-6 sm:p-8 bg-dark-card border border-dark-border rounded-2xl"
              onSubmit={handleSubmit}
            >
              {status && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg text-sm transition-all duration-300 ${
                    status.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}
                  {status.text}
                </div>
              )}

              <div>
                <label className="block text-text-muted/60 text-[11px] uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-text-muted/60 text-[11px] uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-text-muted/60 text-[11px] uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="magnetic-btn btn-shine w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary-light transition-all duration-300 shadow-lg shadow-primary/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-primary/30 hover:shadow-xl"
                style={magneticStyle}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
