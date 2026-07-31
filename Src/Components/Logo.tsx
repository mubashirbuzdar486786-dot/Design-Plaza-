import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true, className = '' }) => {
  // Dimensions
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const badgeSizes = {
    sm: 'text-[8px] px-1.5 py-0.2',
    md: 'text-[9px] px-2 py-0.5',
    lg: 'text-[10px] px-2.5 py-0.5',
  };

  return (
    <div className={`flex items-center gap-3.5 group focus:outline-none select-none ${className}`}>
      {/* 3D Emblem Container */}
      <div className="relative flex items-center justify-center shrink-0">
        
        {/* Animated Multi-Color Ambient Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-emerald-400 to-indigo-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 group-hover:scale-115 transition-all duration-500 animate-pulse" />
        
        {/* Inner Glassmorphic Frame */}
        <div className={`${iconSizes[size]} relative bg-slate-950/90 rounded-2xl p-2 flex items-center justify-center border border-slate-700/80 shadow-2xl overflow-hidden group-hover:border-emerald-400 transition-all duration-300 backdrop-blur-xl ring-1 ring-white/10`}>
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:6px_6px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

          {/* Premium 3D Isometric 'DP' Vector Crest Logo */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]"
          >
            {/* Outer Hexagon Diamond Base */}
            <path
              d="M24 2L44 13.5V36.5L24 48L4 36.5V13.5L24 2Z"
              fill="url(#dp-hex-bg)"
              stroke="url(#dp-hex-border)"
              strokeWidth="1.5"
            />

            {/* Futuristic 'D' Loop (Left Blue/Indigo Prism Wing) */}
            <path
              d="M12 12H24C30.6274 12 36 17.3726 36 24C36 30.6274 30.6274 36 24 36H12V12Z"
              fill="url(#dp-d-wing)"
              opacity="0.9"
            />

            {/* Inner 'P' Cutout Ribbon Layer (Emerald/Teal Core) */}
            <path
              d="M18 18H26C29.3137 18 32 20.6863 32 24C32 27.3137 29.3137 30 26 30H18V18Z"
              fill="url(#dp-p-ribbon)"
            />

            {/* Central 3D Facet Divider & Sparkle Center */}
            <path
              d="M24 2V24L44 13.5L24 2Z"
              fill="white"
              opacity="0.15"
            />
            <path
              d="M24 24L12 18V30L24 24Z"
              fill="url(#dp-inner-facet)"
              opacity="0.85"
            />

            {/* Core Radiant Star Pulse */}
            <circle cx="24" cy="24" r="3.5" fill="#5EEAD4" className="animate-ping opacity-75" />
            <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />

            {/* Corner Sparkle Accents */}
            <path
              d="M38 10L39 12L41 13L39 14L38 16L37 14L35 13L37 12L38 10Z"
              fill="#F43F5E"
              opacity="0.9"
            />
            <path
              d="M10 36L11 37.5L13 38L11 38.5L10 40L9 38.5L7 38L9 37.5L10 36Z"
              fill="#38BDF8"
              opacity="0.8"
            />

            {/* High Definition SVG Gradients */}
            <defs>
              <linearGradient id="dp-hex-bg" x1="4" y1="2" x2="44" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0B0F19" />
                <stop offset="0.5" stopColor="#020617" />
                <stop offset="1" stopColor="#090D16" />
              </linearGradient>

              <linearGradient id="dp-hex-border" x1="4" y1="2" x2="44" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="0.33" stopColor="#6366F1" />
                <stop offset="0.66" stopColor="#10B981" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>

              <linearGradient id="dp-d-wing" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB" />
                <stop offset="0.5" stopColor="#4F46E5" />
                <stop offset="1" stopColor="#0284C7" />
              </linearGradient>

              <linearGradient id="dp-p-ribbon" x1="18" y1="18" x2="32" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34D399" />
                <stop offset="0.5" stopColor="#10B981" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>

              <linearGradient id="dp-inner-facet" x1="12" y1="18" x2="24" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F472B6" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`${titleSizes[size]} font-black tracking-tight uppercase font-mono leading-none flex items-center`}>
            <span className="text-white drop-shadow-md">DESIGN</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 ml-1 font-extrabold">
              PLAZA
            </span>
          </span>
          <span className={`${badgeSizes[size]} font-extrabold rounded-lg bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-blue-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 uppercase font-mono tracking-wider shrink-0`}>
            3D STUDIO
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9.5px] text-slate-400 font-bold tracking-[0.18em] uppercase group-hover:text-emerald-300 transition-colors">
              Animated Web Marketplace
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

