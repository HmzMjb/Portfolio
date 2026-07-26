import { useState, useEffect } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import useMagnetic from '../hooks/useMagnetic';

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const roles = ['Full-Stack Developer', 'ML Engineer', 'Data Science', 'CS Student'];
const TYPING_SPEED = 80;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 2000;

function useTypingEffect() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.slice(0, text.length + 1));
          if (text.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
          }
        } else {
          setText(currentRole.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return text;
}

function MagneticButton({ children, className, href, ...props }) {
  const { style, handleMouseMove, handleMouseLeave } = useMagnetic({ strength: 0.3 });

  return (
    <a
      href={href}
      className={`magnetic-btn ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const typedText = useTypingEffect();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <ParticleBackground />
        <div className="animate-float absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="animate-float-delay absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(30,30,58,0.4) 0%, #0a0a1a 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="hero-enter hero-enter-delay-1 text-primary font-medium tracking-[0.25em] uppercase text-xs mb-6">
          Welcome to my portfolio
        </p>

        <h1 className="hero-enter hero-enter-delay-2 font-heading text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.1]">
          Hamza{' '}
          <span className="gradient-text-animated">Mujeeb</span>
        </h1>

        <p className="hero-enter hero-enter-delay-3 text-xl md:text-2xl text-text-muted font-light mb-8 tracking-wide h-9">
          <span className="text-white/80">{typedText}</span>
          <span className="typing-cursor" />
        </p>

        <p className="hero-enter hero-enter-delay-4 text-text-muted/70 max-w-lg mx-auto mb-10 leading-relaxed text-[15px]">
          Final-year Computer Science student with hands-on experience across
          the full development lifecycle — from training machine learning models
          to building full-stack web applications.
        </p>

        <div className="hero-enter hero-enter-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-24">
          <MagneticButton
            href="#projects"
            className="btn-shine px-8 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary-light transition-all duration-300 shadow-lg shadow-primary/20 text-sm hover:shadow-primary/30 hover:shadow-xl"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="px-8 py-3 border border-dark-border/60 text-white/80 font-medium rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-300 text-sm"
          >
            Contact Me
          </MagneticButton>
        </div>

        <div className="hero-enter hero-enter-delay-5 flex items-center justify-center gap-4">
          {[
            { icon: <GithubIcon />, href: 'https://github.com/Hmz-Mjb', label: 'GitHub' },
            { icon: <LinkedinIcon />, href: 'https://linkedin.com/in/hamza-mujeeb-303792227', label: 'LinkedIn' },
            { icon: <Mail size={18} />, href: 'mailto:Hamzamujeeb196@gmail.com', label: 'Email' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label !== 'Email' ? '_blank' : undefined}
              rel={item.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="p-2.5 rounded-lg border border-dark-border/40 text-text-muted/50 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-110"
              aria-label={item.label}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted hover:text-primary transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
