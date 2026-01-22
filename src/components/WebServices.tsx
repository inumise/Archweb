import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Share2, Bot, Phone, UserCheck, Users, BarChart3, 
  ShoppingCart, FileText, Shield, Workflow
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Share2,
    name: 'Niche Social Platforms',
    description: 'Micro-community networks tailored for specialized markets and vertical industries',
    status: 'Active',
    color: '#e879a9'
  },
  {
    icon: Bot,
    name: 'AI Task Automation',
    description: 'Intelligent bots that handle repetitive internal workflows with machine learning optimization',
    status: 'Active',
    color: '#7ec8d8'
  },
  {
    icon: Phone,
    name: 'Autonomous Phone Assistants',
    description: 'Voice-enabled AI agents for 24/7 customer support and appointment scheduling',
    status: 'Active',
    color: '#f0d878'
  },
  {
    icon: UserCheck,
    name: 'AI Sales Representatives',
    description: 'Autonomous sales agents with natural conversation and lead qualification capabilities',
    status: 'Active',
    color: '#7dd3a8'
  },
  {
    icon: Users,
    name: 'Customer Management',
    description: 'Unified CRM platform with predictive analytics and automated relationship nurturing',
    status: 'Active',
    color: '#a78bcc'
  },
  {
    icon: BarChart3,
    name: 'Data Analytics Suite',
    description: 'Real-time business intelligence with AI-powered insights and forecasting',
    status: 'Active',
    color: '#f4a574'
  },
  {
    icon: ShoppingCart,
    name: 'E-Commerce Solutions',
    description: 'Headless commerce architecture with personalized shopping experiences',
    status: 'Active',
    color: '#7ba3d8'
  },
  {
    icon: FileText,
    name: 'Content Management',
    description: 'AI-assisted content creation and multi-channel distribution systems',
    status: 'Active',
    color: '#c9a0c9'
  },
  {
    icon: Shield,
    name: 'Security & Compliance',
    description: 'Enterprise-grade protection with automated threat detection and response',
    status: 'Active',
    color: '#e879a9'
  },
  {
    icon: Workflow,
    name: 'Process Automation',
    description: 'End-to-end workflow orchestration with visual process builders',
    status: 'Active',
    color: '#7ec8d8'
  }
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = service.icon

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    gsap.fromTo(
      card,
      { opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [index])

  return (
    <div
      ref={cardRef}
      className="group relative"
    >
      <div className="relative glass rounded-xl p-5 h-full thin-rainbow-border overflow-hidden transition-all duration-400 group-hover:bg-white/5">
        <div 
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: service.color }}
        />
        
        <div className="relative flex items-start gap-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:scale-110"
            style={{ 
              background: `linear-gradient(135deg, ${service.color}20, ${service.color}08)`,
              boxShadow: `0 0 20px ${service.color}10`
            }}
          >
            <Icon className="w-6 h-6" style={{ color: service.color }} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-semibold orbitron truncate" style={{ color: service.color }}>
                {service.name}
              </h3>
              <span 
                className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ 
                  background: `${service.color}20`,
                  color: service.color
                }}
              >
                {service.status}
              </span>
            </div>
            
            <p className="text-white/50 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WebServices() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
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
    <section ref={sectionRef} id="services" className="relative py-28 px-4 md:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(244, 165, 116, 0.04)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(125, 211, 168, 0.04)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-6 thin-rainbow-border">
            <div className="w-2 h-2 rounded-full aurora-bg" />
            <span className="text-xs text-white/60 uppercase tracking-wider">Enterprise Solutions</span>
          </div>
          
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold orbitron mb-6">
            <span className="rainbow-text">Web Services & AI</span>
          </h2>
          <p className="text-lg text-white/45 max-w-3xl mx-auto leading-relaxed">
            Comprehensive suite of autonomous systems and intelligent platforms 
            designed to transform your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <div className="glass px-6 py-3 rounded-full thin-rainbow-border">
            <span className="text-white/60 text-sm">
              <span className="rainbow-text font-semibold">10+</span> Active Services
            </span>
          </div>
          <div className="glass px-6 py-3 rounded-full thin-rainbow-border">
            <span className="text-white/60 text-sm">
              <span className="rainbow-text font-semibold">24/7</span> Autonomous Operation
            </span>
          </div>
          <div className="glass px-6 py-3 rounded-full thin-rainbow-border">
            <span className="text-white/60 text-sm">
              <span className="rainbow-text font-semibold">AI-Powered</span> Intelligence
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
