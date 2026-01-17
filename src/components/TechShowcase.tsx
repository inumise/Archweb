import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const animations = [
  {
    name: 'Morphing Blob',
    description: 'Organic shape-shifting with fluid transitions',
    className: 'morphing-blob',
    style: { background: 'linear-gradient(135deg, var(--rainbow-1), var(--rainbow-3))' }
  },
  {
    name: 'Aurora Flow',
    description: 'Seamless gradient animation across spectrum',
    className: 'aurora-bg',
    style: {}
  },
  {
    name: 'Breathing Pulse',
    description: 'Subtle scale and opacity rhythm',
    className: 'breathing',
    style: { background: 'linear-gradient(135deg, var(--rainbow-5), var(--rainbow-7))' }
  },
  {
    name: 'Drift Motion',
    description: 'Floating movement with gentle rotation',
    className: 'drifting',
    style: { background: 'linear-gradient(135deg, var(--rainbow-4), var(--rainbow-6))' }
  },
  {
    name: 'Glow Pulse',
    description: 'Dynamic shadow and brightness cycling',
    className: 'glow-pulsing',
    style: { background: 'linear-gradient(135deg, var(--rainbow-7), var(--rainbow-1))' }
  },
  {
    name: 'Rainbow Shimmer',
    description: 'Continuous spectrum color shift',
    className: 'rainbow-shimmer',
    style: {}
  }
]

function AnimationCard({ animation, index }: { animation: typeof animations[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power2.out',
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative glass rounded-xl p-6 h-full thin-rainbow-border transition-all duration-300 hover:bg-white/5">
        <div className="flex items-center justify-center h-32 mb-6 rounded-lg overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div
            className={`w-20 h-20 rounded-2xl ${animation.className} ${isHovered ? '' : ''}`}
            style={{
              ...animation.style,
              transition: 'all 0.3s ease'
            }}
          />
        </div>
        
        <h3 className="text-lg font-semibold mb-2 orbitron rainbow-text">
          {animation.name}
        </h3>
        
        <p className="text-white/50 text-sm">
          {animation.description}
        </p>
      </div>
    </div>
  )
}

export default function TechShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
    <section ref={sectionRef} id="tech" className="relative py-24 px-4 md:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(240, 216, 120, 0.05)' }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(167, 139, 204, 0.05)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold orbitron mb-6">
            <span className="rainbow-text">Technology Showcase</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Never-before-seen animations and effects that define the future of web experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {animations.map((animation, index) => (
            <AnimationCard key={animation.name} animation={animation} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 glass-strong px-8 py-4 rounded-full thin-rainbow-border">
            <div className="w-3 h-3 rounded-full aurora-bg" />
            <span className="text-white/70">
              Powered by <span className="rainbow-text font-semibold">Advanced Cloud Infrastructure</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
