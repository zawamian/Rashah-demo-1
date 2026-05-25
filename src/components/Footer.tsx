import { useState, FormEvent } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setActivePage: (page: 'home' | 'collections' | 'connect') => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const { t, dir, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const errorMsg = language === 'ar' 
    ? 'الرجاء إدخال عنوان بريد إلكتروني صالح للمراسلة.' 
    : (language === 'tr' ? 'Lütfen geçerli bir e-posta adresi belirtin.' : 'Please provide a valid email coordinate.');
  
  const successMsg = language === 'ar'
    ? '✦ تم تسجيل بريدكم بنجاح في مجلة النفحات. أهلاً بكم.'
    : (language === 'tr' ? '✦ E-posta başarıyla kaydedildi. Hoş geldiniz.' : '✦ Coordinates logged. Welcome.');

  const perfectPantry = language === 'ar'
    ? 'نبتكر ثقافة المائدة الحرفية والتوابل التراثية الكاملة.'
    : (language === 'tr' ? 'Mükemmel kiler kültürünü tasarlıyoruz.' : 'Perfecting pantry culture.');

  const metaLogs = language === 'ar'
    ? 'سجلات البيانات اللوجستية'
    : (language === 'tr' ? 'LOJİSTİK VERİ BİLGİLERİ' : 'METADATA LOGS');

  const regCode = language === 'ar' ? 'رمز السجل التجاري' : (language === 'tr' ? 'TİCARİ SİCİL KODU' : 'REGISTRY CODE');
  const elevation = language === 'ar' ? 'الارتفاع الجغرافي للرياض' : (language === 'tr' ? 'RAKIM YÜKSEKLİĞİ' : 'ELEVATION');
  const flow = language === 'ar' ? 'نظام تحضير المطبخ' : (language === 'tr' ? 'MUTFAK İŞ AKIŞI' : 'KITCHEN WORKFLOW');
  const flowVal = language === 'ar' ? 'مطابق للمعايير الحرفية المصغّرة' : (language === 'tr' ? 'MİKRO-SERİ UYUMLU' : 'MICRO-BATCH COMPLIANT');
  const elevationVal = language === 'ar' ? '٦١٢ متر فوق مستوى سطح البحر' : (language === 'tr' ? 'Deniz Seviyesinden 612M Yüksek' : '612M Above Sea Level');

  const receiveMsg = language === 'ar' ? 'استلام مجلة الدفعة الكبرى' : (language === 'tr' ? 'SERİ BÜLTENİNE KAYDOLUN' : 'RECEIVE BATCH JOURNAL');
  const receiveDesc = language === 'ar' 
    ? 'احصل على نشرات إخبارية أولية حول بهاراتنا الفردية نادرة الإصدار وإصدارات الغرانولا الممتازة بانتظام.' 
    : (language === 'tr' ? 'Sınırlı üretim tek kökenli baharatlar ve özel granola bültenlerini ilk siz alın.' : 'Get raw bulletin dispatches on limited-run Single origin spices and specialty granola releases.');

  const coordPlaceholder = language === 'ar' ? 'البريد الإلكتروني (your@email.com)' : (language === 'tr' ? 'E-posta adresi (your@email.com)' : 'Coordinate (your@email.com)');

  const rights = language === 'ar' ? 'جميع الحقوق السيادية محفوظة' : (language === 'tr' ? 'TÜM EGEMEN HAKLARI SAKLIDIR' : 'ALL SOVEREIGN RIGHTS RESERVED');
  const terms = language === 'ar' ? 'شروط المواصفات الحرفية' : (language === 'tr' ? 'İŞLEYİŞ ŞARTLARI' : 'TERMS OF SPECISTRY');
  const location = language === 'ar' ? 'الرياض، المملكة العربية السعودية' : (language === 'tr' ? 'RİYAD, SUUDİ ARABİSTAN' : 'RIYADH, SAUDI ARABIA');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError(errorMsg);
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-brand-cream dark:bg-brand-charcoal border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-left">
        
        {/* Asymmetric Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-16 border-b border-brand-charcoal/10 dark:border-brand-cream/10`}>
          
          {/* Col 1: Brand & Arabic (Span 4) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-serif text-3xl font-bold tracking-[0.1em] text-brand-charcoal dark:text-brand-cream block mb-2">
                RASHAH <span className="text-brand-terracotta italic font-normal">رشة</span>
              </span>
              <span className="font-mono-data text-[10px] tracking-[0.3em] text-brand-ochre font-extrabold uppercase block mb-6">
                {t('brand_sub')}
              </span>
              <p className="text-xs sm:text-sm text-brand-charcoal/60 dark:text-brand-cream/65 leading-relaxed max-w-xs mb-8 text-justify">
                {t('hero_desc')}
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-brand-terracotta text-xs font-serif italic justify-start">
              <Sparkles size={14} className="animate-pulse" />
              <span>{perfectPantry}</span>
            </div>
          </div>

          {/* Col 2: Navigation (Span 3) */}
          <div className="md:col-span-3">
            <span className="block text-[10px] tracking-[0.25em] text-brand-ochre uppercase font-extrabold font-mono-data mb-6">
              {t('sections_label')}
            </span>
            <ul className="space-y-3.5 text-xs text-brand-charcoal/70 dark:text-brand-cream/75">
              <li>
                <button 
                  id="foot-nav-home"
                  onClick={() => setActivePage('home')} 
                  className="hover:text-brand-terracotta transition-colors duration-200 cursor-pointer block text-left uppercase tracking-wider"
                >
                  {t('nav_home')}
                </button>
              </li>
              <li>
                <button 
                  id="foot-nav-collections"
                  onClick={() => setActivePage('collections')} 
                  className="hover:text-brand-terracotta transition-colors duration-200 cursor-pointer block text-left uppercase tracking-wider"
                >
                  {t('nav_collections')}
                </button>
              </li>
              <li>
                <button 
                  id="foot-nav-connect"
                  onClick={() => setActivePage('connect')} 
                  className="hover:text-brand-terracotta transition-colors duration-200 cursor-pointer block text-left uppercase tracking-wider"
                >
                  {t('nav_connect')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates and Details (Span 2) */}
          <div className="md:col-span-2">
            <span className="block text-[10px] tracking-[0.25em] text-brand-ochre uppercase font-extrabold font-mono-data mb-6">
              {metaLogs}
            </span>
            <div className="space-y-4 text-xs tracking-wider text-brand-charcoal/60 dark:text-brand-cream/60 font-mono-data">
              <div>
                <span className="block text-[9px] text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">{regCode}</span>
                <span className="font-medium text-brand-charcoal dark:text-brand-cream block">CR-101072935</span>
              </div>
              <div>
                <span className="block text-[9px] text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">{elevation}</span>
                <span className="font-medium text-brand-charcoal dark:text-brand-cream block">{elevationVal}</span>
              </div>
              <div>
                <span className="block text-[9px] text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">{flow}</span>
                <span className="font-medium text-brand-charcoal dark:text-brand-cream block">{flowVal}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Dispatch/Newsletter Sign-Up (Span 3) */}
          <div className="md:col-span-3">
            <span className="block text-[10px] tracking-[0.25em] text-brand-ochre uppercase font-extrabold font-mono-data mb-4">
              {receiveMsg}
            </span>
            <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed mb-4 text-justify">
              {receiveDesc}
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                id="footer-newsletter-email"
                type="text"
                placeholder={coordPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-cream/10 dark:bg-brand-charcoal/10 border-b border-brand-charcoal/30 dark:border-brand-cream/30 focus:border-brand-terracotta focus:outline-none py-2 text-xs text-brand-charcoal dark:text-brand-cream pr-8 transition-colors duration-200 placeholder-brand-charcoal/40 dark:placeholder-brand-cream/40"
              />
              <button
                id="newsletter-submit"
                type="submit"
                className="absolute right-0 top-1.5 p-1 text-brand-charcoal/60 dark:text-brand-cream/60 hover:text-brand-terracotta cursor-pointer"
                title="Register email"
              >
                <ArrowRight size={14} className={dir === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="block text-[9px] tracking-widest text-brand-terracotta uppercase font-bold mt-2"
                >
                  {successMsg}
                </motion.span>
              )}
              {error && (
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="block text-[9px] text-[#A82E2E] font-medium mt-2"
                >
                  ✦ {error}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Bar Info */}
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 text-[10px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 font-mono-data uppercase ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-2">
            <span>© 2026 RASHAH INC.</span>
            <span className="text-brand-ochre">•</span>
            <span>{rights}</span>
          </div>
          <div className="flex items-center gap-6">
            <span>{terms}</span>
            <span className="text-brand-ochre">•</span>
            <span>{location}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
