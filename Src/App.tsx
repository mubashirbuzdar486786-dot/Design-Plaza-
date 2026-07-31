import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryMarquee } from './components/CategoryMarquee';
import { TemplateGrid } from './components/TemplateGrid';
import { ExtraServicesSection } from './components/ExtraServicesSection';
import { InteractiveLiveDemoModal } from './components/InteractiveLiveDemoModal';
import { CompareDrawer } from './components/CompareDrawer';
import { CustomQuoteSection } from './components/CustomQuoteSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialsMarquee } from './components/TestimonialsMarquee';
import { ProcessTimeline } from './components/ProcessTimeline';
import { TechStackBanner } from './components/TechStackBanner';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingControls } from './components/FloatingControls';
import { AiChatWidget } from './components/AiChatWidget';
import { WebsiteOwnershipPolicyPage } from './components/WebsiteOwnershipPolicyPage';
import { CategoryNiche, TemplateDemo, ExtraService } from './types';
import { TEMPLATES } from './data/templates';
import { EXTRA_SERVICES } from './data/extraServices';

const BUSINESS_EMAIL = "mubashirbuzdar486786@gmail.com";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryNiche>('All');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Wishlist & Compare State
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Extra Services / Addons State
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  // Modals & Drawers State
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState<boolean>(false);
  const [demoTemplate, setDemoTemplate] = useState<TemplateDemo | null>(null);

  // Helper to trigger email inquiry with pre-filled parameters and scroll to Contact Us
  const triggerEmailInquiry = (planName?: string, categoryName?: string, budgetText?: string) => {
    const subject = encodeURIComponent("New Website Inquiry");
    const body = encodeURIComponent(`Hello Design Plaza,\n\nMy Name:\nBusiness Name:\nWebsite Category: ${categoryName || selectedCategory || 'General'}\nSelected Plan: ${planName || 'Custom Website'}\nRequired Features:\nBudget: ${budgetText || ''}\nProject Details:\n\nPlease contact me regarding my website project.`);
    
    // Scroll smoothly to contact section
    const el = document.getElementById('contact-us');
    if (el) el.scrollIntoView({ behavior: 'smooth' });

    // Open mail client
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
  };

  // Apply dark mode class to root HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Wishlist toggle
  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Compare toggle (max 3)
  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  // Addon toggle
  const handleToggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Triggers
  const handleOpenLiveDemo = (template: TemplateDemo) => {
    setDemoTemplate(template);
  };

  const handleBookTemplate = (template: TemplateDemo) => {
    triggerEmailInquiry(template.title, template.niche, `$${template.price}`);
  };

  const handleBookWithAddons = (addons: ExtraService[]) => {
    const addonTitles = addons.map(a => a.title).join(', ');
    triggerEmailInquiry(`Selected Add-ons: ${addonTitles}`, selectedCategory);
  };

  const handleRequestQuoteForAddon = (service: ExtraService) => {
    triggerEmailInquiry(`Add-on: ${service.title}`, service.category, `$${service.startingPrice}`);
  };

  const handleSelectFeaturedDemo = () => {
    setDemoTemplate(TEMPLATES[0]);
  };

  const handleOpenCustomQuote = () => {
    const el = document.getElementById('contact-us');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentPath === '/rules') {
    return (
      <div className={`min-h-screen font-sans transition-colors duration-300 ${
        darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenCompare={() => setIsCompareDrawerOpen(true)}
          onOpenWishlist={() => {
            window.history.pushState({}, '', '/#templates');
            setCurrentPath('/');
          }}
          onOpenCustomQuote={() => {
            window.history.pushState({}, '', '/#contact-us');
            setCurrentPath('/');
          }}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            window.history.pushState({}, '', '/#templates');
            setCurrentPath('/');
          }}
          wishlistCount={wishlistIds.length}
          compareCount={compareIds.length}
          activeSection="rules"
        />

        <WebsiteOwnershipPolicyPage />

        <Footer />

        <AiChatWidget
          onSelectTemplate={(tmpl) => setDemoTemplate(tmpl)}
          onOpenCustomQuote={() => {
            window.history.pushState({}, '', '/#contact-us');
            setCurrentPath('/');
          }}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCompare={() => setIsCompareDrawerOpen(true)}
        onOpenWishlist={() => {
          setSelectedCategory('All');
          const el = document.getElementById('templates');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomQuote={handleOpenCustomQuote}
        onSelectCategory={setSelectedCategory}
        wishlistCount={wishlistIds.length}
        compareCount={compareIds.length}
        activeSection=""
      />

      {/* Main Hero Section */}
      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSelectFlagshipDemo={handleSelectFeaturedDemo}
      />

      {/* Infinite Tech Stack Ticker */}
      <TechStackBanner />

      {/* Category Selection Bar */}
      <CategoryMarquee
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Marketplace Template Portfolio */}
      <TemplateGrid
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        compareIds={compareIds}
        onToggleCompare={handleToggleCompare}
        onOpenLiveDemo={handleOpenLiveDemo}
        onBookTemplate={handleBookTemplate}
      />

      {/* How Design Plaza Works Process Timeline */}
      <ProcessTimeline />

      {/* Premium Extra Services (Add-ons) Section */}
      <ExtraServicesSection
        selectedAddonIds={selectedAddonIds}
        onToggleAddon={handleToggleAddon}
        onBookWithAddons={handleBookWithAddons}
        onRequestQuoteForAddon={handleRequestQuoteForAddon}
      />

      {/* Pricing Packages */}
      <PricingSection
        onSelectTier={(tierName, price) => {
          triggerEmailInquiry(`${tierName} Package`, selectedCategory, `$${price}`);
        }}
      />

      {/* Verified Customer Reviews */}
      <TestimonialsMarquee />

      {/* Custom Proposal Contact Us Section */}
      <CustomQuoteSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Floating Action Controls */}
      <FloatingControls
        onOpenWishlist={() => {
          const el = document.getElementById('templates');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCompare={() => setIsCompareDrawerOpen(true)}
        wishlistCount={wishlistIds.length}
        compareCount={compareIds.length}
      />

      {/* Modals & Overlays */}
      <InteractiveLiveDemoModal
        template={demoTemplate}
        onClose={() => setDemoTemplate(null)}
        onBookTemplate={handleBookTemplate}
      />

      <CompareDrawer
        isOpen={isCompareDrawerOpen}
        onClose={() => setIsCompareDrawerOpen(false)}
        compareIds={compareIds}
        onRemoveCompare={(id) => handleToggleCompare(id)}
        onBookTemplate={(tmpl) => {
          setIsCompareDrawerOpen(false);
          handleBookTemplate(tmpl);
        }}
      />

      {/* AI Chat Assistant Widget */}
      <AiChatWidget
        onSelectTemplate={(tmpl) => setDemoTemplate(tmpl)}
        onOpenCustomQuote={() => {
          const el = document.getElementById('custom-quote');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

    </div>
  );
}
