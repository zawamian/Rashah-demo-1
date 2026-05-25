import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Plus, Minus, Check, Sparkles, RefreshCw } from 'lucide-react';
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
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
} as const;

function getLocalised(
  recipe: Recipe,
  field: 'title' | 'ingredients' | 'steps' | 'note',
  language: 'en' | 'ar' | 'tr'
) {
  if (language === 'ar') return (recipe as any)[`${field}_ar`] ?? (recipe as any)[field];
  if (language === 'tr') return (recipe as any)[`${field}_tr`] ?? (recipe as any)[field];
  return (recipe as any)[field];
}

// Helper to scale localized ingredient quantities elegantly for both English & Arab numeric scales
function scaleIngredient(ing: string, scale: number): string {
  if (scale === 1) return ing;

  // Western Arabic numerals (e.g., 250g, 2.5 tbsp)
  const matchEnglish = ing.match(/^(\d+(\.\d+)?)(.*)$/);
  if (matchEnglish) {
    const rawNum = parseFloat(matchEnglish[1]);
    const scaledNum = rawNum * scale;
    const formattedNum = Number.isInteger(scaledNum) ? scaledNum : parseFloat(scaledNum.toFixed(1));
    return `${formattedNum}${matchEnglish[3]}`;
  }

  // Eastern Arabic-Indic numerals (e.g., ٢٥٠ غرام, ٢ ملعقة)
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const arabicDigitsMap: Record<string, number> = {
    '٠': 0, '١': 1, '٢': 2, '٣': 3, '٤': 4, '٥': 5, '٦': 6, '٧': 7, '٨': 8, '٩': 9
  };

  const matchArabic = ing.match(/^([٠-٩]+)(.*)$/);
  if (matchArabic) {
    const rawStr = matchArabic[1];
    let numValue = 0;
    for (const char of rawStr) {
      numValue = numValue * 10 + (arabicDigitsMap[char] ?? 0);
    }
    const scaledNum = numValue * scale;
    const formattedNumValue = Number.isInteger(scaledNum) ? scaledNum : parseFloat(scaledNum.toFixed(1));
    
    // Map numerical values back into beautiful eastern Arabic digits
    const arabicDigitsFormatted = String(formattedNumValue).split('').map(char => {
      if (char === '.') return ','; // traditional decimal separator in Arabic fractions
      const digit = parseInt(char);
      return isNaN(digit) ? char : arabicDigits[digit];
    }).join('');
    return `${arabicDigitsFormatted}${matchArabic[2]}`;
  }

  return ing;
}

export default function Recipes({ setActivePage, setSelectedCategory }: RecipesProps) {
  const { t, dir, language } = useLanguage();
  const translateProduct = useProductTranslation();

  // Selected Category filter state
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Dynamic state dictionary mapping recipe ID -> custom servings scale
  const [servings, setServings] = useState<Record<string, number>>({});

  // Interaction tracking state for checked ingredients & steps checkboxes
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const handleShopProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedCategory(product.category);
      setActivePage('collections');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Alter servings securely with an atomic clamp from 1 to 20 portions
  const handleScaleServings = (recipeId: string, delta: number, baseServings: number) => {
    setServings(prev => {
      const current = prev[recipeId] ?? baseServings;
      const next = current + delta;
      return {
        ...prev,
        [recipeId]: Math.min(20, Math.max(1, next))
      };
    });
  };

  const toggleIngredient = (recipeId: string, index: number) => {
    const key = `${recipeId}-${index}`;
    setCheckedIngredients(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleStep = (recipeId: string, index: number) => {
    const key = `${recipeId}-${index}`;
    setCheckedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetRecipeProgress = (recipeId: string, ingredientCount: number, stepCount: number) => {
    setCheckedIngredients(prev => {
      const next = { ...prev };
      for (let i = 0; i < ingredientCount; i++) {
        delete next[`${recipeId}-${i}`];
      }
      return next;
    });
    setCheckedSteps(prev => {
      const next = { ...prev };
      for (let i = 0; i < stepCount; i++) {
        delete next[`${recipeId}-${i}`];
      }
      return next;
    });
  };

  // Filter recipes based on tag category selections
  const filteredRecipes = selectedTag === 'All' 
    ? recipes 
    : recipes.filter(r => r.tag === selectedTag);

  // Custom multi-lingual category listings
  const filterTabs = [
    { id: 'All', en: 'All Articles & Dishes', ar: 'كل الأطباق والمقالات', tr: 'Tüm Tarifler ve Yazılar' },
    { id: 'Breakfast', en: 'Morning Breakfast', ar: 'وجبات الفطور الصباحي', tr: 'Sabah Kahvaltısı' },
    { id: 'Snack', en: 'Small Plates & Snacks', ar: 'المقبلات والأطباق الخفيفة', tr: 'Meze ve Atıştırmalıklar' },
    { id: 'Dinner', en: 'Bespoke Dinner Selection', ar: 'مكونات أطباق العشاء', tr: 'Gourmet Akşam Yemekleri' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20">

      {/* Page Header */}
      <div className={`mb-12 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
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

      {/* Category Filter Pills (Modernist Micro-Grid) */}
      <div className={`flex flex-wrap gap-2 mb-16 pb-4 border-b border-brand-charcoal/10 dark:border-brand-cream/10 ${dir === 'rtl' ? 'justify-start md:justify-start flex-row-reverse' : 'justify-start'}`}>
        {filterTabs.map((tab) => {
          const tabLabel = language === 'ar' ? tab.ar : (language === 'tr' ? tab.tr : tab.en);
          const isActive = selectedTag === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTag(tab.id)}
              className={`px-4 py-2 text-[10px] tracking-[0.15em] font-mono-data font-bold uppercase cursor-pointer border transition-all duration-300 ${
                isActive
                  ? 'bg-brand-terracotta text-brand-cream border-brand-terracotta shadow-sm'
                  : 'bg-transparent text-brand-charcoal/60 dark:text-brand-cream/60 border-brand-charcoal/15 dark:border-brand-cream/15 hover:border-brand-terracotta hover:text-brand-charcoal dark:hover:text-brand-cream'
              }`}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>

      {/* Recipe List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-24 sm:gap-32"
      >
        <AnimatePresence mode="wait">
          {filteredRecipes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-brand-charcoal/50 dark:text-brand-cream/50 font-serif italic text-sm"
              key="empty-state"
            >
              No recipes matched the active filter list.
            </motion.div>
          ) : (
            filteredRecipes.map((recipe) => {
              const product = products.find(p => p.id === recipe.productId);
              const translatedProduct = product ? translateProduct(product) : null;
              const title       = getLocalised(recipe, 'title',       language) as string;
              const ingredients = getLocalised(recipe, 'ingredients', language) as string[];
              const steps       = getLocalised(recipe, 'steps',       language) as string[];
              const note        = getLocalised(recipe, 'note',        language) as string | undefined;

              const activeServings = servings[recipe.id] ?? recipe.servings;
              const scaleRatio = activeServings / recipe.servings;

              // Check if home chef has any marked ingredients or steps for progress resetting
              const processedIngredientsCount = ingredients.length;
              const processedStepsCount = steps.length;
              const hasCheckedSomething = ingredients.some((_, i) => checkedIngredients[`${recipe.id}-${i}`]) || 
                                          steps.some((_, i) => checkedSteps[`${recipe.id}-${i}`]);

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

                    {/* Time + Interactive Servings Row */}
                    <div className={`p-4 bg-brand-cream/40 dark:bg-brand-charcoal/40 border border-brand-charcoal/5 rounded grid grid-cols-3 gap-4 text-[10px] font-mono-data tracking-[0.1em] uppercase ${dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                      <div>
                        <span className="block text-brand-ochre font-extrabold mb-1">{t('recipes_prep')}</span>
                        <span className="text-brand-charcoal dark:text-brand-cream font-bold">{recipe.prepTime}</span>
                      </div>
                      {recipe.cookTime && (
                        <div className="border-l border-brand-charcoal/10 dark:border-brand-cream/10 pl-3">
                          <span className="block text-brand-ochre font-extrabold mb-1">{t('recipes_cook')}</span>
                          <span className="text-brand-charcoal dark:text-brand-cream font-bold">{recipe.cookTime}</span>
                        </div>
                      )}
                      
                      {/* Servings scale buttons */}
                      <div className="border-l border-brand-charcoal/10 dark:border-brand-cream/10 pl-3">
                        <span className="block text-brand-ochre font-extrabold mb-1">{t('recipes_servings')}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <button
                            onClick={() => handleScaleServings(recipe.id, -1, recipe.servings)}
                            className="p-1 rounded border border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-terracotta hover:text-brand-terracotta text-brand-charcoal/40 dark:text-brand-cream/40 cursor-pointer transition-colors"
                            aria-label="Decrease Servings"
                          >
                            <Minus size={8} />
                          </button>
                          <span className="font-mono-data text-xs font-bold text-brand-charcoal dark:text-brand-cream">
                            {activeServings}
                          </span>
                          <button
                            onClick={() => handleScaleServings(recipe.id, 1, recipe.servings)}
                            className="p-1 rounded border border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-terracotta hover:text-brand-terracotta text-brand-charcoal/40 dark:text-brand-cream/40 cursor-pointer transition-colors"
                            aria-label="Increase Servings"
                          >
                            <Plus size={8} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Reset Progress Indicator */}
                    {hasCheckedSomething && (
                      <motion.button
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => resetRecipeProgress(recipe.id, processedIngredientsCount, processedStepsCount)}
                        className="text-[9px] font-mono-data text-brand-terracotta hover:text-brand-charcoal dark:hover:text-brand-cream flex items-center gap-1.5 transition-colors duration-200 mt-1 cursor-pointer"
                      >
                        <RefreshCw size={10} className="animate-spin-slow" />
                        {language === 'ar' ? 'إعادة تعيين التقدم بالوصفة' : (language === 'tr' ? 'Tarif İlerlemesini Sıfırla' : 'RESET PREPARATION CHECKLISTS')}
                      </motion.button>
                    )}

                    {/* Highly Structured Nutrition Facts Card */}
                    {recipe.nutrition && (
                      <div className="border border-brand-charcoal/10 dark:border-brand-cream/10 p-4 bg-brand-cream/15 dark:bg-brand-charcoal/15 rounded-sm mt-3">
                        <div className={`flex justify-between items-center border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-2 mb-3.5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                          <span className="text-[9px] tracking-[0.2em] font-mono-data font-bold uppercase text-brand-charcoal dark:text-brand-cream flex items-center gap-1.5">
                            <Sparkles size={11} className="text-brand-ochre" />
                            {language === 'ar' ? 'الحقائق الغذائية' : (language === 'tr' ? 'BESİN DEĞERLERİ' : 'NUTRITION FACTS')}
                          </span>
                          <span className="text-[7.5px] tracking-wider font-mono-data uppercase text-brand-charcoal/50 dark:text-brand-cream/50">
                            {language === 'ar' ? 'لكل حصة' : (language === 'tr' ? 'Porsiyon Başı' : 'PER SERVING')}
                          </span>
                        </div>

                        {/* Calories display */}
                        <div className={`flex items-baseline justify-between mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                          <span className="text-[9px] tracking-widest font-mono-data text-brand-charcoal/60 dark:text-brand-cream/60 uppercase font-bold">
                            {language === 'ar' ? 'السعرات الحرارية' : (language === 'tr' ? 'KALORİ (CALORIES)' : 'CALORIES')}
                          </span>
                          <div className={`flex items-baseline gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            <span className="font-serif text-2xl font-bold text-brand-charcoal dark:text-brand-cream leading-none">
                              {Math.round(recipe.nutrition.calories * scaleRatio)}
                            </span>
                            <span className="text-[8px] tracking-widest font-mono-data text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">
                              kcal
                            </span>
                          </div>
                        </div>

                        {/* Macros Grid */}
                        <div className="grid grid-cols-3 gap-1 border-t border-b border-brand-charcoal/10 dark:border-brand-cream/10 py-3 mb-2.5 font-mono-data">
                          {/* Protein */}
                          <div className="text-center border-r border-brand-charcoal/10 dark:border-brand-cream/10 last:border-0">
                            <span className="block text-[8px] tracking-wider text-brand-charcoal/40 dark:text-brand-cream/40 uppercase mb-1">
                              {language === 'ar' ? 'البروتين' : (language === 'tr' ? 'PROTEİN' : 'PROTEIN')}
                            </span>
                            <span className="text-xs font-extrabold text-brand-charcoal dark:text-brand-cream">
                              {Math.round(recipe.nutrition.protein * scaleRatio)}g
                            </span>
                            <span className="block text-[6.5px] tracking-wider text-brand-ochre/70 mt-0.5">
                              {recipe.nutrition.protein}g base
                            </span>
                          </div>

                          {/* Carbs */}
                          <div className="text-center border-r border-brand-charcoal/10 dark:border-brand-cream/10 last:border-0">
                            <span className="block text-[8px] tracking-wider text-brand-charcoal/40 dark:text-brand-cream/40 uppercase mb-1">
                              {language === 'ar' ? 'الكربوهيدرات' : (language === 'tr' ? 'KARB.' : 'CARBS')}
                            </span>
                            <span className="text-xs font-extrabold text-brand-charcoal dark:text-brand-cream">
                              {Math.round(recipe.nutrition.carbs * scaleRatio)}g
                            </span>
                            <span className="block text-[6.5px] tracking-wider text-brand-ochre/70 mt-0.5">
                              {recipe.nutrition.carbs}g base
                            </span>
                          </div>

                          {/* Fat */}
                          <div className="text-center">
                            <span className="block text-[8px] tracking-wider text-brand-charcoal/40 dark:text-brand-cream/40 uppercase mb-1">
                              {language === 'ar' ? 'الدهون' : (language === 'tr' ? 'YAĞ' : 'FAT')}
                            </span>
                            <span className="text-xs font-extrabold text-brand-charcoal dark:text-brand-cream">
                              {Math.round(recipe.nutrition.fat * scaleRatio)}g
                            </span>
                            <span className="block text-[6.5px] tracking-wider text-brand-ochre/70 mt-0.5">
                              {recipe.nutrition.fat}g base
                            </span>
                          </div>
                        </div>

                        {/* Note disclaimer */}
                        <p className={`text-[7.5px] text-brand-charcoal/40 dark:text-brand-cream/40 font-sans leading-relaxed text-justify ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                          {language === 'ar' 
                            ? `الحسابات مبنية على الحصص الثباتية للوصفة (${recipe.servings} حصص). تم تعديلها لتناسب اختياركم الحالي لعدد ${activeServings} حصص.`
                            : (language === 'tr'
                                ? `Besin değerleri, tarifin orijinal (${recipe.servings} porsiyon) miktarı esas alınarak hesaplanmış ve seçtiğiniz ${activeServings} porsiyona göre ölçeklenmiştir.`
                                : `Nutrition values are computed based on the original base servings (${recipe.servings} portion${recipe.servings > 1 ? 's' : ''}), and scaled dynamically to your chosen ${activeServings} portion${activeServings > 1 ? 's' : ''}.`
                              )
                          }
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Panel (60%) — Content */}
                  <div className={`md:w-[60%] flex flex-col justify-center ${dir === 'rtl' ? 'text-right items-end' : 'text-left'}`}>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal dark:text-brand-cream mb-4 leading-snug">
                      {title}
                    </h2>

                    <div className="w-10 h-[2px] bg-brand-terracotta mb-6" />

                    {/* Ingredients with Custom Interactive Checkboxes */}
                    <div className="mb-6 w-full">
                      <span className="block text-[9px] font-mono-data tracking-[0.25em] uppercase font-bold text-brand-ochre mb-3">
                        {t('recipes_ingredients')}
                      </span>
                      <ul className="space-y-2">
                        {ingredients.map((ing, i) => {
                          const itemKey = `${recipe.id}-${i}`;
                          const isIngredientChecked = !!checkedIngredients[itemKey];

                          return (
                            <li key={i}>
                              <button
                                onClick={() => toggleIngredient(recipe.id, i)}
                                className={`w-full text-sm text-brand-charcoal/80 dark:text-brand-cream/80 flex items-start gap-3 leading-relaxed transition-all duration-300 text-left outline-none cursor-pointer ${
                                  isIngredientChecked ? 'opacity-35 line-through text-brand-charcoal/40 dark:text-brand-cream/40' : ''
                                } ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}
                              >
                                <div className={`mt-[4px] w-4 h-4 rounded border shrink-0 transition-all flex items-center justify-center ${
                                  isIngredientChecked 
                                    ? 'border-brand-terracotta bg-brand-terracotta text-brand-cream shadow-xs' 
                                    : 'border-brand-charcoal/20 dark:border-brand-cream/20 hover:border-brand-terracotta bg-white/40 dark:bg-transparent'
                                }`}>
                                  {isIngredientChecked && <Check size={10} strokeWidth={3} />}
                                </div>
                                <span className={`flex-1 ${isIngredientChecked ? 'line-through decoration-brand-terracotta/30' : ''}`}>
                                  {scaleIngredient(ing, scaleRatio)}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Method List with interactive progress bars */}
                    <div className="mb-6 w-full">
                      <span className="block text-[9px] font-mono-data tracking-[0.25em] uppercase font-bold text-brand-ochre mb-3">
                        {t('recipes_method')}
                      </span>
                      <ol className="space-y-3.5">
                        {steps.map((step, i) => {
                          const stepKey = `${recipe.id}-${i}`;
                          const isStepChecked = !!checkedSteps[stepKey];

                          return (
                            <li key={i}>
                              <button
                                onClick={() => toggleStep(recipe.id, i)}
                                className={`w-full flex gap-4 transition-all duration-300 text-left items-start outline-none cursor-pointer ${
                                  isStepChecked ? 'opacity-35' : ''
                                } ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}
                              >
                                <div className={`text-[10px] font-mono-data font-bold shrink-0 mt-0.5 w-6 h-6 rounded flex items-center justify-center border transition-all select-none ${
                                  isStepChecked 
                                    ? 'bg-brand-charcoal/20 dark:bg-brand-cream/20 text-brand-charcoal/40 dark:text-brand-cream/40 border-transparent shadow-inner' 
                                    : 'bg-brand-terracotta/5 text-brand-terracotta border-brand-terracotta/10 hover:bg-brand-terracotta/10'
                                }`}>
                                  {isStepChecked ? <Check size={10} strokeWidth={3} /> : String(i + 1).padStart(2, '0')}
                                </div>
                                <p className={`text-sm text-brand-charcoal/85 dark:text-brand-cream/85 leading-relaxed flex-1 ${
                                  isStepChecked ? 'line-through decoration-brand-charcoal/30 font-light' : ''
                                }`}>
                                  {step}
                                </p>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    </div>

                    {/* Optional Tip */}
                    {note && (
                      <div className={`mb-8 py-3 px-4 bg-brand-ochre/5 border-brand-ochre/30 w-full ${dir === 'rtl' ? 'border-r-2 text-right' : 'border-l-2 text-left'}`}>
                        <span className="block text-[9px] font-mono-data tracking-[0.25em] uppercase font-bold text-brand-ochre mb-1">
                          {t('recipes_tip')}
                        </span>
                        <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 italic leading-relaxed text-justify">
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
            })
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

