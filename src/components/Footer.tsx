import { Globe, Cloud, Cpu } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="glass rounded-2xl p-8 md:p-10 thin-rainbow-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold orbitron mb-2">
                <span className="rainbow-text">RADEK HOMMER</span>
              </h3>
              <p className="text-white/45 text-sm">
                Global Web Development & System Integration
              </p>
            </div>

            <div className="flex items-center gap-3 text-white/50 text-sm">
              <Globe className="w-4 h-4" style={{ color: '#7ec8d8' }} />
              <span>Full-Spectrum Team</span>
              <span className="text-white/20">•</span>
              <Cloud className="w-4 h-4" style={{ color: '#a78bcc' }} />
              <span>Cloud Infrastructure</span>
              <span className="text-white/20">•</span>
              <Cpu className="w-4 h-4" style={{ color: '#e879a9' }} />
              <span>Advanced Systems</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Radek Hommer. All rights reserved.
            </p>
            
            <p className="text-xs text-white/30">
              Developers • Designers • Creative Professionals
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
