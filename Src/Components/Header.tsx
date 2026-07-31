import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  Sparkles, 
  Search, 
  Heart, 
  Scale, 
  Sun, 
  Moon, 
  Layers, 
  Send, 
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenCompare: () => void;
  onOpenWishlist: () => void;
  onOpenCustomQuote: () => void;
  onSelectCategory: (cat: any) => void;
  wishlistCount: number;
  compareCount: number;
  activeSection: string;
  onNavigateRules?: () => void;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  onOpenCompare,
  onOpenWishlist,
  onOpenCustomQuote,
  onSelectCategory,
  wishlistCount,
  compareCount,
  activeSection,
  onNavigateRules,
  onNavigateHome
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRulesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateRules) {
      onNavigateRules();
    } else {
      window.history.pushState({}, '', '/rules');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/20'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Design Plaza 2026 Release: Explore Live Animated Website Demos & Instant 3D Previews</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="/" onClick={handleLogoClick} className="focus:outline-none">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a
              href="#templates"
              onClick={(e) => {
                if (window.location.pathname !== '/') {
                  e.preventDefault();
                  if (onNavigateHome) onNavigateHome();
                  setTimeout(() => {
                    const el = document.getElementById('templates');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="hover:text-white transition-colors"
            >
              Templates
            </a>
            <a
              href="#extra-services"
              onClick={(e) => {
                if (window.location.pathname !== '/') {
                  e.preventDefault();
                  if (onNavigateHome) onNavigateHome();
                  setTimeout(() => {
                    const el = document.getElementById('extra-services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>Add-ons</span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">20+</span>
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                if (window.location.pathname !== '/') {
                  e.preventDefault();
                  if (onNavigateHome) onNavigateHome();
                  setTimeout(() => {
                    const el = document.getElementById('pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#process"
              onClick={(e) => {
                if (window.location.pathname !== '/') {
                  e.preventDefault();
                  if (onNavigateHome) onNavigateHome();
                  setTimeout(() => {
                    const el = document.getElementById('process');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="/rules"
              onClick={handleRulesClick}
              className="hover:text-emerald-400 text-slate-300 font-bold transition-colors flex items-center gap-1.5"
            >
              <span>Rules</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </a>
            <button
              onClick={onOpenCustomQuote}
              className="hover:text-white transition-colors"
            >
              Custom Request
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Compare Button */}
            <button
              onClick={onOpenCompare}
              className="relative p-2 rounded-full text-slate-400 hover:text-white transition-colors"
              title="Compare Templates"
            >
              <Scale className="w-4 h-4" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full text-slate-400 hover:text-white transition-colors"
              title="Saved Templates"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Start Project CTA Button */}
            <button
              onClick={onOpenCustomQuote}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-semibold text-white transition-all shadow-lg shadow-blue-600/20"
            >
              Start Project
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 text-white p-5 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3 font-medium text-sm">
            <a
              href="#templates"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-800 hover:text-emerald-400"
            >
              Browse Animated Demos
            </a>
            <a
              href="#extra-services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-800 hover:text-emerald-400 flex items-center justify-between"
            >
              <span>Extra Services & Add-ons</span>
              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">20 Services</span>
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-800 hover:text-emerald-400"
            >
              Pricing Plans
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-800 hover:text-emerald-400"
            >
              How It Works
            </a>
            <a
              href="/rules"
              onClick={handleRulesClick}
              className="py-2 border-b border-slate-800 text-emerald-400 font-bold hover:text-emerald-300 flex items-center justify-between"
            >
              <span>Rules (Website Ownership Policy)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomQuote();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Book Custom Website
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
