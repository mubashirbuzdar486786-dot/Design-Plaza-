import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Play, 
  Sun, 
  ShieldCheck, 
  Zap, 
  Award, 
  Star,
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectFlagshipDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchTerm,
  setSearchTerm,
  onSelectFlagshipDemo
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js animated background particle sphere
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle geometry
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      // Gradient blue to cyan to green
      colors[i * 3] = 0.1 + Math.random() * 0.3; // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Torus knot wireframe
    const torusGeom = new THREE.TorusKnotGeometry(12, 3, 100, 16);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const torus = new THREE.Mesh(torusGeom, torusMat);
    scene.add(torus);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      torus.rotation.x += 0.002;
      torus.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      torusGeom.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 text-white">
      {/* Three.js Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Radial Gradient Glow Overlays (Immersive UI Atmospheric Glows) */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest shadow-xl">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Marketplace v2.0 • 1,000+ Demos</span>
            </div>

            {/* Main Immersive Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tighter uppercase">
              PREMIUM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
                ANIMATED
              </span> <br />
              EXPERIENCES
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
              Choose, customize, and launch world-class animated websites in days, not months. Over 1,000+ high-end niches available — featuring Michelin Dining, AI SaaS, Luxury Real Estate, and Healthcare.
            </p>

            {/* Interactive Search Bar */}
            <div className="relative max-w-xl mx-auto lg:mx-0">
              <div className="relative flex items-center rounded-xl bg-slate-800/50 border border-slate-700/80 p-2 shadow-2xl focus-within:border-blue-500 transition-all backdrop-blur-md">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search niche: 'Restaurant', 'SaaS AI', 'Real Estate'..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                <div className="hidden sm:block text-xs text-slate-500 font-mono px-2 py-1 bg-slate-900 rounded border border-slate-800 mr-2">
                  ⌘K
                </div>
                <button
                  type="button"
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-all shadow-lg shadow-blue-600/20"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Popular Niches:</span>
              {['Restaurant', 'SaaS AI', 'Real Estate', 'Healthcare', 'Fitness'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/60 hover:border-slate-500 hover:text-white transition-colors text-xs font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#templates"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
              >
                <span>Browse Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onSelectFlagshipDemo}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Launch Featured Demo</span>
              </button>
            </div>
          </div>

          {/* Right Column: Holographic 3D Floating Website Mock Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Floating Card Container */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-3xl p-5 shadow-2xl backdrop-blur-xl group hover:border-blue-500/50 transition-all duration-500">
                
                {/* Simulated Browser Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-mono text-blue-400 flex items-center gap-1 border border-white/10">
                    <ShieldCheck className="w-3 h-3" />
                    <span>designplaza.io/demo/aura-luxury-architecture</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-blue-400 border border-white/10">
                    LUXURY REAL ESTATE
                  </span>
                </div>

                {/* Card Preview Image with Interactive Overlay */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950 group-hover:scale-[1.01] transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                    alt="Aura Luxury Villa Preview"
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                  {/* Overlaid Animated Elements */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold uppercase border border-white/10 text-white">
                      Featured Niche
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Aura Luxury Villa</p>
                      <p className="text-[10px] text-slate-400">3D Spatial Tour & Material Configurator.</p>
                    </div>
                    <button
                      onClick={onSelectFlagshipDemo}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-all shadow-md"
                    >
                      Live Demo
                    </button>
                  </div>
                </div>

                {/* Secondary Floating Mini Badges */}
                <div className="absolute -bottom-5 -left-5 p-3 rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl backdrop-blur-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">99+ Lighthouse</p>
                    <p className="text-[10px] text-slate-400">60 FPS Smooth GSAP</p>
                  </div>
                </div>

                <div className="absolute -top-5 -right-5 p-3 rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl backdrop-blur-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">4.98 / 5 Rating</p>
                    <p className="text-[10px] text-slate-400">500+ Global Clients</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Immersive Metric Stats Banner */}
        <div className="flex gap-10 border-t border-slate-800 pt-8 mt-16 justify-center lg:justify-start">
          <div>
            <div className="text-3xl font-extrabold text-white">1,000+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Website Designs</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">500+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Global Clients</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400 underline decoration-2 underline-offset-4">90+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Lighthouse Score</div>
          </div>
        </div>

      </div>
    </section>
  );
};
