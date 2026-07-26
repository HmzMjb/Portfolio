import { Car, Sparkles } from 'lucide-react';
import useTilt from '../hooks/useTilt';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const projects = [
  {
    id: 1,
    title: 'PakWheels Car Price Predictor',
    subtitle: 'ML-Powered Price Estimation for the Pakistani Market',
    icon: Car,
    accent: 'from-red-500/15 to-orange-500/5',
    tech: ['XGBoost', 'FastAPI', 'Flutter', 'Python', 'Pandas'],
    description:
      'An AI-powered used car price prediction system trained on ~90,000 PakWheels.com listings covering 48 brands and 292 models with an R\u00B2 score of 0.96.',
    features: [
      'XGBoost regression model achieving R\u00B2 score of 0.96, predicting prices in PKR',
      'FastAPI backend with /predict and /options REST endpoints',
      'Flutter cross-platform app (Android, iOS, Web, Desktop) with searchable dropdowns',
      'Auto-populated from API with 1,471+ car titles and 121 registration cities',
    ],
    github: 'https://github.com/HmzMjb/Car-Price-Prediction',
  },
  {
    id: 2,
    title: 'MAISON Perfume Store',
    subtitle: 'Full-Stack Luxury E-Commerce Platform',
    icon: Sparkles,
    accent: 'from-primary/15 to-amber-500/5',
    tech: ['React', 'Tailwind CSS', 'Express.js', 'MongoDB', 'JWT'],
    description:
      'A full-stack luxury perfume e-commerce platform with role-based access control, Google OAuth, admin dashboard, and complete shopping experience.',
    features: [
      'React + Tailwind CSS frontend with product filtering, cart, and wishlist',
      'Express.js REST API with MongoDB, JWT auth, and Google OAuth 2.0',
      'Admin dashboard with CRUD product management and order tracking',
      'Checkout with COD/online payment, reviews, and newsletter subscription',
    ],
    github: 'https://github.com/HmzMjb/Perfume-Store',
  },
];

function ProjectCard({ project, index }) {
  const { style, handleMouseMove, handleMouseLeave } = useTilt({ maxTilt: 4, scale: 1.01 });
  const Icon = project.icon;

  return (
    <div
      className={`fade-in-up stagger-${index + 1} tilt-card group bg-dark-card/40 border border-dark-border/30 hover:border-primary/20 rounded-2xl p-8 md:p-10 card-glow transition-colors duration-300`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="md:grid md:grid-cols-[1.2fr_1fr] md:gap-10 items-start">
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div
                className={`w-11 h-11 rounded-lg bg-gradient-to-br ${project.accent} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-text-muted text-xs mt-0.5">
                  {project.subtitle}
                </p>
              </div>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-dark-border/40 text-text-muted/50 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-110 shrink-0"
              aria-label="View on GitHub"
            >
              <GithubIcon />
            </a>
          </div>

          <p className="text-text-muted/80 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="skill-tag px-3 py-1.5 text-[11px] font-medium text-primary/70 bg-primary/5 border border-primary/10 rounded-full cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <h4 className="text-white font-heading font-semibold text-sm mb-4">
            Key Features
          </h4>
          <ul className="space-y-3">
            {project.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-text-muted/70 text-sm leading-relaxed"
              >
                <span className="text-primary/60 mt-1 shrink-0 text-[10px]">
                  &#9670;
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="fade-in-up text-center mb-14">
          <p className="text-primary font-medium tracking-[0.25em] uppercase text-xs mb-4">
            Projects
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Featured{' '}
            <span className="text-primary">Work</span>
          </h2>
          <div className="section-line mx-auto mt-5" />
        </div>

        <div className="space-y-14">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
