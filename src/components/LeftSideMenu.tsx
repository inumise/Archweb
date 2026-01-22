import { useState } from 'react'
import { MessageCircle, Music, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import ChatAgent from './ChatAgent'
import AudioPlayer from './AudioPlayer'

type ActivePanel = 'none' | 'chat' | 'music'

export default function LeftSideMenu() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activePanel, setActivePanel] = useState<ActivePanel>('none')
  const { colors } = useTheme()

  const handleMenuClick = (panel: ActivePanel) => {
    if (activePanel === panel) {
      setActivePanel('none')
    } else {
      setActivePanel(panel)
    }
  }

  return (
    <>
      {/* Compact Left Side Menu */}
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          isExpanded ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: `${colors.surface}ee`,
          backdropFilter: 'blur(20px)',
          borderRadius: '0 16px 16px 0',
          border: `1px solid ${colors.border}`,
          borderLeft: 'none',
          boxShadow: `4px 0 30px ${colors.primary}20`
        }}
      >
        <div className="p-3 space-y-3">
          {/* Chat AI Button */}
          <button
            onClick={() => handleMenuClick('chat')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              activePanel === 'chat' ? 'scale-110' : 'hover:scale-105'
            }`}
            style={{
              background: activePanel === 'chat' ? colors.gradient : `${colors.primary}20`,
              boxShadow: activePanel === 'chat' ? `0 4px 20px ${colors.primary}40` : 'none'
            }}
            title="Chat AI"
          >
            <MessageCircle 
              className="w-5 h-5" 
              style={{ color: activePanel === 'chat' ? colors.background : colors.primary }} 
            />
          </button>

          {/* Music Button */}
          <button
            onClick={() => handleMenuClick('music')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              activePanel === 'music' ? 'scale-110' : 'hover:scale-105'
            }`}
            style={{
              background: activePanel === 'music' ? colors.gradient : `${colors.secondary}20`,
              boxShadow: activePanel === 'music' ? `0 4px 20px ${colors.secondary}40` : 'none'
            }}
            title="Sahara Soundscape"
          >
            <Music 
              className="w-5 h-5" 
              style={{ color: activePanel === 'music' ? colors.background : colors.secondary }} 
            />
          </button>
        </div>
      </div>

      {/* Toggle Button - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300"
        style={{
          transform: `translateY(-50%) translateX(${isExpanded ? '72px' : '0'})`,
          background: `${colors.surface}ee`,
          backdropFilter: 'blur(20px)',
          borderRadius: '0 8px 8px 0',
          border: `1px solid ${colors.border}`,
          borderLeft: 'none',
          padding: '12px 6px',
          boxShadow: `4px 0 20px ${colors.primary}10`
        }}
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4" style={{ color: colors.textMuted }} />
        ) : (
          <ChevronRight className="w-4 h-4" style={{ color: colors.textMuted }} />
        )}
      </button>

      {/* Render the active panel */}
      {activePanel === 'chat' && <ChatAgentPanel onClose={() => setActivePanel('none')} />}
      {activePanel === 'music' && <AudioPlayerPanel onClose={() => setActivePanel('none')} />}
    </>
  )
}

// Chat Agent Panel - Modified version that can be controlled externally
function ChatAgentPanel({ onClose }: { onClose: () => void }) {
  return <ChatAgent isControlled={true} onClose={onClose} />
}

// Audio Player Panel - Modified version that can be controlled externally  
function AudioPlayerPanel({ onClose }: { onClose: () => void }) {
  return <AudioPlayer isControlled={true} onClose={onClose} />
}
