import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Gem, 
  Layers, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

// Elegant pricing tiers - value-focused, soft professional feel
const solutions = [
  {
    id: 'foundation',
    name: 'Foundation',
    tagline: 'Establish Your Digital Presence',
    basePrice: 10000,
    downPayment: 3000,
    deliverables: [
      'Custom Responsive Design',
      'Up to 10 Crafted Pages',
      'Contact & Inquiry Forms',
      'Search Engine Optimization',
      'Mobile Excellence',
      'Dedicated Support Period',
      'Security Certificate',
      'Professional Hosting',
    ],
    icon: Sparkles,
    accent: 'primary',
  },
  {
    id: 'evolution',
    name: 'Evolution',
    tagline: 'Elevate Your Brand Experience',
    basePrice: 25000,
    downPayment: 7500,
    deliverables: [
      'Bespoke Design Language',
      'Intelligent AI Integration',
      'Commerce Capabilities',
      'Content Management System',
      'Performance Optimization',
      'Extended Partnership',
      'Analytics Intelligence',
      'Social Ecosystem',
    ],
    icon: Layers,
    accent: 'secondary',
  },
  {
    id: 'transcendence',
    name: 'Transcendence',
    tagline: 'Complete Digital Transformation',
    basePrice: 50000,
    downPayment: 15000,
    deliverables: [
      'Full AI Integration Suite',
      'Dedicated Development Team',
      'Priority Partnership',
      'Unlimited Refinements',
      'Performance Engineering',
      'Security Architecture',
      'Growth Strategy',
      'Knowledge Transfer',
    ],
    icon: Gem,
    accent: 'accent',
  },
]

// Subtle enhancement options
const enhancements = [
  { name: 'AI Assistant Integration', investment: 5000 },
  { name: 'Custom CRM Architecture', investment: 8000 },
  { name: 'Advanced Intelligence', investment: 3000 },
  { name: 'Security Fortification', investment: 4000 },
]

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { colors, formatPrice, speakText, ttsEnabled } = useTheme()

  // Elegant GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleCardInteraction = (name: string) => {
    if (ttsEnabled) {
      speakText(`${name}. A refined solution crafted for excellence.`)
    }
  }

  const getAccentColor = (accent: string) => {
    switch (accent) {
      case 'primary': return colors.primary
      case 'secondary': return colors.secondary
      case 'accent': return colors.accent
      default: return colors.primary
    }
  }

  return (
    <section 
      ref={sectionRef} 
      id="investment" 
      className="relative py-32 px-4 md:px-8"
    >
      {/* Subtle ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20" 
          style={{ background: colors.primary }} 
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15" 
          style={{ background: colors.secondary }} 
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Elegant Header */}
        <div className="text-center mb-20">
          <p 
            className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: colors.textMuted }}
          >
            Investment
          </p>
          <h2 
            ref={titleRef} 
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
            style={{ color: colors.text }}
          >
            <span 
              className="font-bold metallic-gold-text"
            >
              Crafted Solutions
            </span>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: colors.textMuted }}
          >
            Each engagement is a partnership. We craft digital experiences 
            that reflect the unique vision and ambition of our clients.
          </p>
        </div>

        {/* Solution Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20"
        >
          {solutions.map((solution) => {
            const Icon = solution.icon
            const accentColor = getAccentColor(solution.accent)
            const isHovered = hoveredCard === solution.id
            
            return (
              <div
                key={solution.id}
                className="group relative rounded-2xl transition-all duration-500"
                style={{ 
                  background: colors.surface,
                  border: `1px solid ${isHovered ? accentColor + '60' : colors.border}`,
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: isHovered ? `0 20px 60px ${accentColor}15` : 'none'
                }}
                onMouseEnter={() => {
                  setHoveredCard(solution.id)
                  handleCardInteraction(solution.name)
                }}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Subtle glow on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(ellipse at top, ${accentColor}08, transparent 70%)`
                  }}
                />

                <div className="relative p-8">
                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `${accentColor}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                  </div>

                  {/* Name & Tagline */}
                  <h3 
                    className="text-2xl font-semibold mb-2"
                    style={{ color: colors.text }}
                  >
                    {solution.name}
                  </h3>
                  <p 
                    className="text-sm mb-6"
                    style={{ color: colors.textMuted }}
                  >
                    {solution.tagline}
                  </p>

                  {/* Investment */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span 
                        className="text-3xl font-light"
                        style={{ color: colors.text }}
                      >
                        {formatPrice(solution.basePrice)}
                      </span>
                    </div>
                    <p 
                      className="text-sm mt-2"
                      style={{ color: colors.textMuted }}
                    >
                      Initial commitment from {formatPrice(solution.downPayment)}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <ul className="space-y-3 mb-8">
                    {solution.deliverables.map((item, i) => (
                      <li 
                        key={i}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: colors.text }}
                      >
                        <CheckCircle2 
                          className="w-4 h-4 mt-0.5 flex-shrink-0" 
                          style={{ color: accentColor }} 
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group-hover:gap-4"
                    style={{ 
                      background: 'transparent',
                      color: accentColor,
                      border: `1px solid ${accentColor}40`
                    }}
                  >
                    <span>Begin Conversation</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Enhancements */}
        <div 
          className="rounded-2xl p-8 md:p-12"
          style={{ 
            background: colors.surface,
            border: `1px solid ${colors.border}`
          }}
        >
          <div className="text-center mb-10">
            <h3 
              className="text-2xl font-semibold mb-3"
              style={{ color: colors.text }}
            >
              Enhance Your Experience
            </h3>
            <p 
              className="text-sm max-w-xl mx-auto"
              style={{ color: colors.textMuted }}
            >
              Extend your solution with specialized capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {enhancements.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{ 
                  background: `${colors.primary}08`,
                  border: `1px solid ${colors.border}`
                }}
              >
                <p 
                  className="font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  {item.name}
                </p>
                <p 
                  className="text-sm"
                  style={{ color: colors.textMuted }}
                >
                  From {formatPrice(item.investment)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Elegant closing */}
        <div className="text-center mt-16">
          <p 
            className="text-sm mb-6"
            style={{ color: colors.textMuted }}
          >
            Every project begins with understanding your vision
          </p>
          <button
            className="px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105"
            style={{ 
              background: colors.gradient,
              color: colors.background
            }}
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
