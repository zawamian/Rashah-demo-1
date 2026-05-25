import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage, useProductTranslation } from '../context/LanguageContext';
import { recipes } from '../data/recipes';
import { products } from '../data/products';
import { PageId, Recipe } from '../types';

interface RecipesProps {
  setActivePage: (page: PageId) => void;
  setSelectedCategory: (category: string) => void;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function getLocalised(
  recipe: Recipe,
  field: 'title' | 'ingredients' | 'steps' | 'note',
  language: 'en' | 'ar' | 'tr'
) {
  if (language === 'ar') return (recipe as any)[`${field}_ar`] ?? (recipe as any)[field];
  if (language === 'tr') return (recipe as any)[`${field}_tr`] ?? (recipe as any)[field];
  return (recipe as any)[field];
}

export default function Recipes({ setActivePage, setSelectedCategory }: RecipesProps) {
  const { t, dir, language } = useLanguage();
  const translateProduct = useProductTranslation();

  const handleShopProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedCategory(product.category);
      setActivePage('collections');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20">

      {/* Page Header */}
      <div className={`mb-16 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        <span className="block text-[10px] tracking-[0.3em] text-brand-ochre font-extrabold font-mono-data uppercase mb-3">
          {t('recipes_page_title')}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-charcoal dark:text-brand-cream mb-3 tracking-tight">
          {t('recipes_title')}
        </h1>
        <p className="text-sm text-brand-charcoal/60 dark:text-brand-cream/60 italic font-serif">
          {t('recipes_subtitle')}
        </p>
      </div>

      {/* Recipe List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-24 sm:gap-32"
      >
        {recipes.map((recipe) => {
          const product = products.find(p => p.id === recipe.productId);
          const translatedProduct = product ? translateProduct(product) : null;
          const title       = getLocalised(recipe, 'title',       language) as string;
          const ingredients = getLocalised(recipe, 'ingredients', language) as string[];
          const steps       = getLocalised(recipe, 'steps',       language) as string[];
          const note        = getLocalised(recipe, 'note',        language) as string | undefined;

          return (
            <motion.article
              key={recipe.id}
              variants={cardVariants}
              className={`flex flex-col md:flex-row gap-8 sm:gap-12 ${dir === 'rtl' ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Left Panel (40%) — Image + Meta */}
              <div className="md:w-[40%] flex flex-col gap-4 shrink-0">

                {/* Product Image */}
                <div className="relative overflow-hidden bg-brand-cream/50 dark:bg-brand-charcoal/30 border border-brand-charcoal/5 dark:border-brand-cream/5 aspect-square">
                  {product && (
                    <img
                      src={product.image}
                      alt={translatedProduct?.title ?? product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Meal Tag Badge */}
                  <span className="absolute top-4 left-4 bg-brand-terracotta text-brand-cream text-[9px] font-mono-data font-bold tracking-[0.2em] uppercase px-2.5 py-1">
                    {recipe.tag}
                  </span>
                </div>

                {/* Time + Servings Row */}
                <div className={`flex gap-6 text-[10px] font-mono-data tracking-[0.1em] uppercase ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <span className="block text-brand-ochre font-bold mb-0.5">{t('recipes_prep')}</span>
                    <span className="text-brand-charcoal dark:text-brand-cream font-medium">{recipe.prepTime}</span>
                  </div>
                  {recipe.cookTime && (
                    <div>
                      <span className="block text-brand-ochre font-bold mb-0.5">{t('recipes_cook')}</span>
                      <span className="text-brand-charcoal dark:text-brand-cream font-medium">{recipe.cookTime}</span>
                    </div>
                  )}
                  <div>
                    <span className="block text-brand-ochre font-bold mb-0.5">{t('recipes_servings')}</span>
                    <span className="text-brand-charcoal dark:text-brand-cream font-medium">{recipe.servings}</span>
                  </div>
                </div>
              </div>

              {/* Right Panel (60%) — Content */}
              <div className={`md:w-[60%] flex flex-col justify-center ${dir === 'rtl' ? 'text-right items-end' : 'text-left'}`}>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal dark:text-brand-cream mb-4 leading-snug">
                  {title}
                </h2>

                <div className="w-10 h-[2px] bg-brand-terracotta mb-6" />

                {/* Ingredients */}
                <div className="mb-6">
                  <span className="block text-[9px] font-mono-data tracking-[0.25em] uppercase font-bold text-brand-ochre mb-3">
                    {t('recipes_ingredients')}
                  </span>
                  <ul className="space-y-1.5">
                    {ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className={`text-sm text-brand-charcoal/80 dark:text-brand-cream/80 flex items-start gap-2 leading-relaxed ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="text-brand-terracotta mt-[3px] shrink-0 select-none">✦</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Method */}
                <div className="mb-6">
                  <span className="block text-[9px] font-mono-data tracking-[0.25em] uppercase font-bold text-brand-ochre mb-3">
                    {t('recipes_method')}
                  </span>
                  <ol className="space-y-3">
                    {steps.map((step, i) => (
                      <li key={i} className={`flex gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <span className="font-mono-data text-[10px] font-bold text-brand-terracotta shrink-0 mt-0.5 w-5 text-right">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-sm text-brand-charcoal/80 dark:text-brand-cream/80 leading-relaxed">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Optional Tip */}
                {note && (
                  <div className={`mb-8 py-3 px-4 bg-brand-ochre/5 border-brand-ochre/30 ${dir === 'rtl' ? 'border-r-2' : 'border-l-2'}`}>
                    <span className="block text-[9px] font-mono-data tracking-[0.25em] uppercase font-bold text-brand-ochre mb-1">
                      {t('recipes_tip')}
                    </span>
                    <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 italic leading-relaxed">
                      {note}
                    </p>
                  </div>
                )}

                {/* Shop CTA */}
                {product && (
                  <button
                    onClick={() => handleShopProduct(recipe.productId)}
                    className={`flex items-center gap-2 text-[10px] tracking-[0.18em] font-semibold font-mono-data text-brand-charcoal dark:text-brand-cream hover:text-brand-terracotta dark:hover:text-brand-terracotta transition-colors duration-200 uppercase cursor-pointer group ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                  >
                    {t('recipes_shop_cta')} {translatedProduct?.title ?? product.title}
                    <ArrowRight
                      size={12}
                      className={`transition-transform duration-200 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                    />
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}
