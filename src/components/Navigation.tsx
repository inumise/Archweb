import { useState } from 'react'
import { 
  Home, 
  Cpu, 
  GitBranch, 
  MessageCircle, 
  ShoppingCart, 
  Building2, 
  Sparkles 
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export type PageType = 'main' | 'tech' | 'mindmap' | 'helper' | 'catalogue' | 'enterprise' | 'sense'

interface NavigationProps {
  currentPage: PageType
  onPageChange: (page: PageType) => void
}

const navItems: { id: PageType; name: string; icon: typeof Home }[] = [
  { id: 'main', name: 'Main', icon: Home },
  { id: 'tech', name: 'Tech', icon: Cpu },
  { id: 'mindmap', name: 'Mind Map', icon: GitBranch },
  { id: 'helper', name: 'Helper', icon: MessageCircle },
  { id: 'catalogue', name: 'Catalogue', icon: ShoppingCart },
  { id: 'enterprise', name: 'Enterprise', icon: Building2 },
  { id: 'sense', name: 'The Sense', icon: Sparkles },
]

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { colors } = useTheme()
  const [hoveredItem, setHoveredItem] = useState<PageType | null>(null)

  return (
    <nav 
      className="fixed top-12 left-0 right-0 z-40"
      style={{ 
        background: `linear-gradient(180deg, ${colors.surface}ee 0%, ${colors.surface}cc 100%)`,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            const isHovered = hoveredItem === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-5 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden group"
                style={{ 
                  background: isActive 
                    ? `linear-gradient(135deg, ${colors.primary}25, ${colors.secondary}15)` 
                    : isHovered 
                      ? `${colors.primary}10` 
                      : `${colors.surface}80`,
                  color: isActive ? colors.primary : colors.text,
                  border: `1px solid ${isActive ? colors.primary + '50' : colors.border}`,
                  transform: isHovered && !isActive ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: isActive ? `0 4px 20px ${colors.primary}20` : 'none'
                }}
              >
                {/* Icon as background watermark */}
                <Icon 
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 transition-all duration-300" 
                  style={{ 
                    color: isActive ? colors.primary : colors.textMuted,
                    opacity: isActive ? 0.25 : 0.1,
                    transform: `translateY(-50%) scale(${isHovered ? 1.1 : 1})`
                  }} 
                />
                {/* Text label - always visible */}
                <span 
                  className="relative z-10 text-sm font-semibold tracking-wide"
                  style={{ 
                    color: isActive ? colors.primary : colors.text,
                    textShadow: isActive ? `0 0 20px ${colors.primary}40` : 'none'
                  }}
                >
                  {item.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
