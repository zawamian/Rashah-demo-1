import { motion } from 'motion/react';
import { ArrowDownRight, Compass } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative w-full border-b border-brand-charcoal/10 dark:border-brand-cream/10 bg-brand-cream dark:bg-brand-charcoal transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-[calc(100vh-5rem)]">
        
        {/* Left Column - Typography & Editorial Manifesto */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 md:p-16 flex flex-col justify-between border-r border-brand-charcoal/10 dark:border-brand-cream/10">
          
          {/* Metadata Top */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between text-[11px] tracking-[0.25em] text-brand-ochre uppercase font-semibold font-mono-data mb-10 md:mb-0"
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
              <span className="font-serif italic text-lg sm:text-xl text-brand-terracotta mb-3 block">
                The perfect culinary accent.
              </span>
              <h1 id="hero-main-title" className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-charcoal dark:text-brand-cream leading-[1.1] mb-6">
                The Art of <br />
                the <span className="font-serif italic text-brand-ochre font-normal">Sprinkle.</span>
              </h1>
              <p className="font-serif text-lg md:text-xl text-brand-charcoal/50 dark:text-brand-cream/50 mb-8 max-w-xl italic leading-relaxed">
                "رشة" (Rashah) is the final, deliberate gesture that elevates raw ingredients into edible poetry. Artisanal spices and premium slow-baked granola.
              </p>
            </motion.div>

            {/* Micro details block */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-6 py-6 border-t border-b border-brand-charcoal/15 dark:border-brand-cream/15 max-w-lg mb-10"
            >
              <div>
                <span className="block text-[10px] tracking-[0.2em] text-brand-ochre font-bold mb-1">COARSE TEXTURE</span>
                <span className="text-xs text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed font-sans">
                  Crafted carefully to retain natural crunch, allowing key aromatic oils to burst only upon bite.
                </span>
              </div>
              <div>
                <span className="block text-[10px] tracking-[0.2em] text-brand-ochre font-bold mb-1">ORIGIN PURITY</span>
                <span className="text-xs text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed font-sans">
                  No preservatives, fillers, or refined sugars. Pure single-source minerals and premium botanicals.
                </span>
              </div>
            </motion.div>

            {/* Interactive Call-to-actions */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button 
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="group flex items-center justify-between gap-4 px-8 py-4 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream dark:hover:text-brand-cream transition-all duration-300 font-sans text-xs tracking-[0.25em] font-semibold cursor-pointer"
              >
                DISCOVER THE BATCHES
                <ArrowDownRight size={16} className="transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300 text-brand-ochre dark:text-brand-terracotta group-hover:text-brand-cream" />
              </button>
            </motion.div>
          </div>

          {/* Bottom Footer block inside Left column */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex justify-between items-center text-[10px] tracking-[0.15em] text-brand-charcoal/40 dark:text-brand-cream/40 font-mono-data border-t border-brand-charcoal/5 dark:border-brand-cream/5 pt-6"
          >
            <span>BATCH NO. 09-SA</span>
            <span>24.7136° N, 46.6753° E</span>
          </motion.div>

        </div>

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
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full aspect-[4/5] bg-brand-cream dark:bg-brand-charcoal border border-brand-charcoal/10 dark:border-brand-cream/10 overflow-hidden group shadow-sm flex items-center justify-center p-4"
            >
              
              {/* Image with subtle high-end scaling hover effect */}
              <img
                src="/src/assets/images/monolith_jar_hero_1779726349623.png"
                alt="Rashah Premium Artisanal Monolith Glass Jar containing Volcanic Sumac Blend"
                className="w-full h-full object-contain transform group-hover:scale-[1.03] transition-transform duration-700 ease-out p-2"
                referrerPolicy="no-referrer"
              />

              {/* Minimalist Watermark on Frame */}
              <div className="absolute bottom-4 left-4 flex flex-col uppercase font-mono-data text-[8px] tracking-[0.2em] text-brand-charcoal/40 dark:text-brand-cream/45 pointer-events-none">
                <span>VESSEL STUDY 01</span>
                <span>CRIMSON & GOLD</span>
              </div>
            </motion.div>

            {/* Technical Spec labels - Architectural Honesty */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full grid grid-cols-3 gap-2 mt-6 border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-4 text-[9px] font-mono-data tracking-widest uppercase text-brand-charcoal/55 dark:text-brand-cream/55"
            >
              <div>
                <span className="block text-brand-ochre/85 font-semibold">FORMULA</span>
                <span className="text-brand-charcoal dark:text-brand-cream block font-sans mt-0.5">SUM-VLC-01</span>
              </div>
              <div className="border-l border-brand-charcoal/10 dark:border-brand-cream/10 pl-3">
                <span className="block text-brand-ochre/85 font-semibold">NET WIGHT</span>
                <span className="text-brand-charcoal dark:text-brand-cream block font-sans mt-0.5">120G e</span>
              </div>
              <div className="border-l border-brand-charcoal/10 dark:border-brand-cream/10 pl-3">
                <span className="block text-brand-ochre/85 font-semibold">RECYCLABLE</span>
                <span className="text-brand-charcoal dark:text-brand-cream block font-sans mt-0.5">100% GLASS</span>
              </div>
            </motion.div>

          </div>

          {/* Floating artistic icon accent */}
          <div className="hidden lg:flex items-center gap-2 text-brand-terracotta absolute bottom-10 right-10">
            <Compass size={14} className="animate-spin-slow" />
            <span className="font-mono-data text-[8px] tracking-[0.2em] uppercase">Rashah Crafted Premium</span>
          </div>

        </div>

      </div>
    </section>
  );
}
