import React from 'react';
import { Cpu, Zap, Code2, Layers, ShieldCheck } from 'lucide-react';

export const TechStackBanner: React.FC = () => {
  const techs = [
    'React 19',
    'Three.js 3D Shaders',
    'GSAP Animations',
    'Framer Motion',
    'Tailwind CSS v4',
    'Express API Engine',
    'Google GenAI SDK',
    'Vercel Deployment',
    'Lighthouse 95+ Speed',
    'WCAG AA Accessibility'
  ];

  return (
    <div className="py-8 bg-slate-950 border-y border-slate-800/80 overflow-hidden text-slate-400 text-xs font-semibold uppercase tracking-widest">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-around gap-8 flex-wrap">
        {techs.map((t) => (
          <div key={t} className="flex items-center gap-2 hover:text-white transition-colors">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
