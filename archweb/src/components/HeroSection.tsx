import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8,
          rotateX: 45
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.5,
          ease: 'power4.out'
        }
      )

      gsap.fromTo(
        subtitleRef.current,
        { 
          opacity: 0, 
          y: 50,
          filter: 'blur(10px)'
        },
        { 
          opacity: 1, 
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: 0.5,
          ease: 'power3.out'
        }
      )

      gsap.fromTo(
        '.hero-badge',
        { 
          opacity: 0, 
          scale: 0,
          rotation: -180
        },
        { 
          opacity: 1, 
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: 1,
          ease: 'elastic.out(1, 0.5)'
        }
      )

      gsap.fromTo(
        '.hero-cta',
        { 
          opacity: 0, 
          y: 30
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          delay: 1.2,
          ease: 'power2.out'
        }
      )
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{
        perspective: '1000px'
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(255, 0, 128, 0.15) 0%, transparent 50%)`,
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 - mousePosition.x * 15}% ${50 - mousePosition.y * 15}%, rgba(0, 255, 255, 0.1) 0%, transparent 40%)`,
        }}
      />

      <div className="hero-badge mb-8">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-75 animate-pulse" />
          <div className="relative glass-strong px-6 py-2 rounded-full">
            <span className="text-sm font-medium tracking-wider uppercase rainbow-text">
              The Future of Web Design
            </span>
          </div>
        </div>
      </div>

      <h1 
        ref={titleRef}
        className="text-5xl md:text-7xl lg:text-9xl font-bold text-center orbitron mb-6"
        style={{
          transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <span className="block rainbow-text text-glow">INFINITE</span>
        <span className="block text-white/90" style={{ textShadow: '0 0 60px rgba(255, 255, 255, 0.3)' }}>
          POSSIBILITIES
        </span>
      </h1>

      <p 
        ref={subtitleRef}
        className="text-lg md:text-xl lg:text-2xl text-white/60 text-center max-w-3xl mb-12 leading-relaxed"
      >
        Where human creativity meets artificial intelligence. 
        A collaboration that transcends the boundaries of imagination.
        <span className="block mt-2 text-white/80 font-medium">
          Built by <span className="rainbow-text">You</span> & <span className="rainbow-text">Devin</span>
        </span>
      </p>

      <div className="hero-cta flex flex-col sm:flex-row gap-4">
        <a 
          href="#portals"
          className="group relative px-8 py-4 rounded-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-xl opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
          <span className="relative text-white font-semibold text-lg tracking-wide">
            Explore Portals
          </span>
        </a>
        
        <a 
          href="#about"
          className="group relative px-8 py-4 rounded-full glass-strong hover:bg-white/10 transition-all duration-300"
        >
          <span className="font-semibold text-lg tracking-wide rainbow-text">
            Our Vision
          </span>
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/20 to-transparent blur-2xl animate-pulse" />
      <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  )
}
