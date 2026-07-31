import React, { useState, useEffect } from 'react';
import { Heart, Scale, ArrowUp } from 'lucide-react';

interface FloatingControlsProps {
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  wishlistCount: number;
  compareCount: number;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  onOpenWishlist,
  onOpenCompare,
  wishlistCount,
  compareCount
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">

      {/* Compare Drawer Quick Button */}
      {compareCount > 0 && (
        <button
          onClick={onOpenCompare}
          className="pointer-events-auto relative p-3 rounded-2xl bg-slate-900 border border-slate-700 text-white shadow-2xl hover:bg-slate-800 transition-transform hover:scale-105"
          title="Compare Templates"
        >
          <Scale className="w-5 h-5 text-blue-400" />
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-slate-950">
            {compareCount}
          </span>
        </button>
      )}

      {/* Wishlist Quick Button */}
      {wishlistCount > 0 && (
        <button
          onClick={onOpenWishlist}
          className="pointer-events-auto relative p-3 rounded-2xl bg-slate-900 border border-slate-700 text-white shadow-2xl hover:bg-slate-800 transition-transform hover:scale-105"
          title="Saved Templates"
        >
          <Heart className="w-5 h-5 text-rose-500 fill-current" />
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-slate-950">
            {wishlistCount}
          </span>
        </button>
      )}

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white shadow-xl hover:bg-slate-800 transition-all"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};
