// components/FAQSection.tsx
"use client";

import { Disclosure, Transition } from '@headlessui/react'; // Transition 추가
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'; // Solid 아이콘으로 변경하여 더 잘 보이게 할 수 있음
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence 추가
import { Fragment } from 'react'; // Fragment 추가

const faqs = [
  {
    question: '세모경제 서비스는 어떻게 이용하나요?',
    answer: '세모경제는 현재 유튜브 채널을 통해 주요 경제 정보와 투자 분석 콘텐츠를 제공하고 있습니다. 문의사항은 웹사이트 내 문의하기 폼을 통해 남겨주시면 됩니다.',
  },
  {
    question: '투자 자문 수수료는 어떻게 되나요?',
    answer: '현재 유튜브 콘텐츠는 무료로 제공되며, 별도의 투자 자문 계약은 문의를 통해 상담 후 결정됩니다.',
  },
  {
    question: '어떤 종류의 투자 정보를 얻을 수 있나요?',
    answer: '국내외 주식 시장 분석, 주요 경제 정책 해설, 단기 투자 전략 등 다양한 정보를 다룹니다. 자세한 내용은 유튜브 포트폴리오를 참고해주세요.',
  },
  // 추가 FAQ...
];

const FAQSection = ({ id }: { id: string }) => {
  return (
    // 섹션 배경은 globals.css의 CSS 변수를 따르도록 함
    <section id={id} className="bg-[rgb(var(--background))] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          {/* 제목 색상을 CSS 변수 --foreground 또는 --primary 사용 */}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[rgb(var(--foreground))]">자주 묻는 질문 (FAQ)</h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-[rgb(var(--secondary))]">
            궁금한 점이 있으신가요? 먼저 FAQ를 확인해보세요.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4"> {/* 각 FAQ 아이템 간 간격 추가 */}
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="overflow-hidden rounded-xl border border-[rgb(var(--border-color))]/50 shadow-lg hover:shadow-primary/10 transition-shadow duration-300"
            >
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <Disclosure.Button 
                      className={`w-full px-6 py-5 text-left text-lg font-medium flex justify-between items-center 
                                 bg-[rgb(var(--card-bg))] hover:bg-gray-500,0.05)] 
                                 focus:outline-none focus-visible:ring focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-opacity-75
                                 transition-colors duration-200
                                 ${open ? 'text-[rgb(var(--primary))]' : 'text-black'}`}
                    >
                      <span>{faq.question}</span>
                      {/* 아이콘 색상을 primary 또는 secondary로, open 상태에 따라 아이콘 변경 */}
                      {open ? (
                        <ChevronUpIcon className="w-6 h-6 text-[rgb(var(--primary))]" />
                      ) : (
                        <ChevronDownIcon className="w-6 h-6 text-[rgb(var(--secondary))]" />
                      )}
                    </Disclosure.Button>
                    
                    {/* AnimatePresence와 motion.div로 패널 애니메이션 적용 */}
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto", marginTop: '0px', transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] } },
                            collapsed: { opacity: 0, height: 0, marginTop: '0px', transition: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] } }
                          }}
                        >
                          {/* Disclosure.Panel 대신 motion.div를 사용했으므로, 내부 스타일 직접 적용 */}
                          <div className="px-6 pt-3 pb-5 text-base text-[rgb(var(--secondary))] bg-[rgb(var(--card-bg))] border-t border-[rgb(var(--border-color))]/30">
                             {/* prose dark:prose-invert max-w-none 등 typography 플러그인 클래스 사용 가능 */}
                            <div className="prose-invert prose-sm max-w-none">
                                {faq.answer}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;