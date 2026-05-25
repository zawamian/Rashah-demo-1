import { useState, FormEvent } from 'react';
import { Sparkles, ArrowRight, Rss, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  setActivePage: (page: 'home' | 'collections' | 'connect') => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email coordinate.');
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-16 border-b border-brand-charcoal/10 dark:border-brand-cream/10">
          
          {/* Col 1: Brand & Arabic Poetry/Credits (Span 4) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-serif text-3xl font-bold tracking-[0.1em] text-brand-charcoal dark:text-brand-cream block mb-2">
                RASHAH <span className="text-brand-terracotta italic font-normal">رشة</span>
              </span>
              <span className="font-mono-data text-[10px] tracking-[0.3em] text-brand-ochre font-extrabold uppercase block mb-6">
                ARTISANAL CRUNCH & BLOOM
              </span>
              <p className="text-xs sm:text-sm text-brand-charcoal/60 dark:text-brand-cream/65 leading-relaxed max-w-xs mb-8">
                Formulating sensory contrasts in Riyadh, Saudi Arabia. Coarse textures baked slowly, designed to erupt in aromatic power upon the very first sprinkle.
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-brand-terracotta text-xs font-serif italic">
              <Sparkles size={14} className="animate-pulse" />
              <span>Perfecting modern pantry culture.</span>
            </div>
          </div>

          {/* Col 2: Navigation (Span 3) */}
          <div className="md:col-span-3">
            <span className="block text-[10px] tracking-[0.25em] text-brand-ochre uppercase font-extrabold font-mono-data mb-6">
              SYSTEM SECTIONS
            </span>
            <ul className="space-y-3.5 text-xs text-brand-charcoal/70 dark:text-brand-cream/75">
              <li>
                <button 
                  id="foot-nav-home"
                  onClick={() => setActivePage('home')} 
                  className="hover:text-brand-terracotta transition-colors duration-200 cursor-pointer block text-left uppercase tracking-wider"
                >
                  THE JOURNAL (HOME) — الرشة الأولى
                </button>
              </li>
              <li>
                <button 
                  id="foot-nav-collections"
                  onClick={() => setActivePage('collections')} 
                  className="hover:text-brand-terracotta transition-colors duration-200 cursor-pointer block text-left uppercase tracking-wider"
                >
                  THE BATCH COLLECTIONS — كتلوج الكولكشن
                </button>
              </li>
              <li>
                <button 
                  id="foot-nav-connect"
                  onClick={() => setActivePage('connect')} 
                  className="hover:text-brand-terracotta transition-colors duration-200 cursor-pointer block text-left uppercase tracking-wider"
                >
                  STOCKISTS INQUIRY — تواصل معنا
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates and Details (Span 2) */}
          <div className="md:col-span-2">
            <span className="block text-[10px] tracking-[0.25em] text-brand-ochre uppercase font-extrabold font-mono-data mb-6">
              METADATA LOGS
            </span>
            <div className="space-y-4 text-xs tracking-wider text-brand-charcoal/60 dark:text-brand-cream/60 font-mono-data">
              <div>
                <span className="block text-[9px] text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">REGISTRY CODE</span>
                <span className="font-medium text-brand-charcoal dark:text-brand-cream block">CR-101072935</span>
              </div>
              <div>
                <span className="block text-[9px] text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">ELEVATION</span>
                <span className="font-medium text-brand-charcoal dark:text-brand-cream block">612M Above Sea Level</span>
              </div>
              <div>
                <span className="block text-[9px] text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">KITCHEN WORKFLOW</span>
                <span className="font-medium text-brand-charcoal dark:text-brand-cream block">MICRO-BATCH COMPLIANT</span>
              </div>
            </div>
          </div>

          {/* Col 4: Dispatch/Newsletter Sign-Up (Span 3) */}
          <div className="md:col-span-3">
            <span className="block text-[10px] tracking-[0.25em] text-brand-ochre uppercase font-extrabold font-mono-data mb-4">
              RECEIVE BATCH JOURNAL
            </span>
            <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed mb-4">
              Get raw bulletin dispatches on limited-run Single origin spices and specialty granola releases.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                id="footer-newsletter-email"
                type="text"
                placeholder="Coordinate (your@email.com)"
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
                <ArrowRight size={14} />
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
                  ✦ Coordinates logged. Welcome.
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 text-[10px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 font-mono-data uppercase">
          <div className="flex items-center gap-2">
            <span>© 2026 RASHAH INC.</span>
            <span className="text-brand-ochre">•</span>
            <span>ALL SOVEREIGN RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-6">
            <span>TERMS OF SPECISTRY</span>
            <span className="text-brand-ochre">•</span>
            <span>RIYADH, SAUDI ARABIA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
