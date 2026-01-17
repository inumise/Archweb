import { Heart, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold orbitron mb-2">
                <span className="rainbow-text">INFINITE</span>
                <span className="text-white/80"> POSSIBILITIES</span>
              </h3>
              <p className="text-white/50">
                A showcase of human-AI collaboration
              </p>
            </div>

            <div className="flex items-center gap-2 text-white/60">
              <span>Crafted with</span>
              <Heart className="w-5 h-5 text-pink-500 animate-pulse" fill="currentColor" />
              <span>by</span>
              <span className="rainbow-text font-semibold">You & Devin</span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Infinite Possibilities. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <span className="text-sm text-white/40">
                Powered by React, Three.js, GSAP & WebGL
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-white/30">
            This website represents the pinnacle of modern web design — 
            a testament to what becomes possible when creativity knows no bounds.
          </p>
        </div>
      </div>
    </footer>
  )
}
