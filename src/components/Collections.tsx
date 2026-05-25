import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsApi } from '../data/products';
import { Product, ProductCategory, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Scale, Shield, Tag, Sparkles, X, ChevronRight, Plus, FileText, Globe, Heart } from 'lucide-react';
import FlavorGuide from './FlavorGuide';

interface CollectionsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  addToCart: (product: Product) => void;
  cartItems: CartItem[];
}

export default function Collections({ selectedCategory, setSelectedCategory, addToCart, cartItems }: CollectionsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
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
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProductsApi(selectedCategory),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const categories = ['All', 'Granola', 'Single Spices', 'Curated Blends'] as const;

  return (
    <section className="w-full py-16 sm:py-24 bg-brand-cream dark:bg-brand-charcoal transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Page Head */}
        <div className="text-center md:text-left mb-12 border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="font-mono-data text-[10px] tracking-[0.3em] text-brand-ochre uppercase font-bold block mb-2">PROVISIONS CATALOGUE</span>
            <h2 id="collections-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-charcoal dark:text-brand-cream">
              The Collections.
            </h2>
          </div>
          <span className="font-mono-data text-[10px] tracking-[0.1em] text-brand-charcoal/50 dark:text-brand-cream/50 uppercase">
            {products.length} BATCHES DISCOVERED
          </span>
        </div>

        {/* Minimalist Top Filter Bar */}
        <div className="flex overflow-x-auto gap-4 border-b border-brand-charcoal/5 dark:border-brand-cream/5 pb-6 scrollbar-none mb-12">
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
              {cat === 'All' ? 'ALL PROVISIONS' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Loading and Error States via TanStack Query */}
        {isLoading && (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-brand-ochre border-t-transparent animate-spin" />
            <span className="font-mono-data text-[10px] tracking-[0.2em] text-brand-charcoal/50">RETRIEVING ARTIFACTS...</span>
          </div>
        )}

        {isError && (
          <div className="w-full py-20 text-center text-brand-terracotta">
            <p className="font-serif text-lg">Failed to retrieve product batches.</p>
            <span className="text-xs">Please verify connection or settings.</span>
          </div>
        )}

        {/* Pristine Product Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

                  {/* Image container with strict 1.02x scale zoom on hover */}
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
                        FEAT. SPOT
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
                      title={wishlist.includes(product.id) ? 'Remove from Saved' : 'Save Item'}
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
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-serif text-lg font-bold text-brand-charcoal dark:text-brand-cream group-hover:text-brand-terracotta transition-colors duration-200">
                        {product.title}
                      </h3>
                      <span className="font-serif italic text-sm text-brand-terracotta whitespace-nowrap ml-2">
                        {product.arabicTitle}
                      </span>
                    </div>

                    <span className="block text-[10px] tracking-[0.25em] text-brand-ochre font-bold uppercase font-mono-data mb-3">
                      {product.subtitle}
                    </span>

                    <p className="text-xs text-brand-charcoal/65 dark:text-brand-cream/65 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-6">
                      {product.description}
                    </p>
                  </div>

                  {/* CTA Footer with direct button background transition */}
                  <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-4 mt-2 flex items-center justify-between">
                    <div>
                      <span className="block text-[8px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">INVESTMENT</span>
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
                        animate={{ scale: [1, 1.12, 0.98, 1.02, 1] }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="group flex items-center gap-1.5 px-4 py-2 bg-brand-terracotta hover:bg-brand-charcoal dark:hover:bg-brand-cream text-brand-cream dark:hover:text-brand-charcoal text-[10px] font-semibold tracking-widest transition-colors duration-300 cursor-pointer uppercase"
                        aria-label={`Add ${product.title} to batch`}
                      >
                        {(() => {
                          const item = cartItems.find(ci => ci.product.id === product.id);
                          return item ? `ADD MORE (${item.quantity})` : 'ADD TO BATCH';
                        })()}
                        <Plus size={11} />
                      </motion.button>

                      <button
                        id={`quick-view-${product.id}`}
                        onClick={() => setQuickViewProduct(product)}
                        className="group flex items-center justify-center p-2.5 bg-brand-charcoal/5 dark:bg-brand-cream/5 text-brand-charcoal dark:text-brand-cream hover:bg-brand-terracotta hover:text-brand-cream dark:hover:bg-brand-terracotta dark:hover:text-brand-cream transition-all duration-300 cursor-pointer animate-fade-in"
                        title="Quick View"
                      >
                        <Eye size={13} />
                      </button>

                      <button
                        id={`view-details-${product.id}`}
                        onClick={() => setSelectedProduct(product)}
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

        {/* Detailed Sheet Backdrop & Drawer for Specific Product Inspection */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-end">
              
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-black"
              />

              {/* Slide-over Panel (Drawer) */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                className="relative w-full max-w-lg md:max-w-xl h-full bg-brand-cream dark:bg-brand-charcoal border-l border-brand-charcoal/10 dark:border-brand-cream/10 p-8 sm:p-10 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 transition-colors duration-300"
              >
                <div>
                  
                  {/* Close header */}
                  <div className="flex justify-between items-center border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-4 mb-8">
                    <span className="font-mono-data text-[10px] tracking-[0.25em] text-brand-ochre font-extrabold uppercase">
                      SPECIFICATION LEAFLET: {selectedProduct.subtitle}
                    </span>
                    <button
                      id="close-drawer-btn"
                      onClick={() => setSelectedProduct(null)}
                      className="p-1 rounded-full text-brand-charcoal dark:text-brand-cream hover:bg-brand-charcoal/5 dark:hover:bg-brand-cream/5 cursor-pointer"
                    >
                      <X size={20} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Graphic layout inside drawer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 items-center bg-white dark:bg-brand-charcoal/40 p-4 border border-brand-charcoal/5">
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
                        {selectedProduct.arabicTitle}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-brand-charcoal dark:text-brand-cream">
                        {selectedProduct.title}
                      </h3>
                      <div className="flex items-center gap-4 text-[10px] font-mono-data tracking-widest text-brand-charcoal/60 dark:text-brand-cream/60 uppercase mt-2">
                        <span>NET {selectedProduct.weight}</span>
                        <span>ORIGIN: {selectedProduct.origin}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deep Full Description */}
                  <div className="mb-8 p-4 bg-brand-cream/40 dark:bg-brand-charcoal/20 border-l-2 border-brand-terracotta">
                    <p className="font-serif text-xs sm:text-sm text-brand-charcoal dark:text-brand-cream italic leading-relaxed">
                      "{selectedProduct.fullDescription}"
                    </p>
                  </div>

                  {/* Ingredients block */}
                  <div className="mb-8">
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block mb-3">
                      CONSTITUENTS & INGREDIENTS:
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
                  <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-6">
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block mb-2 flex items-center gap-1.5">
                      <Sparkles size={11} className="text-brand-terracotta" /> PALATE & SERVICE NOTES:
                    </span>
                    <p className="text-xs text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed font-sans">
                      {selectedProduct.notes}
                    </p>
                  </div>

                </div>

                {/* Footer with actions inside drawer */}
                <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-[8px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">VALUATION</span>
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
                      animate={{ scale: [1, 1.12, 0.98, 1.02, 1] }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="flex-1 sm:px-6 py-4 bg-brand-terracotta text-brand-cream hover:bg-brand-charcoal dark:hover:bg-brand-cream dark:hover:text-brand-charcoal text-xs tracking-widest font-semibold transition-colors duration-300 cursor-pointer uppercase flex items-center justify-center gap-2"
                    >
                      {(() => {
                        const item = cartItems.find(ci => ci.product.id === selectedProduct.id);
                        return item ? `ADD MORE (${item.quantity})` : 'ADD TO BATCH';
                      })()}
                      <Plus size={13} />
                    </motion.button>

                    <button
                      id="drawer-inquiry-btn"
                      onClick={() => {
                        setSelectedProduct(null);
                        // Deep link into Connect
                        const connBtn = document.getElementById('nav-link-connect') || document.getElementById('mobile-nav-link-connect');
                        if (connBtn) {
                          connBtn.click();
                        }
                      }}
                      className="flex-1 sm:px-6 py-4 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream dark:hover:text-brand-cream text-xs tracking-widest font-semibold transition-all duration-300 cursor-pointer"
                    >
                      INQUIRE BATCH
                    </button>
                  </div>
                </div>

              </motion.div>

            </div>
          )}
        </AnimatePresence>

        {/* Brand New Quick View Centered Dialog Modal */}
        <AnimatePresence>
          {quickViewProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setQuickViewProduct(null)}
                className="absolute inset-0 bg-brand-charcoal/80 dark:bg-black/85 backdrop-blur-xs cursor-pointer"
              />

              {/* Centered Premium Dialog Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 15 }}
                transition={{ type: "spring", damping: 24, stiffness: 210 }}
                className="relative w-full max-w-lg bg-brand-cream dark:bg-brand-charcoal border border-brand-charcoal/15 dark:border-brand-cream/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-10 overflow-hidden rounded-md transition-colors duration-300"
              >
                {/* Decorative background texture bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-ochre via-brand-terracotta to-brand-ochre" />

                {/* Close Button */}
                <button
                  id="close-quickview-btn"
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full text-brand-charcoal/50 dark:text-brand-cream/50 hover:text-brand-terracotta hover:bg-brand-charcoal/5 dark:hover:bg-brand-cream/5 transition-colors duration-200 cursor-pointer"
                  title="Close Modal"
                >
                  <X size={16} />
                </button>

                {/* Header Information */}
                <div className="mb-5 pr-6">
                  <span className="font-mono-data text-[9px] tracking-[0.25em] text-brand-ochre font-bold uppercase block mb-1">
                    QUICK BATCH INSIGHT
                  </span>
                  <div className="flex justify-between items-baseline gap-2 flex-wrap sm:flex-nowrap">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal dark:text-brand-cream leading-tight">
                      {quickViewProduct.title}
                    </h3>
                    <span className="font-serif italic text-base sm:text-lg text-brand-terracotta whitespace-nowrap">
                      {quickViewProduct.arabicTitle}
                    </span>
                  </div>
                  <p className="text-[10px] text-brand-charcoal/50 dark:text-brand-cream/50 tracking-wider uppercase font-mono-data mt-1">
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

                  {/* High Quality Condensed Details */}
                  <div className="sm:col-span-8 flex flex-col justify-between gap-4">
                    <div className="space-y-2.5">
                      
                      {/* Origin Segment */}
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-6 h-6 rounded bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta shrink-0">
                          <Globe size={12} />
                        </div>
                        <div>
                          <span className="block text-[8px] text-brand-charcoal/40 dark:text-brand-cream/40 font-mono-data uppercase tracking-widest leading-none">TERROIR / ORIGIN</span>
                          <strong className="text-brand-charcoal dark:text-brand-cream font-bold text-xs">
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
                          <span className="block text-[8px] text-brand-charcoal/40 dark:text-brand-cream/40 font-mono-data uppercase tracking-widest leading-none">NET WEIGHT</span>
                          <strong className="text-brand-charcoal dark:text-brand-cream font-bold text-xs">
                            {quickViewProduct.weight}
                          </strong>
                        </div>
                      </div>

                    </div>

                    {/* Palate Notes Teaser */}
                    <div className="bg-brand-charcoal/5 dark:bg-brand-cream/5 p-3 border-l-2 border-brand-ochre">
                      <span className="font-mono-data text-[8px] tracking-widest text-brand-ochre font-extrabold uppercase block mb-1 flex items-center gap-1">
                        <Sparkles size={10} className="text-brand-terracotta" /> HERITAGE TASTING NOTES
                      </span>
                      <p className="text-[11px] text-brand-charcoal/80 dark:text-brand-cream/80 leading-relaxed font-sans italic line-clamp-2">
                        {quickViewProduct.notes}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Brief description body excerpt */}
                <p className="text-xs text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed mb-6 font-sans">
                  {quickViewProduct.description}
                </p>

                {/* Footer Controls */}
                <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-5 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                  <div>
                    <span className="block text-[8px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">VALUATION</span>
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
                      animate={{ scale: [1, 1.1, 0.97, 1.02, 1] }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="flex-1 sm:px-5 py-3.5 bg-brand-terracotta text-brand-cream hover:bg-brand-charcoal dark:hover:bg-brand-cream dark:hover:text-brand-charcoal text-[9px] tracking-widest font-semibold transition-colors duration-300 cursor-pointer uppercase flex items-center justify-center gap-1.5"
                    >
                      {(() => {
                        const item = cartItems.find(ci => ci.product.id === quickViewProduct.id);
                        return item ? `ADD MORE (${item.quantity})` : 'ADD TO BATCH';
                      })()}
                      <Plus size={11} />
                    </motion.button>

                    {/* Link to show the deeper structural Specs leaf drawer */}
                    <button
                      id="quickview-specs-link-btn"
                      onClick={() => {
                        const p = quickViewProduct;
                        setQuickViewProduct(null);
                        setTimeout(() => {
                          setSelectedProduct(p);
                        }, 120);
                      }}
                      className="px-4 py-3.5 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream dark:hover:text-brand-cream text-[9px] tracking-widest font-bold transition-all duration-300 cursor-pointer uppercase whitespace-nowrap border border-transparent"
                    >
                      FULL SPECS
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
