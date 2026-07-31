import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  Utensils, 
  Sun, 
  Scale, 
  Building2, 
  Dumbbell, 
  Stethoscope, 
  ShoppingCart, 
  HardHat, 
  Sparkle, 
  Home, 
  Wrench, 
  Zap, 
  Scissors, 
  GraduationCap, 
  Hotel, 
  Plane, 
  Cpu, 
  Rocket, 
  PlusCircle,
  CheckCircle2,
  Clock,
  LayoutGrid,
  CreditCard,
  Code2,
  Check,
  Send
} from 'lucide-react';

interface WebsiteOwnershipPolicyPageProps {
  onBackToHome?: () => void;
}

export const WebsiteOwnershipPolicyPage: React.FC<WebsiteOwnershipPolicyPageProps> = ({ onBackToHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const businessCategories = [
    { name: 'Restaurants', icon: <Utensils className="w-4 h-4 text-amber-400" /> },
    { name: 'Solar Companies', icon: <Sun className="w-4 h-4 text-yellow-400" /> },
    { name: 'Law Firms', icon: <Scale className="w-4 h-4 text-blue-400" /> },
    { name: 'Real Estate', icon: <Building2 className="w-4 h-4 text-indigo-400" /> },
    { name: 'Gyms', icon: <Dumbbell className="w-4 h-4 text-red-400" /> },
    { name: 'Medical Clinics', icon: <Stethoscope className="w-4 h-4 text-emerald-400" /> },
    { name: 'E-commerce Stores', icon: <ShoppingCart className="w-4 h-4 text-teal-400" /> },
    { name: 'Construction Companies', icon: <HardHat className="w-4 h-4 text-orange-400" /> },
    { name: 'Cleaning Services', icon: <Sparkle className="w-4 h-4 text-sky-400" /> },
    { name: 'Roofing Companies', icon: <Home className="w-4 h-4 text-rose-400" /> },
    { name: 'Plumbing', icon: <Wrench className="w-4 h-4 text-cyan-400" /> },
    { name: 'Electricians', icon: <Zap className="w-4 h-4 text-yellow-300" /> },
    { name: 'Salons', icon: <Scissors className="w-4 h-4 text-pink-400" /> },
    { name: 'Schools', icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
    { name: 'Hotels', icon: <Hotel className="w-4 h-4 text-emerald-300" /> },
    { name: 'Travel Agencies', icon: <Plane className="w-4 h-4 text-blue-300" /> },
    { name: 'AI Businesses', icon: <Cpu className="w-4 h-4 text-indigo-300" /> },
    { name: 'Startups', icon: <Rocket className="w-4 h-4 text-amber-300" /> },
    { name: 'And many more.', icon: <PlusCircle className="w-4 h-4 text-slate-400" /> }
  ];

  const processSteps = [
    {
      step: 'Step 1',
      title: 'Choose your website type.',
      desc: 'Browse and select the website category tailored to your business industry.',
      icon: <LayoutGrid className="w-5 h-5 text-blue-400" />
    },
    {
      step: 'Step 2',
      title: 'Select your preferred plan.',
      desc: 'Pick between a One-Time Website Plan or a Monthly Premium Plan.',
      icon: <CreditCard className="w-5 h-5 text-indigo-400" />
    },
    {
      step: 'Step 3',
      title: 'Our team designs and develops your website.',
      desc: 'Our USA lead engineers craft your full high-performance responsive website.',
      icon: <Code2 className="w-5 h-5 text-emerald-400" />
    },
    {
      step: 'Step 4',
      title: 'Once your website is completed and approved by you, payment will be collected.',
      desc: 'Review your complete live website preview. Payment is collected only after your full satisfaction.',
      icon: <CheckCircle2 className="w-5 h-5 text-amber-400" />
    },
    {
      step: 'Step 5',
      title: 'After payment, your website will be delivered.',
      desc: 'Full transfer of source code, domain pointing, and live launch deployment.',
      icon: <Send className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={handleHomeClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-bold transition-all shadow-md group"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Marketplace</span>
          </a>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Design Plaza Agency Guide</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest shadow-xl font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Choose Design Plaza</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono uppercase">
            WHY CHOOSE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
              DESIGN PLAZA
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            At Design Plaza, you can order any type of professional website for your business with zero upfront risk and guaranteed high performance.
          </p>
        </div>

        {/* SECTION 1: WE DESIGN WEBSITES FOR */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden group hover:border-blue-500/40 transition-colors">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-mono">We Design Websites For</h2>
              <p className="text-xs text-slate-400">Tailored custom web designs for every major industry and business sector.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {businessCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 hover:border-slate-700 transition-colors shadow-sm"
              >
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                  {cat.icon}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: PLANS OFFERED */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-mono">Flexible Website Plans</h2>
              <p className="text-xs text-slate-400">Transparent pricing tailored for one-time builds or ongoing growth.</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              We offer both:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>One-Time Website Plans</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pay once for complete custom website development with 100% full source code ownership.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Monthly Premium Plans</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ongoing maintenance, hosting, security updates, SEO optimization, and dedicated support.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <p className="text-xs sm:text-sm font-bold text-slate-300 font-mono uppercase">
                Monthly Premium Plans include services such as:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  'Basic plan',
                  'Growth plan',
                  'Premium plan'
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs font-semibold text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Website Care Plans Notice */}
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white font-mono uppercase">
                    Website Care Plans Subscription Notice
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    All Website Care Plans are monthly services. If the subscription is not renewed, the website will continue to work normally, but future updates, maintenance, SEO, blog management, support, and premium services will stop until the plan is renewed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: HOW OUR PROCESS WORKS (TIMELINE CARDS) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-mono">How Our Process Works</h2>
              <p className="text-xs text-slate-400">Step-by-step risk-free workflow from concept to live website delivery.</p>
            </div>
          </div>

          <div className="space-y-4">
            {processSteps.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {s.icon}
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono">
                    {s.step}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white font-mono">{s.title}</h3>
                  <p className="text-xs text-slate-400 font-light">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 text-center space-y-4">
          <h3 className="text-lg font-bold text-white font-mono">Ready to Order Your Business Website?</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Browse our animated website templates or contact our strategy team to select your custom plan today.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <a
              href="/"
              onClick={handleHomeClick}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
            >
              Browse Animated Website Templates
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

