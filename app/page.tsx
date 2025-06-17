// app/page.tsx
"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';


import localFont from 'next/font/local'

// Section Components (개선된 버전으로 가정)
import HeroSection from '@/components/HeroSection';
import AboutUsSection from '@/components/AboutUsSection';
import MissionSection from '@/components/MissionSection';
import YouTubePortfolioSection from '@/components/YouTubePortfolioSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer'; // 푸터 추가
import TestimonialsSection from '@/components/TestimonialsSection'; // 고객 후기 섹션
import FAQSection from '@/components/FAQSection';                 // 자주 묻는 질문 섹션
import DarkModeToggle from '@/components/DarkModeToggle';         // 다크 모드 토글
import BackToTopButton from '@/components/BackToTopButton';     // 맨 위로 가기 버튼

import OurVisionSection from '@/components/OurVisionSection';
import InsightPartnersSection from '@/components/InsightPartnersSection';


const navItems = [
  { label: '소개', href: '#aboutus' },
  { label: '비전', href: '#vision' },
  // { label: '목표', href: '#mission' },
  { label: '전문가', href: '#partners' },
  { label: '포트폴리오', href: '#portfolio' },
  { label: '고객후기', href: '#testimonials' }, // 추가
  { label: '자주 묻는 질문', href: '#faq' },
  { label: '문의하기', href: '#contact' },
];

const KOHIBaeum = localFont({
  src: '../public/fonts/KOHIBaeum.woff2',
  variable: '--font-kohibaeum',
})


export default function Home() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // 스크롤 진행률 표시 바 (선택적)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 헤더 높이를 저장할 state 추가
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    const observerOptions = {
      root: null,
      rootMargin: `-${headerRef.current?.offsetHeight || 80}px 0px -50% 0px`, // 헤더 높이만큼 offset
      threshold: 0.3, // 섹션이 30% 보일 때 활성화
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => observer.observe(sec));

    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = headerHeight || 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false); // 모바일 메뉴 닫기
  };

  return (
    <>
      {/* 스크롤 진행률 바 */}
      <motion.div
        className="fixed left-0 right-0 h-1 bg-[rgb(var(--primary))] origin-[0%]"
        style={{
          scaleX,
          top: `${headerHeight}px`, // 헤더 바로 아래에 위치
          zIndex: 56, // 헤더(z-50)보다 살짝 위에, 모달보다는 아래
        }}
      />

      {/* Navigation */}
      {/* 투명도를 주려면 bg-[rgb(var(--background))]/80  */}
      <header ref={headerRef} className="bg-[rgb(var(--background))] backdrop-blur-md py-4 sticky top-0 z-50 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 flex justify-between items-center">

          <a
            href="#"
            onClick={(e) => handleNavLinkClick(e, '#hero')}
            className="flex items-center gap-2 text-2xl font-bold text-[rgb(var(--primary))]"
            //  font-kohibaeum
          >
            <Image
              src="/images/icon/semo_logo.png"
              alt="세모경제 로고"
              width={28} // 아이콘만큼 적절히 줄이기
              height={28}
            />
            <span className="leading-none">세모경제</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavLinkClick(e, item.href)}
                className={`text-base hover:text-[rgb(var(--primary))] transition-colors ${activeSection === item.href.substring(1) ? 'active-nav-link' : 'text-[rgb(var(--foreground))]'
                  }`}
              >
                {item.label}
              </a>
            ))}
            {/* <DarkModeToggle /> */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* <DarkModeToggle /> */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[rgb(var(--foreground))] focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-[rgb(var(--background))] shadow-lg py-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavLinkClick(e, item.href)}
                className={`block px-4 py-2 text-base hover:bg-gray-100 dark:hover:bg-gray-700 ${activeSection === item.href.substring(1) ? 'active-nav-link' : 'text-[rgb(var(--foreground))]'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <HeroSection id="hero" /> {/* Hero에도 ID 부여 */}
        

        <AboutUsSection id="aboutus" />
        <OurVisionSection id="vision" />
        {/* <MissionSection id="mission" /> */}
        {/* <AchievementsSection id="achievements" /> */}
        <InsightPartnersSection id="partners" />
        <YouTubePortfolioSection id="portfolio" />
        <TestimonialsSection id="testimonials" />
        <FAQSection id="faq" />
        <ContactSection id="contact" />
      </main>

      <Footer />
      <BackToTopButton />
    </>
  );
}