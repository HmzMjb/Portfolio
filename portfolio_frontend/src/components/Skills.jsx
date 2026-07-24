import { Code2, Brain, Globe, Wrench } from 'lucide-react';
import useTilt from '../hooks/useTilt';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['Python', 'JavaScript', 'Dart'],
    color: 'from-blue-500/20 to-blue-600/5',
  },
  {
    title: 'ML & Data Science',
    icon: Brain,
    skills: [
      'XGBoost', 'Random Forest', 'SVM', 'KNN',
      'Decision Trees', 'PCA', 'K-Means', 'Pandas', 'NumPy', 'EDA',
    ],
    color: 'from-purple-500/20 to-purple-600/5',
  },
  {
    title: 'Web Development',
    icon: Globe,
    skills: ['React', 'Tailwind CSS', 'Express.js', 'REST APIs', 'JWT Auth', 'Google OAuth', 'MongoDB'],
    color: 'from-emerald-500/20 to-emerald-600/5',
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    skills: ['FastAPI', 'Flutter', 'Git / GitHub', 'Jupyter', 'Google Colab', 'VS Code', 'PyCharm'],
    color: 'from-amber-500/20 to-amber-600/5',
  },
];

function SkillCard({ cat, catIndex }) {
  const { style, handleMouseMove, handleMouseLeave } = useTilt({ maxTilt: 6, scale: 1.02 });
  const Icon = cat.icon;

  return (
    <div
      className={`fade-in-up stagger-${catIndex + 1} tilt-card group p-7 bg-dark-card border border-dark-border rounded-2xl card-glow cursor-default`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-3.5 mb-5">
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon size={18} className="text-primary" />
        </div>
        <h3 className="font-heading font-semibold text-white text-sm">
          {cat.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {cat.skills.map((skill) => (
          <span
            key={skill}
            className="skill-tag px-2.5 py-1 text-xs text-text-muted/80 bg-dark-surface border border-dark-border/60 rounded-md cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-40 px-6 bg-dark-surface/50">
      <div className="max-w-5xl mx-auto">
        <div className="fade-in-up text-center mb-20">
          <p className="text-primary font-medium tracking-[0.25em] uppercase text-xs mb-4">
            Skills
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Technical{' '}
            <span className="text-primary">Expertise</span>
          </h2>
          <div className="section-line mx-auto mt-5" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {skillCategories.map((cat, catIndex) => (
            <SkillCard key={cat.title} cat={cat} catIndex={catIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}
