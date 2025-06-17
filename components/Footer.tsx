// components/Footer.tsx
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-gray-400 dark:text-gray-500 py-8 text-center">
      <div className="container mx-auto px-4">
        {/* 필요시 로고나 소셜 링크 추가 */}
        {/* <div className="mb-4">
          <Image src="/images/semo_logo_gray.png" alt="세모경제 로고" width={100} height={25} className="mx-auto opacity-50" />
        </div> */}
        <p className="text-sm">
          &copy; {currentYear} 세모경제 (Semo Economy). All rights reserved.
        </p>
        <p className="text-xs mt-1">
          본 사이트에서 제공되는 정보는 투자 참고자료이며, 최종 투자 결정은 본인의 판단과 책임하에 이루어져야 합니다.
        </p>
      </div>
    </footer>
  );
};

export default Footer;