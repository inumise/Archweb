import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Beaker, Mountain, Sword, Flame, Heart, Compass } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const journeyChapters = [
  {
    icon: Beaker,
    title: 'Biochemistry Origins',
    description: 'Where science met imagination. Years of laboratory work in biochemistry and machinery development laid the foundation for understanding the building blocks of innovation.',
    color: '#e879a9'
  },
  {
    icon: Mountain,
    title: 'Czech Hills Discovery',
    description: 'In the serene hills of Czech Republic, strength was found through herbal data collection for biochemics — ancient wisdom meeting modern science.',
    color: '#7dd3a8'
  },
  {
    icon: Sword,
    title: 'Viking Heritage',
    description: 'Traveling through histories of Neanderthal wine production and Viking barrier building — understanding how our ancestors shaped the impossible.',
    color: '#7ec8d8'
  },
  {
    icon: Flame,
    title: 'Dangerous Research',
    description: 'Hydrogen production research and laboratory experiments that pushed the boundaries of safety. Expeditions critically far beyond endangerment of life and death.',
    color: '#f4a574'
  },
  {
    icon: Heart,
    title: 'Rebirth Through Trials',
    description: 'Nature does not ask the injured person. Through collapses and clinical deaths, a deeper understanding emerged — transforming near-death into new life.',
    color: '#a78bcc'
  },
  {
    icon: Compass,
    title: 'Vision Realized',
    description: 'Love and passion found within projecting what could have never been into real life experiences. Crazy structure design and tool making — all mixed together.',
    color: '#f0d878'
  }
]

function ChapterCard({ chapter, index }: { chapter: typeof journeyChapters[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = chapter.icon

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
          background: `linear-gradient(135deg, ${chapter.color}, transparent)`
        }}
      />
      
      <div className="relative glass-strong rounded-2xl p-8 h-full transition-transform duration-500 group-hover:translate-y-[-5px]">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{
            background: `linear-gradient(135deg, ${chapter.color}33, ${chapter.color}11)`,
            boxShadow: `0 0 30px ${chapter.color}33`
          }}
        >
          <Icon className="w-8 h-8" style={{ color: chapter.color }} />
        </div>

        <h3 className="text-xl font-bold mb-3 orbitron" style={{ color: chapter.color }}>
          {chapter.title}
        </h3>

        <p className="text-white/60 leading-relaxed">
          {chapter.description}
        </p>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${chapter.color}, transparent)`
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
    <section ref={sectionRef} id="story" className="relative py-32 px-4 md:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(232, 121, 169, 0.08)' }} />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(126, 200, 216, 0.08)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'rgba(167, 139, 204, 0.05)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold orbitron mb-6">
            <span className="rainbow-text">The Journey</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            A life where sciences met imagination. From biochemistry laboratories to ancient histories, 
            from dangerous expeditions to creative vision — this is the story of Radek Hommer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeyChapters.map((chapter, index) => (
            <ChapterCard key={chapter.title} chapter={chapter} index={index} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block">
            <div className="relative">
              <div className="absolute -inset-4 aurora-bg rounded-2xl blur-xl opacity-25 animate-pulse" />
              <div className="relative glass-strong rounded-2xl p-8 md:p-12">
                <p className="text-2xl md:text-3xl font-light text-white/80 mb-4">
                  "Projecting what could have never been into real life experiences"
                </p>
                <p className="text-lg rainbow-text font-semibold orbitron">
                  — Radek Hommer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
