// components/MissionSection.tsx (YouTubePortfolioSection도 유사하게 수정)
"use client";

import React from 'react';
import { motion } from 'framer-motion';
// 각 미션에 맞는 아이콘을 Heroicons 등에서 가져오거나 직접 제작
import { CheckBadgeIcon, ChartBarIcon, CogIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'; 

const missions = [
  { title: '투자 대중화', description: '어려운 투자 정보를 쉽게 풀어 누구나 투자에 참여할 수 있도록 돕습니다.', icon: CheckBadgeIcon },
  { title: '객관적 정보 제공', description: '편향되지 않은 객관적인 데이터를 기반으로 투자 판단을 돕습니다.', icon: ChartBarIcon },
  { title: '맞춤형 투자 전략', description: '개인의 투자 성향과 목표에 맞는 최적의 투자 전략을 제시합니다.', icon: CogIcon },
];

const MissionSection = ({ id }: { id: string }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id={id} className="bg-white dark:bg-gray-900"> {/* 이전 섹션과 다른 배경 */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[rgb(var(--primary))]">세모경이 추구하는 목표</h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            우리는 다음과 같은 핵심 목표를 통해 투자자 여러분의 성공적인 자산 관리를 지원합니다.
          </p>
        </motion.div>
        
        {/* 가로 스크롤 컨테이너 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              // flex-shrink-0 및 w-72/w-80 제거, Grid가 너비 관리
              className="bg-[rgb(var(--card-bg))] dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true, amount: 0.3 }}
            >
              <mission.icon className="w-10 h-10 md:w-12 md:h-12 text-[rgb(var(--accent))] mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl md:text-2xl mb-2 text-gray-800 dark:text-white">{mission.title}</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{mission.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;