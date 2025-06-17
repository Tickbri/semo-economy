// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
// Pretendard 폰트 로드를 위해 next/font/local 사용 (또는 globals.css에서 @font-face)
import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes'; // ThemeProvider import

const SCoreDream = localFont({
  src: '../public/fonts/SCDream7.woff2',
  variable: '--font-s-core-dream',
});

const KOHIBaeum = localFont({
  src: '../public/fonts/KOHIBaeum.woff2',
  variable: '--font-kohibaeum',
})

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Regular.woff2', // 경로에 맞게 수정
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard', // CSS 변수로 사용 가능
});

export const metadata: Metadata = {
  title: '세모경제 - 세상의 모든 경제', // SEO 개선
  description: '세모경제는 데이터 기반의 신뢰성 있는 경제 정보와 맞춤형 투자 전략을 제공합니다.', // SEO 개선
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.className} ${KOHIBaeum.variable} ${SCoreDream.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}