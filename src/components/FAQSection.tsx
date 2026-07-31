import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is included in each interactive 3D website demo?',
      a: 'Each Design Plaza template is a complete, production-ready website featuring interactive 3D visualizers, custom color theme switchers, device preview controls, responsive layout components, and instant booking forms.'
    },
    {
      q: 'Do I get 100% full source code ownership after booking?',
      a: 'Yes, absolutely! Unlike proprietary website builders with recurring lock-ins, Design Plaza hands over 100% clean, unminified TypeScript/React/Tailwind source code with full commercial rights.'
    },
    {
      q: 'How fast can my website be customized and deployed?',
      a: 'Our standard delivery timeline is 2 to 3 days. For urgent client launches, we offer Express 24-48 Hour delivery add-on with dedicated engineering sync.'
    },
    {
      q: 'Can I connect my custom domain and existing backend APIs?',
      a: 'Yes! Our team configures your custom DNS, SSL certificates, lead capture webhooks (Email, HubSpot, Salesforce, Stripe), and host environment on Vercel or Cloud Run.'
    },
    {
      q: 'What if I need custom features not shown in the templates?',
      a: 'You can use our Custom Request Form or AI Recommendation Wizard to describe your bespoke 3D models, backend APIs, or multi-language needs for a custom proposal.'
    }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light border-t border-slate-800/80 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
