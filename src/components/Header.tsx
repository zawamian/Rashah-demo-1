import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, Language } from '../context/LanguageContext';
import { Menu, X, Sun, Moon, Sparkles, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { CartItem, PageId } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  setSelectedCategory: (category: string) => void;
  cartItems: CartItem[];
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export default function Header({ 
  activePage, 
  setActivePage, 
  setSelectedCategory,
  cartItems = [],
  updateQuantity,
  removeFromCart,
  clearCart
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, dir } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutSimulated, setCheckoutSimulated] = useState(false);

  const navLinks: Array<{ id: PageId }> = [
    { id: 'home' },
    { id: 'collections' },
    { id: 'recipes' },
    { id: 'connect' },
  ];

  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleNavClick = (pageId: PageId) => {
    setActivePage(pageId);
    if (pageId === 'collections') {
      setSelectedCategory('All');
    }
    setMobileMenuOpen(false);
  };

  const handleOpenCart = () => {
    setCartOpen(true);
    setCheckoutSimulated(false);
  };

  const handleSimulateCheckout = () => {
    setCheckoutSimulated(true);
  };

  const handleCheckoutClose = () => {
    clearCart();
    setCartOpen(false);
    setCheckoutSimulated(false);
  };

  const removeLabel = language === 'ar' ? 'حذف' : (language === 'tr' ? 'SİL' : 'REMOVE');
  
  const finePrint = language === 'ar'
    ? '* إتمام طلب افتراضي تجريبي. لن يتم خصم مبالغ مالية حقيقية. سيتم معالجة الحجز محلياً لصالح حسابك.'
    : (language === 'tr' ? '* Simüle edilmiş ödeme süreci. Gerçek bir finansal işlem yapılmayacaktır.' : '* Simulated checkout. No financial transactions will be made. Requisition will resolve locally.');

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-brand-cream/80 dark:bg-brand-charcoal/85 backdrop-blur-md border-b border-brand-charcoal/10 dark:border-brand-cream/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Identity */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-3 group text-left cursor-pointer ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}
          >
            <div className="flex flex-col text-left">
              <span className="font-serif text-2xl font-bold tracking-[0.15em] text-brand-charcoal dark:text-brand-cream transition-colors duration-300 leading-none">
                RASHAH
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] text-brand-ochre uppercase font-medium mt-1">
                {t('logo_sub')}
              </span>
            </div>
            <span className="font-serif text-3xl font-normal text-brand-terracotta select-none leading-none pt-1">
              {t('logo_ar')}
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                id={`nav-link-${link.id}`}
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative py-2 text-xs tracking-[0.18em] font-bold text-brand-charcoal/70 dark:text-brand-cream/70 hover:text-brand-charcoal dark:hover:text-brand-cream transition-colors duration-200 cursor-pointer uppercase"
              >
                <span className="block">
                  {t(`nav_${link.id}` as any).split(' — ')[0]}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-brand-terracotta transition-all duration-300 group-hover:w-full" />
                {activePage === link.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-brand-terracotta" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Selector */}
            <div className="flex items-center gap-1 border border-brand-charcoal/10 dark:border-brand-cream/10 px-1.5 py-1 rounded bg-brand-cream/40 dark:bg-brand-charcoal/40 select-none">
              {(['en', 'ar', 'tr'] as const).map((lang) => (
                <button
                  id={`lang-select-${lang}`}
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-[9px] tracking-[0.05em] font-mono-data rounded cursor-pointer transition-all duration-300 uppercase ${
                    language === lang
                      ? 'bg-brand-terracotta text-brand-cream font-bold'
                      : 'text-brand-charcoal/50 dark:text-brand-cream/50 hover:text-brand-charcoal dark:hover:text-brand-cream'
                  }`}
                  title={`${lang.toUpperCase()} Mode`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme Toggler */}
            <button
              id="theme-toggler"
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-terracotta dark:hover:border-brand-terracotta text-brand-charcoal dark:text-brand-cream transition-all duration-300 cursor-pointer flex items-center justify-center"
              title={theme === 'cream' ? 'Switch to Midnight Charcoal' : 'Switch to Organic Cream'}
            >
              {theme === 'cream' ? <Moon size={15} strokeWidth={1.5} /> : <Sun size={15} strokeWidth={1.5} />}
            </button>

            {/* Cart Trigger */}
            <button
              id="desktop-cart-trigger"
              onClick={handleOpenCart}
              className="relative p-2.5 rounded-full border border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-terracotta dark:hover:border-brand-terracotta text-brand-charcoal dark:text-brand-cream transition-all duration-300 cursor-pointer flex items-center justify-center h-10 w-10"
              title="View Cart Provisions"
            >
              <ShoppingBag size={15} strokeWidth={1.5} />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-terracotta text-brand-cream text-[8px] font-mono-data font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </button>
            
            <button 
              id="header-cta-btn"
              onClick={() => handleNavClick('connect')}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta dark:hover:text-brand-cream hover:text-brand-cream text-[10px] tracking-[0.2em] font-semibold transition-all duration-300 border border-transparent"
            >
              {t('nav_cta')}
            </button>
          </div>

          {/* Mobile menu triggers */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              id="mobile-cart-trigger"
              onClick={handleOpenCart}
              className="relative p-2 rounded-full border border-brand-charcoal/10 dark:border-brand-cream/10 text-brand-charcoal dark:text-brand-cream cursor-pointer flex items-center justify-center h-9 w-9"
              title="View Cart Provisions"
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-terracotta text-brand-cream text-[8px] font-mono-data font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button
              id="mobile-theme-toggler"
              onClick={toggleTheme}
              className="p-2 rounded-full border border-brand-charcoal/10 dark:border-brand-cream/10 text-brand-charcoal dark:text-brand-cream cursor-pointer flex items-center justify-center h-9 w-9"
            >
              {theme === 'cream' ? <Moon size={14} strokeWidth={1.5} /> : <Sun size={14} strokeWidth={1.5} />}
            </button>

            <button
              id="mobile-menu-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-charcoal dark:text-brand-cream hover:text-brand-terracotta cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>

        </div>

      </header>

      {/* Mobile Full-Screen Menu Overlay — rendered outside <header> to avoid backdrop-filter
          creating a new containing block for position:fixed, which would collapse the overlay to 0 height */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-x-0 bottom-0 top-20 z-40 bg-brand-cream/95 dark:bg-brand-charcoal/95 backdrop-blur-md transition-all duration-300 border-t border-brand-charcoal/10 dark:border-brand-cream/10 overflow-hidden"
          >
            <div className="h-full flex flex-col justify-between p-6 sm:p-8 gap-6 overflow-y-auto">
              <div className="flex flex-col gap-3 sm:gap-4 pt-1">
                <span className="text-[10px] tracking-[0.3em] text-brand-ochre font-bold block mb-1 uppercase">
                  {t('sections_label')}
                </span>
                {navLinks.map((link) => (
                  <button
                    id={`mobile-nav-link-${link.id}`}
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-baseline justify-between py-2 sm:py-2.5 border-b border-brand-charcoal/5 dark:border-brand-cream/5 text-left cursor-pointer group"
                  >
                    <span className={`font-serif text-xl sm:text-2xl tracking-[0.05em] transition-colors duration-200 uppercase ${activePage === link.id ? 'text-brand-terracotta font-bold' : 'text-brand-charcoal dark:text-brand-cream'}`}>
                      {t(`nav_${link.id}` as any).split(' — ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                {/* Mobile Language Selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.2em] text-brand-ochre font-bold uppercase block">
                    Language / اللغة / Dil
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['en', 'ar', 'tr'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`py-1.5 text-[10px] tracking-[0.1em] font-mono-data rounded cursor-pointer transition-all duration-300 uppercase text-center border ${
                          language === lang
                            ? 'bg-brand-terracotta text-brand-cream border-brand-terracotta font-bold'
                            : 'bg-transparent text-brand-charcoal/60 dark:text-brand-cream/60 border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-terracotta'
                        }`}
                      >
                        {lang === 'en' ? 'ENGLISH' : lang === 'ar' ? 'العربية' : 'TÜRKÇE'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  id="mobile-drawer-cta-btn"
                  onClick={() => handleNavClick('connect')}
                  className="w-full text-center py-3 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-xs tracking-[0.2em] font-semibold hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream transition-all duration-300 cursor-pointer"
                >
                  {t('nav_cta')}
                </button>

                <div className="flex justify-between items-center text-[9px] tracking-[0.1em] text-brand-charcoal/50 dark:text-brand-cream/50 mt-1">
                  <span>{t('meta_footer')}</span>
                  <span className="flex items-center gap-1">
                    <Sparkles size={10} className="text-brand-terracotta" /> {t('meta_sub')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-[55] overflow-hidden flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 190 }}
              className="relative w-full max-w-md sm:max-w-lg h-full bg-brand-cream dark:bg-brand-charcoal border-l border-brand-charcoal/10 dark:border-brand-cream/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 transition-colors duration-300 text-left"
            >
              
              {/* Header */}
              <div>
                <div className={`flex justify-between items-center border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-4 mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <span className="font-serif text-xl font-bold text-brand-charcoal dark:text-brand-cream">
                      {t('provision_bag')}
                    </span>
                    <span className="font-serif text-sm italic text-brand-terracotta">
                      ({totalItemsCount} {totalItemsCount === 1 ? t('item_count') : t('items_count')})
                    </span>
                  </div>
                  <button
                    id="close-cart-btn"
                    onClick={() => setCartOpen(false)}
                    className="p-1 rounded-full text-brand-charcoal dark:text-brand-cream hover:bg-brand-charcoal/5 dark:hover:bg-brand-cream/5 cursor-pointer"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Simulated Checkout Receipt Form */}
                {checkoutSimulated ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50/50 dark:bg-green-950/20 border border-green-500/20 p-6 text-center my-6 rounded"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4">
                      <Check size={24} strokeWidth={2} />
                    </div>
                    <span className="font-serif text-lg font-bold text-green-900 dark:text-green-300 block mb-2 uppercase">
                      {t('dispatch_proxied')}
                    </span>
                    <p className="text-xs text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed max-w-xs mx-auto mb-6 font-sans">
                      {t('bespoke_success')} <strong className="font-mono-data font-bold">${totalPrice}.00 USD</strong>
                    </p>
                    <button
                      id="close-success-btn"
                      onClick={handleCheckoutClose}
                      className="px-6 py-2.5 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[10px] font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream mx-auto block"
                    >
                      {t('close_station')}
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* Cart Items List */}
                    {cartItems.length === 0 ? (
                      <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
                        <ShoppingBag size={30} className="text-brand-charcoal/20 dark:text-brand-cream/20" strokeWidth={1.2} />
                        <div>
                          <p className="font-serif text-sm text-brand-charcoal dark:text-brand-cream font-medium mb-1">
                            {t('empty_bag')}
                          </p>
                        </div>
                        <button
                          id="cart-empty-cta"
                          onClick={() => {
                            setCartOpen(false);
                            handleNavClick('collections');
                          }}
                          className="mt-2 text-[10px] tracking-widest text-brand-terracotta font-mono-data font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {t('explore_btn')} <ArrowRight size={10} className={dir === 'rtl' ? 'rotate-180' : ''} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto pr-1">
                        {cartItems.map((item) => (
                          <div 
                            key={item.product.id}
                            className="flex items-center justify-between gap-4 p-3 border border-brand-charcoal/5 dark:border-brand-cream/5 bg-white/40 dark:bg-brand-charcoal/30 text-left"
                          >
                            {/* Left thumb */}
                            <div className="h-14 w-14 bg-white dark:bg-brand-charcoal/50 rounded p-1 flex items-center justify-center overflow-hidden border border-brand-charcoal/5">
                              <img 
                                src={item.product.image} 
                                alt={item.product.title} 
                                className="object-contain h-full w-full"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Center descriptor */}
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline mb-0.5">
                                <h4 className="font-serif text-sm font-bold text-brand-charcoal dark:text-brand-cream truncate pr-2">
                                  {item.product.title}
                                </h4>
                                <span className="font-mono-data text-xs text-brand-charcoal/70 dark:text-brand-cream/70 whitespace-nowrap">
                                  ${item.product.price * item.quantity}.00
                                </span>
                              </div>
                              <span className="text-[8px] tracking-[0.2em] font-mono-data text-brand-ochre uppercase font-bold block mb-1">
                                {item.product.weight}
                              </span>

                              {/* Quantity Control block */}
                              <div className="flex items-center gap-3 mt-1.5">
                                <div className="flex items-center border border-brand-charcoal/10 dark:border-brand-cream/10">
                                  <button
                                    id={`qty-minus-${item.product.id}`}
                                    onClick={() => updateQuantity(item.product.id, -1)}
                                    className="p-1 text-brand-charcoal/60 dark:text-brand-cream/60 hover:text-brand-terracotta cursor-pointer"
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <span className="px-2 font-mono-data text-xs font-bold text-brand-charcoal dark:text-brand-cream">
                                    {item.quantity}
                                  </span>
                                  <button
                                    id={`qty-plus-${item.product.id}`}
                                    onClick={() => updateQuantity(item.product.id, 1)}
                                    className="p-1 text-brand-charcoal/60 dark:text-brand-cream/60 hover:text-brand-terracotta cursor-pointer"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>

                                <button
                                  id={`remove-item-${item.product.id}`}
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-[9px] font-mono-data text-brand-charcoal/40 dark:text-brand-cream/40 hover:text-brand-terracotta flex items-center gap-1 transition-colors duration-200 cursor-pointer"
                                  title="Delete item"
                                >
                                  <Trash2 size={10} /> {removeLabel}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer pricing segment */}
              {!checkoutSimulated && cartItems.length > 0 && (
                <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-6 mt-6">
                  <div className={`flex justify-between items-baseline mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 uppercase font-mono-data">{t('valuation')}</span>
                    <span className="font-mono-data text-xl font-bold text-brand-charcoal dark:text-brand-cream">
                      ${totalPrice}.00 USD
                    </span>
                  </div>

                  <p className="text-[9px] text-brand-charcoal/50 dark:text-brand-cream/50 mb-4 leading-relaxed font-sans text-justify">
                    {finePrint}
                  </p>

                  <div className={`flex gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <button
                      id="clear-cart-btn"
                      onClick={clearCart}
                      className="px-4 py-4 border border-brand-charcoal/15 dark:border-brand-cream/15 text-brand-charcoal/60 dark:text-brand-cream/60 hover:text-brand-terracotta hover:border-brand-terracotta text-xs tracking-widest font-semibold cursor-pointer transition-colors duration-200"
                    >
                      {t('clear_everything')}
                    </button>
                    <button
                      id="simulate-checkout-btn"
                      onClick={handleSimulateCheckout}
                      className="flex-1 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream dark:hover:text-brand-cream font-semibold py-4 text-center text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {t('proceed_to_secure')} <ArrowRight size={12} className={dir === 'rtl' ? 'rotate-180' : ''} />
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
