import React from 'react';
import { LayoutGrid, CreditCard, Code2, CheckCircle2, Rocket } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Website Type',
      desc: 'Choose your website type from our wide range of business categories.',
      icon: <LayoutGrid className="w-6 h-6 text-blue-400" />
    },
    {
      num: '02',
      title: 'Select Preferred Plan',
      desc: 'Select your preferred plan (One-Time Website or Monthly Premium Plan).',
      icon: <CreditCard className="w-6 h-6 text-indigo-400" />
    },
    {
      num: '03',
      title: 'Design & Development',
      desc: 'Our expert engineering team designs and develops your custom website.',
      icon: <Code2 className="w-6 h-6 text-emerald-400" />
    },
    {
      num: '04',
      title: 'Approval & Payment',
      desc: 'Once your website is completed and approved by you, payment will be collected.',
      icon: <CheckCircle2 className="w-6 h-6 text-amber-400" />
    },
    {
      num: '05',
      title: 'Instant Delivery',
      desc: 'After payment, your complete website and assets will be delivered.',
      icon: <Rocket className="w-6 h-6 text-purple-400" />
    }
  ];

  return (
    <section id="process" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
            Streamlined USA Agency Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono">
            How Our Process Works
          </h2>
          <p className="text-base text-slate-300 font-light">
            Simple 5-step risk-free process from selection to approval, payment, and final delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-3xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all space-y-4 relative group shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-slate-800 group-hover:text-blue-500/40 font-mono transition-colors">
                  {step.num}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

