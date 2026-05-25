import { motion } from 'motion/react';
import { ArrowRight, Leaf, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import grainSeriesImg from '../assets/images/grain_series_granola_1779726368711.png';
import spiceSeriesImg from '../assets/images/spice_series_blend_1779726386735.png';

interface LineupProps {
  onSeriesSelect: (series: 'Granola' | 'Single Spices' | 'Curated Blends') => void;
  onNavigateToCollections: () => void;
}

export default function Lineup({ onSeriesSelect, onNavigateToCollections }: LineupProps) {
  const { t, dir, language } = useLanguage();

  const lineupHeadline = language === 'ar' ? 'التشكيلة.' : (language === 'tr' ? 'Ürün Yelpazesi.' : 'The Lineup.');
  const coll01 = language === 'ar' ? 'التشكيلة ٠١ / ٠٢' : 'COLLECTION 01 / 02';
  const coll02 = language === 'ar' ? 'التشكيلة ٠٢ / ٠٢' : 'COLLECTION 02 / 02';

  const spot1_title = language === 'ar' ? 'نزاهة الملمس الخام' : (language === 'tr' ? 'Ham Hücre Bütünlüğü' : 'Raw Integrity');
  const spot1_desc = language === 'ar' 
    ? 'لا نطحن حبوبنا للتلاشي كالغبار. مكوناتنا تُكسر وتُفرك يدوياً بتجانس تامّ، مما يحافظ على جدران الخلايا سليمة لحبس الزيوت العطرية الثمينة بداخلها.'
    : (language === 'tr' ? 'Asla toz haline getirilmez. Esansiyel yağları içeride kilitlemek için malzemelerimiz hücre duvarları korunarak kabaca kırılır veya elenir.' : 'Never powdered to dust. Our ingredients are crushed or rolled uniformly, leaving cell walls intact to seal intense essential oils inside.');

  const spot2_title = language === 'ar' ? 'مطبخ الرياض الفاخر' : (language === 'tr' ? 'Riyad Atölyesi' : 'Riyadh Kitchen');
  const spot2_desc = language === 'ar' 
    ? 'تُصاغ وتُمزج وتُعبأ يدوياً في دفعات صغيرة ومحدودة داخل مطبخنا المختص هنا في الرياض، مما يضمن رقابة بصرية صارمة وسجلات جودة فائقة.'
    : (language === 'tr' ? 'Riyad\'daki özel mutfağımızda her bir kavanoz mikro ölçekte el işçiliğiyle doldurulur; eksiksiz kalite kontrolü garanti edilir.' : 'Formulated, blended, and hand-jarred in micro-batches right here in our specialized kitchen, ensuring strict quality logs over every single run.');

  const spot3_title = language === 'ar' ? 'المرطبان الزجاجي الثقيل' : (language === 'tr' ? 'Ağır Cam Kavanoz' : 'The Heavy Jar');
  const spot3_desc = language === 'ar' 
    ? 'تُقدم بهاراتنا حصرياً في مرطبانات زجاجية ثقيلة الوزن قابلة لإعادة التدوير، ومصممة بتقنية حماية حجب الضوء لمنع تفكك المواد بفعل الأشعة فوق البنفسجية.'
    : (language === 'tr' ? 'Doğal florayı ultraviyole bozulmalardan korumak için ışığı kıran özel tasarımlı, geri dönüştürülebilir ağır cam kavanozlarda sunulur.' : 'Presented exclusively inside high-weight Recyclable glass containers with light-deflecting protection to shield botanicals from ultraviolet breakdown.');

  const currentStatementLabel = language === 'ar' ? 'البيان التأسيسي الحالي:' : (language === 'tr' ? 'GÜNCEL BEYANIMIZ:' : 'CURRENT STATEMENT:');
  const currentStatementText = language === 'ar'
    ? '"قوام خشن ومثالي يتفتح بكل فخر أثناء الطهي، وليس في صالات الميكنة المصنعية."'
    : (language === 'tr' ? '"Fabrikada değil, pişirirken tabağınızda çiçek açan mükemmel kalın dokular."' : '"Perfect coarse textures that bloom in your cooking, not in the factory."');

  return (
    <section className="w-full py-20 sm:py-28 px-6 sm:px-8 bg-brand-cream dark:bg-brand-charcoal border-b border-brand-charcoal/10 dark:border-brand-cream/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className={`flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6 ${dir === 'rtl' ? 'md:flex-row-reverse text-right' : ''}`}>
          <div className="text-left">
            <span className="font-mono-data text-[10px] tracking-[0.3em] text-brand-ochre uppercase font-bold block mb-3">
              {t('lineup_title')}
            </span>
            <h2 id="lineup-section-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-charcoal dark:text-brand-cream">
              {lineupHeadline}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-charcoal/50 dark:text-brand-cream/50 max-w-md leading-relaxed text-justify">
            {t('lineup_subtitle')}
          </p>
        </div>

        {/* Asymmetric 3-Column Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          
          {/* Column 1: The Grain Series (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 flex flex-col justify-between border border-brand-charcoal/10 dark:border-brand-cream/10 bg-brand-cream/40 dark:bg-brand-charcoal/10 hover:border-brand-terracotta/40 dark:hover:border-brand-terracotta/40 p-8 group transition-all duration-300 text-left"
          >
            <div>
              <div className={`flex justify-between items-center mb-6`}>
                <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre uppercase font-bold">
                  {coll01}
                </span>
                <span className="font-serif italic text-sm text-brand-charcoal/40 dark:text-brand-cream/40 font-bold">سلسلة الحبوب</span>
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal dark:text-brand-cream mb-4">
                {t('lineup_g_title')}
              </h3>
              
              <p className="text-xs sm:text-sm text-brand-charcoal/65 dark:text-brand-cream/65 leading-relaxed mb-6 max-w-sm text-justify">
                {t('lineup_g_desc')}
              </p>

              <div className="aspect-[4/3] w-full overflow-hidden border border-brand-charcoal/10 dark:border-brand-cream/10 bg-white dark:bg-brand-charcoal/40 mb-6 p-4 flex items-center justify-center">
                <img 
                  src={grainSeriesImg} 
                  alt="Rashah Artisanal Premium Granola Container" 
                  className="w-full h-full object-contain transform group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <button 
              id="view-grain-btn"
              onClick={() => {
                onSeriesSelect('Granola');
                onNavigateToCollections();
              }}
              className={`group flex items-center gap-2 text-[10px] tracking-[0.25em] font-bold text-brand-charcoal dark:text-brand-cream hover:text-brand-terracotta dark:hover:text-brand-terracotta transition-colors duration-200 mt-4 cursor-pointer uppercase`}
            >
              {t('explore_btn')} <ArrowRight size={12} className={`transform group-hover:translate-x-1 transition-transform duration-200 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>

          {/* Column 2: The Spice Series (Span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 flex flex-col justify-between border border-brand-charcoal/10 dark:border-brand-cream/10 bg-brand-cream/40 dark:bg-brand-charcoal/10 hover:border-brand-terracotta/40 dark:hover:border-brand-terracotta/40 p-8 group transition-all duration-300 text-left"
          >
            <div>
              <div className={`flex justify-between items-center mb-6`}>
                <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre uppercase font-bold">
                  {coll02}
                </span>
                <span className="font-serif italic text-sm text-brand-charcoal/40 dark:text-brand-cream/40 font-bold">سلسلة البهارات</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal dark:text-brand-cream mb-4">
                {t('lineup_s_title')}
              </h3>

              <p className="text-xs sm:text-sm text-brand-charcoal/65 dark:text-brand-cream/65 leading-relaxed mb-6 text-justify">
                {t('lineup_s_desc')}
              </p>

              <div className="aspect-[4/3] w-full overflow-hidden border border-brand-charcoal/10 dark:border-brand-cream/10 bg-white dark:bg-brand-charcoal/40 mb-6 p-4 flex items-center justify-center">
                <img 
                  src={spiceSeriesImg} 
                  alt="Rashah Artisanal Volcanic Spice Blend Container" 
                  className="w-full h-full object-contain transform group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <button 
              id="view-spice-btn"
              onClick={() => {
                onSeriesSelect('Single Spices');
                onNavigateToCollections();
              }}
              className={`group flex items-center gap-2 text-[10px] tracking-[0.25em] font-bold text-brand-charcoal dark:text-brand-cream hover:text-brand-terracotta dark:hover:text-brand-terracotta transition-colors duration-200 mt-4 cursor-pointer uppercase`}
            >
              {t('explore_btn')} <ArrowRight size={12} className={`transform group-hover:translate-x-1 transition-transform duration-200 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>

          {/* Column 3: Artistic Manifesto & Spotlight (Span 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-brand-charcoal/15 dark:border-brand-cream/15 pt-8 md:pt-0 md:pl-8 text-left"
          >
            
            {/* Value spotlight 1 */}
            <div className="border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-8 text-left">
              <span className="font-mono-data text-[13px] text-brand-terracotta font-bold block mb-2">01</span>
              <h4 className="font-serif text-lg font-bold text-brand-charcoal dark:text-brand-cream mb-2 flex items-center gap-1.5 justify-start">
                <Leaf size={14} className="text-brand-ochre shrink-0" /> {spot1_title}
              </h4>
              <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed font-sans text-justify">
                {spot1_desc}
              </p>
            </div>

            {/* Value spotlight 2 */}
            <div className="border-b border-brand-charcoal/10 dark:border-brand-cream/10 py-8 text-left">
              <span className="font-mono-data text-[13px] text-brand-terracotta font-bold block mb-2">02</span>
              <h4 className="font-serif text-lg font-bold text-brand-charcoal dark:text-brand-cream mb-2 flex items-center gap-1.5 justify-start">
                <Sparkles size={14} className="text-brand-ochre shrink-0" /> {spot2_title}
              </h4>
              <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed font-sans text-justify">
                {spot2_desc}
              </p>
            </div>

            {/* Value spotlight 3 */}
            <div className="pt-8 flex flex-col justify-between h-full text-left">
              <div>
                <span className="font-mono-data text-[13px] text-brand-terracotta font-bold block mb-2">03</span>
                <h4 className="font-serif text-lg font-bold text-brand-charcoal dark:text-brand-cream mb-2 flex items-center gap-1.5 justify-start">
                  <Star size={14} className="text-brand-ochre shrink-0" /> {spot3_title}
                </h4>
                <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed font-sans mb-6 text-justify">
                  {spot3_desc}
                </p>
              </div>

              <div className="bg-brand-ochre/15 dark:bg-brand-ochre/10 p-5 border border-brand-ochre/20 text-left text-justify">
                <span className="font-mono-data text-[9px] tracking-widest text-brand-ochre font-extrabold uppercase block mb-1">
                  {currentStatementLabel}
                </span>
                <span className="text-[11px] text-brand-charcoal/80 dark:text-brand-cream/85 block leading-relaxed italic">
                  {currentStatementText}
                </span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
