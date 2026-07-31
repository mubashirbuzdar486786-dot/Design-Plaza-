import React from 'react';
import { CATEGORIES } from '../data/templates';
import { CategoryNiche } from '../types';
import { 
  Sun, 
  Utensils, 
  Cpu, 
  HeartPulse, 
  Building2, 
  Dumbbell, 
  Sparkles, 
  Scale, 
  Coins, 
  ShoppingBag, 
  Grid,
  HardHat,
  Hotel,
  Car,
  Sofa,
  GraduationCap,
  Smile,
  Shirt,
  Camera,
  Plane,
  Truck,
  Scissors,
  Gem,
  Coffee
} from 'lucide-react';

interface CategoryMarqueeProps {
  selectedCategory: CategoryNiche;
  onSelectCategory: (category: CategoryNiche) => void;
}

export const CategoryMarquee: React.FC<CategoryMarqueeProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-orange-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-500" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-cyan-500" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-emerald-500" />;
      case 'Dumbbell': return <Dumbbell className="w-5 h-5 text-rose-500" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-pink-500" />;
      case 'Scale': return <Scale className="w-5 h-5 text-indigo-500" />;
      case 'Coins': return <Coins className="w-5 h-5 text-purple-500" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-teal-500" />;
      case 'HardHat': return <HardHat className="w-5 h-5 text-amber-400" />;
      case 'Hotel': return <Hotel className="w-5 h-5 text-sky-400" />;
      case 'Car': return <Car className="w-5 h-5 text-red-500" />;
      case 'Sofa': return <Sofa className="w-5 h-5 text-emerald-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-violet-400" />;
      case 'Smile': return <Smile className="w-5 h-5 text-cyan-400" />;
      case 'Shirt': return <Shirt className="w-5 h-5 text-fuchsia-400" />;
      case 'Camera': return <Camera className="w-5 h-5 text-yellow-400" />;
      case 'Plane': return <Plane className="w-5 h-5 text-sky-400" />;
      case 'Truck': return <Truck className="w-5 h-5 text-blue-400" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-amber-500" />;
      case 'Gem': return <Gem className="w-5 h-5 text-pink-400" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-lime-400" />;
      default: return <Grid className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section className="py-12 bg-slate-900 border-y border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Explore Business Niches</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pick Your Industry Template Category
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Every category features custom 3D elements, micro-interactions, responsive device support, and instant lead booking engines.
          </p>
        </div>

        {/* Category Horizontal Scroll Cards */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none snap-x">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  onSelectCategory(cat.name);
                  // Scroll to templates section
                  const el = document.getElementById('templates');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`snap-start shrink-0 min-w-[200px] p-4 rounded-2xl border text-left transition-all duration-300 transform hover:-translate-y-1 ${
                  isSelected
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-400 text-white shadow-xl shadow-blue-600/30 ring-2 ring-blue-400/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-slate-900 border border-slate-800'}`}>
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {cat.count} Demos
                  </span>
                </div>

                <h3 className="text-sm font-bold truncate mb-1">
                  {cat.name}
                </h3>
                <p className={`text-[11px] line-clamp-2 font-normal ${
                  isSelected ? 'text-blue-100' : 'text-slate-400'
                }`}>
                  {cat.desc}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
