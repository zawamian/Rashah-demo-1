import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import monolithJarHero from '../assets/images/monolith_jar_hero_1779726349623.png';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const { t, dir, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  // Link scroll precision to the hero view
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const imgParallaxY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const vesselScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const typographyY = useTransform(scrollYProgress, [0, 1], [0, -15]);

  const coarseLabel = language === 'ar' ? 'قوام خشن ورائد' : (language === 'tr' ? 'KALIN DOKU' : 'COARSE TEXTURE');
  const coarseDesc = language === 'ar' 
    ? 'مُحضّر بعناية للحفاظ على القرمشة الطبيعية للقمح والحبوب، مما يسمح للزيوت العطرية العميقة بالانفجار المفاجئ مع أول مضغة.'
    : (language === 'tr' ? 'Doğal çıtırlığı korumak için özenle üretildi ve aromatik yağların yalnızca ısırıldığında patlamasını sağladı.' : 'Crafted carefully to retain natural crunch, allowing key aromatic oils to burst only upon bite.');

  const purityLabel = language === 'ar' ? 'نقاوة المصدر والنشأة' : (language === 'tr' ? 'KAYNAK SAFİYETİ' : 'ORIGIN PURITY');
  const purityDesc = language === 'ar'
    ? 'خالٍ تماماً من المواد الحافظة أو السكريات المكررة أو الدقيق المصنّع. عناصر برية نقية من المنشأ الأصلي ومستخلصات نباتية ممتازة.'
    : (language === 'tr' ? 'Koruyucu madde, dolgu maddesi veya rafine şeker içermez. Saf tek kaynaklı botanikler.' : 'No preservatives, fillers, or refined sugars. Pure single-source minerals and premium botanicals.');

  const formulaLabel = language === 'ar' ? 'الصيغة التركيبية' : (language === 'tr' ? 'FORMÜL' : 'FORMULA');
  const weightLabel = language === 'ar' ? 'الوزن الصافي' : (language === 'tr' ? 'NET AĞIRLIK' : 'NET WEIGHT');
  const recyclableLabel = language === 'ar' ? 'قابل لإعادة التدوير' : (language === 'tr' ? 'GERİ DÖNÜŞÜMLÜ' : 'RECYCLABLE');
  const glassLabel = language === 'ar' ? 'مرطبان زجاجي ١٠٠٪' : (language === 'tr' ? '%100 CAM' : '100% GLASS');
  
  const studyLabel = language === 'ar' ? 'دراسة الإناء الحرفي ٠١' : (language === 'tr' ? 'KAVANOZ ÇALIŞMASI 01' : 'VESSEL STUDY 01');
  const crimsonLabel = language === 'ar' ? 'أرجواني وذهبي دمشقي' : (language === 'tr' ? 'KIZIL VE ALTIN' : 'CRIMSON & GOLD');
  
  const craftedSubtitle = language === 'ar' ? 'علامة رشة الحرفية الممتازة' : (language === 'tr' ? 'Özel Rashah El İşçiliği' : 'Rashah Crafted Premium');

  return (
    <section ref={heroRef} className="relative w-full border-b border-brand-charcoal/10 dark:border-brand-cream/10 bg-brand-cream dark:bg-brand-charcoal transition-colors duration-300">
      <div className={`max-w-7xl mx-auto flex flex-col md:flex-row min-h-[calc(100vh-5rem)] ${dir === 'rtl' ? 'md:flex-row-reverse text-right' : ''}`}>
        
        {/* Left Column - Typography & Editorial Manifesto */}
        <motion.div 
          style={{ y: typographyY }}
          className="w-full md:w-7/12 p-8 sm:p-12 md:p-16 flex flex-col justify-between border-r border-brand-charcoal/10 dark:border-brand-cream/10 text-left"
        >
          
          {/* Metadata Top */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex items-center justify-between text-[11px] tracking-[0.25em] text-brand-ochre uppercase font-semibold font-mono-data mb-10 md:mb-0`}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
              <span>RASHAH CO. / VOL. I</span>
            </div>
            <span>RIYADH, SAUDI ARABIA</span>
          </motion.div>

          {/* Central Typographical Manifesto */}
          <div className="my-auto py-10 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 id="hero-main-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-charcoal dark:text-brand-cream leading-[1.2] mb-6 whitespace-pre-line text-left">
                {t('hero_title')}
              </h1>
              <p className="font-serif text-base md:text-lg text-brand-charcoal/70 dark:text-brand-cream/70 mb-8 max-w-xl leading-relaxed text-justify">
                {t('hero_desc')}
              </p>
            </motion.div>

            {/* Micro details block */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-6 py-6 border-t border-b border-brand-charcoal/15 dark:border-brand-cream/15 max-w-lg mb-10 text-left"
            >
              <div>
                <span className="block text-[10px] tracking-[0.2em] text-brand-ochre font-bold mb-1">{coarseLabel}</span>
                <span className="text-xs text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed font-sans text-justify block">
                  {coarseDesc}
                </span>
              </div>
              <div>
                <span className="block text-[10px] tracking-[0.2em] text-brand-ochre font-bold mb-1">{purityLabel}</span>
                <span className="text-xs text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed font-sans text-justify block">
                  {purityDesc}
                </span>
              </div>
            </motion.div>

            {/* Interactive Call-to-actions */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4`}
            >
              <button 
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="group flex items-center justify-between gap-4 px-8 py-4 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream dark:hover:text-brand-cream transition-all duration-300 font-sans text-xs tracking-[0.25em] font-semibold cursor-pointer"
              >
                {t('hero_cta')}
                <ArrowDownRight size={16} className={`transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300 text-brand-ochre dark:text-brand-terracotta group-hover:text-brand-cream ${dir === 'rtl' ? 'rotate-90' : ''}`} />
              </button>
            </motion.div>
          </div>

          {/* Bottom Footer block inside Left column */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className={`flex justify-between items-center text-[10px] tracking-[0.15em] text-brand-charcoal/40 dark:text-brand-cream/40 font-mono-data border-t border-brand-charcoal/5 dark:border-brand-cream/5 pt-6`}
          >
            <span>BATCH NO. 09-SA</span>
            <span>24.7136° N, 46.6753° E</span>
          </motion.div>

        </motion.div>

        {/* Right Column - Premium High-Fidelity Monolith Jar Design Display */}
        <div className="w-full md:w-5/12 bg-brand-cream/50 dark:bg-brand-charcoal/30 flex flex-col justify-between relative p-8 sm:p-12 md:p-14 lg:p-16">
          
          {/* Asymmetric geometric grid guides */}
          <div className="absolute top-0 left-0 w-8 h-px bg-brand-charcoal/20 dark:bg-brand-cream/20" />
          <div className="absolute top-0 left-0 w-px h-8 bg-brand-charcoal/20 dark:bg-brand-cream/20" />
          <div className="absolute bottom-0 right-0 w-8 h-px bg-brand-charcoal/20 dark:bg-brand-cream/20" />
          <div className="absolute bottom-0 right-0 w-px h-8 bg-brand-charcoal/20 dark:bg-brand-cream/20" />

          {/* Vessel Display Container */}
          <div className="my-auto flex flex-col items-center">
            
            <motion.div 
              style={{ scale: vesselScale }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full aspect-[4/5] bg-brand-cream dark:bg-brand-charcoal border border-brand-charcoal/10 dark:border-brand-cream/10 overflow-hidden group shadow-sm flex items-center justify-center p-4"
            >
              
              {/* Image with subtle high-end scaling hover effect */}
              <motion.img
                style={{ y: imgParallaxY }}
                src={monolithJarHero}
                alt="Rashah Premium Artisanal Monolith Glass Jar containing Volcanic Sumac Blend"
                className="w-full h-full object-contain p-2"
                referrerPolicy="no-referrer"
              />

              {/* Minimalist Watermark on Frame */}
              <div className="absolute bottom-4 left-4 flex flex-col uppercase font-mono-data text-[8px] tracking-[0.2em] text-brand-charcoal/40 dark:text-brand-cream/45 pointer-events-none text-left">
                <span>{studyLabel}</span>
                <span>{crimsonLabel}</span>
              </div>
            </motion.div>

            {/* Technical Spec labels - Architectural Honesty */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full grid grid-cols-3 gap-2 mt-6 border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-4 text-[9px] font-mono-data tracking-widest uppercase text-brand-charcoal/55 dark:text-brand-cream/55 text-left"
            >
              <div>
                <span className="block text-brand-ochre/85 font-semibold">{formulaLabel}</span>
                <span className="text-brand-charcoal dark:text-brand-cream block font-sans mt-0.5">SUM-VLC-01</span>
              </div>
              <div className="border-l border-brand-charcoal/10 dark:border-brand-cream/10 pl-3 text-left">
                <span className="block text-brand-ochre/85 font-semibold">{weightLabel}</span>
                <span className="text-brand-charcoal dark:text-brand-cream block font-sans mt-0.5">120G e</span>
              </div>
              <div className="border-l border-brand-charcoal/10 dark:border-brand-cream/10 pl-3 text-left">
                <span className="block text-brand-ochre/85 font-semibold">{recyclableLabel}</span>
                <span className="text-brand-charcoal dark:text-brand-cream block font-sans mt-0.5">{glassLabel}</span>
              </div>
            </motion.div>

          </div>

          {/* Floating artistic icon accent */}
          <div className="hidden lg:flex items-center gap-2 text-brand-terracotta absolute bottom-10 right-10">
            <Compass size={14} className="animate-spin-slow" />
            <span className="font-mono-data text-[8px] tracking-[0.2em] uppercase">{craftedSubtitle}</span>
          </div>

        </div>

      </div>
    </section>
  );
}
