// components/InsightPartnersSection.tsx
"use client";

import { useState, Fragment } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Partner {
  id: string;
  name: string;
  title: string; // 예: "경제 분석 전문가"
  imageUrl: string; // 원형 프로필 이미지 경로
  bio: string; // 상세 설명
  // socialLinks?: { platform: string; url: string }[];
}

const partnersData: Partner[] = [
  {
    id: 'kim', name: '김민규 전문가', title: '원칙의 전문가',
    imageUrl: '/images/partners/expert1.jpg', // 실제 이미지 경로로 변경
    bio: '정확한 데이터 해석과 냉철한 판단으로 시장을 꿰뚫는 김민규 전문가는, 명확하고 단호한 분석으로 신뢰를 쌓아온 투자 전략가입니다.'
  },
  {
    id: 'michael', name: '마이클 신 전문가', title: '통찰의 전문가',
    imageUrl: '/images/partners/expert2.jpg',
    bio: '복잡한 경제 흐름도 쉽게 풀어내는 마이클 신 전문가는, 친근한 설명과 부드러운 전달력으로 누구나 이해할 수 있는 콘텐츠를 만들어갑니다.'
  },
  {
    id: 'jang', name: '장찬욱 전문가', title: '신세대 전문가',
    imageUrl: '/images/partners/expert3.jpg',
    bio: '창의적인 시선과 젊은 감각을 바탕으로 새로운 해석을 제시하는 장찬욱 전문가는, 기존의 틀을 넘어선 유연한 분석이 강점인 차세대 전문가입니다.'
  },
];

const InsightPartnersSection = ({ id }: { id: string }) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // 애니메이션 시간을 위해 약간의 딜레이 후 선택된 파트너 초기화
    setTimeout(() => setSelectedPartner(null), 300);
  };

  return (
    <>
      <section id={id} className="relative overflow-hidden"> {/* 또는 매우 어두운 배경 #0A0F19 */}
        {/* 1. --section-very-dark-bg를 사용하는 단색 배경 레이어 */}
        <div
          className="absolute inset-0 z-[-2]"
          style={{
            backgroundColor: 'rgb(var(--section-very-dark-bg))',
          }}
        ></div>
        {/* 2. 투명도가 있는 패턴 이미지 레이어 */}
        <div
          className="absolute inset-0 z-[-1] bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/images/bg_partners.png')",
            backgroundPositionY: '0px', // ← 수동으로 위로 끌어올림
          }} // 이미지 경로는 public 폴더 기준
        ></div>


        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-foreground mb-4">Insight Partners</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-secondary">
              세모경제는 각 분야를 대표하는 명사들과 함께 콘텐츠를 만듭니다. <br />
              이들은 단순한 게스트가 아니라, 우리의 방향성을 함께 고민하는 지식 파트너입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {partnersData.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 shadow-2xl border-2 border-primary/50">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <button
                  onClick={() => openModal(partner)}
                  className="flex items-center justify-center text-lg font-semibold text-foreground hover:text-primary transition-colors group"
                  aria-label={`${partner.name} 상세 정보 보기`}
                >
                  {partner.name}
                  <PlusIcon className="ml-2 w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                </button>
                <p className="text-sm text-secondary">{partner.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Detail Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-card-bg p-8 text-left align-middle shadow-xl transition-all border border-border-color">
                  {selectedPartner && (
                    <>
                      <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-primary mb-2">
                        {selectedPartner.name}
                      </Dialog.Title>
                      <p className="text-sm text-secondary mb-6">{selectedPartner.title}</p>

                      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 mx-auto shadow-lg border-2 border-primary/30">
                        <Image src={selectedPartner.imageUrl} alt={selectedPartner.name} layout="fill" objectFit="cover" />
                      </div>

                      <div className="mt-2 prose prose-sm dark:prose-invert max-w-none text-secondary leading-relaxed">
                        <p>{selectedPartner.bio}</p>
                      </div>
                      {/* {selectedPartner.socialLinks && ( ... 소셜 링크 렌더링 ... )} */}
                    </>
                  )}
                  <button
                    type="button"
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted-foreground/20 transition-colors"
                    onClick={closeModal}
                    aria-label="닫기"
                  >
                    <XMarkIcon className="w-6 h-6 text-secondary" />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default InsightPartnersSection;