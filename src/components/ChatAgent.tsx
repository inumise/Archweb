import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Pre-defined responses for common queries - soft, professional tone
const responses: Record<string, string> = {
  greeting: "Welcome to Don Hommer. I'm here to help you explore our solutions and answer any questions about our services. How may I assist you today?",
  pricing: "Our solutions are crafted to match your unique vision. The Foundation package begins at €10,000, Evolution at €25,000, and Transcendence at €50,000. Each includes a flexible initial commitment option. Would you like me to explain what's included in each?",
  foundation: "The Foundation package establishes your digital presence with custom responsive design, up to 10 crafted pages, SEO optimization, and dedicated support. It's perfect for businesses ready to make their mark. The initial commitment is €3,000.",
  evolution: "Evolution elevates your brand with bespoke design, AI integration, commerce capabilities, and extended partnership support. It's designed for businesses ready to scale. The initial commitment is €7,500.",
  transcendence: "Transcendence offers complete digital transformation with a dedicated team, full AI suite, unlimited refinements, and priority partnership. It's for visionaries who accept nothing less than excellence. The initial commitment is €15,000.",
  timeline: "Project timelines vary based on scope and complexity. Foundation projects typically complete in 4-6 weeks, Evolution in 8-12 weeks, and Transcendence engagements are ongoing partnerships. We'll provide a detailed timeline during our consultation.",
  process: "Our process begins with understanding your vision through a consultation. We then craft a proposal tailored to your needs, followed by design, development, and refinement phases. Throughout, you'll have direct communication with our team.",
  contact: "I'd be happy to arrange a consultation. You can reach us through the contact form on this page, or I can note your interest and have our team reach out to you. What works best for you?",
  ai: "Our AI integration services include custom chatbots, automation systems, and intelligent assistants tailored to your business needs. These can be added to any package or as standalone enhancements starting from €5,000.",
  default: "Thank you for your interest. I'd be happy to help you learn more about our services. You can ask about our packages, pricing, process, or anything else you'd like to know.",
}

// Keywords to match responses
const keywordMap: Record<string, string[]> = {
  pricing: ['price', 'cost', 'how much', 'pricing', 'investment', 'budget', 'afford', 'pay', 'euro', 'eur', '€'],
  foundation: ['foundation', 'basic', 'starter', 'first', 'begin', '10000', '10k'],
  evolution: ['evolution', 'middle', 'medium', 'grow', '25000', '25k'],
  transcendence: ['transcendence', 'premium', 'enterprise', 'full', 'complete', '50000', '50k'],
  timeline: ['time', 'long', 'duration', 'when', 'deadline', 'schedule', 'weeks', 'months'],
  process: ['process', 'how do you', 'work', 'steps', 'methodology', 'approach'],
  contact: ['contact', 'call', 'email', 'reach', 'talk', 'speak', 'consultation', 'meeting'],
  ai: ['ai', 'artificial', 'intelligence', 'chatbot', 'automation', 'assistant'],
  greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'start'],
}

function findResponse(input: string): string {
  const lowerInput = input.toLowerCase()
  
  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(keyword => lowerInput.includes(keyword))) {
      return responses[key]
    }
  }
  
  return responses.default
}

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { colors } = useTheme()

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Send initial greeting when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages([{
          id: '1',
          role: 'assistant',
          content: responses.greeting,
          timestamp: new Date()
        }])
        setIsTyping(false)
      }, 800)
    }
  }, [isOpen, messages.length])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const response = findResponse(userMessage.content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
        style={{
          background: colors.gradient,
          borderRadius: '50%',
          padding: '16px',
          boxShadow: `0 4px 20px ${colors.primary}40`
        }}
      >
        <MessageCircle className="w-6 h-6" style={{ color: colors.background }} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{
          width: '380px',
          maxWidth: 'calc(100vw - 48px)',
          height: '500px',
          maxHeight: 'calc(100vh - 120px)',
          background: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: '20px',
          boxShadow: `0 20px 60px ${colors.primary}20`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4"
          style={{
            background: colors.surface,
            borderBottom: `1px solid ${colors.border}`
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${colors.primary}20` }}
            >
              <Bot className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <div>
              <p className="font-medium" style={{ color: colors.text }}>
                Don Hommer Assistant
              </p>
              <p className="text-xs" style={{ color: colors.textMuted }}>
                Here to help
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg transition-colors hover:bg-white/10"
          >
            <X className="w-5 h-5" style={{ color: colors.textMuted }} />
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ background: colors.background }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: message.role === 'assistant' ? `${colors.primary}20` : `${colors.secondary}20`
                }}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4" style={{ color: colors.primary }} />
                ) : (
                  <User className="w-4 h-4" style={{ color: colors.secondary }} />
                )}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl ${
                  message.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                }`}
                style={{
                  background: message.role === 'assistant' ? colors.surface : `${colors.primary}20`,
                  color: colors.text
                }}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `${colors.primary}20` }}
              >
                <Bot className="w-4 h-4" style={{ color: colors.primary }} />
              </div>
              <div
                className="p-3 rounded-2xl rounded-tl-sm"
                style={{ background: colors.surface }}
              >
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ background: colors.textMuted, animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ background: colors.textMuted, animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ background: colors.textMuted, animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="p-4"
          style={{
            background: colors.surface,
            borderTop: `1px solid ${colors.border}`
          }}
        >
          <div
            className="flex items-center gap-2 p-2 rounded-xl"
            style={{
              background: colors.background,
              border: `1px solid ${colors.border}`
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about our services..."
              className="flex-1 bg-transparent outline-none text-sm px-2"
              style={{ color: colors.text }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
              style={{
                background: input.trim() ? colors.primary : 'transparent',
                color: input.trim() ? colors.background : colors.textMuted
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
