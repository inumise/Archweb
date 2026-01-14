import { useState, useEffect } from 'react'
import './App.css'

type Language = 'cs' | 'en' | 'zh' | 'ar'

const translations = {
  cs: {
    profile: 'Profil',
    projects: 'Projekty',
    news: 'Novinky',
    contact: 'Kontakt',
    aboutTitle: 'O nás',
    aboutText: 'Společnost Jakub Cigler Architekti (JCA) je architektonické studio, které svou činnost zahájilo již v listopadu roku 2001. JCA se okamžitě po svém vzniku zařadila mezi přední české ateliéry zabývající se progresivní architekturou.',
    awards: 'Za svoji tvorbu získala řadu ocenění jak doma, tak v zahraničí - například Cenu Dušana Jurkoviče udělovanou Spolkem architektov Slovenska.',
    selectedProjects: 'Vybrané projekty',
    allProjects: 'Všechny projekty',
    footer: 'ČESKÁ REPUBLIKA – PRAHA',
    address: 'Nad Ostrovem 1119/7, 147 00 Praha 4 - Podolí',
    phone: '+420-2-2680 5329',
    email: 'info@jakubcigler.archi',
    explore: 'Prozkoumat',
  },
  en: {
    profile: 'Profile',
    projects: 'Projects',
    news: 'News',
    contact: 'Contact',
    aboutTitle: 'About Us',
    aboutText: 'Jakub Cigler Architekti (JCA) is an architectural studio that started its activities in November 2001. JCA immediately became one of the leading Czech studios dealing with progressive architecture.',
    awards: 'For its work, it has received a number of awards both at home and abroad - for example, the Dušan Jurkovič Award.',
    selectedProjects: 'Selected Projects',
    allProjects: 'All Projects',
    footer: 'CZECH REPUBLIC – PRAGUE',
    address: 'Nad Ostrovem 1119/7, 147 00 Prague 4 - Podolí',
    phone: '+420-2-2680 5329',
    email: 'info@jakubcigler.archi',
    explore: 'Explore',
  },
  zh: {
    profile: '简介',
    projects: '项目',
    news: '新闻',
    contact: '联系',
    aboutTitle: '关于我们',
    aboutText: 'Jakub Cigler Architekti (JCA) 是一家建筑工作室，于2001年11月开始运营。JCA成立后立即成为捷克领先的进步建筑工作室之一。',
    awards: '凭借其作品，该公司在国内外获得了众多奖项——例如斯洛伐克建筑师协会颁发的Dušan Jurkovič奖。',
    selectedProjects: '精选项目',
    allProjects: '所有项目',
    footer: '捷克共和国 – 布拉格',
    address: 'Nad Ostrovem 1119/7, 147 00 布拉格 4 - Podolí',
    phone: '+420-2-2680 5329',
    email: 'info@jakubcigler.archi',
    explore: '探索',
  },
  ar: {
    profile: 'الملف الشخصي',
    projects: 'المشاريع',
    news: 'الأخبار',
    contact: 'اتصل',
    aboutTitle: 'من نحن',
    aboutText: 'Jakub Cigler Architekti (JCA) هو استوديو معماري بدأ نشاطه في نوفمبر 2001. أصبح JCA فور تأسيسه أحد الاستوديوهات التشيكية الرائدة.',
    awards: 'حصل على العديد من الجوائز محلياً ودولياً - مثل جائزة دوشان يوركوفيتش.',
    selectedProjects: 'مشاريع مختارة',
    allProjects: 'جميع المشاريع',
    footer: 'جمهورية التشيك – براغ',
    address: 'Nad Ostrovem 1119/7, 147 00 براغ 4 - Podolí',
    phone: '+420-2-2680 5329',
    email: 'info@jakubcigler.archi',
    explore: 'استكشف',
  },
}

const projects = [
  { id: 1, name: 'Victoria Palace', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop', year: '2024', category: 'Office' },
  { id: 2, name: 'Florentinum', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop', year: '2013', category: 'Mixed Use' },
  { id: 3, name: 'Savarin', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop', year: '2024', category: 'Urban' },
  { id: 4, name: 'Chalupkova', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop', year: '2022', category: 'Residential' },
  { id: 5, name: 'Dynamica', image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&h=800&fit=crop', year: '2018', category: 'Office' },
  { id: 6, name: 'Churchill I.', image: 'https://images.unsplash.com/photo-1464938050520-ef2571e0d6c6?w=1200&h=800&fit=crop', year: '2019', category: 'Office' },
]

function App() {
  const [language, setLanguage] = useState<Language>('cs')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const t = translations[language]
  const isRTL = language === 'ar'

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`architectural-masterpiece ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Cinematic Sky Backdrop */}
      <div className="sky-canvas">
        <div className="sky-gradient-layer" />
        <div className="cloud-formation cloud-1" style={{ transform: `translateX(${scrollY * 0.03}px)` }} />
        <div className="cloud-formation cloud-2" style={{ transform: `translateX(${-scrollY * 0.02}px)` }} />
        <div className="cloud-formation cloud-3" style={{ transform: `translateX(${scrollY * 0.015}px)` }} />
        <div className="atmospheric-depth" />
      </div>

      {/* Architectural Frame Structure */}
      <div className="building-structure">
        {/* Left Architectural Frame - 3 Progressive Angles */}
        <div className="frame-assembly frame-left">
          <div className="frame-layer frame-layer-1" />
          <div className="frame-layer frame-layer-2" />
          <div className="frame-layer frame-layer-3" />
          <div className="glass-panel glass-left">
            <div className="glass-reflection" />
            <div className="sky-view" />
          </div>
        </div>

        {/* Right Architectural Frame */}
        <div className="frame-assembly frame-right">
          <div className="frame-layer frame-layer-1" />
          <div className="frame-layer frame-layer-2" />
          <div className="frame-layer frame-layer-3" />
          <div className="glass-panel glass-right">
            <div className="glass-reflection" />
            <div className="sky-view" />
          </div>
        </div>

        {/* Pearl White Interior */}
        <main className="interior-space">
          {/* Refined Header */}
          <header className="architectural-header">
            <div className="header-accent-line" />
            <div className="brand-identity">
              <h1 className="brand-name">
                <span className="name-primary">JAKUB CIGLER</span>
                <span className="name-secondary">ARCHITEKTI</span>
              </h1>
            </div>
            
            <nav className="primary-navigation">
              <div className="nav-menu">
                <a href="#profile" className="nav-item">{t.profile}</a>
                <a href="#projects" className="nav-item">{t.projects}</a>
                <a href="#news" className="nav-item">{t.news}</a>
                <a href="#contact" className="nav-item">{t.contact}</a>
              </div>
              <div className="language-controls">
                {(['cs', 'en', 'zh', 'ar'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`lang-button ${language === lang ? 'active' : ''}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>
          </header>

          {/* Cinematic Hero Gallery */}
          <section className="hero-gallery">
            <div className="gallery-viewport">
              {projects.map((project, index) => (
                <div key={project.id} className={`gallery-slide ${index === currentSlide ? 'active' : ''}`}>
                  <img src={project.image} alt={project.name} className="slide-image" />
                  <div className="slide-overlay" />
                  <div className="slide-content">
                    <span className="project-category">{project.category}</span>
                    <h2 className="project-title">{project.name}</h2>
                    <span className="project-year">{project.year}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="gallery-navigation">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            <button className="explore-cta">{t.explore}</button>
          </section>

          {/* Studio Profile */}
          <section id="profile" className="profile-section">
            <div className="section-indicator">
              <div className="indicator-line" />
              <h2 className="section-heading">{t.aboutTitle}</h2>
            </div>
            <div className="profile-content">
              <p className="profile-text">{t.aboutText}</p>
              <p className="profile-awards">{t.awards}</p>
            </div>
          </section>

          {/* Project Portfolio */}
          <section id="projects" className="portfolio-section">
            <div className="section-indicator">
              <div className="indicator-line" />
              <h2 className="section-heading">{t.selectedProjects}</h2>
            </div>
            <div className="portfolio-grid">
              {projects.map((project) => (
                <article key={project.id} className="portfolio-item">
                  <div className="item-visual">
                    <img src={project.image} alt={project.name} className="item-image" />
                    <div className="item-overlay">
                      <span className="item-category">{project.category}</span>
                    </div>
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{project.name}</h3>
                    <span className="item-year">{project.year}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="portfolio-action">
              <button className="action-button">{t.allProjects}</button>
            </div>
          </section>
        </main>

        {/* Classical Colonnade */}
        <div className="colonnade-section">
          <div className="column-row">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="ionic-column">
                <div className="column-capital">
                  <div className="volute volute-left" />
                  <div className="volute volute-right" />
                  <div className="abacus" />
                  <div className="echinus" />
                </div>
                <div className="column-shaft">
                  {[...Array(8)].map((_, j) => (
                    <div key={j} className="flute" />
                  ))}
                </div>
                <div className="column-base">
                  <div className="torus-upper" />
                  <div className="scotia" />
                  <div className="torus-lower" />
                  <div className="plinth" />
                </div>
              </div>
            ))}
          </div>
          <div className="verdant-foundation">
            <div className="grass-gradient" />
            <div className="grass-texture">
              {[...Array(80)].map((_, i) => (
                <div
                  key={i}
                  className="grass-blade"
                  style={{
                    left: `${i * 1.25}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    height: `${12 + Math.random() * 18}px`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Footer */}
      <footer id="contact" className="architectural-footer">
        <div className="footer-interior">
          <div className="footer-brand">
            <span className="footer-monogram">JCA</span>
            <span className="footer-name">JAKUB CIGLER ARCHITEKTI</span>
          </div>
          <div className="footer-info">
            <p className="info-location">{t.footer}</p>
            <p className="info-address">{t.address}</p>
            <p className="info-phone">{t.phone}</p>
            <p className="info-email">{t.email}</p>
          </div>
          <div className="footer-links">
            <a href="https://www.facebook.com/ciglermarani" target="_blank" rel="noopener noreferrer" className="social-icon">FB</a>
            <a href="https://www.youtube.com/channel/UCKh7q_u9A7t6MH" target="_blank" rel="noopener noreferrer" className="social-icon">YT</a>
            <a href="https://www.linkedin.com/company/jakub-cigler-architekti" target="_blank" rel="noopener noreferrer" className="social-icon">IN</a>
          </div>
        </div>
        <div className="footer-accent" />
      </footer>
    </div>
  )
}

export default App
