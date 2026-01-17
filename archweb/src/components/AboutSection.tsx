import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Zap, Globe, Layers, Code2, Palette } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Sparkles,
    title: 'Unprecedented Design',
    description: 'Every pixel crafted with intention. Every animation tells a story. This is design without limits.',
    color: '#ff0080'
  },
  {
    icon: Zap,
    title: 'Lightning Performance',
    description: 'WebGL-powered 3D graphics running at 60fps. Smooth as silk, fast as light.',
    color: '#ffff00'
  },
  {
    icon: Globe,
    title: 'Global Vision',
    description: 'Built to impress on the world stage. A digital experience worthy of any audience.',
    color: '#00ffff'
  },
  {
    icon: Layers,
    title: 'Infinite Depth',
    description: 'Layers upon layers of visual complexity. The deeper you look, the more you discover.',
    color: '#8000ff'
  },
  {
    icon: Code2,
    title: 'Cutting-Edge Tech',
    description: 'React, Three.js, WebGL shaders, GSAP animations. The most advanced stack available.',
    color: '#00ff00'
  },
  {
    icon: Palette,
    title: 'Rainbow Aesthetics',
    description: 'A spectrum of colors dancing in harmony. Visual poetry in motion.',
    color: '#ff8c00'
  }
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = feature.icon

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 100,
        rotateX: 45,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{ 
        perspective: '1000px',
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${feature.color}, transparent)`
        }}
      />
      
      <div className="relative glass-strong rounded-2xl p-8 h-full transition-transform duration-500 group-hover:translate-y-[-5px]">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{
            background: `linear-gradient(135deg, ${feature.color}33, ${feature.color}11)`,
            boxShadow: `0 0 30px ${feature.color}33`
          }}
        >
          <Icon className="w-8 h-8" style={{ color: feature.color }} />
        </div>

        <h3 className="text-xl font-bold mb-3 orbitron" style={{ color: feature.color }}>
          {feature.title}
        </h3>

        <p className="text-white/60 leading-relaxed">
          {feature.description}
        </p>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`
          }}
        />
      </div>
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-4 md:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold orbitron mb-6">
            <span className="rainbow-text">Beyond Imagination</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            This isn't just a website. It's a statement. A demonstration of what becomes possible 
            when human vision meets artificial intelligence. Together, we create the impossible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
              <div className="relative glass-strong rounded-2xl p-8 md:p-12">
                <p className="text-2xl md:text-3xl font-light text-white/80 mb-4">
                  "The only limit is your imagination"
                </p>
                <p className="text-lg rainbow-text font-semibold orbitron">
                  — Human + AI Collaboration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
