// components/HeroSection.tsx
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// HeroSection 컴포넌트
const HeroSection = ({ id }: { id: string }) => { // 기존 방식 유지
  const scrollToAbout = () => {
    // 스크롤 로직은 page.tsx의 handleNavLinkClick을 재활용하거나 유사하게 구현
    // 여기서는 간단히 ID로 스크롤하는 예시 (정확한 offset은 page.tsx의 로직 참고)
    const aboutSection = document.getElementById('aboutus');
    if (aboutSection) {
        const headerOffset = document.querySelector('header')?.offsetHeight || 80;
        window.scrollTo({
            top: aboutSection.offsetTop - headerOffset,
            behavior: 'smooth'
        });
    }
  };

  return (
    // min-h-screen 대신, 예를 들어 h-[80vh] 또는 적절한 py 값으로 높이 조절
    // py-32 (상하 8rem), lg:py-40 (상하 10rem) 등으로 높이 감소
    <section 
      id={id} 
      className="relative flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-900 text-white px-4 py-28 md:py-32 lg:py-36" // 높이 축소
      // style={{ paddingTop: `${headerHeight}px` }} // 만약 HeroSection 배경이 헤더 뒤로 이어지는 효과를 원한다면
    >
      {/* 배경 패턴*/}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
      </div>
      
      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* 로고, 헤드라인, 설명, 버튼 등 기존 콘텐츠 유지 */}
          <Image
            src="/images/icon/semo_logo.png"
            width={100} // 로고 크기 약간 줄임 (예시)
            height={50}
            alt="세모경제 로고"
            className="mx-auto mb-4 md:mb-6"
            priority
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 "> {/* 폰트 크기 약간 줄임 (예시) */}
            <span className="block">세모경제</span>
            <span className="block text-yellow-400 dark:text-yellow-300 text-sm sm:text-base md:text-lg mt-1 block relative translate-x-1"style={{ letterSpacing: '0.29em' }}>세 상 의  모 든  경 제</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-indigo-100 dark:text-indigo-200 max-w-xl mx-auto mb-6">
            데이터 중심의 분석으로 세상의 모든 경제 흐름을 꿰뚫는 통찰을 전합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center"> {/* 버튼 간격 약간 줄임 (예시) */}
            <button onClick={scrollToAbout} className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2.5 text-base"> {/* 버튼 크기 약간 줄임 (예시) */}
              더 알아보기
            </button>
            <a href="#contact" onClick={(e) => { /* 부드러운 스크롤 로직 적용 */ }} className="btn-secondary bg-white/20 hover:bg-white/30 text-white border-white/50 px-6 py-2.5 text-base">
              바로 문의하기
            </a>
          </div>
        </motion.div>
      </div>

      {/* 아래로 스크롤 유도 아이콘 (선택적) */}
      <motion.div
        className="absolute bottom-8 w-full flex justify-center cursor-pointer" // bottom 위치 조정
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        onClick={scrollToAbout}
      >
        <ChevronDownIcon className="w-7 h-7 text-white/70" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
