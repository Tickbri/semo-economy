// components/YouTubePortfolioSection.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircleIcon } from '@heroicons/react/24/solid'; // Play 아이콘
import Image from 'next/image'; // next/image import

const portfolios = [
  { title: '경제 토크 콘텐츠', 
    description: '두 전문가가 하나의 경제 이슈를 유쾌하고 날카롭게 풀어내는 토크 콘텐츠입니다.', 
    thumbnail: '/images/policy.png',                             // 썸네일 이미지 경로
    youtubeLink: 'https://youtu.be/9h5hoRjHkSA',  // 유튜브 링크 추가
  },

  { title: '명사 초대 영상', 
    description: '다양한 분야의 명사들을 초청해 더욱 깊이있는 인사이트를 제공합니다.', 
    thumbnail: '/images/chart.png',                              // 썸네일 이미지 경로
    youtubeLink: 'https://youtu.be/NEsBGIPowmc?si=VmLDSV1efV5MBkgm',  // 유튜브 링크 추가  
  },

  { title: '시사·경제 해설', 
    description: '사회 현상과 경제를 연결해 흐름을 짚어주는, 통찰력 있는 시사형 해설 콘텐츠입니다.', 
    thumbnail: '/images/breaking.png',                           // 썸네일 이미지 경로
    youtubeLink: 'https://youtu.be/LIMRM4x600Q?si=vxhoWr-gRmLrl4RY',  // 유튜브 링크 추가
  },
];

const YouTubePortfolioSection = ({ id }: { id: string }) => {
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
          <h2 className="text-white">Youtube Portfolio</h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            세모경제는 다양한 콘텐츠를 통해 투자자 여러분께 유용한 정보를 제공합니다.
            <br />
            아래는 저희 유튜브 채널에서 제공하는 주요 콘텐츠입니다.
          </p>
        </motion.div>

        {/* 가로 스크롤 컨테이너 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
          {portfolios.map((portfolios, index) => (
            <motion.a
              key={index}
              href={portfolios.youtubeLink}
              target="_blank" // 새 탭에서 열기
              rel="noopener noreferrer" // 보안 및 SEO
              className="bg-[rgb(var(--card-bg))] dark:bg-white text-black rounded-xl shadow-lg p-6 md:p-8 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* 이미지 중심 강조 */}
              <div className="relative aspect-video"> {/* 16:9 비율 */}
                <Image
                  src={portfolios.thumbnail}
                  alt={`${portfolios.title} 썸네일`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircleIcon className="w-16 h-16 text-white/80" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground ">{portfolios.title}</h3>
                <p className="text-sm text-secondary">{portfolios.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubePortfolioSection;
