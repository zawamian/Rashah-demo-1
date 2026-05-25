import { motion } from 'motion/react';
import { ArrowRight, Leaf, Sparkles, Star } from 'lucide-react';
import grainSeriesImg from '../assets/images/grain_series_granola_1779726368711.png';
import spiceSeriesImg from '../assets/images/spice_series_blend_1779726386735.png';

interface LineupProps {
  onSeriesSelect: (series: 'Granola' | 'Single Spices' | 'Curated Blends') => void;
  onNavigateToCollections: () => void;
}

export default function Lineup({ onSeriesSelect, onNavigateToCollections }: LineupProps) {
  return (
    <section className="w-full py-20 sm:py-28 px-6 sm:px-8 bg-brand-cream dark:bg-brand-charcoal border-b border-brand-charcoal/10 dark:border-brand-cream/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
          <div>
            <span className="font-mono-data text-[10px] tracking-[0.3em] text-brand-ochre uppercase font-bold block mb-3">
              CURATED PRODUCT LINEUPS
            </span>
            <h2 id="lineup-section-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-charcoal dark:text-brand-cream">
              The Lineup.
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-charcoal/50 dark:text-brand-cream/50 max-w-md leading-relaxed">
            Our dual collections represent a beautiful study of sensory contrast. The heavy, warm crunch of slow-baked grain paired with the volatile, sharp bloom of crushed whole spices.
          </p>
        </div>

        {/* Asymmetric 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: The Grain Series (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 flex flex-col justify-between border border-brand-charcoal/10 dark:border-brand-cream/10 bg-brand-cream/40 dark:bg-brand-charcoal/10 hover:border-brand-terracotta/40 dark:hover:border-brand-terracotta/40 p-8 group transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre uppercase font-bold">
                  COLLECTION 01 / 02
                </span>
                <span className="font-serif italic text-sm text-brand-charcoal/40 dark:text-brand-cream/40">سلسلة الحبوب</span>
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal dark:text-brand-cream mb-4">
                The Grain Series
              </h3>
              
              <p className="text-xs sm:text-sm text-brand-charcoal/65 dark:text-brand-cream/65 leading-relaxed mb-6 max-w-sm">
                Slow-dehydrated cluster granolas formulated with stone-ground tahini, deep maple, toasted Damascus rose petals, and whole nuts.
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
              className="group flex items-center gap-2 text-[10px] tracking-[0.25em] font-bold text-brand-charcoal dark:text-brand-cream hover:text-brand-terracotta dark:hover:text-brand-terracotta transition-colors duration-200 mt-4 cursor-pointer text-left uppercase"
            >
              EXPLORE GRAIN SERIES <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>

          {/* Column 2: The Spice Series (Span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 flex flex-col justify-between border border-brand-charcoal/10 dark:border-brand-cream/10 bg-brand-cream/40 dark:bg-brand-charcoal/10 hover:border-brand-terracotta/40 dark:hover:border-brand-terracotta/40 p-8 group transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre uppercase font-bold">
                  COLLECTION 02 / 02
                </span>
                <span className="font-serif italic text-sm text-brand-charcoal/40 dark:text-brand-cream/40">سلسلة البهارات</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal dark:text-brand-cream mb-4">
                The Spice Series
              </h3>

              <p className="text-xs sm:text-sm text-brand-charcoal/65 dark:text-brand-cream/65 leading-relaxed mb-6">
                Crushed, rub-oriented single spices and curated heritage salt blends. Coarsely ground to lock in powerful raw aromatics.
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
              className="group flex items-center gap-2 text-[10px] tracking-[0.25em] font-bold text-brand-charcoal dark:text-brand-cream hover:text-brand-terracotta dark:hover:text-brand-terracotta transition-colors duration-200 mt-4 cursor-pointer text-left uppercase"
            >
              EXPLORE SPICE SERIES <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>

          {/* Column 3: Artistic Manifesto & Spotlight (Span 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-brand-charcoal/15 dark:border-brand-cream/15 pt-8 md:pt-0 md:pl-8"
          >
            
            {/* Value spotlight 1 */}
            <div className="border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-8">
              <span className="font-mono-data text-[13px] text-brand-terracotta font-bold block mb-2">01</span>
              <h4 className="font-serif text-lg font-bold text-brand-charcoal dark:text-brand-cream mb-2 flex items-center gap-1.5">
                <Leaf size={14} className="text-brand-ochre" /> Raw Integrity
              </h4>
              <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed font-sans">
                Never powdered to dust. Our ingredients are crushed or rolled uniformly, leaving cell walls intact to seal intense essential oils inside.
              </p>
            </div>

            {/* Value spotlight 2 */}
            <div className="border-b border-brand-charcoal/10 dark:border-brand-cream/10 py-8">
              <span className="font-mono-data text-[13px] text-brand-terracotta font-bold block mb-2">02</span>
              <h4 className="font-serif text-lg font-bold text-brand-charcoal dark:text-brand-cream mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-brand-ochre" /> Riyadh Kitchen
              </h4>
              <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed font-sans">
                Formulated, blended, and hand-jarred in micro-batches right here in our specialized kitchen, ensuring strict quality logs over every single run.
              </p>
            </div>

            {/* Value spotlight 3 */}
            <div className="pt-8 flex flex-col justify-between h-full">
              <div>
                <span className="font-mono-data text-[13px] text-brand-terracotta font-bold block mb-2">03</span>
                <h4 className="font-serif text-lg font-bold text-brand-charcoal dark:text-brand-cream mb-2 flex items-center gap-1.5">
                  <Star size={14} className="text-brand-ochre" /> The Heavy Jar
                </h4>
                <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed font-sans mb-6">
                  Presented exclusively inside high-weight Recyclable glass containers with light-deflecting protection to shield botanicals from ultraviolet breakdown.
                </p>
              </div>

              <div className="bg-brand-ochre/15 dark:bg-brand-ochre/10 p-5 border border-brand-ochre/20">
                <span className="font-mono-data text-[9px] tracking-widest text-brand-ochre font-extrabold uppercase block mb-1">
                  CURRENT STATEMENT:
                </span>
                <span className="text-[11px] text-brand-charcoal/80 dark:text-brand-cream/85 block leading-relaxed italic">
                  "Perfect coarse textures that bloom in your cooking, not in the factory."
                </span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
