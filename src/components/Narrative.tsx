import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Narrative() {
  const { t, language } = useLanguage();

  return (
    <section className="w-full py-24 sm:py-32 bg-[#FAF7F2] dark:bg-[#181818] border-b border-brand-charcoal/10 dark:border-brand-cream/10 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative vertical thread thread grid */}
      <div className="absolute top-0 bottom-0 left-[15%] w-px bg-brand-charcoal/5 dark:bg-brand-cream/5" />
      <div className="absolute top-0 bottom-0 right-[15%] w-px bg-brand-charcoal/5 dark:bg-brand-cream/5" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Arabic brand slogan */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-10"
        >
          <span className="font-serif text-5xl sm:text-7xl font-light text-brand-terracotta/25 dark:text-brand-terracotta/15 block uppercase tracking-[0.2em] leading-none mb-1">
            {t('logo_ar')}
          </span>
          <span className="font-mono-data text-[10px] tracking-[0.4em] text-brand-ochre font-bold uppercase">
            {t('narrative_est_sub')}
          </span>
        </motion.div>

        {/* Big quote statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative text-center mb-16 px-4 shrink-0"
        >
          <Quote size={32} className="text-brand-ochre mx-auto mb-6 opacity-30 animate-pulse" />
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-brand-charcoal dark:text-brand-cream italic leading-snug text-center">
            {t('narrative_quote')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 pt-10 border-t border-brand-charcoal/10 dark:border-brand-cream/10">
          
          {/* Paragraph Column 1 - Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal dark:text-brand-cream">
              {t('narrative_title1')}
            </h4>
            <div className="font-sans text-xs sm:text-sm text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed text-justify space-y-4">
              <p>
                <span className="font-serif text-5xl mr-2 font-bold float-left text-brand-terracotta leading-[0.8] mt-1.5 antialiased">
                  {language === 'ar' ? 'ر' : 'R'}
                </span>
                {t('narrative_p1_text1').substring(1)}
              </p>
              <p>
                {t('narrative_p1_text2')}
              </p>
            </div>
          </motion.div>

          {/* Paragraph Column 2 - Heritage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal dark:text-brand-cream">
              {t('narrative_title2')}
            </h4>
            <div className="font-sans text-xs sm:text-sm text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed text-justify space-y-4">
              <p>
                {t('narrative_p2_text1')}
              </p>
              <p>
                {t('narrative_p2_text2')}
              </p>
            </div>
            
            {/* Signature Block */}
            <div className="pt-4 border-t border-brand-charcoal/10 dark:border-brand-cream/10 flex items-center justify-between">
              <div className="text-left">
                <span className="font-serif text-sm font-semibold text-brand-charcoal dark:text-brand-cream block">
                  {t('narrative_founders')}
                </span>
                <span className="font-mono-data text-[9px] tracking-widest text-brand-ochre uppercase font-bold">
                  {t('narrative_logistics')}
                </span>
              </div>
              <span className="font-serif italic text-2xl text-brand-terracotta block leading-none select-none opacity-80 pt-1">
                {t('logo_ar')}
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
