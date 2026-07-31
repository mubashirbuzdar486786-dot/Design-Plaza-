import React, { useState, useEffect } from 'react';
import { TemplateDemo, DeviceType } from '../types';
import { PolicyCheckbox } from './PolicyCheckbox';
import { 
  X, 
  Monitor, 
  Tablet, 
  Smartphone, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Palette, 
  Send, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface InteractiveLiveDemoModalProps {
  template: TemplateDemo | null;
  onClose: () => void;
  onBookTemplate: (template: TemplateDemo) => void;
  onBookSolarQuote?: () => void;
}

export const InteractiveLiveDemoModal: React.FC<InteractiveLiveDemoModalProps> = ({
  template,
  onClose,
  onBookTemplate
}) => {
  if (!template) return null;

  const [device, setDevice] = useState<DeviceType>('desktop');
  const [demoTheme, setDemoTheme] = useState<'dark' | 'light'>('dark');
  const [customAccent, setCustomAccent] = useState<string>(template.accentColor || '#2563EB');
  const [agreedPolicy, setAgreedPolicy] = useState<boolean>(false);

  // Listen for Escape key to close live demo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Device Container Width
  const getDeviceWidthClass = () => {
    switch (device) {
      case 'mobile': return 'max-w-[390px] h-[780px] my-auto rounded-[40px] border-[10px] border-slate-800 shadow-2xl';
      case 'tablet': return 'max-w-[768px] h-[85vh] my-auto rounded-3xl border-8 border-slate-800 shadow-2xl';
      default: return 'w-full h-[90vh] rounded-2xl border border-slate-800 shadow-2xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-2 sm:p-4 animate-in fade-in duration-200">
      
      {/* Top Modal Controls Header */}
      <div className="flex items-center justify-between py-2 px-4 bg-slate-900 border border-slate-800 rounded-xl mb-3 text-white">
        
        {/* Left Brand Title */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Live Demo Mode
          </span>
          <div>
            <h3 className="text-sm font-bold truncate max-w-[200px] sm:max-w-md">
              {template.title}
            </h3>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Testing interactive controls, device responsiveness & custom widget engines
            </p>
          </div>
        </div>

        {/* Center Device Switcher */}
        <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              device === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              device === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              device === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Color Palette Tester */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs">
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 text-[10px]">Accent:</span>
            {['#00C853', '#2563EB', '#D97706', '#EC4899', '#3B82F6', '#0EA5E9', '#F59E0B', '#84CC16'].map((color) => (
              <button
                key={color}
                onClick={() => setCustomAccent(color)}
                className={`w-4 h-4 rounded-full transition-transform ${
                  customAccent === color ? 'scale-125 ring-2 ring-white' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <button
            onClick={() => setDemoTheme(demoTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-semibold"
            title="Toggle theme"
          >
            {demoTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          <div className="hidden sm:block">
            <PolicyCheckbox
              id="chk-demo-top"
              checked={agreedPolicy}
              onChange={setAgreedPolicy}
              className="my-0"
            />
          </div>

          <button
            disabled={!agreedPolicy}
            onClick={() => onBookTemplate(template)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow-lg transition-all ${
              agreedPolicy
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
            title={agreedPolicy ? 'Book this design' : 'Please agree to the Website Ownership Policy first'}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Book This Design (${template.price})</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all border border-rose-400/40 hover:scale-105 active:scale-95"
            title="Close Live Demo (Press ESC)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close Demo</span>
            <span className="hidden md:inline-block text-[10px] bg-rose-950/80 text-rose-200 px-1.5 py-0.5 rounded border border-rose-700">ESC</span>
          </button>
        </div>

      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-hidden flex items-center justify-center p-2">
        <div className={`mx-auto flex flex-col bg-slate-900 transition-all duration-300 overflow-hidden ${getDeviceWidthClass()}`}>
          
          {/* Top Address Bar */}
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>

            <div className="px-4 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 w-1/2 justify-center truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>https://demo.designplaza.io/{template.demoUrlName}</span>
            </div>

            <span className="text-[10px] font-bold text-slate-400">
              60 FPS GSAP
            </span>
          </div>

          {/* Device Screen Viewport */}
          <div
            className={`flex-1 overflow-y-auto ${
              demoTheme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
            }`}
          >
            <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-10 py-10">
                
                {/* Hero Header */}
                <div className="text-center space-y-3">
                  <span
                    className="px-3.5 py-1 rounded-full text-xs font-extrabold text-white uppercase tracking-wider inline-block shadow-md"
                    style={{ backgroundColor: customAccent }}
                  >
                    {template.niche} Live Interactive Demo
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                    {template.title}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
                    {template.description}
                  </p>
                </div>

                {/* Hero Preview Card */}
                {(() => {
                  const isNoPicTemplate = template.id === 'wanderlust-travel' || template.id === 'helios-solar' || template.demoUrlName === 'wanderlust-travel-demo' || template.demoUrlName === 'helios-solar-demo';
                  
                  return (
                    <>
                      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] border border-slate-800 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
                        {!isNoPicTemplate ? (
                          <>
                            <img
                              src={template.heroImage}
                              alt={template.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col justify-center items-center text-center p-6 space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg">
                              <Sparkles className="w-8 h-8" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-white max-w-lg">
                              {template.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                              Interactive web layout & micro-animations framework. Live preview option enabled with state persistence and speed optimization.
                            </p>
                          </div>
                        )}
                        
                        <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                              Interactive Feature
                            </p>
                            <p className="text-lg font-bold text-white">
                              {template.keyFeatures[0]}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                            <PolicyCheckbox
                              id="chk-demo-inner"
                              checked={agreedPolicy}
                              onChange={setAgreedPolicy}
                              className="my-0 text-left"
                            />
                            <button
                              disabled={!agreedPolicy}
                              onClick={() => onBookTemplate(template)}
                              className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shrink-0 transition-opacity ${
                                agreedPolicy ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                              }`}
                              style={{ backgroundColor: customAccent }}
                              title={agreedPolicy ? 'Book this site' : 'Please agree to the Website Ownership Policy first'}
                            >
                              Book This Site
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Key Features Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {template.keyFeatures.map((feat, idx) => (
                          <div
                            key={idx}
                            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-bold text-white">{feat}</p>
                              <p className="text-xs text-slate-400 mt-1">
                                Fully responsive micro-interactions with state persistence and speed optimization.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Included Pages Grid */}
                      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                          Included Pages in Template Package
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {template.includedPages.map((page) => (
                            <div
                              key={page}
                              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              <span>{page}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Template Gallery Showcase */}
                      {!isNoPicTemplate && template.galleryImages && template.galleryImages.length > 0 && (
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Interactive Visual Gallery
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {template.galleryImages.map((imgUrl, idx) => (
                              <div key={idx} className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-800 group shadow-lg">
                                <img
                                  src={imgUrl}
                                  alt={`${template.title} Preview ${idx + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                                  <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                                    Screen {idx + 1}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}

              </div>
          </div>

        </div>
      </div>

      {/* Floating Exit Demo Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-2xl shadow-rose-600/60 hover:scale-105 active:scale-95 transition-all border border-rose-400/50 backdrop-blur-md"
        >
          <X className="w-4 h-4" />
          <span>Close Live Demo</span>
        </button>
      </div>

    </div>
  );
};

