import React, { useState } from 'react';
import { PolicyCheckbox } from './PolicyCheckbox';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  Globe,
  ArrowUpRight,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [agreedPolicy, setAgreedPolicy] = useState(false);

  const EMAIL_ADDRESS = "mubashirbuzdar486786@gmail.com";
  const EMAIL_SUBJECT = "New Website Inquiry";
  const EMAIL_BODY = `Hello Design Plaza,

My Name:
Business Name:
Website Category:
Selected Plan:
Required Features:
Budget:
Project Details:

Please contact me regarding my website project.`;

  const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact-us" className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      
      {/* Anchor target compatibility */}
      <div id="custom-quote" className="absolute -top-24 left-0 w-0 h-0 opacity-0 pointer-events-none" />
      <div id="contact" className="absolute -top-24 left-0 w-0 h-0 opacity-0 pointer-events-none" />

      {/* Atmospheric Ambient Lighting Radial Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-blue-600/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-indigo-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-emerald-500/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>USA Senior Web Agency Concierge</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-mono">
            Get In Touch & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Order Your Website</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Ready to elevate your digital presence with high-converting 3D animations and custom website engineering? Reach out directly to our engineering team.
          </p>
        </div>

        {/* Modern Animated USA Agency Card */}
        <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-slate-800/80 via-slate-900 to-slate-950 shadow-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-500">
          
          {/* Subtle Outer Glow Effect on Hover */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500 -z-10" />

          <div className="bg-slate-950/90 rounded-[22px] p-6 sm:p-10 md:p-12 backdrop-blur-xl relative overflow-hidden space-y-8">
            
            {/* Top Info Banner Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    Official Business Inquiry Line
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase tracking-wider">
                      Direct Concierge
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Average Response Time: <strong>Under 24 Hours</strong></span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Engineers Online</span>
              </div>
            </div>

            {/* Email Address Interactive Display Box */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-blue-400 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Agency Email Address
                  </span>
                  <a 
                    href={mailtoUrl}
                    className="text-base sm:text-xl font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors truncate block"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                </div>
              </div>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
                title="Copy Email Address to Clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Mandatory Instruction Note */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-indigo-950/40 border border-blue-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-400">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>How To Order Your Custom Website</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                To order a website, please send us an email with your business details, selected website category, preferred plan, required features, and budget. Our team will reply within 24 hours.
              </p>
            </div>

            {/* Send Email Action CTA Button */}
            <div className="pt-2 space-y-3">
              <PolicyCheckbox
                id="chk-contact-order"
                checked={agreedPolicy}
                onChange={setAgreedPolicy}
              />
              <a
                href={agreedPolicy ? mailtoUrl : '#'}
                onClick={(e) => {
                  if (!agreedPolicy) e.preventDefault();
                }}
                className={`w-full py-5 px-8 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl transition-all group/btn ${
                  agreedPolicy
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-400 hover:via-teal-400 hover:to-blue-500 text-slate-950 shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
                title={agreedPolicy ? 'Send Email Now' : 'Please agree to the Website Ownership Policy first'}
              >
                <Mail className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                <span>Send Email Now</span>
                <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Trust & Guarantee Badges Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Full Source Code Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Fixed Price • No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>24/7 Dedicated Client Support</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
