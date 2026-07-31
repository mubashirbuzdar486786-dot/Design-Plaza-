import React, { useState } from 'react';
import { Logo } from './Logo';
import { Layers, Send, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-12 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block focus:outline-none">
              <Logo size="lg" />
            </a>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-light">
              World-class animated website marketplace. Browse live interactive 3D website demos across Solar Energy, Fine Dining, SaaS AI, Luxury Real Estate, and Healthcare.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Code Ownership • Fast 48h Delivery</span>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Top Niche Demos</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#templates" className="hover:text-emerald-400 transition-colors">Solara Energy Portal</a></li>
              <li><a href="#templates" className="hover:text-emerald-400 transition-colors">Gourmet Atelier Dining</a></li>
              <li><a href="#templates" className="hover:text-emerald-400 transition-colors">Apex AI SaaS Platform</a></li>
              <li><a href="#templates" className="hover:text-emerald-400 transition-colors">Horizon Telehealth Portal</a></li>
              <li><a href="#templates" className="hover:text-emerald-400 transition-colors">Velox Penthouse Real Estate</a></li>
            </ul>
          </div>

          {/* Marketplace Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#templates" className="hover:text-emerald-400 transition-colors">All 25+ Templates</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing Packages</a></li>
              <li><a href="#process" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#custom-quote" className="hover:text-emerald-400 transition-colors">Custom Quote Request</a></li>
              <li>
                <a 
                  href="/rules" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, '', '/rules');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  <span>Rules & Ownership Policy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Design Plaza Release Pulse</h4>
            <p className="text-xs text-slate-400">Get notified when new 3D animated web demos drop.</p>

            {subscribed ? (
              <p className="text-xs text-emerald-400 font-bold">✔ You are subscribed to Design Plaza updates!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Design Plaza Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for global innovators & creators.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
