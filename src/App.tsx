import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene3D from './components/Scene3D'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import NewAgeTech from './components/NewAgeTech'
import TechShowcase from './components/TechShowcase'
import WebServices from './components/WebServices'
import URLPreview from './components/URLPreview'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = document.querySelectorAll('section')
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
          }
        }
      )
    })

    const updateScrollProgress = () => {
      const scrollProgress = document.getElementById('scroll-progress')
      if (scrollProgress) {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        scrollProgress.style.width = `${scrollPercent}%`
      }
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Scene3D />
      
      <div className="relative z-10">
        <HeroSection />
        
                <AboutSection />
        
                <NewAgeTech />
        
                <TechShowcase />
        
                <WebServices />
        
                <div id="portals">
                  <URLPreview />
                </div>
        
                <Footer />
      </div>

      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
          style={{
            width: '0%',
            transition: 'width 0.1s ease-out'
          }}
          id="scroll-progress"
        />
      </div>
    </div>
  )
}

export default App
