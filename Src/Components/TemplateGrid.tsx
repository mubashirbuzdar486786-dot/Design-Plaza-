import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import { TemplateDemo, CategoryNiche } from '../types';
import { PolicyCheckbox } from './PolicyCheckbox';
import { 
  Eye, 
  Send, 
  Heart, 
  Scale, 
  Star, 
  Clock, 
  Zap, 
  Sparkles, 
  Check, 
  SlidersHorizontal,
  LayoutGrid,
  List
} from 'lucide-react';

interface TemplateGridProps {
  selectedCategory: CategoryNiche;
  onSelectCategory: (cat: CategoryNiche) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  compareIds: string[];
  onToggleCompare: (id: string) => void;
  onOpenLiveDemo: (template: TemplateDemo) => void;
  onBookTemplate: (template: TemplateDemo) => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  setSearchTerm,
  wishlistIds,
  onToggleWishlist,
  compareIds,
  onToggleCompare,
  onOpenLiveDemo,
  onBookTemplate
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price-asc' | 'price-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [agreedTemplates, setAgreedTemplates] = useState<Record<string, boolean>>({});

  // Filter templates
  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesCategory = selectedCategory === 'All' || template.niche === selectedCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.techStack.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <section id="templates" className="py-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 mb-10 border-b border-slate-800 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Animated Demos Portfolio</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Website Marketplace ({sortedTemplates.length} Available)
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Click <strong className="text-emerald-400 font-semibold">"Live Demo"</strong> to test interactive device frames & live 3D rooftop/canvas simulations.
            </p>
          </div>

          {/* Filtering & View Switchers */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900">Featured First</option>
                <option value="rating" className="bg-slate-900">Highest Rated</option>
                <option value="price-asc" className="bg-slate-900">Price: Low to High</option>
                <option value="price-desc" className="bg-slate-900">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {sortedTemplates.length === 0 && (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 space-y-4">
            <p className="text-lg font-bold text-slate-300">No matching website templates found</p>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Try adjusting your search criteria or reset filters to explore all 25+ business website demos.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setSearchTerm('');
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Templates Listing */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          {sortedTemplates.map((template) => {
            const isWishlisted = wishlistIds.includes(template.id);
            const isCompared = compareIds.includes(template.id);

            return (
              <div
                key={template.id}
                className={`group relative rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-blue-500/60 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
                  viewMode === 'list' ? 'md:flex-row' : ''
                }`}
              >
                {/* Thumbnail Image Container */}
                <div
                  className={`relative overflow-hidden bg-slate-950 ${
                    viewMode === 'list' ? 'md:w-2/5 aspect-[16/10]' : 'aspect-[16/10]'
                  }`}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold uppercase border border-white/10 text-white">
                      {template.niche}
                    </span>
                    {template.badge && (
                      <span className="px-3 py-1 bg-emerald-500 text-slate-950 rounded-full text-[10px] font-extrabold uppercase shadow-md">
                        {template.badge}
                      </span>
                    )}
                  </div>

                  {/* Top Right Quick Actions (Wishlist & Compare) */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <button
                      onClick={() => onToggleCompare(template.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all ${
                        isCompared
                          ? 'bg-blue-600 text-white'
                          : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
                      }`}
                      title={isCompared ? 'Remove from compare' : 'Add to compare'}
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onToggleWishlist(template.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all ${
                        isWishlisted
                          ? 'bg-rose-500 text-white'
                          : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
                      }`}
                      title={isWishlisted ? 'Saved' : 'Save to wishlist'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={() => onOpenLiveDemo(template)}
                      className="px-5 py-2.5 rounded-full bg-white text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-slate-200 transition-colors shadow-2xl"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Live Demo</span>
                    </button>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Rating & Delivery */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{template.rating}</span>
                        <span className="text-slate-500 font-normal">({template.reviewsCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{template.deliveryDays} Days Delivery</span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                      {template.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {template.subtitle}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {template.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 text-[10px] font-medium border border-slate-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Policy Agreement Checkbox */}
                  <div className="pt-2 border-t border-slate-800">
                    <PolicyCheckbox
                      id={`chk-${template.id}`}
                      checked={!!agreedTemplates[template.id]}
                      onChange={(val) => setAgreedTemplates(prev => ({ ...prev, [template.id]: val }))}
                    />
                  </div>

                  {/* Pricing & Footer Actions */}
                  <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-extrabold text-white">
                          ${template.price}
                        </span>
                        <span className="text-xs text-slate-500 line-through">
                          ${template.originalPrice}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Code Buyout</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenLiveDemo(template)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                      >
                        Demo
                      </button>

                      <button
                        disabled={!agreedTemplates[template.id]}
                        onClick={() => onBookTemplate(template)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                          agreedTemplates[template.id]
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 cursor-pointer'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                        }`}
                        title={agreedTemplates[template.id] ? 'Book this website' : 'Please agree to the Website Ownership Policy first'}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
