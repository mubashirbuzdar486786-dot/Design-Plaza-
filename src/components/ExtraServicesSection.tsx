import React, { useState, useMemo } from 'react';
import { ExtraService } from '../types';
import { EXTRA_SERVICES } from '../data/extraServices';
import { PolicyCheckbox } from './PolicyCheckbox';
import { 
  FileText, 
  Palette, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  PenTool, 
  BookOpen, 
  MapPin, 
  Share2, 
  Bot, 
  MessageCircle, 
  Mail, 
  Languages, 
  BarChart3, 
  Search, 
  Zap, 
  Lock, 
  CreditCard, 
  Calendar, 
  ShoppingCart,
  Check, 
  Plus, 
  Clock, 
  DollarSign, 
  ArrowRight,
  Send,
  ShoppingBag,
  Layers,
  CheckCircle2,
  HelpCircle,
  X
} from 'lucide-react';

interface ExtraServicesSectionProps {
  selectedAddonIds: string[];
  onToggleAddon: (id: string) => void;
  onBookWithAddons: (selectedAddons: ExtraService[]) => void;
  onRequestQuoteForAddon: (service: ExtraService) => void;
}

// Icon mapper helper
const renderServiceIcon = (iconName: string) => {
  const props = { className: "w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" };
  switch (iconName) {
    case 'FileText': return <FileText {...props} />;
    case 'Palette': return <Palette {...props} />;
    case 'Sparkles': return <Sparkles {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'TrendingUp': return <TrendingUp {...props} />;
    case 'PenTool': return <PenTool {...props} />;
    case 'BookOpen': return <BookOpen {...props} />;
    case 'MapPin': return <MapPin {...props} />;
    case 'Share2': return <Share2 {...props} />;
    case 'Bot': return <Bot {...props} />;
    case 'MessageCircle': return <MessageCircle {...props} />;
    case 'Mail': return <Mail {...props} />;
    case 'Languages': return <Languages {...props} />;
    case 'BarChart3': return <BarChart3 {...props} />;
    case 'Search': return <Search {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Lock': return <Lock {...props} />;
    case 'CreditCard': return <CreditCard {...props} />;
    case 'Calendar': return <Calendar {...props} />;
    case 'ShoppingCart': return <ShoppingCart {...props} />;
    default: return <Layers {...props} />;
  }
};

export const ExtraServicesSection: React.FC<ExtraServicesSectionProps> = ({
  selectedAddonIds,
  onToggleAddon,
  onBookWithAddons,
  onRequestQuoteForAddon,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [agreedPolicy, setAgreedPolicy] = useState<boolean>(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(EXTRA_SERVICES.map(s => s.category)));
    return ['All', ...cats];
  }, []);

  // Filtered services
  const filteredServices = useMemo(() => {
    return EXTRA_SERVICES.filter(service => {
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            service.includes.some(inc => inc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Currently selected objects
  const selectedServices = useMemo(() => {
    return EXTRA_SERVICES.filter(s => selectedAddonIds.includes(s.id));
  }, [selectedAddonIds]);

  // Total calculated price of selected add-ons
  const totalAddonsPrice = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.startingPrice, 0);
  }, [selectedServices]);

  return (
    <section id="extra-services" className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background Lighting Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Plaza Add-ons Library</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-mono">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">Extra Services</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
            Supercharge your website project with custom branding, AI integrations, monthly SEO care, speed optimization, and multi-channel marketing add-ons. Select multiple services to calculate total project estimates automatically.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-6 mb-12">
          
          {/* Top Search & Stats Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search extra services (e.g. SEO, Logo, AI Chatbot)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Total Services Count Badge & Selection Summary Indicator */}
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400">
                Showing <strong className="text-white">{filteredServices.length}</strong> of {EXTRA_SERVICES.length} Services
              </span>
              <div className="h-4 w-px bg-slate-800" />
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                {selectedAddonIds.length} Added to Order (${totalAddonsPrice})
              </span>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* 20 Extra Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isSelected = selectedAddonIds.includes(service.id);

            return (
              <div
                key={service.id}
                className={`group relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 scale-[1.02]'
                    : 'bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1'
                }`}
              >
                
                {/* Selection Indicator Badge */}
                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-emerald-500 text-slate-950 rounded-full p-1.5 shadow-lg border-2 border-slate-950 flex items-center justify-center">
                    <Check className="w-4 h-4 font-black" />
                  </div>
                )}

                <div className="space-y-4">
                  
                  {/* Top Bar: Icon + Delivery + Price */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-emerald-500/40 transition-colors shadow-md">
                      {renderServiceIcon(service.iconName)}
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-0.5">
                        <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
                          ${service.startingPrice}
                        </span>
                        {service.priceSuffix && (
                          <span className="text-xs text-slate-400 font-medium">
                            {service.priceSuffix}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-blue-400" />
                        {service.deliveryTime}
                      </span>
                    </div>
                  </div>

                  {/* Category & Title */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                      {service.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1 font-light">
                      {service.description}
                    </p>
                  </div>

                  {/* Included Features Bullet Points */}
                  {service.includes && service.includes.length > 0 && (
                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Included Features:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {service.includes.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

                {/* Card Action Buttons */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                  
                  {/* Add / Remove from Order Button */}
                  <button
                    onClick={() => onToggleAddon(service.id)}
                    className={`w-full py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md ${
                      isSelected
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                        : 'bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>

                  {/* Request Quote Button */}
                  <button
                    onClick={() => onRequestQuoteForAddon(service)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5 text-blue-400" />
                    <span>Request Quote</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>

        {/* Live Floating / Sticky Selected Add-ons Order Bar */}
        {selectedAddonIds.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[92%] bg-slate-900/95 backdrop-blur-xl border border-emerald-500/50 p-4 sm:p-5 rounded-3xl shadow-2xl shadow-emerald-500/20 text-white flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    {selectedAddonIds.length} Add-on{selectedAddonIds.length > 1 ? 's' : ''} Selected
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 font-mono">
                    Est. Add-ons Total: ${totalAddonsPrice}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-md scrollbar-none mt-1">
                  {selectedServices.map(s => (
                    <span 
                      key={s.id} 
                      className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800 shrink-0"
                    >
                      {s.title}
                      <button onClick={() => onToggleAddon(s.id)} className="hover:text-rose-400 ml-1">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <PolicyCheckbox
                id="chk-addons-bar"
                checked={agreedPolicy}
                onChange={setAgreedPolicy}
                className="my-0"
              />
              <button
                disabled={!agreedPolicy}
                onClick={() => onBookWithAddons(selectedServices)}
                className={`w-full md:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 transition-all ${
                  agreedPolicy
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 cursor-pointer active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
                title={agreedPolicy ? 'Book website with selected add-ons' : 'Please agree to the Website Ownership Policy first'}
              >
                <span>Book Website with Selected Add-ons</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
