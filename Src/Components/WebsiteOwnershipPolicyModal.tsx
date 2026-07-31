import React from 'react';
import { X, ShieldCheck, CheckCircle2, LayoutGrid, CreditCard, Rocket, Sparkles } from 'lucide-react';

interface WebsiteOwnershipPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebsiteOwnershipPolicyModal: React.FC<WebsiteOwnershipPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const categories = [
    'Restaurants', 'Solar Companies', 'Law Firms', 'Real Estate', 'Gyms', 'Medical Clinics',
    'E-commerce Stores', 'Construction Companies', 'Cleaning Services', 'Roofing Companies',
    'Plumbing', 'Electricians', 'Salons', 'Schools', 'Hotels', 'Travel Agencies', 'AI Businesses',
    'Startups', 'And many more.'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-white">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white font-mono">
              Why Choose Design Plaza & Website Policy
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300 scrollbar-thin">
          
          {/* Section 1: Intro */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 text-blue-400 font-bold font-mono text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Why Choose Design Plaza</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold">
              At Design Plaza, you can order any type of professional website for your business.
            </p>

            <div className="pt-2 space-y-2">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                We design websites for:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs text-slate-300">
                {categories.map((cat, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="truncate">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Plans */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-sm">
              <CreditCard className="w-4 h-4" />
              <span>We offer both:</span>
            </div>
            
            <ul className="space-y-2 text-xs text-slate-200 font-semibold">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>One-Time Website Plans</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Monthly Premium Plans</span>
              </li>
            </ul>

            <div className="pt-2 space-y-2 border-t border-slate-800/80">
              <p className="text-xs font-bold text-slate-300 font-mono uppercase">
                Monthly Premium Plans include services such as:
              </p>
              <ul className="space-y-1 text-xs text-slate-400 pl-2">
                <li>• Basic plan</li>
                <li>• Growth plan</li>
                <li>• Premium plan</li>
              </ul>

              <div className="mt-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-blue-400 font-bold font-mono text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Website Care Plans Subscription Notice</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                  All Website Care Plans are monthly services. If the subscription is not renewed, the website will continue to work normally, but future updates, maintenance, SEO, blog management, support, and premium services will stop until the plan is renewed.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Process */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 font-bold font-mono text-sm">
              <Rocket className="w-4 h-4" />
              <span>How Our Process Works</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                <span className="font-bold text-blue-400 font-mono">Step 1:</span>
                <p className="text-slate-200">Choose your website type.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                <span className="font-bold text-indigo-400 font-mono">Step 2:</span>
                <p className="text-slate-200">Select your preferred plan.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                <span className="font-bold text-emerald-400 font-mono">Step 3:</span>
                <p className="text-slate-200">Our team designs and develops your website.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                <span className="font-bold text-amber-400 font-mono">Step 4:</span>
                <p className="text-slate-200">Once your website is completed and approved by you, payment will be collected.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                <span className="font-bold text-purple-400 font-mono">Step 5:</span>
                <p className="text-slate-200">After payment, your website will be delivered.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between shrink-0">
          <a
            href="/rules"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              window.history.pushState({}, '', '/rules');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs text-blue-400 underline hover:text-blue-300 font-semibold"
          >
            Open Full Policy Page (/rules)
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
          >
            I Understand & Close
          </button>
        </div>

      </div>
    </div>
  );
};

