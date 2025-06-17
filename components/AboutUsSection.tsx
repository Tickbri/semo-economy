// components/AboutUsSection.tsx
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image'; // Next Image import

const features = [
  {
    icon: '/images/icon/Lamp_idea.png',
    title: (
      <>
        핵심을 짚는<br />
        경제·투자 콘텐츠
      </>
    ),
    description: (
      <>
        주식, 금융, 부동산 등 실전 투자와 초보<br />
        모두를 위한 깊이 있으면서도<br /> 
        이해하기 쉬운 경제 해설
      </>
    ),
    keywords: ['경제 해설', '투자 전략', '시장 분석'],
  },
  {
    icon: '/images/icon/Secret_chat.png',
    title: (
      <>
        명사와 함께하는<br />
        인사이트 토크
      </>
    ),
    description: (
      <>
        각 분야 전문가와 명사 초청,<br /> 
        경제를 넘어 시사, 트렌드, 사회 이슈까지<br />
        더 넓고 깊은 시야를 만드는 지식 콘텐츠
      </>
    ),
    keywords: ['전문가 인터뷰', '트렌드 분석', '지식 공유'],
  },
  {
    icon: '/images/icon/Subscribe.png',
    title: (
      <>
        돈 너머의 흐름을 읽는<br />
        이야기들
      </>
    ),
    description: (
      <>
        "왜 이런 일이 일어날까?"<br /> 
        단순한 뉴스가 아닌,<br />
        현상을 해석하고 연결해주는<br /> 
        통찰형 스토리텔링
      </>
    ),
    keywords: ['인사이트', '스토리텔링', '시장 전망'],
  },
];


const AboutUsSection = ({ id }: { id: string }) => {
  return (
    // 섹션에 relative 및 overflow-hidden 적용, 패딩은 globals.css의 section 스타일을 따름
    <section id={id} className="relative overflow-hidden">
      {/* 1. --section-very-dark-bg를 사용하는 단색 배경 레이어 */}
      <div
        className="absolute inset-0 z-[-2]"
        style={{ 
            backgroundColor: 'rgb(var(--section-very-dark-bg))',
         }}
      ></div>
      {/* 2. 투명도가 있는 패턴 이미지 레이어 */}
      <div
        className="absolute inset-0 z-[-1] filter brightness-125 bg-no-repeat  bg-contain"
        style={{ 
            backgroundImage: "url('/images/bg_aboutus.png')",
            backgroundPositionY: '0px', // ← 수동으로 위로 끌어올림
         }} // 이미지 경로는 public 폴더 기준
      ></div>

      {/* 콘텐츠 컨테이너 - z-10으로 배경 레이어들 위에 오도록 함 */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20" // 하단 마진 조정
        >
          {/* About Us 제목 스타일: 전역 h2 스타일을 따르되, 필요시 여기서 직접 text-foreground 적용 */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Us</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-secondary mb-6">
            우리는 '<span className="text-primary font-semibold">세상의 모든 경제</span>'를 이야기합니다. <br className="hidden sm:block" />
            단순한 정보 전달을 넘어, 세상의 흐름을 해석하는 힘을 나누고자 합니다.
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-secondary mb-10">
            복잡한 경제를 쉽고 명확하게, 지루한 이슈도 흥미롭고 깊이 있게 전하는 <br className="hidden sm:block" />
            인사이트 중심의 콘텐츠 플랫폼, 세모경제
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-foreground leading-snug">
            돈을 이해하면 세상이 보입니다. <br />
            세모경제와 함께, 인사이트를 넓혀보세요.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              // 카드 배경색은 --card-bg 사용, 테두리는 --border-color 사용 (globals.css .dark 에 정의된 값)
              className="bg-[rgb(var(--card-bg))] p-6 md:p-8 rounded-xl shadow-2xl border border-[rgb(var(--border-color))]/30 flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-5 md:mb-6">
                <div className="flex w-12 h-12"> {/* 아이콘 크기 Tailwind 클래스로 통일 (w-12 h-12는 3rem) */}
                  <Image
                    src={feature.icon}
                    alt={`${feature.title} 아이콘`}
                    width={48} // 3rem = 48px
                    height={48} // 3rem = 48px
                    className="object-contain" // 이미지 비율 유지
                  />
                </div>
              </div>
              {/* 카드 제목 색상을 primary로 변경 */}
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 text-primary mb-3 text-center">{feature.title}</h3>
              <p className="text-secondary mb-4 text-sm text-center min-h-[4.5rem] text-zinc-800 flex-grow">{feature.description}</p> {/* flex-grow 추가 */}
            {/* <div className="flex flex-wrap gap-2 justify-center pt-2">
                {feature.keywords.map(keyword => (
                  <span key={keyword} className="text-xs bg-primary/10 text-primary px-2.5 py-1.5 text-black rounded-full">
                    {keyword}
                  </span>
                ))}
              </div> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;