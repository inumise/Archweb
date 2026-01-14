import { useState } from 'react'
import './App.css'

type Language = 'cs' | 'en' | 'zh' | 'ar'

const translations = {
  cs: {
    profile: 'Profil',
    projects: 'Projekty',
    news: 'Novinky',
    contact: 'Kontakt',
    search: 'Hledat',
    aboutTitle: 'O nás',
    aboutText: 'Společnost Jakub Cigler Architekti (JCA) je architektonické studio, které svou činnost zahájilo již v listopadu roku 2001. JCA se okamžitě po svém vzniku zařadila mezi přední české ateliéry zabývající se progresivní architekturou. Její realizace a projekty uspěly v řadě architektonických soutěží a jsou pravidelně představovány v odborných periodikách.',
    awards: 'Za svoji tvorbu získala řadu ocenění jak doma, tak v zahraničí - například Cenu Dušana Jurkoviče udělovanou Spolkem architektov Slovenska, opakovaně získala ocenění International Design Awards a ocenění Best Office Development.',
    selectedProjects: 'Vybrané projekty',
    viewMore: 'Více',
    allProjects: 'Všechny projekty',
    footer: 'ČESKÁ REPUBLIKA – PRAHA',
    address: 'Nad Ostrovem 1119/7, 147 00 Praha 4 - Podolí',
    phone: 'Telefon: +420-2-2680 5329',
    email: 'E-mail: info@jakubcigler.archi',
  },
  en: {
    profile: 'Profile',
    projects: 'Projects',
    news: 'News',
    contact: 'Contact',
    search: 'Search',
    aboutTitle: 'About Us',
    aboutText: 'Jakub Cigler Architekti (JCA) is an architectural studio that started its activities in November 2001. JCA immediately became one of the leading Czech studios dealing with progressive architecture. Its realizations and projects have succeeded in a number of architectural competitions and are regularly presented in professional periodicals.',
    awards: 'For its work, it has received a number of awards both at home and abroad - for example, the Dušan Jurkovič Award given by the Slovak Architects Association, repeatedly received the International Design Awards and the Best Office Development award.',
    selectedProjects: 'Selected Projects',
    viewMore: 'More',
    allProjects: 'All Projects',
    footer: 'CZECH REPUBLIC – PRAGUE',
    address: 'Nad Ostrovem 1119/7, 147 00 Prague 4 - Podolí',
    phone: 'Phone: +420-2-2680 5329',
    email: 'Email: info@jakubcigler.archi',
  },
  zh: {
    profile: '简介',
    projects: '项目',
    news: '新闻',
    contact: '联系',
    search: '搜索',
    aboutTitle: '关于我们',
    aboutText: 'Jakub Cigler Architekti (JCA) 是一家建筑工作室，于2001年11月开始运营。JCA成立后立即成为捷克领先的进步建筑工作室之一。其实现的项目在众多建筑竞赛中取得成功，并定期在专业期刊上展示。',
    awards: '凭借其作品，该公司在国内外获得了众多奖项——例如斯洛伐克建筑师协会颁发的Dušan Jurkovič奖，多次获得国际设计奖和最佳办公发展奖。',
    selectedProjects: '精选项目',
    viewMore: '更多',
    allProjects: '所有项目',
    footer: '捷克共和国 – 布拉格',
    address: 'Nad Ostrovem 1119/7, 147 00 布拉格 4 - Podolí',
    phone: '电话: +420-2-2680 5329',
    email: '邮箱: info@jakubcigler.archi',
  },
  ar: {
    profile: 'الملف الشخصي',
    projects: 'المشاريع',
    news: 'الأخبار',
    contact: 'اتصل',
    search: 'بحث',
    aboutTitle: 'من نحن',
    aboutText: 'Jakub Cigler Architekti (JCA) هو استوديو معماري بدأ نشاطه في نوفمبر 2001. أصبح JCA فور تأسيسه أحد الاستوديوهات التشيكية الرائدة في مجال العمارة التقدمية. نجحت مشاريعه في العديد من المسابقات المعمارية ويتم عرضها بانتظام في الدوريات المتخصصة.',
    awards: 'حصل على العديد من الجوائز محلياً ودولياً - مثل جائزة دوشان يوركوفيتش من جمعية المهندسين المعماريين السلوفاكية، وحصل مراراً على جوائز التصميم الدولية وجائزة أفضل تطوير مكتبي.',
    selectedProjects: 'مشاريع مختارة',
    viewMore: 'المزيد',
    allProjects: 'جميع المشاريع',
    footer: 'جمهورية التشيك – براغ',
    address: 'Nad Ostrovem 1119/7, 147 00 براغ 4 - Podolí',
    phone: 'الهاتف: +420-2-2680 5329',
    email: 'البريد الإلكتروني: info@jakubcigler.archi',
  },
}

const projects = [
  {
    id: 1,
    name: 'Victoria Palace',
    image: 'https://jakubcigler.archi/sites/default/files/styles/homepage_slideshow/public/2024-09/JCA_Victoria_Palace_01_BoysPlayNice.jpg',
    year: '2024',
    status: 'dokončeno',
  },
  {
    id: 2,
    name: 'Florentinum',
    image: 'https://jakubcigler.archi/sites/default/files/styles/homepage_slideshow/public/florentinum_01.jpg',
    year: '2013',
    status: 'dokončeno',
  },
  {
    id: 3,
    name: 'Savarin',
    image: 'https://jakubcigler.archi/sites/default/files/styles/project_list/public/2024-10/JCA_Savarin_01.jpg',
    year: '2024',
    status: 'v realizaci',
  },
  {
    id: 4,
    name: 'Chalupkova',
    image: 'https://jakubcigler.archi/sites/default/files/styles/project_list/public/2022-03/JCA_Chalupkova_01.jpg',
    year: '2022',
    status: 'projekt',
  },
  {
    id: 5,
    name: 'Dynamica',
    image: 'https://jakubcigler.archi/sites/default/files/styles/homepage_slideshow/public/dynamica_01.jpg',
    year: '2018',
    status: 'dokončeno',
  },
  {
    id: 6,
    name: 'Churchill I.',
    image: 'https://jakubcigler.archi/sites/default/files/styles/homepage_slideshow/public/churchill_i_01.jpg',
    year: '2019',
    status: 'dokončeno',
  },
]

function App() {
  const [language, setLanguage] = useState<Language>('cs')
  const [activeSection, setActiveSection] = useState<string>('home')
  const t = translations[language]
  const isRTL = language === 'ar'

  return (
    <div className={`min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sky Background with Clouds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100" />
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* Main Building Frame */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Building Structure with 3 Angled Frames */}
        <div className="building-container mx-auto w-full max-w-6xl px-4 py-8">
          {/* Pearl/White Building Frame with 3 angles */}
          <div className="building-frame relative">
            {/* Outer Frame - Biggest angle (thinnest at bottom) */}
            <div className="frame-outer absolute inset-0 bg-gradient-to-b from-stone-100 via-pearl to-stone-50 rounded-t-3xl shadow-2xl transform -skew-x-2">
              <div className="absolute inset-2 bg-gradient-to-br from-white/90 to-stone-100/80 rounded-t-2xl" />
            </div>
            
            {/* Middle Frame - Medium angle */}
            <div className="frame-middle absolute inset-4 bg-gradient-to-b from-stone-50 via-white to-stone-100 rounded-t-2xl shadow-xl transform -skew-x-1">
              <div className="absolute inset-2 bg-white/95 rounded-t-xl" />
            </div>
            
            {/* Inner Frame - Smallest angle (steepest at top) */}
            <div className="frame-inner absolute inset-8 bg-white rounded-t-xl shadow-lg">
              {/* Windows showing blue sky on sides */}
              <div className="window-left absolute left-0 top-20 bottom-20 w-16 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 rounded-l-lg shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                <div className="cloud-mini cloud-mini-1" />
                <div className="cloud-mini cloud-mini-2" />
              </div>
              <div className="window-right absolute right-0 top-20 bottom-20 w-16 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 rounded-r-lg shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20" />
                <div className="cloud-mini cloud-mini-3" />
                <div className="cloud-mini cloud-mini-4" />
              </div>
            </div>

            {/* Content Area */}
            <div className="relative z-20 px-24 py-12">
              {/* Header with Logo and Navigation */}
              <header className="mb-12">
                {/* Orange Accent Bar */}
                <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 rounded-full mb-6 opacity-80" />
                
                {/* Logo */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-light tracking-widest text-stone-800">
                    jakub cigler architekti
                  </h1>
                </div>

                {/* Navigation */}
                <nav className="flex justify-center items-center gap-8 flex-wrap">
                  <button 
                    onClick={() => setActiveSection('profile')}
                    className={`nav-link text-sm uppercase tracking-wider transition-all duration-300 ${activeSection === 'profile' ? 'text-orange-500 border-b-2 border-orange-400' : 'text-stone-600 hover:text-orange-400'}`}
                  >
                    {t.profile}
                  </button>
                  <button 
                    onClick={() => setActiveSection('projects')}
                    className={`nav-link text-sm uppercase tracking-wider transition-all duration-300 ${activeSection === 'projects' ? 'text-orange-500 border-b-2 border-orange-400' : 'text-stone-600 hover:text-orange-400'}`}
                  >
                    {t.projects}
                  </button>
                  <button 
                    onClick={() => setActiveSection('news')}
                    className={`nav-link text-sm uppercase tracking-wider transition-all duration-300 ${activeSection === 'news' ? 'text-orange-500 border-b-2 border-orange-400' : 'text-stone-600 hover:text-orange-400'}`}
                  >
                    {t.news}
                  </button>
                  <button 
                    onClick={() => setActiveSection('contact')}
                    className={`nav-link text-sm uppercase tracking-wider transition-all duration-300 ${activeSection === 'contact' ? 'text-orange-500 border-b-2 border-orange-400' : 'text-stone-600 hover:text-orange-400'}`}
                  >
                    {t.contact}
                  </button>
                  
                  {/* Language Selector with Orange Accent */}
                  <div className="flex gap-2 ml-4 border-l border-stone-300 pl-4">
                    {(['cs', 'en', 'zh', 'ar'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-2 py-1 text-xs uppercase rounded transition-all duration-300 ${
                          language === lang 
                            ? 'bg-orange-400 text-white shadow-md' 
                            : 'text-stone-500 hover:bg-orange-100'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </nav>
              </header>

              {/* Main Content */}
              <main className="min-h-96">
                {/* Hero Image Carousel */}
                <div className="relative mb-12 rounded-xl overflow-hidden shadow-2xl">
                  <div className="aspect-video bg-stone-200 relative">
                    <img 
                      src="https://jakubcigler.archi/sites/default/files/styles/homepage_slideshow/public/2024-09/JCA_Victoria_Palace_01_BoysPlayNice.jpg"
                      alt="Victoria Palace"
                      className="w-full h-full object-cover"
                    />
                    {/* Orange accent overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />
                  </div>
                </div>

                {/* About Section */}
                <section className="mb-12 bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-stone-100">
                  <h2 className="text-2xl font-light text-stone-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-orange-400 rounded-full" />
                    {t.aboutTitle}
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-4">{t.aboutText}</p>
                  <p className="text-stone-600 leading-relaxed">{t.awards}</p>
                </section>

                {/* Projects Grid */}
                <section className="mb-12">
                  <h2 className="text-2xl font-light text-stone-800 mb-6 flex items-center gap-3">
                    <span className="w-8 h-1 bg-orange-400 rounded-full" />
                    {t.selectedProjects}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <div 
                        key={project.id}
                        className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                      >
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                          <h3 className="text-white font-medium text-lg">{project.name}</h3>
                          <p className="text-white/70 text-sm">{project.year} • {project.status}</p>
                        </div>
                        {/* Orange accent on hover */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-orange-400 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <button className="px-8 py-3 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors duration-300 shadow-lg hover:shadow-xl">
                      {t.allProjects}
                    </button>
                  </div>
                </section>
              </main>
            </div>
          </div>

          {/* Greek Pillars at Bottom */}
          <div className="pillars-container relative mt-0">
            {/* Green Grass Base */}
            <div className="grass-base h-20 bg-gradient-to-t from-green-600 via-green-500 to-green-400 rounded-b-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-700/30 via-transparent to-green-700/30" />
              {/* Grass texture */}
              <div className="grass-blades" />
            </div>
            
            {/* Pillars */}
            <div className="pillars flex justify-around absolute bottom-16 left-8 right-8">
              {[1, 2, 3, 4, 5, 6].map((pillar) => (
                <div key={pillar} className="pillar-group">
                  {/* Pillar Capital (top) */}
                  <div className="pillar-capital w-16 h-6 bg-gradient-to-b from-stone-200 to-stone-300 rounded-t-sm shadow-md">
                    <div className="h-2 bg-gradient-to-b from-stone-100 to-stone-200 rounded-t-sm" />
                    <div className="flex justify-between px-1">
                      <div className="w-2 h-3 bg-stone-300 rounded-b-sm" />
                      <div className="w-2 h-3 bg-stone-300 rounded-b-sm" />
                      <div className="w-2 h-3 bg-stone-300 rounded-b-sm" />
                    </div>
                  </div>
                  {/* Pillar Shaft */}
                  <div className="pillar-shaft w-12 h-32 mx-auto bg-gradient-to-r from-stone-300 via-stone-100 to-stone-300 relative">
                    {/* Fluting (vertical grooves) */}
                    <div className="absolute inset-0 flex">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex-1 border-r border-stone-200/50" />
                      ))}
                    </div>
                  </div>
                  {/* Pillar Base */}
                  <div className="pillar-base w-16 h-4 bg-gradient-to-t from-stone-400 to-stone-300 rounded-b-sm shadow-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-20 mt-auto bg-stone-900/90 backdrop-blur-sm text-white py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="h-0.5 w-24 bg-orange-400 mx-auto mb-6 rounded-full" />
            <p className="text-stone-300 mb-2">{t.footer}</p>
            <p className="text-stone-400 text-sm mb-1">JAKUB CIGLER ARCHITEKTI, a.s.</p>
            <p className="text-stone-400 text-sm mb-1">{t.address}</p>
            <p className="text-stone-400 text-sm mb-1">{t.phone}</p>
            <p className="text-stone-400 text-sm">{t.email}</p>
            <div className="flex justify-center gap-6 mt-6">
              <a href="https://www.facebook.com/ciglermarani" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-orange-400 transition-colors">Facebook</a>
              <a href="https://www.youtube.com/channel/UCKh7q_u9A7t6MH" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-orange-400 transition-colors">YouTube</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
