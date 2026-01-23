import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layers, Box, Sparkles, Zap, Eye, Cpu } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const techCategories = [
  {
    icon: Layers,
    name: 'Outlines & Wireframes',
    description: 'Precision-crafted structural blueprints with holographic rendering capabilities',
    features: ['Vector Precision', 'Auto-Layout', 'Smart Guides'],
    color: '#e879a9'
  },
  {
    icon: Box,
    name: '3D Animations',
    description: 'Lightweight real-time 3D with GPU-accelerated rendering pipelines',
    features: ['60fps Smooth', 'WebGL 2.0', 'Low Memory'],
    color: '#7ec8d8'
  },
  {
    icon: Sparkles,
    name: 'Motion Graphics',
    description: 'Cinematic visual effects with timeline-based orchestration',
    features: ['Keyframe Control', 'Easing Curves', 'Particle Systems'],
    color: '#f0d878'
  },
  {
    icon: Zap,
    name: 'Interactive Elements',
    description: 'Responsive micro-interactions with haptic feedback simulation',
    features: ['Touch Gestures', 'State Machines', 'Event Chains'],
    color: '#7dd3a8'
  },
  {
    icon: Eye,
    name: 'Visual Effects',
    description: 'Post-processing shaders and real-time compositing layers',
    features: ['Blur Effects', 'Color Grading', 'Glow Rendering'],
    color: '#a78bcc'
  },
  {
    icon: Cpu,
    name: 'Emerging Tech',
    description: 'Cutting-edge implementations of next-generation web standards',
    features: ['WebGPU Ready', 'WASM Powered', 'AI Integration'],
    color: '#f4a574'
  }
]

function TechCard({ tech, index }: { tech: typeof techCategories[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = tech.icon

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    gsap.fromTo(
      card,
      { opacity: 0, y: 80, rotateY: -15 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 1,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [index])

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <div 
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"
        style={{ 
          background: `linear-gradient(135deg, ${tech.color}30, transparent)`,
          filter: 'blur(2px)'
        }}
      />
      
      <div className="relative glass rounded-2xl p-6 h-full thin-rainbow-border overflow-hidden transition-all duration-500 group-hover:translate-y-[-4px]">
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"
          style={{ background: tech.color }}
        />
        
        <div className="relative">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
            style={{ 
              background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}05)`,
              boxShadow: `0 0 30px ${tech.color}15`
            }}
          >
            <Icon className="w-7 h-7" style={{ color: tech.color }} />
          </div>
          
          <h3 className="text-xl font-bold mb-3 orbitron" style={{ color: tech.color }}>
            {tech.name}
          </h3>
          
          <p className="text-white/55 text-sm mb-5 leading-relaxed">
            {tech.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tech.features.map((feature) => (
              <span 
                key={feature}
                className="text-xs px-3 py-1 rounded-full"
                style={{ 
                  background: `${tech.color}15`,
                  color: `${tech.color}`,
                  border: `1px solid ${tech.color}30`
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewAgeTech() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="new-age-tech" className="relative py-28 px-4 md:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(232, 121, 169, 0.04)' }} />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(126, 200, 216, 0.04)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl" style={{ background: 'rgba(167, 139, 204, 0.03)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-6 thin-rainbow-border">
            <div className="w-2 h-2 rounded-full aurora-bg" />
            <span className="text-xs text-white/60 uppercase tracking-wider">Next Generation</span>
          </div>
          
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold orbitron mb-6">
            <span className="rainbow-text">New Age Technologies</span>
          </h2>
          <p className="text-lg text-white/45 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge visual technologies engineered for performance. 
            Every animation optimized for smooth 60fps rendering across all devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
