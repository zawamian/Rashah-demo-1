import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import CircularTestimonials from '@/components/ui/circular-testimonials';
import { testimonials } from '../data/testimonials';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <section className="w-full py-24 sm:py-32 bg-brand-charcoal dark:bg-[#0e0e0e] transition-colors duration-300 relative overflow-hidden">

      {/* Subtle decorative grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono-data text-[10px] tracking-[0.35em] text-brand-ochre font-bold uppercase block mb-3">
            {t('testimonials_label')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream leading-tight max-w-lg">
            {t('testimonials_heading')}
          </h2>
        </motion.div>

        {/* Circular testimonials component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-start"
        >
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: isDark ? '#f5f0e8' : '#f5f0e8',
              designation: isDark ? '#a0937e' : '#a0937e',
              testimony: isDark ? '#d4cbbf' : '#d4cbbf',
              arrowBackground: '#2c2417',
              arrowForeground: '#f5f0e8',
              arrowHoverBackground: '#c0392b',
            }}
            fontSizes={{
              name: '1.5rem',
              designation: '0.875rem',
              quote: '1rem',
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}
