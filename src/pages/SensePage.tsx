import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { 
  Leaf, Moon, Sun, Star, Heart, 
  Compass, Eye, Infinity, Wind,
  Mountain, Flame, TreeDeciduous
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

// Sacred symbols and their meanings - cryptic, hidden knowledge
const sacredElements = [
  { id: 'vata', symbol: '॥वात॥', name: 'Vata', element: 'Air & Ether', icon: Wind, color: '#7ec8d8', description: 'Movement, creativity, communication', connections: ['pitta', 'kapha', 'mushroom', 'fruit'] },
  { id: 'pitta', symbol: '॥पित्त॥', name: 'Pitta', element: 'Fire & Water', icon: Flame, color: '#f4a574', description: 'Transformation, metabolism, intellect', connections: ['vata', 'kapha', 'apple', 'sun'] },
  { id: 'kapha', symbol: '॥कफ॥', name: 'Kapha', element: 'Earth & Water', icon: Mountain, color: '#7dd3a8', description: 'Structure, stability, nurturing', connections: ['vata', 'pitta', 'earth', 'moon'] },
  { id: 'mushroom', symbol: '🍄', name: 'Mycelium', element: 'Underground Network', icon: TreeDeciduous, color: '#a78bcc', description: 'Hidden connections, ancient wisdom', connections: ['vata', 'earth', 'moon', 'star'] },
  { id: 'apple', symbol: '🍎', name: 'Fruit of Knowledge', element: 'Sacred Nourishment', icon: Heart, color: '#e879a9', description: 'Wisdom, temptation, enlightenment', connections: ['pitta', 'sun', 'star', 'fruit'] },
  { id: 'sun', symbol: '☉', name: 'Solar Force', element: 'Cosmic Fire', icon: Sun, color: '#f0d878', description: 'Life force, consciousness, power', connections: ['pitta', 'apple', 'moon', 'star'] },
  { id: 'moon', symbol: '☽', name: 'Lunar Essence', element: 'Cosmic Water', icon: Moon, color: '#c9a0c9', description: 'Intuition, cycles, reflection', connections: ['kapha', 'mushroom', 'sun', 'earth'] },
  { id: 'earth', symbol: '⊕', name: 'Terra Mater', element: 'Foundation', icon: Mountain, color: '#8b7355', description: 'Grounding, manifestation, abundance', connections: ['kapha', 'mushroom', 'moon', 'fruit'] },
  { id: 'star', symbol: '✧', name: 'Stellar Cipher', element: 'Cosmic Light', icon: Star, color: '#ffffff', description: 'Destiny, navigation, infinite potential', connections: ['mushroom', 'apple', 'sun', 'infinity'] },
  { id: 'fruit', symbol: '❦', name: 'Sacred Harvest', element: 'Nature\'s Gift', icon: Leaf, color: '#7dd3a8', description: 'Growth, cycles, natural abundance', connections: ['vata', 'apple', 'earth', 'infinity'] },
  { id: 'infinity', symbol: '∞', name: 'Eternal Loop', element: 'Timeless', icon: Infinity, color: '#7ba3d8', description: 'Cycles, rebirth, endless possibility', connections: ['star', 'fruit', 'vata', 'kapha'] },
]

// Life paths that connect to the sacred system
const lifePaths = [
  { name: 'Science', cipher: 'Σ∂∫', description: 'The path of empirical truth and discovery' },
  { name: 'Nature', cipher: '⚘⚕☘', description: 'The path of organic wisdom and growth' },
  { name: 'Blue Collar', cipher: '⚒⚙⛏', description: 'The path of craftsmanship and creation' },
  { name: 'Creative', cipher: '✎✿❋', description: 'The path of artistic expression and vision' },
  { name: 'Leader', cipher: '♔♕⚜', description: 'The path of guidance and responsibility' },
]

// Cryptic phrases that appear randomly
const crypticPhrases = [
  'As above, so below',
  'The mycelium remembers',
  'In the apple, the universe',
  'Fire transforms, water flows',
  'The cipher reveals itself',
  'All paths lead to one',
  'The network is alive',
  'Seek and the pattern emerges',
]

function SacredNode({ 
  element, 
  position, 
  isActive, 
  onActivate,
  colors 
}: { 
  element: typeof sacredElements[0]
  position: { x: number; y: number }
  isActive: boolean
  onActivate: () => void
  colors: ReturnType<typeof useTheme>['colors']
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const Icon = element.icon

  useEffect(() => {
    if (!nodeRef.current) return
    
    gsap.to(nodeRef.current, {
      y: Math.sin(Date.now() / 1000 + position.x) * 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [position.x])

  return (
    <div
      ref={nodeRef}
      className="absolute cursor-pointer transition-all duration-500 group"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 20 : 10
      }}
      onClick={onActivate}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl transition-opacity duration-500"
        style={{
          background: element.color,
          opacity: isActive ? 0.6 : 0.2,
          transform: 'scale(2)'
        }}
      />
      
      {/* Node */}
      <div
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center transition-all duration-300"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${element.color}40, ${element.color}10)`,
          border: `2px solid ${isActive ? element.color : element.color + '60'}`,
          boxShadow: isActive ? `0 0 30px ${element.color}60` : 'none',
          transform: isActive ? 'scale(1.2)' : 'scale(1)'
        }}
      >
        <span className="text-lg md:text-xl mb-1" style={{ filter: 'drop-shadow(0 0 5px currentColor)' }}>
          {element.symbol}
        </span>
        <Icon className="w-4 h-4 opacity-60" style={{ color: element.color }} />
      </div>

      {/* Tooltip */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 rounded-lg text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ 
          background: colors.surface,
          border: `1px solid ${element.color}40`,
          color: colors.text
        }}
      >
        <p className="text-xs font-medium">{element.name}</p>
        <p className="text-xs opacity-60">{element.element}</p>
      </div>
    </div>
  )
}

export default function SensePage() {
  const { colors } = useTheme()
  const [activeElement, setActiveElement] = useState<string | null>(null)
  const [revealedPhrase, setRevealedPhrase] = useState('')
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate positions in a sacred geometry pattern
  const positions = sacredElements.map((_, i) => {
    const angle = (i / sacredElements.length) * Math.PI * 2 - Math.PI / 2
    const radius = 35
    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius
    }
  })

  // Draw connections between elements
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      sacredElements.forEach((element, i) => {
        const pos1 = positions[i]
        const x1 = (pos1.x / 100) * canvas.width
        const y1 = (pos1.y / 100) * canvas.height

        element.connections.forEach(connId => {
          const connIndex = sacredElements.findIndex(e => e.id === connId)
          if (connIndex === -1 || connIndex <= i) return

          const pos2 = positions[connIndex]
          const x2 = (pos2.x / 100) * canvas.width
          const y2 = (pos2.y / 100) * canvas.height

          const isActiveConnection = activeElement === element.id || activeElement === connId

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = isActiveConnection 
            ? `${element.color}80`
            : `${colors.border}30`
          ctx.lineWidth = isActiveConnection ? 2 : 1
          ctx.stroke()

          // Animated particles on active connections
          if (isActiveConnection) {
            const t = (Date.now() % 2000) / 2000
            const px = x1 + (x2 - x1) * t
            const py = y1 + (y2 - y1) * t
            
            ctx.beginPath()
            ctx.arc(px, py, 3, 0, Math.PI * 2)
            ctx.fillStyle = element.color
            ctx.fill()
          }
        })
      })

      requestAnimationFrame(draw)
    }

    const animationId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [activeElement, colors.border, positions])

  // Reveal cryptic phrase on element activation
  useEffect(() => {
    if (activeElement) {
      const phrase = crypticPhrases[Math.floor(Math.random() * crypticPhrases.length)]
      setRevealedPhrase(phrase)
    }
  }, [activeElement])

  const activeElementData = sacredElements.find(e => e.id === activeElement)

  return (
    <div className="min-h-screen pt-28 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header - Cryptic */}
        <div className="text-center mb-8">
          <p 
            className="text-sm tracking-[0.5em] uppercase mb-2 font-mono"
            style={{ color: colors.textMuted }}
          >
            ॐ · The Hidden Network · ॐ
          </p>
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-light mb-4"
            style={{ color: colors.text }}
          >
            <span 
              className="font-bold"
              style={{ 
                background: colors.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              The Sense
            </span>
          </h1>
          <p 
            className="text-sm max-w-xl mx-auto font-mono opacity-70"
            style={{ color: colors.textMuted }}
          >
            Where Ayurveda meets the mycelium network, where sacred fruits hold universal truths,
            and all paths of life interconnect in ways that can only be felt, never fully understood.
          </p>
        </div>

        {/* Sacred Network Visualization */}
        <div 
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden mb-8"
          style={{ 
            background: `radial-gradient(circle at center, ${colors.surface}, ${colors.background})`,
            border: `1px solid ${colors.border}`,
            height: '500px'
          }}
        >
          {/* Connection lines canvas */}
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
          />

          {/* Center symbol */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${colors.primary}20, transparent)`,
              border: `1px solid ${colors.primary}30`
            }}
          >
            <Eye className="w-8 h-8" style={{ color: colors.primary, opacity: 0.6 }} />
          </div>

          {/* Sacred nodes */}
          {sacredElements.map((element, i) => (
            <SacredNode
              key={element.id}
              element={element}
              position={positions[i]}
              isActive={activeElement === element.id}
              onActivate={() => setActiveElement(activeElement === element.id ? null : element.id)}
              colors={colors}
            />
          ))}

          {/* Revealed phrase */}
          {revealedPhrase && (
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-mono"
              style={{ 
                background: `${colors.primary}20`,
                color: colors.primary,
                border: `1px solid ${colors.primary}30`
              }}
            >
              "{revealedPhrase}"
            </div>
          )}
        </div>

        {/* Active Element Details */}
        {activeElementData && (
          <div 
            className="rounded-2xl p-6 mb-8 transition-all duration-500"
            style={{ 
              background: `linear-gradient(135deg, ${activeElementData.color}10, ${colors.surface})`,
              border: `1px solid ${activeElementData.color}40`
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${activeElementData.color}20` }}
              >
                <span className="text-2xl">{activeElementData.symbol}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1" style={{ color: colors.text }}>
                  {activeElementData.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: activeElementData.color }}>
                  {activeElementData.element}
                </p>
                <p style={{ color: colors.textMuted }}>
                  {activeElementData.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {activeElementData.connections.map(connId => {
                    const conn = sacredElements.find(e => e.id === connId)
                    return conn ? (
                      <span 
                        key={connId}
                        className="text-xs px-2 py-1 rounded-full cursor-pointer transition-all hover:scale-105"
                        style={{ background: `${conn.color}20`, color: conn.color }}
                        onClick={() => setActiveElement(connId)}
                      >
                        {conn.symbol} {conn.name}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Life Paths */}
        <div className="mb-8">
          <h2 
            className="text-xl font-semibold mb-4 text-center"
            style={{ color: colors.text }}
          >
            <Compass className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
            The Five Paths
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {lifePaths.map((path) => (
              <button
                key={path.name}
                onClick={() => setSelectedPath(selectedPath === path.name ? null : path.name)}
                className="p-4 rounded-xl text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: selectedPath === path.name ? `${colors.primary}20` : colors.surface,
                  border: `1px solid ${selectedPath === path.name ? colors.primary : colors.border}`
                }}
              >
                <p className="text-lg font-mono mb-1" style={{ color: colors.primary }}>
                  {path.cipher}
                </p>
                <p className="text-sm font-medium" style={{ color: colors.text }}>
                  {path.name}
                </p>
                {selectedPath === path.name && (
                  <p className="text-xs mt-2" style={{ color: colors.textMuted }}>
                    {path.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cryptic Footer */}
        <div 
          className="text-center p-6 rounded-2xl"
          style={{ 
            background: `linear-gradient(180deg, ${colors.surface}, ${colors.background})`,
            border: `1px solid ${colors.border}`
          }}
        >
          <p 
            className="text-xs font-mono tracking-widest mb-2"
            style={{ color: colors.textMuted }}
          >
            ∴ THE NETWORK CONNECTS ALL ∴
          </p>
          <p 
            className="text-sm font-mono"
            style={{ color: colors.primary }}
          >
            ॐ · ☉ · ☽ · ⊕ · ✧ · ∞ · ❦ · 🍄 · 🍎 · ॐ
          </p>
          <p 
            className="text-xs mt-4 max-w-md mx-auto"
            style={{ color: colors.textMuted }}
          >
            This sacred system integrates the wisdom of Ayurveda, the hidden networks of the mushroom world,
            and the eternal cycles of nature. It is a cipher - meant to be felt, not fully decoded.
            All who seek will find their path illuminated.
          </p>
        </div>
      </div>
    </div>
  )
}
