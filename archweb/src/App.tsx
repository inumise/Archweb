import { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import './App.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronDown, Mail, Phone, Award, Play, Globe, ArrowRight, MapPin } from 'lucide-react';

const translations = {
  cs: {
    nav: { profile: 'Profil', projects: 'Projekty', awards: 'Ocenění', videos: 'Videa', contact: 'Kontakt' },
    hero: { subtitle: 'Architektonické studio', tagline: 'Progresivní architektura od roku 2001', cta: 'Prozkoumat projekty' },
    about: { title: 'O nás', description: 'Jakub Cigler Architekti (JCA) je architektonické studio, které zahájilo svou činnost v listopadu 2001 v Praze. Naše práce je charakterizována důrazem na kvalitu, inovaci a udržitelnost.', description2: 'Studio získalo za svou práci řadu ocenění doma i v zahraničí.', founded: 'Založeno', team: 'Členů týmu', projects: 'Realizovaných projektů', awards: 'Získaných ocenění' },
    projects: { title: 'Vybrané projekty', completed: 'Dokončeno', inProgress: 'V realizaci', area: 'Plocha', client: 'Klient' },
    awards: { title: 'Ocenění', subtitle: 'Mezinárodně uznávaná kvalita' },
    videos: { title: 'Videa', subtitle: 'Podívejte se na naše projekty' },
    contact: { title: 'Kontakt', subtitle: 'Spojte se s námi', name: 'Jméno', email: 'E-mail', message: 'Zpráva', send: 'Odeslat zprávu', phone: 'Telefon', company: 'JAKUB CIGLER ARCHITEKTI, a.s.' },
  },
  en: {
    nav: { profile: 'Profile', projects: 'Projects', awards: 'Awards', videos: 'Videos', contact: 'Contact' },
    hero: { subtitle: 'Architectural Studio', tagline: 'Progressive Architecture Since 2001', cta: 'Explore Projects' },
    about: { title: 'About Us', description: 'Jakub Cigler Architekti (JCA) is an architectural studio which started its activities in November 2001 in Prague. Our work is characterized by emphasis on quality, innovation and sustainability.', description2: 'The studio has won several awards for its work, both at home and abroad.', founded: 'Founded', team: 'Team Members', projects: 'Completed Projects', awards: 'Awards Won' },
    projects: { title: 'Selected Projects', completed: 'Completed', inProgress: 'In Progress', area: 'Area', client: 'Client' },
    awards: { title: 'Awards', subtitle: 'Internationally Recognized Quality' },
    videos: { title: 'Videos', subtitle: 'Watch Our Projects' },
    contact: { title: 'Contact', subtitle: 'Get in Touch', name: 'Name', email: 'Email', message: 'Message', send: 'Send Message', phone: 'Phone', company: 'JAKUB CIGLER ARCHITEKTI, a.s.' },
  },
  zh: {
    nav: { profile: '简介', projects: '项目', awards: '奖项', videos: '视频', contact: '联系' },
    hero: { subtitle: '建筑设计工作室', tagline: '自2001年以来的前沿建筑设计', cta: '探索项目' },
    about: { title: '关于我们', description: 'JCA是一家建筑设计工作室，于2001年11月在布拉格开始运营。我们的工作以质量、创新和可持续性为特点。', description2: '工作室在国内外获得了多项大奖。', founded: '成立于', team: '团队成员', projects: '完成项目', awards: '获得奖项' },
    projects: { title: '精选项目', completed: '已完成', inProgress: '进行中', area: '面积', client: '客户' },
    awards: { title: '奖项', subtitle: '国际认可的品质' },
    videos: { title: '视频', subtitle: '观看我们的项目' },
    contact: { title: '联系我们', subtitle: '与我们取得联系', name: '姓名', email: '电子邮件', message: '留言', send: '发送消息', phone: '电话', company: 'JAKUB CIGLER ARCHITEKTI, a.s.' },
  },
  ar: {
    nav: { profile: 'الملف', projects: 'المشاريع', awards: 'الجوائز', videos: 'الفيديو', contact: 'اتصل' },
    hero: { subtitle: 'استوديو معماري', tagline: 'هندسة معمارية متقدمة منذ 2001', cta: 'استكشف المشاريع' },
    about: { title: 'من نحن', description: 'استوديو معماري بدأ نشاطه في نوفمبر 2001 في براغ. يتميز عملنا بالتركيز على الجودة والابتكار والاستدامة.', description2: 'حصل الاستوديو على العديد من الجوائز.', founded: 'تأسس', team: 'أعضاء الفريق', projects: 'المشاريع المنجزة', awards: 'الجوائز' },
    projects: { title: 'مشاريع مختارة', completed: 'مكتمل', inProgress: 'قيد التنفيذ', area: 'المساحة', client: 'العميل' },
    awards: { title: 'الجوائز', subtitle: 'جودة معترف بها دوليا' },
    videos: { title: 'الفيديوهات', subtitle: 'شاهد مشاريعنا' },
    contact: { title: 'اتصل بنا', subtitle: 'تواصل معنا', name: 'الاسم', email: 'البريد', message: 'الرسالة', send: 'إرسال', phone: 'الهاتف', company: 'JAKUB CIGLER ARCHITEKTI, a.s.' },
  },
};

type Language = 'cs' | 'en' | 'zh' | 'ar';
type TranslationType = typeof translations.cs;
const LanguageContext = createContext<{ lang: Language; setLang: (lang: Language) => void; t: TranslationType; isRTL: boolean }>({ lang: 'cs', setLang: () => {}, t: translations.cs, isRTL: false });
const useLanguage = () => useContext(LanguageContext);

const projects = [
  { id: 1, name: 'Victoria Palace', description: 'Budova Victoria Palace je po téměř 90 letech první novostavbou na Vítězném náměstí. Elegantní design kombinuje moderní architekturu s historickým kontextem.', descriptionEn: 'The Victoria Palace building is the first new building in almost 90 years on Victory Square. Elegant design combines modern architecture with historical context.', year: '2024', status: 'completed', area: '12,390 m²', client: 'Penta Real Estate', image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1920&q=95' },
  { id: 2, name: 'Florentinum', description: 'Multifunkční administrativní komplex v centru Prahy. Jeden z největších kancelářských projektů ve střední Evropě.', descriptionEn: 'Multifunction administrative complex in Prague center. One of the largest office projects in Central Europe.', year: '2013', status: 'completed', area: '126,000 m²', client: 'Penta Investments', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=95' },
  { id: 3, name: 'Quadrio', description: 'Rezidenční budova v historickém centru Prahy. Moderní bydlení v srdci města.', descriptionEn: 'Residential building in the historic center of Prague. Modern living in the heart of the city.', year: '2014', status: 'completed', area: '45,000 m²', client: 'CPI Property Group', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=95' },
  { id: 4, name: 'Churchill I.', description: 'Administrativní budova na náměstí W. Churchilla. Prémiové kancelářské prostory s výhledem na Prahu.', descriptionEn: 'Administrative building on W. Churchill square. Premium office spaces with views of Prague.', year: '2019', status: 'completed', area: '33,100 m²', client: 'Penta Real Estate', image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1920&q=95' },
  { id: 5, name: 'Dynamica', description: 'Moderní administrativní budova s důrazem na udržitelnost a pracovní komfort.', descriptionEn: 'Modern administrative building with emphasis on sustainability and work comfort.', year: '2018', status: 'completed', area: '25,000 m²', client: 'Penta Investments', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=95' },
  { id: 6, name: 'Aviatica', description: 'Kancelářská budova certifikovaná LEED Gold. Špičkový standard udržitelné architektury.', descriptionEn: 'Office building certified LEED Gold. Top standard of sustainable architecture.', year: '2015', status: 'completed', area: '27,000 m²', client: 'Penta Investments', image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1920&q=95' },
  { id: 7, name: 'Masarykovo nádraží', description: 'Modernizace historického nádraží ve spolupráci se Zaha Hadid Architects. Ikonický projekt pro Prahu.', descriptionEn: 'Modernization of historic station with Zaha Hadid Architects. Iconic project for Prague.', year: '2025', status: 'in_progress', area: '150,000 m²', client: 'Penta Real Estate', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=95' },
  { id: 8, name: 'The Park', description: 'Víceúčelový komplex v Chodově. Kombinace kanceláří, obchodů a služeb.', descriptionEn: 'Multipurpose complex in Chodov. Combination of offices, shops and services.', year: '2011', status: 'completed', area: '190,000 m²', client: 'AIG/Lincoln', image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1920&q=95' },
];

const awards = [
  { year: '2019', title: 'Best of Realty - 2. cena', project: 'Churchill I.' },
  { year: '2019', title: 'WELL Core & Shell Certification', project: 'Visionary' },
  { year: '2016', title: 'Building of the Year CEEQA', project: 'Aviatica' },
  { year: '2015', title: 'Best Office Development', project: 'Aviatica' },
  { year: '2014', title: 'Best of Realty - 1. cena', project: 'Quadrio' },
  { year: '2013', title: 'Best Office Development', project: 'Florentinum' },
  { year: '2012', title: 'International Design Awards', project: 'Sofia Airport' },
  { year: '2009', title: 'Cena Dušana Jurkoviče', project: 'Digital Park' },
];

const videos = [
  { id: 1, title: 'Prague Architecture Walk', thumbnail: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?w=1280&q=90', embedUrl: 'https://www.youtube.com/embed/I24qiVmY6Uk', description: 'Architektonická procházka Prahou' },
  { id: 2, title: 'Masaryčka by Zaha Hadid', thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1280&q=90', embedUrl: 'https://www.youtube.com/embed/I24qiVmY6Uk?start=2481', description: 'Masaryčka od Zaha Hadid Architects' },
  { id: 3, title: 'Prague Hidden Secrets', thumbnail: 'https://images.unsplash.com/photo-1458150945447-7fb764c11a92?w=1280&q=90', embedUrl: 'https://www.youtube.com/embed/PvlDc_epoUU', description: 'Skryté tajemství Prahy' },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
}

function AnimatedCounter({ end, duration = 800, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, isInView } = useInView();
  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);
    setCount(0);
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration, hasAnimated]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function CubisticCard({ children, className = '', clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }: { children: React.ReactNode; className?: string; clipPath?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform(`perspective(1000px) rotateX(${(y - 0.5) * -5}deg) rotateY(${(x - 0.5) * 5}deg) scale3d(1.02, 1.02, 1.02)`);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  }, []);
  return (
    <div ref={cardRef} className={`transition-all duration-500 ease-out ${className}`} style={{ transform, transformStyle: 'preserve-3d', clipPath }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
}

function GeometricOverlay() {
  const scrollY = useParallax();
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 opacity-5" style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.02}deg)`, background: 'linear-gradient(135deg, #b87333 0%, transparent 70%)', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
      <div className="absolute top-1/3 right-20 w-48 h-48 opacity-5" style={{ transform: `translateY(${scrollY * -0.08}px) rotate(-15deg)`, background: 'linear-gradient(45deg, #4a5568 0%, transparent 70%)', clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }} />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 opacity-5" style={{ transform: `translateY(${scrollY * 0.15}px) rotate(45deg)`, background: 'linear-gradient(180deg, #1a1a1a 0%, transparent 70%)', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      <div className="absolute top-2/3 right-1/3 w-40 h-40 opacity-3" style={{ transform: `translateY(${scrollY * -0.12}px) rotate(30deg)`, background: 'linear-gradient(225deg, #b87333 0%, transparent 60%)', clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)' }} />
    </div>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setTimeout(onComplete, 400); return 100; }
        return prev + Math.random() * 12;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 opacity-10" style={{ background: 'linear-gradient(135deg, #b87333 0%, transparent 50%)', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', animation: 'pulse 3s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 opacity-10" style={{ background: 'linear-gradient(45deg, #4a5568 0%, transparent 50%)', clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', animation: 'pulse 3s ease-in-out infinite 0.5s' }} />
      </div>
      <div className="relative text-center z-10">
        <div className="relative mb-8">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-widest text-white">JCA</h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
        </div>
        <p className="text-neutral-500 tracking-widest text-xs mb-10 uppercase">Jakub Cigler Architekti</p>
        <div className="relative w-56 h-1 mx-auto">
          <div className="absolute inset-0 bg-neutral-800" style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 transition-all duration-200" style={{ width: `${Math.min(progress, 100)}%`, clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }} />
        </div>
        <p className="text-neutral-600 text-xs mt-4 font-light">{Math.min(Math.round(progress), 100)}%</p>
      </div>
    </div>
  );
}

function Navigation() {
  const { t, lang, setLang, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const languages: { code: Language; label: string }[] = [{ code: 'cs', label: 'CS' }, { code: 'en', label: 'EN' }, { code: 'zh', label: 'ZH' }, { code: 'ar', label: 'AR' }];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className={`text-xl font-extralight tracking-widest ${scrolled ? 'text-neutral-900' : 'text-white'}`}>JCA</span>
            <div className={`absolute -bottom-1 left-0 w-full h-px ${scrolled ? 'bg-amber-600' : 'bg-amber-500'}`} style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }} />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {Object.entries(t.nav).map(([key, value]) => (
            <button key={key} onClick={() => scrollTo(key === 'profile' ? 'about' : key)} className={`text-sm tracking-wider transition-all hover:text-amber-600 ${scrolled ? 'text-neutral-600' : 'text-white/80'}`}>{value}</button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {languages.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)} className={`px-2 py-1 text-xs tracking-wider transition-all ${lang === l.code ? (scrolled ? 'text-amber-600 font-medium' : 'text-amber-500 font-medium') : (scrolled ? 'text-neutral-400' : 'text-white/40')} hover:text-amber-600`}>{l.label}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const { t, isRTL } = useLanguage();
  const scrollY = useParallax();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1920&q=95" alt="Modern architecture" className="w-full h-full object-cover" style={{ transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(184,115,51,0.1) 0%, transparent 50%, rgba(74,85,104,0.1) 100%)' }} />
      </div>
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-white/10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.05}deg)` }} />
      <div className="absolute bottom-1/3 right-16 w-24 h-24 border border-amber-500/20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)', transform: `translateY(${scrollY * -0.15}px)` }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-amber-600/10" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', transform: `translateY(${scrollY * 0.1}px) rotate(-15deg)` }} />
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="mb-8">
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-wider text-white" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}>
              JAKUB CIGLER
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>
        </div>
        <p className="text-base md:text-lg tracking-widest text-amber-500/90 mb-2 font-light uppercase">{t.hero.subtitle}</p>
        <p className="text-sm text-white/50 mb-14 font-light tracking-wide">{t.hero.tagline}</p>
        <Button onClick={() => scrollTo('projects')} className="group bg-transparent border border-white/30 text-white hover:bg-white hover:text-neutral-900 px-10 py-7 text-sm tracking-widest font-light transition-all duration-500" style={{ clipPath: 'polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)' }}>
          {t.hero.cta.toUpperCase()} <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
        </Button>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInView();
  return (
    <section id="about" className="py-32 bg-neutral-50 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5" style={{ background: 'linear-gradient(180deg, #b87333 0%, transparent 100%)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
      <div ref={ref} className={`max-w-6xl mx-auto px-6 relative z-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-amber-600" />
              <span className="text-amber-600 text-sm tracking-widest uppercase">Studio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-10 tracking-wide leading-tight">{t.about.title}</h2>
            <p className="text-neutral-600 leading-relaxed mb-6 text-lg font-light">{t.about.description}</p>
            <p className="text-neutral-500 leading-relaxed font-light">{t.about.description2}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: 2001, label: t.about.founded, suffix: '' },
              { value: 50, label: t.about.team, suffix: '+' },
              { value: 8, label: t.about.projects, suffix: '' },
              { value: 8, label: t.about.awards, suffix: '' },
            ].map((stat, i) => (
              <CubisticCard key={i} className="group" clipPath={i % 2 === 0 ? 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 90%)'}>
                <div className="bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-500 h-full">
                  <div className="text-4xl font-extralight text-neutral-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-neutral-500 tracking-wider uppercase">{stat.label}</div>
                </div>
              </CubisticCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { t, lang, isRTL } = useLanguage();
  const { ref, isInView } = useInView();
  const clipPaths = [
    'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)',
    'polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 95%)',
    'polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 5%)',
    'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 0 100%)',
  ];
  return (
    <section id="projects" className="py-32 bg-white relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 opacity-5" style={{ background: 'linear-gradient(45deg, #4a5568 0%, transparent 100%)', clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }} />
      <div ref={ref} className={`max-w-7xl mx-auto px-6 relative z-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-amber-600" />
            <span className="text-amber-600 text-sm tracking-widest uppercase">Portfolio</span>
            <div className="w-12 h-px bg-amber-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extralight text-neutral-900 tracking-wide">{t.projects.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <CubisticCard key={project.id} className="group" clipPath={clipPaths[index % clipPaths.length]}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer border-0 shadow-sm hover:shadow-2xl transition-all duration-700 bg-white" style={{ clipPath: clipPaths[index % clipPaths.length] }}>
                    <div className="relative h-72 overflow-hidden">
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(184,115,51,0.2) 0%, transparent 50%)' }} />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-light text-white mb-2 tracking-wide">{project.name}</h3>
                        <p className="text-white/60 text-sm font-light">{project.year} · {project.area}</p>
                      </div>
                      {project.status === 'in_progress' && (
                        <div className="absolute top-4 right-4 bg-amber-600 px-4 py-1.5 text-xs tracking-wider text-white uppercase" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}>{t.projects.inProgress}</div>
                      )}
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden border-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 97%, 97% 100%, 0 100%)' }}>
                  <div className="relative h-80">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-10 bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-extralight text-neutral-900 mb-6 tracking-wide">{project.name}</DialogTitle>
                    </DialogHeader>
                    <p className="text-neutral-600 leading-relaxed mb-8 font-light text-lg">{lang === 'cs' ? project.description : project.descriptionEn}</p>
                    <div className="grid grid-cols-3 gap-8 text-sm">
                      <div className="border-l-2 border-amber-600 pl-4">
                        <span className="text-neutral-400 block mb-1 text-xs uppercase tracking-wider">{t.projects.area}</span>
                        <span className="text-neutral-900 font-light">{project.area}</span>
                      </div>
                      <div className="border-l-2 border-amber-600 pl-4">
                        <span className="text-neutral-400 block mb-1 text-xs uppercase tracking-wider">{t.projects.client}</span>
                        <span className="text-neutral-900 font-light">{project.client}</span>
                      </div>
                      <div className="border-l-2 border-amber-600 pl-4">
                        <span className="text-neutral-400 block mb-1 text-xs uppercase tracking-wider">{project.status === 'completed' ? t.projects.completed : t.projects.inProgress}</span>
                        <span className="text-neutral-900 font-light">{project.year}</span>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CubisticCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardsSection() {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInView();
  return (
    <section id="awards" className="py-32 bg-neutral-900 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(184,115,51,0.1) 50px, rgba(184,115,51,0.1) 100px)' }} />
      <div className="absolute top-0 left-0 w-1/2 h-full opacity-10" style={{ background: 'linear-gradient(135deg, #b87333 0%, transparent 50%)', clipPath: 'polygon(0 0, 50% 0, 0 100%)' }} />
      <div ref={ref} className={`max-w-6xl mx-auto px-6 relative z-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-20">
          <Award className="w-10 h-10 text-amber-500/50 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-4 tracking-wide">{t.awards.title}</h2>
          <p className="text-white/40 font-light tracking-wide">{t.awards.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <CubisticCard key={index} clipPath={index % 2 === 0 ? 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 95%)'}>
              <div className="p-6 border border-white/10 hover:border-amber-500/30 bg-white/5 backdrop-blur-sm transition-all duration-500 h-full group" style={{ clipPath: index % 2 === 0 ? 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 95%)' }}>
                <div className="text-3xl font-extralight text-amber-500/60 mb-4 group-hover:text-amber-500 transition-colors duration-300">{award.year}</div>
                <h3 className="text-white font-light mb-2 tracking-wide">{award.title}</h3>
                <p className="text-white/40 text-sm font-light">{award.project}</p>
              </div>
            </CubisticCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideosSection() {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInView();
  return (
    <section id="videos" className="py-32 bg-neutral-50 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 right-0 w-1/3 h-1/2 opacity-5" style={{ background: 'linear-gradient(225deg, #4a5568 0%, transparent 100%)', clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
      <div ref={ref} className={`max-w-6xl mx-auto px-6 relative z-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-20">
          <Play className="w-10 h-10 text-neutral-300 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-4 tracking-wide">{t.videos.title}</h2>
          <p className="text-neutral-500 font-light tracking-wide">{t.videos.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {videos.map((video, index) => (
            <Dialog key={video.id}>
              <DialogTrigger asChild>
                <CubisticCard className="group cursor-pointer" clipPath={index === 1 ? 'polygon(0 5%, 100% 0, 100% 100%, 0 95%)' : 'polygon(0 0, 100% 5%, 100% 95%, 0 100%)'}>
                  <div className="relative h-56 overflow-hidden mb-5" style={{ clipPath: index === 1 ? 'polygon(0 5%, 100% 0, 100% 100%, 0 95%)' : 'polygon(0 0, 100% 5%, 100% 95%, 0 100%)' }}>
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                        <Play className="w-6 h-6 text-neutral-900 group-hover:text-white ml-1 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-neutral-900 font-light mb-1 tracking-wide group-hover:text-amber-600 transition-colors duration-300">{video.title}</h3>
                  <p className="text-neutral-500 text-sm font-light">{video.description}</p>
                </CubisticCard>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden border-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 97%, 97% 100%, 0 100%)' }}>
                <div className="aspect-video bg-black">
                  <iframe src={video.embedUrl} title={video.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInView();
  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-5" style={{ background: 'linear-gradient(315deg, #b87333 0%, transparent 70%)', clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }} />
      <div ref={ref} className={`max-w-6xl mx-auto px-6 relative z-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-amber-600" />
              <span className="text-amber-600 text-sm tracking-widest uppercase">Contact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-10 tracking-wide">{t.contact.title}</h2>
            <p className="text-neutral-500 mb-12 font-light text-lg">{t.contact.subtitle}</p>
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  <MapPin className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-neutral-900 font-light mb-1">{t.contact.company}</p>
                  <p className="text-neutral-500 text-sm font-light">Nad Ostrovem 1119/7</p>
                  <p className="text-neutral-500 text-sm font-light">147 00 Praha 4 - Podolí</p>
                  <p className="text-neutral-500 text-sm font-light">Česká republika</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  <Phone className="w-4 h-4 text-amber-600" />
                </div>
                <a href="tel:+420226805329" className="text-neutral-600 hover:text-amber-600 transition-colors font-light">+420 226 805 329</a>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  <Mail className="w-4 h-4 text-amber-600" />
                </div>
                <a href="mailto:info@jakubcigler.archi" className="text-neutral-600 hover:text-amber-600 transition-colors font-light">info@jakubcigler.archi</a>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  <Globe className="w-4 h-4 text-amber-600" />
                </div>
                <a href="https://www.jakubcigler.archi" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-amber-600 transition-colors font-light">www.jakubcigler.archi</a>
              </div>
            </div>
          </div>
          <CubisticCard clipPath="polygon(0 0, 100% 0, 100% 97%, 97% 100%, 0 100%)">
            <form className="bg-neutral-50 p-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 97%, 97% 100%, 0 100%)' }} onSubmit={e => e.preventDefault()}>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-neutral-500 mb-2 tracking-wider uppercase">{t.contact.name}</label>
                  <Input className="bg-white border-neutral-200 focus:border-amber-500 transition-colors h-12" style={{ clipPath: 'polygon(0 0, 100% 0, 99% 100%, 1% 100%)' }} />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 mb-2 tracking-wider uppercase">{t.contact.email}</label>
                  <Input type="email" className="bg-white border-neutral-200 focus:border-amber-500 transition-colors h-12" style={{ clipPath: 'polygon(0 0, 100% 0, 99% 100%, 1% 100%)' }} />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 mb-2 tracking-wider uppercase">{t.contact.message}</label>
                  <Textarea rows={5} className="bg-white border-neutral-200 focus:border-amber-500 transition-colors resize-none" style={{ clipPath: 'polygon(0 0, 100% 0, 99% 100%, 1% 100%)' }} />
                </div>
                <Button type="submit" className="w-full bg-neutral-900 hover:bg-amber-600 text-white py-6 text-sm tracking-widest font-light transition-all duration-500" style={{ clipPath: 'polygon(2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%, 0% 50%)' }}>
                  {t.contact.send.toUpperCase()}
                </Button>
              </div>
            </form>
          </CubisticCard>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 100px, rgba(184,115,51,0.1) 100px, rgba(184,115,51,0.1) 200px)' }} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-extralight tracking-widest text-white">JCA</span>
            <div className="w-px h-6 bg-white/20" />
            <span className="text-neutral-500 text-sm tracking-wide">JAKUB CIGLER ARCHITEKTI, a.s.</span>
          </div>
          <p className="text-neutral-600 text-sm">© 2001-2026 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('cs');
  const t = translations[lang];
  const isRTL = lang === 'ar';
  useEffect(() => {
    if (isRTL) {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang, isRTL]);
  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      <div className="min-h-screen bg-white">
        <GeometricOverlay />
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <AwardsSection />
        <VideosSection />
        <ContactSection />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}
