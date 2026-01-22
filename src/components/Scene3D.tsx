import { useEffect, useRef, useState } from 'react'

const pastelColors = [
  '#e879a9', '#f4a574', '#f0d878', '#7dd3a8', 
  '#7ec8d8', '#7ba3d8', '#a78bcc', '#c9a0c9'
]

// Detect if device is mobile/low-power for performance optimization
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth < 768 ||
         navigator.hardwareConcurrency <= 4
}

interface Microorganism {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  pulsePhase: number
  tentacles: number
  rotation: number
  rotationSpeed: number
}

interface WoodParticle {
  x: number
  y: number
  length: number
  angle: number
  drift: number
  opacity: number
  color: string
}

interface Lightning {
  branches: { x: number; y: number; angle: number; length: number }[]
  life: number
  maxLife: number
  color: string
}

interface LaserBeam {
  x: number
  y: number
  angle: number
  width: number
  speed: number
  color: string
  opacity: number
}

function CrystallineBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const microorganismsRef = useRef<Microorganism[]>([])
  const woodParticlesRef = useRef<WoodParticle[]>([])
  const lightningsRef = useRef<Lightning[]>([])
  const laserBeamsRef = useRef<LaserBeam[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initElements()
    }

    const initElements = () => {
      // Reduce particle counts on mobile for smooth performance
      const isMobile = isMobileDevice()
      const microCount = isMobile ? 8 : 20
      const woodCount = isMobile ? 25 : 60
      const laserCount = isMobile ? 3 : 6

      microorganismsRef.current = Array.from({ length: microCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: 20 + Math.random() * 40,
        color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        tentacles: isMobile ? 3 + Math.floor(Math.random() * 2) : 4 + Math.floor(Math.random() * 4),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008
      }))

      woodParticlesRef.current = Array.from({ length: woodCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 8 + Math.random() * 25,
        angle: Math.random() * Math.PI * 2,
        drift: Math.random() * Math.PI * 2,
        opacity: 0.08 + Math.random() * 0.2,
        color: Math.random() > 0.5 ? '#8B7355' : '#A0522D'
      }))

      laserBeamsRef.current = Array.from({ length: laserCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        width: 1 + Math.random() * 2,
        speed: 0.15 + Math.random() * 0.2,
        color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
        opacity: 0.08 + Math.random() * 0.15
      }))
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createLightning = () => {
      if (lightningsRef.current.length < 2 && Math.random() < 0.006) {
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height
        const branches: Lightning['branches'] = []
        let x = startX, y = startY, angle = Math.random() * Math.PI * 2
        
        for (let i = 0; i < 10 + Math.floor(Math.random() * 10); i++) {
          const length = 15 + Math.random() * 35
          angle += (Math.random() - 0.5) * 0.7
          branches.push({ x, y, angle, length })
          x += Math.cos(angle) * length
          y += Math.sin(angle) * length
          
          if (Math.random() < 0.25) {
            let subX = x, subY = y, subAngle = angle + (Math.random() - 0.5) * 1.0
            for (let j = 0; j < 2 + Math.floor(Math.random() * 3); j++) {
              const subLength = 8 + Math.random() * 18
              subAngle += (Math.random() - 0.5) * 0.4
              branches.push({ x: subX, y: subY, angle: subAngle, length: subLength })
              subX += Math.cos(subAngle) * subLength
              subY += Math.sin(subAngle) * subLength
            }
          }
        }
        lightningsRef.current.push({ branches, life: 0, maxLife: 80 + Math.random() * 50, color: pastelColors[Math.floor(Math.random() * pastelColors.length)] })
      }
    }

    const drawMicroorganism = (org: Microorganism, time: number) => {
      const pulse = Math.sin(time * 0.4 + org.pulsePhase) * 0.2 + 0.85
      const size = org.size * pulse
      ctx.save()
      ctx.translate(org.x, org.y)
      ctx.rotate(org.rotation)
      ctx.filter = 'blur(3px)'
      
      for (let i = 0; i < org.tentacles; i++) {
        const tAngle = (i / org.tentacles) * Math.PI * 2
        const wave = Math.sin(time * 0.25 + i + org.pulsePhase) * 12
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.bezierCurveTo(
          Math.cos(tAngle) * size * 0.5 + wave, Math.sin(tAngle) * size * 0.5,
          Math.cos(tAngle) * size * 0.8 - wave * 0.5, Math.sin(tAngle) * size * 0.8 + wave * 0.3,
          Math.cos(tAngle) * size * 1.3 + wave * 0.3, Math.sin(tAngle) * size * 1.3
        )
        ctx.strokeStyle = org.color + '25'
        ctx.lineWidth = 4
        ctx.stroke()
      }
      
      ctx.beginPath()
      for (let i = 0; i <= 36; i++) {
        const angle = (i / 36) * Math.PI * 2
        const wobble = Math.sin(angle * 3 + time * 0.35 + org.pulsePhase) * size * 0.12
        const r = size * 0.4 + wobble
        if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
        else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
      }
      ctx.closePath()
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.5)
      grad.addColorStop(0, org.color + '20')
      grad.addColorStop(0.6, org.color + '10')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2)
      ctx.fillStyle = org.color + '35'
      ctx.fill()
      ctx.filter = 'none'
      ctx.restore()
    }

    const drawWoodParticle = (p: WoodParticle, time: number) => {
      const drift = Math.sin(time * 0.08 + p.drift) * 6
      ctx.save()
      ctx.translate(p.x + drift, p.y)
      ctx.rotate(p.angle)
      ctx.filter = 'blur(1px)'
      ctx.beginPath()
      ctx.moveTo(-p.length / 2, 0)
      ctx.lineTo(p.length / 2, 0)
      ctx.strokeStyle = p.color
      ctx.lineWidth = 1
      ctx.globalAlpha = p.opacity
      ctx.stroke()
      ctx.filter = 'none'
      ctx.globalAlpha = 1
      ctx.restore()
    }

    const drawLightning = (l: Lightning) => {
      const progress = l.life / l.maxLife
      const opacity = Math.min(progress * 4, 1) * Math.max(0, 1 - (progress - 0.75) / 0.25) * 0.5
      ctx.save()
      ctx.globalAlpha = opacity
      l.branches.forEach((b, i) => {
        ctx.beginPath()
        ctx.moveTo(b.x, b.y)
        ctx.lineTo(b.x + Math.cos(b.angle) * b.length, b.y + Math.sin(b.angle) * b.length)
        ctx.shadowColor = l.color
        ctx.shadowBlur = 12
        ctx.strokeStyle = l.color
        ctx.lineWidth = i < 10 ? 1.5 : 0.8
        ctx.stroke()
        ctx.shadowBlur = 0
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = i < 10 ? 0.8 : 0.4
        ctx.stroke()
      })
      ctx.restore()
    }

    const drawLaserBeam = (beam: LaserBeam, time: number) => {
      const length = 400 + Math.sin(time * 0.15 + beam.angle) * 150
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate(beam.angle)
      const grad = ctx.createLinearGradient(0, 0, length, 0)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.2, beam.color + '25')
      grad.addColorStop(0.5, beam.color + '40')
      grad.addColorStop(0.8, beam.color + '25')
      grad.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.moveTo(0, -beam.width)
      ctx.lineTo(length, -beam.width * 0.5)
      ctx.lineTo(length, beam.width * 0.5)
      ctx.lineTo(0, beam.width)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.globalAlpha = beam.opacity
      ctx.fill()
      ctx.restore()
    }

    const drawPetriDish = () => {
      const cx = canvas.width / 2, cy = canvas.height / 2
      const radius = Math.max(canvas.width, canvas.height) * 0.7
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.35, cx, cy, radius)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.75, 'transparent')
      grad.addColorStop(1, 'rgba(5, 5, 12, 0.85)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(167, 139, 204, 0.04)'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    const animate = () => {
      timeRef.current += 0.014
      const time = timeRef.current
      ctx.fillStyle = 'rgba(6, 6, 12, 0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      laserBeamsRef.current.forEach(b => {
        b.x += Math.cos(b.angle) * b.speed
        b.y += Math.sin(b.angle) * b.speed
        b.angle += 0.0008
        if (b.x < -80) b.x = canvas.width + 80
        if (b.x > canvas.width + 80) b.x = -80
        if (b.y < -80) b.y = canvas.height + 80
        if (b.y > canvas.height + 80) b.y = -80
        drawLaserBeam(b, time)
      })

      woodParticlesRef.current.forEach(p => {
        p.y += 0.04
        p.x += Math.sin(time * 0.04 + p.drift) * 0.08
        if (p.y > canvas.height + 15) { p.y = -15; p.x = Math.random() * canvas.width }
        drawWoodParticle(p, time)
      })

      microorganismsRef.current.forEach(org => {
        org.x += org.vx
        org.y += org.vy
        org.rotation += org.rotationSpeed
        if (org.x < -org.size) org.x = canvas.width + org.size
        if (org.x > canvas.width + org.size) org.x = -org.size
        if (org.y < -org.size) org.y = canvas.height + org.size
        if (org.y > canvas.height + org.size) org.y = -org.size
        if (Math.random() < 0.004) {
          org.vx += (Math.random() - 0.5) * 0.08
          org.vy += (Math.random() - 0.5) * 0.08
          org.vx = Math.max(-0.4, Math.min(0.4, org.vx))
          org.vy = Math.max(-0.4, Math.min(0.4, org.vy))
        }
        drawMicroorganism(org, time)
      })

      createLightning()
      lightningsRef.current = lightningsRef.current.filter(l => {
        l.life++
        if (l.life < l.maxLife) { drawLightning(l); return true }
        return false
      })

      drawPetriDish()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', resizeCanvas) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(135deg, #040408 0%, #060610 50%, #080814 100%)' }}
    />
  )
}

function CrystallineOverlay() {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(232, 121, 169, 0.025) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(126, 200, 216, 0.025) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(167, 139, 204, 0.02) 0%, transparent 70%)
          `
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(167, 139, 204, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167, 139, 204, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      <div 
        className="absolute top-0 left-0 w-full h-40"
        style={{ background: 'linear-gradient(180deg, rgba(232, 121, 169, 0.04) 0%, transparent 100%)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-full h-40"
        style={{ background: 'linear-gradient(0deg, rgba(126, 200, 216, 0.04) 0%, transparent 100%)' }}
      />
    </div>
  )
}

export default function Scene3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CrystallineBackground />
      <CrystallineOverlay />
    </>
  )
}
