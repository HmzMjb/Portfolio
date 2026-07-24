import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import useCounter from '../hooks/useCounter';

function StatCounter({ value, suffix, label }) {
  const [ref, count] = useCounter(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-3xl md:text-4xl font-bold text-primary">
        {count}{suffix}
      </p>
      <p className="text-text-muted text-xs mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="fade-in-up text-center mb-20">
          <p className="text-primary font-medium tracking-[0.25em] uppercase text-xs mb-4">
            About Me
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            A Bit About{' '}
            <span className="text-primary">Myself</span>
          </h2>
          <div className="section-line mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="slide-left">
            <div className="blur-reveal relative w-60 h-60 mx-auto md:mx-0 group">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-6 transition-transform duration-500 group-hover:rotate-3" />
              <div className="absolute inset-0 bg-dark-card border border-dark-border rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary/30">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 30% 30%, #C9A96E 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <span className="font-heading text-7xl font-bold text-primary/30 relative z-10 transition-all duration-500 group-hover:text-primary/50 group-hover:scale-110">
                  HM
                </span>
              </div>
            </div>
          </div>

          <div className="slide-right space-y-7">
            <p className="text-text-muted leading-relaxed">
              I'm a final-year Computer Science student at UIT University,
              Karachi, with a passion for building end-to-end software
              solutions. My expertise spans from training machine learning
              models with Python and XGBoost to crafting full-stack web
              applications with React, Express.js, and MongoDB.
            </p>
            <p className="text-text-muted leading-relaxed">
              I enjoy tackling complex problems independently and have a
              track record of delivering complete projects — from data
              preprocessing and model training to deployment with FastAPI
              and Flutter frontends.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-8 pt-4">
              <StatCounter value={3} suffix="+" label="Projects" />
              <div className="w-px h-10 bg-dark-border" />
              <StatCounter value={10} suffix="+" label="Technologies" />
              <div className="w-px h-10 bg-dark-border" />
              <StatCounter value={2} suffix="+" label="Years Exp" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {[
                { icon: GraduationCap, title: 'BS Computer Science', sub: 'UIT University, Karachi' },
                { icon: Calendar, title: 'Final Year', sub: 'Expected 2026' },
                { icon: MapPin, title: 'Location', sub: 'Karachi, Pakistan' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group/item">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:bg-primary/20 group-hover/item:scale-110">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{item.title}</p>
                    <p className="text-text-muted text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <h3 className="text-white font-heading font-semibold mb-3 text-sm">
                Relevant Coursework
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Object-Oriented Programming',
                  'Data Structures & Algorithms',
                  'Database Systems',
                  'Artificial Intelligence',
                ].map((course, i) => (
                  <span
                    key={course}
                    className={`skill-tag px-3 py-1.5 text-xs text-primary/80 bg-primary/5 border border-primary/10 rounded-full cursor-default stagger-${i + 1}`}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
