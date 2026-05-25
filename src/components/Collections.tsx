import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsApi } from '../data/products';
import { Product, ProductCategory, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Scale, Shield, Tag, Sparkles, X, ChevronRight, Plus, FileText, Globe, Heart, Star } from 'lucide-react';
import { productRatings } from '../data/testimonials';
import { useLanguage, useProductTranslation } from '../context/LanguageContext';
import FlavorGuide from './FlavorGuide';

interface CollectionsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  addToCart: (product: Product) => void;
  cartItems: CartItem[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  designation?: string;
}

export default function Collections({ selectedCategory, setSelectedCategory, addToCart, cartItems }: CollectionsProps) {
  const { t, language, dir } = useLanguage();
  const translateProduct = useProductTranslation();

  const [selectedProductRaw, setSelectedProductRaw] = useState<Product | null>(null);
  const [quickViewProductRaw, setQuickViewProductRaw] = useState<Product | null>(null);

  // Localized Star Ratings and Reviews States with Persistence
  const [localRatings, setLocalRatings] = useState<Record<string, { stars: number; count: number }>>(() => {
    try {
      const saved = localStorage.getItem('rashah-product-ratings');
      return saved ? JSON.parse(saved) : productRatings;
    } catch (e) {
      return productRatings;
    }
  });

  const [productReviews, setProductReviews] = useState<Record<string, Review[]>>(() => {
    try {
      const saved = localStorage.getItem('rashah-product-reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    // Prepopulate 2 beautiful custom reviews for each product matching the theme
    return {
      'rashah-signature-blend': [
        {
          id: 'v1',
          name: 'Sultan A. Al-Saud',
          rating: 5,
          comment: 'Perfect coarse rub. The volc sumac carries a sharp berry aroma that bursts on warm labneh. Genuinely beautiful presentation in Riyadh.',
          date: 'May 14, 2526',
          designation: 'Certified Buyer, Riyadh KSA'
        },
        {
          id: 'v2',
          name: 'Clara G.',
          rating: 5,
          comment: 'Exceptional citric notes. Sourced high-heritage. A staple in my culinary styling.',
          date: 'May 06, 2026',
          designation: 'Food Stylist, London UK'
        }
      ],
      'cardamom-rose-pecan-granola': [
        {
          id: 'v3',
          name: 'Yasmine B.',
          rating: 5,
          comment: 'Outstanding fragrance. The baked rosebuds are delightful with Greek yogurt. Best granola I’ve tasted in the Middle East.',
          date: 'May 20, 2026',
          designation: 'Gourmet Enthusiast, Dubai UAE'
        },
        {
          id: 'v4',
          name: 'Marcus L.',
          rating: 5,
          comment: 'The pecan clusters are perfectly crisp. Not overly sweet, balanced with maple saltiness.',
          date: 'May 11, 2026',
          designation: 'Chef, New York USA'
        }
      ],
      'zaatar-premium-artisanal': [
        {
          id: 'v5',
          name: 'Nour Al-Hassan',
          rating: 5,
          comment: 'This is authentic shade-dried wild thyme. Coarse textures are alive. Highly authenticated product.',
          date: 'May 18, 2026',
          designation: 'Gastronomist, Amman Jordan'
        }
      ],
      'classic-toasted-maple-granola': [
        {
          id: 'v6',
          name: 'Thomas M.',
          rating: 4,
          comment: 'Subtle slow-baked maple. Exceptional crunch. Extremely versatile morning breakfast base.',
          date: 'May 22, 2026',
          designation: 'Hospitality Partner, Al-Ula'
        }
      ],
      'aleppo-smoked-pepper-flakes': [
        {
          id: 'v7',
          name: 'Melis K.',
          rating: 5,
          comment: 'Volcanic and smoked. Beautifully sweet yet rich spicy warmth. Essential for poached eggs.',
          date: 'May 21, 2026',
          designation: 'Food Blogger, Istanbul Turkey'
        }
      ],
      'salted-ochre-sesame-granola': [
        {
          id: 'v8',
          name: 'Fahad Al-Saif',
          rating: 5,
          comment: 'Raw tahini base adds a deep savory dimension. Robust texture that never gets soggy. Incredibly creative.',
          date: 'May 10, 2026',
          designation: 'Fine Merchant, Al-Khobar'
        }
      ],
      'loomi-fermented-black-lime': [
        {
          id: 'v9',
          name: 'Marcus V.',
          rating: 5,
          comment: 'Loomi is outstanding. Handcrushed, deep fermented. Gives grilled seabass and broths an absolute, citric kick.',
          date: 'May 08, 2026',
          designation: 'Masterchef Consultant, Rome Italy'
        }
      ]
    };
  });

  // Review Submissions Form States
  const [formRating, setFormRating] = useState<number>(5);
  const [formName, setFormName] = useState<string>('');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formComment, setFormComment] = useState<string>('');
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState<boolean>(false);

  // Synchronise ratings/reviews to local storage
  useEffect(() => {
    localStorage.setItem('rashah-product-ratings', JSON.stringify(localRatings));
  }, [localRatings]);

  useEffect(() => {
    localStorage.setItem('rashah-product-reviews', JSON.stringify(productReviews));
  }, [productReviews]);
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rashah-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const next = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('rashah-wishlist', JSON.stringify(next));
      return next;
    });
  };

  // TanStack Query fetching simulated "server state"
  const { data: rawProducts = [], isLoading, isError } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProductsApi(selectedCategory),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const categories = ['All', 'Granola', 'Single Spices', 'Curated Blends'] as const;

  // Fully translate the product listings dynamically based on the current language
  const products = rawProducts.map(p => translateProduct(p));

  // Handle selected & quickview product references translated
  const selectedProduct = selectedProductRaw ? translateProduct(selectedProductRaw) : null;
  const quickViewProduct = quickViewProductRaw ? translateProduct(quickViewProductRaw) : null;

  return (
    <section className="w-full py-16 sm:py-24 bg-brand-cream dark:bg-brand-charcoal transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Page Head */}
        <div className="text-center md:text-left mb-12 border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="font-mono-data text-[10px] tracking-[0.3em] text-brand-ochre uppercase font-bold block mb-2">
              {t('collections_catalogue')}
            </span>
            <h2 id="collections-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-charcoal dark:text-brand-cream">
              {t('nav_collections').split(' — ')[0]}
            </h2>
          </div>
          <span className="font-mono-data text-[10px] tracking-[0.1em] text-brand-charcoal/50 dark:text-brand-cream/50 uppercase">
            {products.length} {t('collections_discoveries')}
          </span>
        </div>

        {/* Minimalist Filter Bar */}
        <div className="flex overflow-x-auto gap-4 border-b border-brand-charcoal/5 dark:border-brand-cream/5 pb-6 scrollbar-none mb-12 justify-start md:justify-start">
          {categories.map((cat) => (
            <button
              id={`filter-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs tracking-[0.2em] font-medium transition-all duration-300 border cursor-pointer whitespace-nowrap ${
                (selectedCategory === cat)
                  ? 'bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal border-transparent font-bold'
                  : 'bg-transparent text-brand-charcoal/60 dark:text-brand-cream/60 border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-terracotta hover:text-brand-terracotta'
              }`}
            >
              {cat === 'All' ? t('collections_all_provisions').toUpperCase() : (cat === 'Granola' ? t('cat_granola').toUpperCase() : (cat === 'Single Spices' ? t('cat_single').toUpperCase() : t('cat_curated').toUpperCase()))}
            </button>
          ))}
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-brand-ochre border-t-transparent animate-spin" />
            <span className="font-mono-data text-[10px] tracking-[0.2em] text-brand-charcoal/50">
              {language === 'ar' ? 'جاري تحميل المعطيات...' : (language === 'tr' ? 'VERİLER GETİRİLİYOR...' : 'RETRIEVING ARTIFACTS...')}
            </span>
          </div>
        )}

        {isError && (
          <div className="w-full py-20 text-center text-brand-terracotta">
            <p className="font-serif text-lg">
              {language === 'ar' ? 'فشل في جلب منتجات المجموعة' : (language === 'tr' ? 'Ürün serileri getirilemedi.' : 'Failed to retrieve product batches.')}
            </p>
            <span className="text-xs">
              {language === 'ar' ? 'الرجاء التحقق من جودة الاتصال بالإنترنت' : (language === 'tr' ? 'Lütfen internet bağlantınızı kontrol edip tekrar deneyin.' : 'Please verify connection or settings.')}
            </span>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <AnimatePresence mode="popLayout">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group flex flex-col justify-between border border-brand-charcoal/10 dark:border-brand-cream/10 p-6 bg-brand-cream/30 dark:bg-brand-charcoal/50 hover:border-brand-terracotta/40 dark:hover:border-brand-terracotta/40 transition-all duration-300 relative"
                >
                  
                  {/* Top product tag metadata */}
                  <div className="flex justify-between items-center mb-4 text-[9px] font-mono-data tracking-widest text-brand-charcoal/50 dark:text-brand-cream/50 uppercase">
                    <span className="flex items-center gap-1">
                      <Tag size={10} className="text-brand-ochre" /> {product.category}
                    </span>
                    <span>{product.weight}</span>
                  </div>

                  {/* Image container */}
                  <div className="aspect-square w-full bg-white dark:bg-brand-charcoal/60 border border-brand-charcoal/5 dark:border-brand-cream/5 p-4 flex items-center justify-center overflow-hidden mb-6 relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain transform group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Corner Ribbon for Featured */}
                    {product.featured && (
                      <div className="absolute top-2 left-2 bg-brand-terracotta text-brand-cream text-[8px] font-mono-data font-bold px-2 py-1 tracking-widest">
                        {t('featured_badge')}
                      </div>
                    )}

                    {/* Floating Heart Button for Wishlist */}
                    <button
                      id={`wishlist-toggle-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-brand-cream/90 dark:bg-brand-charcoal/90 border border-brand-charcoal/10 dark:border-brand-cream/10 text-brand-charcoal dark:text-brand-cream hover:text-brand-terracotta dark:hover:text-brand-terracotta transition-all duration-300 cursor-pointer z-10 shadow-sm flex items-center justify-center group/heart"
                      title={wishlist.includes(product.id) ? t('remove_saved') : t('save_item')}
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        animate={{ scale: wishlist.includes(product.id) ? [1, 1.3, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart
                          size={13}
                          className={`transition-colors duration-200 ${
                            wishlist.includes(product.id)
                              ? 'fill-brand-terracotta text-brand-terracotta'
                              : 'text-brand-charcoal/60 dark:text-brand-cream/60 group-hover/heart:text-brand-terracotta'
                          }`}
                        />
                      </motion.div>
                    </button>
                  </div>

                  {/* Body & Typography */}
                  <div className="flex-grow text-left">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-serif text-lg font-bold text-brand-charcoal dark:text-brand-cream group-hover:text-brand-terracotta transition-colors duration-200">
                        {product.title}
                      </h3>
                      <span className="font-serif italic text-sm text-brand-terracotta whitespace-nowrap ml-2">
                        {language === 'ar' ? productRowTitleEnglish(product.id) : product.arabicTitle}
                      </span>
                    </div>

                    <span className="block text-[10px] tracking-[0.25em] text-brand-ochre font-bold uppercase font-mono-data mb-3 text-justify">
                      {product.subtitle}
                    </span>

                    {/* Star rating */}
                    {localRatings[product.id] && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const currentStars = localRatings[product.id]?.stars ?? 5.0;
                            return (
                              <Star
                                key={star}
                                size={10}
                                className={star <= Math.round(currentStars) ? 'fill-brand-terracotta text-brand-terracotta border-0' : 'text-brand-charcoal/20 dark:text-brand-cream/20'}
                              />
                            );
                          })}
                        </div>
                        <span className="font-mono-data text-[9px] text-brand-charcoal/50 dark:text-brand-cream/50 tracking-wide">
                          {localRatings[product.id].stars.toFixed(1)} · {localRatings[product.id].count} reviews
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-brand-charcoal/65 dark:text-brand-cream/65 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-6 text-justify">
                      {product.description}
                    </p>
                  </div>

                  {/* CTA Footer with direct button background transition */}
                  <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-4 mt-2 flex items-center justify-between">
                    <div>
                      <span className="block text-[8px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">{t('collections_investment')}</span>
                      <span className="font-mono-data text-sm font-bold text-brand-charcoal dark:text-brand-cream">
                        ${product.price}.00 USD
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        id={`add-to-cart-${product.id}`}
                        key={`cart-btn-${product.id}-${cartItems.find(ci => ci.product.id === product.id)?.quantity || 0}`}
                        onClick={() => addToCart(product)}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-1.5 px-4 py-2 bg-brand-terracotta hover:bg-brand-charcoal dark:hover:bg-brand-cream text-brand-cream dark:hover:text-brand-charcoal text-[10px] font-semibold tracking-widest transition-colors duration-300 cursor-pointer uppercase"
                        aria-label={`Add ${product.title} to batch`}
                      >
                        {(() => {
                          const item = cartItems.find(ci => ci.product.id === product.id);
                          return item ? `${t('add_more')} (${item.quantity})` : t('add_to_batch');
                        })()}
                        <Plus size={11} />
                      </motion.button>

                      <button
                        id={`quick-view-${product.id}`}
                        onClick={() => setQuickViewProductRaw(product)}
                        className="group flex items-center justify-center p-2.5 bg-brand-charcoal/5 dark:bg-brand-cream/5 text-brand-charcoal dark:text-brand-cream hover:bg-brand-terracotta hover:text-brand-cream dark:hover:bg-brand-terracotta dark:hover:text-brand-cream transition-all duration-300 cursor-pointer"
                        title="Quick View"
                      >
                        <Eye size={13} />
                      </button>

                      <button
                        id={`view-details-${product.id}`}
                        onClick={() => setSelectedProductRaw(product)}
                        className="group flex items-center justify-center p-2.5 bg-brand-charcoal/5 dark:bg-brand-cream/5 text-brand-charcoal dark:text-brand-cream hover:bg-brand-charcoal hover:text-brand-cream dark:hover:bg-brand-cream dark:hover:text-brand-charcoal transition-all duration-300 cursor-pointer"
                        title="Full Spec Leaflet"
                      >
                        <FileText size={13} />
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Full Specifications Drawer Sheet */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-end">
              
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProductRaw(null)}
                className="absolute inset-0 bg-black cursor-pointer"
              />

              {/* Slide-over Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                className="relative w-full max-w-lg md:max-w-xl h-full bg-brand-cream dark:bg-brand-charcoal border-l border-brand-charcoal/10 dark:border-brand-cream/10 p-8 sm:p-10 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 transition-colors duration-300 text-left"
              >
                <div>
                  
                  {/* Close header */}
                  <div className="flex justify-between items-center border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-4 mb-8">
                    <span className="font-mono-data text-[10px] tracking-[0.25em] text-brand-ochre font-extrabold uppercase">
                      {t('collections_leaflet')}: {selectedProduct.subtitle}
                    </span>
                    <button
                      id="close-drawer-btn"
                      onClick={() => setSelectedProductRaw(null)}
                      className="p-1 rounded-full text-brand-charcoal dark:text-brand-cream hover:bg-brand-charcoal/5 dark:hover:bg-brand-cream/5 cursor-pointer"
                    >
                      <X size={20} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Graphic layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 items-center bg-white dark:bg-brand-charcoal/40 p-4 border border-brand-charcoal/5 text-left">
                    <div className="aspect-square overflow-hidden flex items-center justify-center">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        className="max-h-56 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-serif text-2xl font-light text-brand-terracotta leading-none">
                        {language === 'ar' ? productRowTitleEnglish(selectedProduct.id) : selectedProduct.arabicTitle}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-brand-charcoal dark:text-brand-cream leading-tight">
                        {selectedProduct.title}
                      </h3>
                      <div className="flex items-center gap-4 text-[10px] font-mono-data tracking-widest text-brand-charcoal/60 dark:text-brand-cream/60 uppercase mt-2">
                        <span>{language === 'ar' ? 'الصافي' : 'NET'} {selectedProduct.weight}</span>
                        <span>{language === 'ar' ? 'المنشأ' : (language === 'tr' ? 'Menşei' : 'ORIGIN')}: {selectedProduct.origin}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deep Full Description */}
                  <div className="mb-8 p-4 bg-brand-cream/40 dark:bg-brand-charcoal/20 border-l-2 border-brand-terracotta text-justify">
                    <p className="font-serif text-xs sm:text-sm text-brand-charcoal dark:text-brand-cream italic leading-relaxed">
                      "{selectedProduct.fullDescription}"
                    </p>
                  </div>

                  {/* Ingredients block */}
                  <div className="mb-8 text-left">
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block mb-3">
                      {t('collections_constituents')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.ingredients.map((ingredient, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-brand-charcoal/5 dark:bg-brand-cream/5 text-brand-charcoal/80 dark:text-brand-cream/80 text-[10px] tracking-wider font-sans border border-brand-charcoal/5 dark:border-brand-cream/5"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Usage Guide and Tasting notes */}
                  <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-6 text-left">
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block mb-2 flex items-center gap-1.5">
                      <Sparkles size={11} className="text-brand-terracotta" /> {t('collections_palate_notes')}
                    </span>
                    <p className="text-xs text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed font-sans text-justify">
                      {selectedProduct.notes}
                    </p>
                  </div>

                  {/* Customer Reviews Section */}
                  <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-8 mt-8 text-left">
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-extrabold uppercase block mb-4">
                      {language === 'ar' ? 'آراء وتجربة العملاء' : (language === 'tr' ? 'MÜŞTERİ DEĞERLENDİRMELERİ' : 'CUSTOMER TESTIMONIALS & REVIEWS')}
                    </span>
                    
                    {/* Summary row */}
                    <div className="flex items-center gap-5 mb-6 flex-wrap">
                      <div className="text-center bg-brand-charcoal/5 dark:bg-brand-cream/5 px-4 py-3 rounded border border-brand-charcoal/5">
                        <div className="font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-cream">
                          {(localRatings[selectedProduct.id]?.stars ?? 5.0).toFixed(1)}
                        </div>
                        <div className="flex justify-center gap-0.5 my-1">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const currentStars = localRatings[selectedProduct.id]?.stars ?? 5.0;
                            return (
                              <Star
                                key={star}
                                size={11}
                                className={star <= Math.round(currentStars) ? 'fill-brand-terracotta text-brand-terracotta border-0' : 'text-brand-charcoal/20 dark:text-brand-cream/20'}
                              />
                            );
                          })}
                        </div>
                        <span className="font-mono-data text-[9px] text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">
                          {localRatings[selectedProduct.id]?.count ?? 0} {language === 'ar' ? 'تقييم' : (language === 'tr' ? 'Yorum' : 'Reviews')}
                        </span>
                      </div>
                      
                      {/* Write a review button toggle */}
                      <button
                        onClick={() => {
                          setShowReviewForm(!showReviewForm);
                          setFormSubmittedSuccessfully(false);
                        }}
                        className="px-4 py-2.5 bg-brand-terracotta/10 hover:bg-brand-terracotta text-brand-terracotta hover:text-brand-cream text-[9px] tracking-[0.2em] font-bold font-mono-data uppercase cursor-pointer transition-all duration-300 border border-brand-terracotta/20 rounded-md"
                      >
                        {showReviewForm 
                          ? (language === 'ar' ? 'إغلاق نافذة التقييم' : (language === 'tr' ? 'KAPAT' : 'CLOSE FORM'))
                          : (language === 'ar' ? 'أضف تقييمك الخاص' : (language === 'tr' ? 'YORUM YAZ' : 'WRITE A REVIEW'))}
                      </button>
                    </div>

                    {/* Collapsing Review Form */}
                    <AnimatePresence>
                      {showReviewForm && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mb-6 p-4 bg-brand-charcoal/5 dark:bg-brand-cream/5 border border-brand-charcoal/10 rounded"
                        >
                          {formSubmittedSuccessfully ? (
                            <div className="py-4 text-center">
                              <span className="text-brand-terracotta font-serif italic text-sm font-semibold block mb-1">
                                {language === 'ar' ? 'تم تسجيل تقييمك بنجاح!' : (language === 'tr' ? 'Değerlendirmeniz için teşekkürler!' : 'Thank you for your response!')}
                              </span>
                              <p className="text-xs text-brand-charcoal/50 dark:text-brand-cream/50 leading-relaxed max-w-sm mx-auto">
                                {language === 'ar' ? 'يسعدنا مشاركتك لتجربة رشة الفريدة لتدشين الثقافة والمذاق الأصيل.' : (language === 'tr' ? 'Görüşleriniz en kısa sürede ürün değerlendirme ortalamasına yansıtılmıştır.' : 'Your typographic review has been incorporated dynamically into our running totals.')}
                              </p>
                            </div>
                          ) : (
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (!formName.trim() || !formComment.trim()) return;

                                // Custom arithmetic to dynamically scale average stars based on the new review
                                const currentRating = localRatings[selectedProduct.id] || { stars: 5.0, count: 12 };
                                const newReviewCount = currentRating.count + 1;
                                const newStarsAvg = ((currentRating.stars * currentRating.count) + formRating) / newReviewCount;

                                // Update localStorage-bound ratings state
                                setLocalRatings(prev => ({
                                  ...prev,
                                  [selectedProduct.id]: { stars: newStarsAvg, count: newReviewCount }
                                }));

                                // Append the review into local reviews list
                                const newReview: Review = {
                                  id: `user-rev-${Date.now()}`,
                                  name: formName,
                                  rating: formRating,
                                  comment: formComment,
                                  date: new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : (language === 'tr' ? 'tr-TR' : 'en-US'), {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  }),
                                  designation: formTitle.trim() ? formTitle : (language === 'ar' ? 'مشترٍ معتمد' : (language === 'tr' ? 'Onaylı Alıcı' : 'Verified Buyer'))
                                };

                                setProductReviews(prev => ({
                                  ...prev,
                                  [selectedProduct.id]: [newReview, ...(prev[selectedProduct.id] || [])]
                                }));

                                // Clear forms
                                setFormName('');
                                setFormTitle('');
                                setFormComment('');
                                setFormRating(5);
                                setFormSubmittedSuccessfully(true);
                              }}
                              className="space-y-3"
                            >
                              {/* Standard interactive star row */}
                              <div>
                                <label className="block text-[8px] text-brand-charcoal/50 dark:text-brand-cream/50 font-bold tracking-widest uppercase mb-1">
                                  {language === 'ar' ? 'التقييم بالنجوم *' : (language === 'tr' ? 'PUANINIZ *' : 'RATING STARS *')}
                                </label>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      type="button"
                                      key={star}
                                      onClick={() => setFormRating(star)}
                                      className="text-brand-terracotta hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                                    >
                                      <Star
                                        size={18}
                                        className={star <= formRating ? 'fill-brand-terracotta text-brand-terracotta border-0' : 'text-brand-charcoal/20 dark:text-brand-cream/20'}
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Form identity rows */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[8px] text-brand-charcoal/50 dark:text-brand-cream/50 font-bold tracking-widest uppercase mb-1">
                                    {language === 'ar' ? 'الاسم بالكامل *' : (language === 'tr' ? 'ADINIZ *' : 'IDENTITY NAME *')}
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder={language === 'ar' ? 'مثال: فيصل الحربي' : (language === 'tr' ? 'Örn: Ahmet Yılmaz' : 'e.g., Sultan Al-Saif')}
                                    className="w-full text-xs px-3 py-2 bg-brand-cream dark:bg-brand-charcoal border border-brand-charcoal/10 placeholder-brand-charcoal/35 dark:placeholder-brand-cream/35 text-brand-charcoal dark:text-brand-cream outline-none focus:border-brand-terracotta transition-colors rounded"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[8px] text-brand-charcoal/50 dark:text-brand-cream/50 font-bold tracking-widest uppercase mb-1">
                                    {language === 'ar' ? 'المدينة أو الصفة' : (language === 'tr' ? 'UNVAN / ŞEHİR' : 'LOCATION / DESIGNATION')}
                                  </label>
                                  <input
                                    type="text"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    placeholder={language === 'ar' ? 'مثال: الرياض، طاهٍ هاوٍ' : (language === 'tr' ? 'Örn: İstanbul, Ev Aşçısı' : 'e.g., Riyadh, Culinary Hobbyist')}
                                    className="w-full text-xs px-3 py-2 bg-brand-cream dark:bg-brand-charcoal border border-brand-charcoal/10 placeholder-brand-charcoal/35 dark:placeholder-brand-cream/35 text-brand-charcoal dark:text-brand-cream outline-none focus:border-brand-terracotta transition-colors rounded"
                                  />
                                </div>
                              </div>

                              {/* Text comments */}
                              <div>
                                <label className="block text-[8px] text-brand-charcoal/50 dark:text-brand-cream/50 font-bold tracking-widest uppercase mb-1">
                                  {language === 'ar' ? 'رأيك الشخصي بالتفصيل *' : (language === 'tr' ? 'DEĞERLENDİRME DETAYI *' : 'TYPOGRAPHIC TESTIMONIAL *')}
                                </label>
                                <textarea
                                  required
                                  rows={3}
                                  value={formComment}
                                  onChange={(e) => setFormComment(e.target.value)}
                                  placeholder={language === 'ar' ? 'اكتب انطباعك بصدق عن القرمشة، الرائحة، ومستوى الملوحة والبهارات...' : (language === 'tr' ? 'Çıtır pürüz, aromatik koku ve tuz dengesini tarif edin...' : 'Describe crunch density, sensory burst, or how you paired it...')}
                                  className="w-full text-xs px-3 py-2 bg-brand-cream dark:bg-brand-charcoal border border-brand-charcoal/10 placeholder-brand-charcoal/35 dark:placeholder-brand-cream/35 text-brand-charcoal dark:text-brand-cream outline-none focus:border-brand-terracotta transition-colors rounded resize-none"
                                />
                              </div>

                              {/* Submit dispatch button */}
                              <button
                                type="submit"
                                className="w-full py-2 bg-brand-terracotta text-brand-cream hover:bg-brand-charcoal focus:bg-brand-charcoal text-[9px] font-mono-data font-bold tracking-widest uppercase transition-colors max-w-[170px] cursor-pointer"
                              >
                                {language === 'ar' ? 'إرسال التقييم' : (language === 'tr' ? 'DEĞERLENDİR' : 'SUBMIT TESTIMONIAL')}
                              </button>
                            </form>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Scrollable list of Reviews */}
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                      {(!productReviews[selectedProduct.id] || productReviews[selectedProduct.id].length === 0) ? (
                        <p className="font-serif italic text-xs text-brand-charcoal/40 dark:text-brand-cream/40 py-4 text-justify">
                          {language === 'ar' 
                            ? 'لا توجد تقييمات مسجلة بعد. كن أول من يكتب رأيه حول هذا المنتج الفريد!' 
                            : (language === 'tr' 
                              ? 'Henüz yorum yazılmamış. Bu gurme ürün hakkında ilk değerlendiren siz olun!' 
                              : 'No written reviews yet. Be the first to express your palate thoughts!')}
                        </p>
                      ) : (
                        productReviews[selectedProduct.id].map((review) => {
                          const initials = review.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
                          return (
                            <div 
                              key={review.id} 
                              className={`p-4 border border-brand-charcoal/5 dark:border-brand-cream/5 bg-brand-cream/20 dark:bg-[#141414] rounded flex gap-3 ${dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'}`}
                            >
                              {/* Beautiful initials avatar wrapper */}
                              <div className="w-8 h-8 rounded-full bg-brand-ochre/15 text-brand-ochre font-serif text-xs font-bold font-mono-data flex items-center justify-center shrink-0 select-none">
                                {initials || 'R'}
                              </div>
                              
                              <div className="flex-grow">
                                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                                  <strong className="text-xs font-bold text-brand-charcoal dark:text-brand-cream">{review.name}</strong>
                                  <span className="font-mono-data text-[9px] text-[#27ae60] font-bold tracking-wider uppercase flex items-center gap-0.5 select-none">
                                    ✦ {language === 'ar' ? 'حساب موثق' : (language === 'tr' ? 'Onaylı Müşteri' : 'Verified Client')}
                                  </span>
                                </div>
                                
                                {review.designation && (
                                  <span className="block text-[9px] text-brand-charcoal/40 dark:text-brand-cream/40 font-mono-data uppercase mb-1">
                                    {review.designation} · {review.date}
                                  </span>
                                )}

                                {/* Card stars display */}
                                <div className={`flex gap-0.5 mb-2 ${dir === 'rtl' ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      size={8}
                                      className={star <= review.rating ? 'fill-brand-terracotta text-brand-terracotta border-0' : 'text-brand-charcoal/10 dark:text-brand-cream/10'}
                                    />
                                  ))}
                                </div>

                                <p className="text-xs text-[#555] dark:text-brand-cream/80 leading-relaxed font-sans text-justify">
                                  {review.comment}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                </div>

                {/* Footer with actions inside drawer */}
                <div className="border-t border-[#181818]/10 dark:border-brand-cream/10 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-[8px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">{t('valuation')}</span>
                    <span className="font-mono-data text-xl font-bold text-brand-charcoal dark:text-brand-cream">
                      ${selectedProduct.price}.00 USD
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <motion.button
                      id="drawer-add-to-cart-btn"
                      key={`drawer-cart-btn-${selectedProduct.id}-${cartItems.find(ci => ci.product.id === selectedProduct.id)?.quantity || 0}`}
                      onClick={() => addToCart(selectedProduct)}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 sm:px-6 py-4 bg-brand-terracotta text-brand-cream hover:bg-brand-charcoal dark:hover:bg-brand-cream dark:hover:text-brand-charcoal text-xs tracking-widest font-semibold transition-colors duration-300 cursor-pointer uppercase flex items-center justify-center gap-2"
                    >
                      {(() => {
                        const item = cartItems.find(ci => ci.product.id === selectedProduct.id);
                        return item ? `${t('add_more')} (${item.quantity})` : t('add_to_batch');
                      })()}
                      <Plus size={13} />
                    </motion.button>

                    <button
                      id="drawer-inquiry-btn"
                      onClick={() => {
                        setSelectedProductRaw(null);
                        // Deep link into Connect section
                        const connBtn = document.getElementById('nav-link-connect') || document.getElementById('mobile-nav-link-connect');
                        if (connBtn) {
                          connBtn.click();
                        }
                      }}
                      className="flex-1 sm:px-6 py-4 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream dark:hover:text-brand-cream text-xs tracking-widest font-semibold transition-all duration-300 cursor-pointer uppercase"
                    >
                      {t('collections_inquire_batch')}
                    </button>
                  </div>
                </div>

              </motion.div>

            </div>
          )}
        </AnimatePresence>

        {/* Quick View Centered Dialog Window Modal */}
        <AnimatePresence>
          {quickViewProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setQuickViewProductRaw(null)}
                className="absolute inset-0 bg-brand-charcoal/80 dark:bg-black/85 backdrop-blur-xs cursor-pointer"
              />

              {/* Centered Premium Dialog Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 15 }}
                transition={{ type: "spring", damping: 24, stiffness: 210 }}
                className="relative w-full max-w-lg bg-brand-cream dark:bg-brand-charcoal border border-brand-charcoal/15 dark:border-brand-cream/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-10 overflow-hidden rounded-md transition-colors duration-300 text-left"
              >
                {/* Top ribbon decoration */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-ochre via-brand-terracotta to-brand-ochre" />

                {/* Close Button */}
                <button
                  id="close-quickview-btn"
                  onClick={() => setQuickViewProductRaw(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full text-brand-charcoal/50 dark:text-brand-cream/50 hover:text-brand-terracotta hover:bg-brand-charcoal/5 dark:hover:bg-brand-cream/5 transition-colors duration-200 cursor-pointer"
                  title="Close Modal"
                >
                  <X size={16} />
                </button>

                {/* Header Information */}
                <div className="mb-5 pr-6 text-left">
                  <span className="font-mono-data text-[9px] tracking-[0.25em] text-brand-ochre font-bold uppercase block mb-1">
                    {t('quick_batch_insight')}
                  </span>
                  <div className="flex justify-between items-baseline gap-2 flex-wrap sm:flex-nowrap">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal dark:text-brand-cream leading-tight">
                      {quickViewProduct.title}
                    </h3>
                    <span className="font-serif italic text-base sm:text-lg text-brand-terracotta whitespace-nowrap">
                      {language === 'ar' ? productRowTitleEnglish(quickViewProduct.id) : quickViewProduct.arabicTitle}
                    </span>
                  </div>
                  <p className="text-[10px] text-brand-charcoal/50 dark:text-brand-cream/50 tracking-wider uppercase font-mono-data mt-1 text-justify">
                    {quickViewProduct.subtitle}
                  </p>
                </div>

                {/* Horizontal Metadata Splitter */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 mb-5 items-stretch">
                  
                  {/* Image Frame */}
                  <div className="sm:col-span-4 aspect-square max-h-32 sm:max-h-none overflow-hidden flex items-center justify-center bg-white dark:bg-brand-charcoal/60 rounded border border-brand-charcoal/10 dark:border-brand-cream/10 p-3">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.title}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Condensed Details */}
                  <div className="sm:col-span-8 flex flex-col justify-between gap-4 text-left">
                    <div className="space-y-2.5">
                      
                      {/* Origin Segment */}
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-6 h-6 rounded bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta shrink-0">
                          <Globe size={12} />
                        </div>
                        <div>
                          <span className="block text-[8px] text-brand-charcoal/40 dark:text-brand-cream/40 font-mono-data uppercase tracking-widest leading-none">{t('terroir_origin')}</span>
                          <strong className="text-brand-charcoal dark:text-brand-cream font-bold text-xs uppercase">
                            {quickViewProduct.origin}
                          </strong>
                        </div>
                      </div>

                      {/* Weight Segment */}
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-6 h-6 rounded bg-brand-ochre/10 flex items-center justify-center text-brand-ochre shrink-0">
                          <Scale size={12} />
                        </div>
                        <div>
                          <span className="block text-[8px] text-brand-charcoal/40 dark:text-brand-cream/40 font-mono-data uppercase tracking-widest leading-none">{t('net_weight')}</span>
                          <strong className="text-brand-charcoal dark:text-brand-cream font-bold text-xs">
                            {quickViewProduct.weight}
                          </strong>
                        </div>
                      </div>

                    </div>

                    {/* Palate Notes Teaser */}
                    <div className="bg-brand-charcoal/5 dark:bg-brand-cream/5 p-3 border-l-2 border-brand-ochre text-left text-justify">
                      <span className="font-mono-data text-[8px] tracking-widest text-brand-ochre font-extrabold uppercase block mb-1 flex items-center gap-1">
                        <Sparkles size={10} className="text-brand-terracotta" /> {t('heritage_tasting_notes')}
                      </span>
                      <p className="text-[11px] text-brand-charcoal/80 dark:text-brand-cream/80 leading-relaxed font-sans italic line-clamp-2">
                        {quickViewProduct.notes}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Brief description body */}
                <p className="text-xs text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed mb-6 font-sans text-justify">
                  {quickViewProduct.description}
                </p>

                {/* Footer Controls */}
                <div className="border-t border-[#181818]/10 dark:border-brand-cream/10 pt-5 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                  <div>
                    <span className="block text-[8px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">{t('valuation')}</span>
                    <span className="font-mono-data text-lg font-bold text-brand-charcoal dark:text-brand-cream">
                      ${quickViewProduct.price}.00 USD
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    
                    {/* Direct Add Button */}
                    <motion.button
                      id={`quickview-add-cart-${quickViewProduct.id}`}
                      key={`qv-cart-${quickViewProduct.id}-${cartItems.find(ci => ci.product.id === quickViewProduct.id)?.quantity || 0}`}
                      onClick={() => addToCart(quickViewProduct)}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 sm:px-5 py-3.5 bg-brand-terracotta text-brand-cream hover:bg-brand-charcoal dark:hover:bg-brand-cream dark:hover:text-brand-charcoal text-[9px] tracking-widest font-semibold transition-colors duration-300 cursor-pointer uppercase flex items-center justify-center gap-1.5"
                    >
                      {(() => {
                        const item = cartItems.find(ci => ci.product.id === quickViewProduct.id);
                        return item ? `${t('add_more')} (${item.quantity})` : t('add_to_batch');
                      })()}
                      <Plus size={11} />
                    </motion.button>

                    {/* Show deep leaflet specs drawer */}
                    <button
                      id="quickview-specs-link-btn"
                      onClick={() => {
                        const p = quickViewProduct;
                        setQuickViewProductRaw(null);
                        setTimeout(() => {
                          setSelectedProductRaw(p);
                        }, 120);
                      }}
                      className="px-4 py-3.5 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream dark:hover:text-brand-cream text-[9px] tracking-widest font-bold transition-all duration-300 cursor-pointer uppercase whitespace-nowrap border border-transparent"
                    >
                      {t('full_specs')}
                    </button>

                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dynamic Interactive Flavor Profiling Guide */}
        <FlavorGuide addToCart={addToCart} cartItems={cartItems} />

      </div>
    </section>
  );
}

// Simple helper to pair the Arabic titles as original english references when viewed in Arabic to create a gorgeous multi-cultural aesthetic
function productRowTitleEnglish(id: string): string {
  switch (id) {
    case 'cardamom-rose-pecan-granola': return 'Oasis Cardamom & Rose';
    case 'zaatar-premium-artisanal': return 'Royal Hand-Dried Za\'atar';
    case 'aleppo-smoked-pepper-flakes': return 'Heirloom Aleppo Pepper';
    case 'loomi-fermented-black-lime': return 'Fermented Loomi Black Lime';
    case 'rashah-signature-blend': return 'Volcanic Wild Violet Sumac';
    default: return '';
  }
}
