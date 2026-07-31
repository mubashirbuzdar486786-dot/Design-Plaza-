import React, { useState } from 'react';
import { PRICING_TIERS } from '../data/templates';
import { PolicyCheckbox } from './PolicyCheckbox';
import { Check, Sparkles, Send, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: (tierName: string, price: number) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier }) => {
  const [agreedTiers, setAgreedTiers] = useState<Record<string, boolean>>({});
  return (
    <section id="pricing" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing • Zero Hidden Fees</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Choose Your Website Package
          </h2>

          <p className="text-base text-slate-300 font-light">
            Every package includes 100% full source code ownership, ultra-responsive design, speed optimization, and dedicated support.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const isPopular = tier.popular;
            
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-blue-500 shadow-2xl shadow-blue-500/20 ring-2 ring-blue-500/50 scale-105'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 text-slate-950 text-[11px] font-black uppercase tracking-widest shadow-lg">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Name & Tagline */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tier.iconEmoji}</span>
                      <h3 className="text-xl font-extrabold text-white font-mono">{tier.name}</h3>
                    </div>
                    <p className="text-xs font-semibold text-emerald-400 mt-1.5">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-black text-white font-mono">
                        ${tier.price}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        one-time project
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-4 border-t border-slate-800/80">
                    {tier.featuresHeader ? (
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        {tier.featuresHeader}
                      </p>
                    ) : (
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Included Features
                      </p>
                    )}
                    
                    <ul className="space-y-2 text-xs text-slate-300">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Policy Agreement Checkbox */}
                  <div className="pt-4 border-t border-slate-800">
                    <PolicyCheckbox
                      id={`chk-tier-${tier.id}`}
                      checked={!!agreedTiers[tier.id]}
                      onChange={(val) => setAgreedTiers(prev => ({ ...prev, [tier.id]: val }))}
                    />
                  </div>

                </div>

                <button
                  disabled={!agreedTiers[tier.id]}
                  onClick={() => onSelectTier(tier.name, tier.price)}
                  className={`w-full mt-4 py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                    agreedTiers[tier.id]
                      ? isPopular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 cursor-pointer'
                        : 'bg-slate-800 hover:bg-slate-700 text-white cursor-pointer'
                      : 'bg-slate-800/60 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                  title={agreedTiers[tier.id] ? `Get started with ${tier.name}` : 'Please agree to the Website Ownership Policy first'}
                >
                  <Send className="w-4 h-4" />
                  <span>Get Started with {tier.name}</span>
                </button>

              </div>
            );
          })}
        </div>

        {/* Website Care Plans Notice */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800/90 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">
                Website Care Plans Subscription Notice
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                All Website Care Plans are monthly services. If the subscription is not renewed, the website will continue to work normally, but future updates, maintenance, SEO, blog management, support, and premium services will stop until the plan is renewed.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

