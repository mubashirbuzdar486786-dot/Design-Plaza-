import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import { TemplateDemo } from '../types';
import { PolicyCheckbox } from './PolicyCheckbox';
import { 
  X, 
  Scale, 
  Check, 
  Clock, 
  Star, 
  Send, 
  Trash2 
} from 'lucide-react';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  compareIds: string[];
  onRemoveCompare: (id: string) => void;
  onBookTemplate: (template: TemplateDemo) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  isOpen,
  onClose,
  compareIds,
  onRemoveCompare,
  onBookTemplate
}) => {
  const [agreedMap, setAgreedMap] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const comparedTemplates = TEMPLATES.filter((t) => compareIds.includes(t.id));

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-slate-900 border-t border-slate-800 shadow-2xl p-4 sm:p-6 text-white max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">
              Compare Templates Side-by-Side ({comparedTemplates.length} Selected)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {comparedTemplates.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No templates selected for comparison. Click the scale icon on any template card to compare up to 3 designs.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparedTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {tmpl.niche}
                    </span>
                    <button
                      onClick={() => onRemoveCompare(tmpl.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-white line-clamp-1">{tmpl.title}</h4>

                  <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-800">
                    <img src={tmpl.thumbnail} alt={tmpl.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Price:</span>
                      <span className="font-extrabold text-emerald-400 font-mono">${tmpl.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Animation Level:</span>
                      <span className="font-bold text-blue-400">{tmpl.animationLevel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Delivery:</span>
                      <span className="font-semibold text-white">{tmpl.deliveryDays} Days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Rating:</span>
                      <span className="font-bold text-amber-400">{tmpl.rating} ⭐</span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-800/80">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Key Features</p>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {tmpl.keyFeatures.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-1.5 truncate">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <PolicyCheckbox
                      id={`chk-cmp-${tmpl.id}`}
                      checked={!!agreedMap[tmpl.id]}
                      onChange={(val) => setAgreedMap(prev => ({ ...prev, [tmpl.id]: val }))}
                    />
                  </div>
                </div>

                <button
                  disabled={!agreedMap[tmpl.id]}
                  onClick={() => onBookTemplate(tmpl)}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 mt-2 transition-all ${
                    agreedMap[tmpl.id]
                      ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-lg shadow-blue-600/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                  title={agreedMap[tmpl.id] ? 'Book this template' : 'Please agree to the Website Ownership Policy first'}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Book This Template</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
