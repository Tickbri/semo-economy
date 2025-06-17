// components/OurVisionSection.tsx
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
const OurVisionSection = ({ id }: { id: string }) => {
    return (
        <section id={id} className="relative text-center overflow-hidden bg-black pt-0 pb-0">

            {/* 헤더 역할의 그라데이션 박스 */}
            <div className="bg-gradient-to-r from-cyan-700 via-sky-700 to-indigo-800 py-10 md:py-14;">
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Our Vision</h2>
            </div>

            {/* 내용 + 오버레이 박스 */}
            <div className="bg-black/60 py-14 md:py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* 설명 문장 */}
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                            우리는 더 많은 사람들이 경제를 쉽게 이해하고
                        </p>
                        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
                            정보가 아닌 <span className="text-white font-bold underline underline-offset-4 decoration-primary">‘인사이트’</span>를 가질 수 있도록 돕습니다.
                        </p>

                        {/* 인용 문장 강조 */}
                        <div className="relative max-w-4xl mx-auto px-8">
                            <div className="flex items-center justify-center gap-3 md:gap-5">
                                {/* 왼쪽 따옴표 */}
                                <div className="w-[60px] md:w-[75px] h-auto flex-shrink-0 translate-y-[-20px]">
                                    <Image
                                        src="/images/icon/left-quote.png"
                                        alt="왼쪽 따옴표 아이콘"
                                        width={75}
                                        height={75}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>

                                {/* 본문 텍스트 */}
                                <p className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white text-center leading-snug">
                                    복잡한 경제를 쉽게, 세상을 읽는 눈을 함께
                                </p>

                                {/* 오른쪽 따옴표 */}
                                <div className="w-[60px] md:w-[75px] h-auto flex-shrink-0 translate-y-[3px]">
                                    <Image
                                        src="/images/icon/right-quote.png"
                                        alt="오른쪽 따옴표 아이콘"
                                        width={75}
                                        height={75}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

    );
};

export default OurVisionSection;