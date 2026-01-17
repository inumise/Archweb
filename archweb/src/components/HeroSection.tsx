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
          duration: 1.8,
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
          duration: 1.4,
          delay: 0.6,
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
          duration: 1.2,
          delay: 1.1,
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
          duration: 1,
          delay: 1.4,
          stagger: 0.15,
          ease: 'power2.out'
        }
      )

      gsap.fromTo(
        '.floating-element',
        {
          opacity: 0,
          scale: 0
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          delay: 0.8,
          stagger: 0.2,
          ease: 'elastic.out(1, 0.6)'
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
          background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(232, 121, 169, 0.12) 0%, transparent 50%)`,
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 - mousePosition.x * 15}% ${50 - mousePosition.y * 15}%, rgba(126, 200, 216, 0.08) 0%, transparent 40%)`,
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(167, 139, 204, 0.1) 0%, transparent 60%)`,
        }}
      />

      <div className="floating-element absolute top-16 left-8 w-40 h-40 rounded-full morphing-blob breathing opacity-40"
        style={{ background: 'linear-gradient(135deg, rgba(232, 121, 169, 0.3), rgba(244, 165, 116, 0.2))' }} />
      <div className="floating-element absolute top-32 right-16 w-52 h-52 rounded-full morphing-blob breathing opacity-30 drifting"
        style={{ background: 'linear-gradient(135deg, rgba(126, 200, 216, 0.3), rgba(123, 163, 216, 0.2))', animationDelay: '1s' }} />
      <div className="floating-element absolute bottom-32 left-1/4 w-32 h-32 rounded-full morphing-blob breathing opacity-35"
        style={{ background: 'linear-gradient(135deg, rgba(167, 139, 204, 0.3), rgba(201, 160, 201, 0.2))', animationDelay: '2s' }} />
      <div className="floating-element absolute bottom-48 right-1/4 w-24 h-24 rounded-full morphing-blob breathing opacity-40 drifting"
        style={{ background: 'linear-gradient(135deg, rgba(125, 211, 168, 0.3), rgba(240, 216, 120, 0.2))', animationDelay: '3s' }} />

      <div className="hero-badge mb-8">
        <div className="relative">
          <div className="absolute -inset-1 aurora-bg rounded-full blur-md opacity-60 animate-pulse" />
          <div className="relative glass-strong px-8 py-3 rounded-full">
            <span className="text-sm font-medium tracking-wider uppercase rainbow-text">
              Professional Development Excellence
            </span>
          </div>
        </div>
      </div>

      <h1 
        ref={titleRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-center orbitron mb-8"
        style={{
          transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <span className="block rainbow-text text-glow">RADEK HOMMER</span>
        <span className="block text-white/85 text-3xl md:text-4xl lg:text-5xl mt-4" style={{ textShadow: '0 0 40px rgba(167, 139, 204, 0.4)' }}>
          & Creative Development Team
        </span>
      </h1>

      <p 
        ref={subtitleRef}
        className="text-lg md:text-xl lg:text-2xl text-white/60 text-center max-w-4xl mb-12 leading-relaxed"
      >
        Where science meets imagination. From the hills of Czech Republic to the frontiers of innovation — 
        a journey through biochemistry, ancient wisdom, and fearless exploration.
        <span className="block mt-4 text-white/75 font-medium">
          Powered by <span className="rainbow-text">Powerful Machines</span> & <span className="rainbow-text">Deeply Creative Vision</span>
        </span>
      </p>

      <div className="hero-cta flex flex-col sm:flex-row gap-4">
        <a 
          href="#story"
          className="group relative px-10 py-5 rounded-full overflow-hidden"
        >
          <div className="absolute inset-0 aurora-bg transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 aurora-bg blur-xl opacity-40 transition-opacity duration-500 group-hover:opacity-70" />
          <span className="relative text-white font-semibold text-lg tracking-wide">
            Discover the Journey
          </span>
        </a>
        
        <a 
          href="#portals"
          className="group relative px-10 py-5 rounded-full glass-strong hover:bg-white/10 transition-all duration-300"
        >
          <span className="font-semibold text-lg tracking-wide rainbow-text">
            Explore Portals
          </span>
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 rounded-full border-2 border-white/25 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gradient-to-b from-white/70 to-white/30 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
