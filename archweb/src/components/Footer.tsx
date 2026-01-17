import { Heart, Sparkles, Cpu } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold orbitron mb-2">
                <span className="rainbow-text">RADEK HOMMER</span>
                <span className="text-white/80"> & Team</span>
              </h3>
              <p className="text-white/50">
                Professional Development Excellence
              </p>
            </div>

            <div className="flex items-center gap-2 text-white/60">
              <span>Powered by</span>
              <Cpu className="w-5 h-5 rainbow-text" />
              <span className="rainbow-text font-semibold">Powerful Machines</span>
              <Heart className="w-5 h-5 animate-pulse" style={{ color: '#e879a9' }} fill="currentColor" />
              <span>&</span>
              <span className="rainbow-text font-semibold">Creative Vision</span>
              <Sparkles className="w-5 h-5" style={{ color: '#f0d878' }} />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Radek Hommer & Creative Development Team. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <span className="text-sm text-white/40">
                Built with React, Canvas API, GSAP & Advanced Animations
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-white/30">
            Where science meets imagination — from biochemistry to ancient wisdom, 
            from dangerous expeditions to creative vision that transforms the impossible into reality.
          </p>
        </div>
      </div>
    </footer>
  )
}
