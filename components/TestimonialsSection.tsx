// components/TestimonialsSection.tsx
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image'; // 고객 사진 등에 사용 가능
import { StarIcon } from '@heroicons/react/20/solid'; // 별점 등에 사용

const testimonials = [
  {
    id: 1,
    name: '윤서진',
    role: '직장인',
    // avatar: '/images/avatars/kim.png', // 고객 아바타 이미지 경로
    quote: '출퇴근 시간에 세모경제 콘텐츠 챙겨보는데, 복잡한 경제 이슈도 쉽게 설명해줘서 큰 도움이 됩니다. 경제 뉴스가 처음으로 재미있어졌어요.',
    rating: 5,
  },
  {
    id: 2,
    name: '강지후',
    role: '프리랜서 기획자',
    // avatar: '/images/avatars/park.png',
    quote: '경제랑 사회 현상이 이렇게 연결되는 거였구나 싶었어요. 덕분에 뉴스 읽는 눈이 확실히 달라졌습니다!',
    rating: 5,
  },
  // 추가 후기...
];

const TestimonialsSection = ({ id }: { id: string }) => {
  return (
    <section id={id} className="bg-[rgb(var(--background))] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-white">고객후기</h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-secondary">
            세모경제를 경험한 고객님들의 생생한 목소리를 확인해보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-background dark:bg-white p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            >
              <div className="flex items-center mb-4">
                {/* {testimonial.avatar && (
                  <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full mr-4" />
                )} */}
                <div>
                  <p className="font-semibold text-black ">{testimonial.name}</p>
                  <p className="text-sm text-black">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                ))}
              </div>
              <blockquote className="text-black italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;