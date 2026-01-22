import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Beaker, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const storyParts = [
  {
    icon: Beaker,
    title: 'The Origin',
    description: 'Where science met imagination. From biochemistry laboratories in the Czech hills to dangerous hydrogen production research and expeditions beyond the edge of life itself — through collapses and clinical deaths, Don Hommer emerged with a vision to project the impossible into reality. A passionate creative leader forged through fire.',
    color: '#e879a9'
  },
  {
    icon: Users,
    title: 'The Global Team',
    description: 'Today, that vision powers the world\'s most elite development team: world-class developers, elite graphic designers, UX visionaries, and creative professionals — all connected to the most powerful cloud infrastructure on the planet. Together, we deliver what others call impossible.',
    color: '#7ec8d8'
  }
]

function StoryCard({ part, index }: { part: typeof storyParts[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = part.icon

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    gsap.fromTo(
      card,
      {
        opacity: 0,
        x: index === 0 ? -100 : 100,
        scale: 0.9
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 50%',
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
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${part.color}40, transparent)`,
          filter: 'blur(1px)'
        }}
      />
      
      <div className="relative glass-strong rounded-2xl p-10 h-full transition-transform duration-500 group-hover:translate-y-[-3px] thin-rainbow-border">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${part.color}25, ${part.color}10)`,
            boxShadow: `0 0 25px ${part.color}20`
          }}
        >
          <Icon className="w-10 h-10" style={{ color: part.color }} />
        </div>

        <h3 className="text-2xl font-bold mb-4 orbitron" style={{ color: part.color }}>
          {part.title}
        </h3>

        <p className="text-white/65 leading-relaxed text-lg">
          {part.description}
        </p>
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
    <section ref={sectionRef} id="story" className="relative py-32 px-4 md:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(232, 121, 169, 0.08)' }} />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(126, 200, 216, 0.08)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'rgba(167, 139, 204, 0.05)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold orbitron mb-6">
            <span className="rainbow-text">The Story</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            From impossible beginnings to unlimited possibilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {storyParts.map((part, index) => (
            <StoryCard key={part.title} part={part} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
