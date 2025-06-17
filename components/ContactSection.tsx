// components/ContactSection.tsx
"use client";

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

// 문의할 이메일, 연락처 정보
const CONTACT_EMAIL = 'djtpseprtm1@gmail.com'; 
const CONTACT_PHONE = ''; 

// Google Form 정보
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf9F4KE83q0vlVxmMZcy94hUaRZRWpvzFy6Cmk2WTBOhibZmA/formResponse';
const NAME_FIELD_ID = 'entry.548429006'; // 이름 필드 ID
const CONTACT_FIELD_ID = 'entry.684122325'; // 연락처 필드 ID
const INQUIRY_TYPE_FIELD_ID = 'entry.2083694754'; // 문의 유형 필드 ID Select Field
const MESSAGE_FIELD_ID = 'entry.1003886633'; // 문의 내용 필드 ID
const INVEST_COST_FIELD_ID = 'entry.682653826'; // 투자금액 필드 ID

const formatInvestmentAmount = (value: string): string => {
    if (!value) return '';
    const digits = value.replace(/[^\d]/g, '');
    if (!digits) return '';
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 디버깅용 샘플 데이터
// const DEBUG_FORM_DATA = {
//   [NAME_FIELD_ID]: '홍길동 (테스트)',
//   [CONTACT_FIELD_ID]: '010-1234-5678',
//   [INQUIRY_TYPE_FIELD_ID]: '브랜드 협업',
//   [MESSAGE_FIELD_ID]: '디버깅 테스트를 위한 문의 내용입니다. 이 메시지는 자동으로 채워졌습니다.',
//   [INVEST_COST_FIELD_ID]: formatInvestmentAmount('10000000'),
// };

const ContactSection = ({ id }: { id: string }) => {
  const [formData, setFormData] = useState({
    [NAME_FIELD_ID]: '',
    [CONTACT_FIELD_ID]: '',
    [INQUIRY_TYPE_FIELD_ID]: '투자 정보 문의',
    [MESSAGE_FIELD_ID]: '',
    [INVEST_COST_FIELD_ID]: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null); // 'submitted' 대신 'success'로 유지 (사용자 코드 기준)
  const hiddenFrameRef = useRef<HTMLIFrameElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === INVEST_COST_FIELD_ID) {
      setFormData(prev => ({ ...prev, [name]: formatInvestmentAmount(value) }));
    } else if (name === CONTACT_FIELD_ID) {
      // 연락처 필드: 숫자와 하이픈(-)만 허용
      const filteredValue = value.replace(/[^\d-]/g, '');
      setFormData(prev => ({ ...prev, [name]: filteredValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData[NAME_FIELD_ID].trim()) {
      alert('이름을 입력해주세요.'); return false;
    }
    // 연락처 유효성 검사는 단순 비어있는지 여부만 확인 (다양한 형식 허용)
    if (!formData[CONTACT_FIELD_ID].trim()) { 
      alert('연락처를 입력해주세요.'); return false;
    }
    if (!formData[MESSAGE_FIELD_ID].trim()) {
      alert('문의 내용을 입력해주세요.'); return false;
    }
    return true;
  };

// 디버그용 자동 채우기 데이터 (개발 환경에서만 사용)
// const DEBUG_FORM_DATA = {
//   [NAME_FIELD_ID]: '홍길동 (테스트)',
//   [CONTACT_FIELD_ID]: '010-1234-5678', // 사용자가 입력하는 방식 그대로 (하이픈 제거는 제출 시)
//   [INQUIRY_TYPE_FIELD_ID]: '브랜드 협업', // 옵션 중 하나 선택
//   [MESSAGE_FIELD_ID]: '디버깅 테스트를 위한 문의 내용입니다. 이 메시지는 자동으로 채워졌습니다.',
//   [INVEST_COST_FIELD_ID]: formatInvestmentAmount('10000000'), // 천만원, 포맷팅 함수 사용
// };

  // 디버그 버튼 클릭 핸들러 (현재 주석 처리됨)
  // const handleDebugFill = () => {
  //   setFormData(DEBUG_FORM_DATA);
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('Submitting formData:', formData); // 제출 직전 상태 값 확인
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const formElement = e.target as HTMLFormElement;

    // DOM input 값을 React 상태(formData) 기준으로 명시적 업데이트
    const nameInput = formElement.elements.namedItem(NAME_FIELD_ID) as HTMLInputElement | null;
    const contactInput = formElement.elements.namedItem(CONTACT_FIELD_ID) as HTMLInputElement | null;
    const inquiryTypeInput = formElement.elements.namedItem(INQUIRY_TYPE_FIELD_ID) as HTMLSelectElement | null;
    const messageInput = formElement.elements.namedItem(MESSAGE_FIELD_ID) as HTMLTextAreaElement | null;
    const investmentCostInput = formElement.elements.namedItem(INVEST_COST_FIELD_ID) as HTMLInputElement | null;

    const nameForSubmit = formData[NAME_FIELD_ID];
    const contactForSubmit = formData[CONTACT_FIELD_ID]; // 숫자와 하이픈만 있는 상태
    const inquiryTypeForSubmit = formData[INQUIRY_TYPE_FIELD_ID];
    const messageForSubmit = formData[MESSAGE_FIELD_ID];
    const investmentAmountForSubmit = formData[INVEST_COST_FIELD_ID].replace(/,/g, '');

    if (nameInput) nameInput.value = nameForSubmit;
    if (contactInput) contactInput.value = contactForSubmit; // 하이픈은 Google Form이 그대로 받음
    if (inquiryTypeInput) inquiryTypeInput.value = inquiryTypeForSubmit;
    if (messageInput) messageInput.value = messageForSubmit;
    if (investmentCostInput) investmentCostInput.value = investmentAmountForSubmit;

    const currentIframe = hiddenFrameRef.current;
    if (currentIframe) {
      let iframeHandled = false; 

      const cleanupListeners = () => {
        currentIframe.removeEventListener('load', iframeLoadHandler);
        currentIframe.removeEventListener('error', iframeErrorHandler);
      };

      const iframeLoadHandler = () => {
        if (iframeHandled) return;
        iframeHandled = true;
        cleanupListeners();

        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ 
          [NAME_FIELD_ID]: '', [CONTACT_FIELD_ID]: '',
          [INQUIRY_TYPE_FIELD_ID]: '투자 정보 문의', [MESSAGE_FIELD_ID]: '',
          [INVEST_COST_FIELD_ID]: '',
        });
      };

      const iframeErrorHandler = () => {
        if (iframeHandled) return;
        iframeHandled = true;
        cleanupListeners();
        setIsSubmitting(false);
        setSubmitStatus('error');
      };

      currentIframe.addEventListener('load', iframeLoadHandler);
      currentIframe.addEventListener('error', iframeErrorHandler);
      
      formElement.submit();
    } else {
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  return (
    <>
      {/* 섹션 배경 */}
      <section id={id} className="bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            {/* 제목 및 부제목 스타일*/}
            <h2 className="text-[rgb(var(--primary))] mb-4">문의하기</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-black/80">
              세모경제와 함께할 기회를 찾고 계신가요? 궁금한 점이나 협업 제안이 있다면 언제든지 편하게 연락주세요.
            </p>

            {/* 샘플 대표 이메일 */}
            <br />
            <p className="text-sm text-gray-500 mt-2">이메일: <span className="text-blue-500">{CONTACT_EMAIL}</span></p>

            {/* 연락처 */}
            <p className="text-sm text-gray-500 mt-2"> <span className="text-blue-500">{CONTACT_PHONE}</span></p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto p-8 md:p-10 rounded-xl shadow-2xl border border-[rgb(var(--border-color))]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} action={GOOGLE_FORM_ACTION_URL} method="POST" target="hidden_iframe">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name_field" className="block text-sm font-semibold text-black mb-1.5">이름 <span className="text-[rgb(255,0,0)]">*</span></label>
                  <input
                    type="text" name={NAME_FIELD_ID} id="name_field" value={formData[NAME_FIELD_ID]} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-slate-200 border border-[rgb(var(--border-color))] rounded-md  text-black   placeholder:text-gray-400 transition-colors duration-150"
                  />
                </div>
                <div>
                  <label htmlFor={CONTACT_FIELD_ID} className="block text-sm font-semibold text-black mb-1.5">연락처 (숫자만 입력) <span className="text-[rgb(255,0,0)]">*</span></label>
                  <input
                    type="tel" name={CONTACT_FIELD_ID} id={CONTACT_FIELD_ID} value={formData[CONTACT_FIELD_ID]} onChange={handleChange} required
                    maxLength={13} // 010-xxxx-xxxx
                    placeholder="01012345678"
                    className="w-full px-4 py-3 bg-slate-200 border border-[rgb(var(--border-color))] rounded-md  text-black   placeholder:text-gray-400 transition-colors duration-150"
                  />
                </div>
                <div> {/* 투자금액 필드 추가 */}
                  <label htmlFor={INVEST_COST_FIELD_ID} className="block text-sm font-semibold text-black mb-1.5">투자금액 (숫자만 입력)</label>
                  <input
                    type="text"
                    name={INVEST_COST_FIELD_ID}
                    id={INVEST_COST_FIELD_ID}
                    value={formData[INVEST_COST_FIELD_ID]}
                    onChange={handleChange}
                    placeholder="예: 50000000 (원 단위)"
                    className="w-full px-4 py-3 bg-slate-200 border border-[rgb(var(--border-color))] rounded-md  text-black   placeholder:text-gray-400 transition-colors duration-150"
                  />
                </div>
                <div className="relative w-full">
                  <label htmlFor="inquiry_type_field" className="block text-sm font-semibold text-black mb-1.5">
                    문의 유형
                  </label>

                  <select
                    name={INQUIRY_TYPE_FIELD_ID}
                    id="inquiry_type_field"
                    value={formData[INQUIRY_TYPE_FIELD_ID]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-10 bg-slate-200 border border-[rgb(var(--border-color))] rounded-md text-black appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    }}
                  >
                    <option>투자 정보 문의</option>
                    <option>브랜드 협업</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message_field" className="block text-sm font-semibold text-black mb-1.5">문의 내용 <span className="text-[rgb(255,0,0)]">*</span></label>
                  <textarea
                    name={MESSAGE_FIELD_ID} id="message_field" value={formData[MESSAGE_FIELD_ID]} onChange={handleChange} rows={5} required
                    className="w-full px-4 py-3 bg-slate-200 border border-[rgb(var(--border-color))] rounded-md  text-black   placeholder:text-[rgb(var(--muted-foreground))] transition-colors duration-150 resize-none"
                  ></textarea>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit" disabled={isSubmitting}
                  className="btn btn-primary w-full disabled:opacity-60"
                >
                  {isSubmitting ? '전송 중...' : '문의하기'}
                </button>
                {/* 디버그용 버튼 */}
                {/* {process.env.NODE_ENV === 'development' && ( // 개발 환경에서만 보이도록 (선택적)
                  <button
                    type="button"
                    onClick={handleDebugFill}
                    className="btn btn-secondary w-full md:flex-1" // 보조 버튼 스타일 적용
                  >
                    디버그: 자동 채우기
                  </button>
                )} */}
              </div>
              {submitStatus === 'success' && <p className="mt-4 text-sm text-emerald-400 dark:text-emerald-500 text-center">문의가 성공적으로 전송되었습니다. 감사합니다!</p>}
              {submitStatus === 'error' && <p className="mt-4 text-sm text-red-400 dark:text-red-500 text-center">전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>}
            </form>
          </motion.div>
        </div>
      </section>
      <iframe name="hidden_iframe" id="hidden_iframe" ref={hiddenFrameRef} style={{ display: 'none' }} title="hidden_iframe_for_google_form_submission"></iframe>
    </>
  );
};

export default ContactSection;