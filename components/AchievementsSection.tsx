// components/AchievementsSection.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup'; // 숫자 카운팅 애니메이션: npm install react-countup
// 주요 협업사 로고 이미지 준비 (예: /public/images/samsung_logo.png)
import Image from 'next/image';

const achievementsData = [
  { value: 100, suffix: '만+', label: '누적 조회수', isCountUp: true, colorClass: 'text-yellow-500 dark:text-yellow-400' },
  { value: 50, suffix: '만+', label: '구독자 수', isCountUp: true, colorClass: 'text-teal-500 dark:text-teal-400' }, // 다른 색상 지정
  { 
    label: '주요 협업사', 
    isCountUp: false, 
    partners: [
      { name: 'Samsung', logo: '/images/samsung_logo.png' }, // 로고 경로 수정
      { name: 'Hyundai', logo: '/images/hyundai_logo.png' },
      { name: 'LG', logo: '/images/lg_logo.png' },
    ] 
  },
];

const AchievementsSection = ({ id }: { id: string }) => {
  return (
    <section id={id} className="bg-[rgb(var(--background))]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-white">주요 성과</h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            세모경제는 꾸준한 성장을 통해 높은 신뢰도와 만족도를 쌓아왔습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievementsData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.isCountUp ? (
                <>
                  {/* item.colorClass를 사용하거나, 조건부로 클래스 적용 */}
                  <div className={`text-5xl md:text-6xl font-bold mb-2 ${item.colorClass ? item.colorClass : 'text-[rgb(var(--accent))]'}`}>
                    <CountUp end={item.value ?? 0} duration={2.5} enableScrollSpy scrollSpyOnce />{item.suffix}
                  </div>
                  <p className="text-lg md:text-xl font-semibold  text-black">{item.label}</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg md:text-xl font-semibold text-black mb-4">{item.label}</h3>
                  <div className="flex justify-center items-center space-x-4">
                    {item.partners?.map(partner => (
                      <div key={partner.name} title={partner.name} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        <Image src={partner.logo} alt={`${partner.name} 로고`} width={80} height={30} objectFit="contain" />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;