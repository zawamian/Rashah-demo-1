import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, Sparkles, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activePage: 'home' | 'collections' | 'connect';
  setActivePage: (page: 'home' | 'collections' | 'connect') => void;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutSimulated, setCheckoutSimulated] = useState(false);

  const navLinks = [
    { id: 'home', label: 'THE JOURNAL', labelAr: 'الرئيسية' },
    { id: 'collections', label: 'COLLECTIONS', labelAr: 'التشكيلات' },
    { id: 'connect', label: 'CONNECT', labelAr: 'تواصل معنا' }
  ] as const;

  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleNavClick = (pageId: 'home' | 'collections' | 'connect') => {
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

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-brand-cream/80 dark:bg-brand-charcoal/85 backdrop-blur-md border-b border-brand-charcoal/10 dark:border-brand-cream/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Identity */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-[0.15em] text-brand-charcoal dark:text-brand-cream transition-colors duration-300">
                RASHAH
              </span>
              <span className="font-sans text-[9px] tracking-[0.3em] text-brand-ochre uppercase font-medium mt-0.5">
                ARTISANAL SPICE & GRAIN
              </span>
            </div>
            <span className="font-serif text-3xl font-normal text-brand-terracotta select-none leading-none pt-1">
              رشة
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                id={`nav-link-${link.id}`}
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative py-2 text-xs tracking-[0.2em] font-medium text-brand-charcoal/70 dark:text-brand-cream/70 hover:text-brand-charcoal dark:hover:text-brand-cream transition-colors duration-200 cursor-pointer"
              >
                <span className="block">{link.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-brand-terracotta transition-all duration-300 group-hover:w-full" />
                {activePage === link.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-brand-terracotta" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggler */}
            <button
              id="theme-toggler"
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-terracotta dark:hover:border-brand-terracotta text-brand-charcoal dark:text-brand-cream transition-all duration-300 cursor-pointer"
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
              STOCKIST INQUIRY
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Cart Trigger */}
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
              className="p-2 rounded-full border border-brand-charcoal/10 dark:border-brand-cream/10 text-brand-charcoal dark:text-brand-cream cursor-pointer"
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

        {/* Mobile Full-Screen Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 bottom-0 top-20 z-40 bg-brand-cream dark:bg-brand-charcoal transition-colors duration-300 border-t border-brand-charcoal/10 dark:border-brand-cream/10 overflow-y-auto">
            <div className="min-h-full flex flex-col justify-between px-6 py-6 sm:px-8 sm:py-8 gap-8">
              <div className="flex flex-col gap-4 sm:gap-6 pt-2">
                <span className="text-[10px] tracking-[0.3em] text-brand-ochre font-bold block mb-1">SECTIONS</span>
                {navLinks.map((link) => (
                  <button
                    id={`mobile-nav-link-${link.id}`}
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-baseline justify-between py-2.5 sm:py-3 border-b border-brand-charcoal/5 dark:border-brand-cream/5 text-left cursor-pointer group"
                  >
                    <span className={`font-serif text-2xl sm:text-3xl tracking-[0.05em] transition-colors duration-200 ${activePage === link.id ? 'text-brand-terracotta' : 'text-brand-charcoal dark:text-brand-cream'}`}>
                      {link.label}
                    </span>
                    <span className="font-serif text-lg sm:text-xl text-brand-charcoal/40 dark:text-brand-cream/40">
                      {link.labelAr}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-5 sm:gap-6 mt-auto">
                <button
                  id="mobile-drawer-cta-btn"
                  onClick={() => handleNavClick('connect')}
                  className="w-full text-center py-3.5 sm:py-4 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-xs tracking-[0.2em] font-semibold hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream transition-all duration-300"
                >
                  STOCKIST INQUIRY
                </button>
                
                <div className="flex justify-between items-center text-[9px] sm:text-[10px] tracking-[0.1em] text-brand-charcoal/50 dark:text-brand-cream/50">
                  <span>RASHAH © Riyadh, KSA</span>
                  <span className="flex items-center gap-1"><Sparkles size={10} className="text-brand-terracotta" /> COARSE & REFINED</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Shopping Cart Drawer Backdrop & Drawer Panel */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-55 overflow-hidden flex items-center justify-end">
            {/* Dark interactive overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Moving Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 190 }}
              className="relative w-full max-w-md sm:max-w-lg h-full bg-brand-cream dark:bg-brand-charcoal border-l border-brand-charcoal/10 dark:border-brand-cream/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 transition-colors duration-300"
            >
              
              {/* Header block */}
              <div>
                <div className="flex justify-between items-center border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl font-bold text-brand-charcoal dark:text-brand-cream">
                      Curated Cart
                    </span>
                    <span className="font-serif text-sm italic text-brand-terracotta">
                      ({totalItemsCount} {totalItemsCount === 1 ? 'provision' : 'provisions'})
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
                    <span className="font-serif text-lg font-bold text-green-900 dark:text-green-300 block mb-2">
                      SIMULATION DISPATCHED
                    </span>
                    <p className="text-xs text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed max-w-xs mx-auto mb-6 font-sans">
                      A simulated requisition totaling <strong className="font-mono-data font-bold">${totalPrice}.00 USD</strong> has been received at the Rashah lab script. No actual payment has been processed. 
                    </p>
                    <button
                      id="close-success-btn"
                      onClick={handleCheckoutClose}
                      className="px-6 py-2.5 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[10px] font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream"
                    >
                      CURATE A NEW BATCH
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
                            Your carriage is empty
                          </p>
                          <p className="text-[10px] text-brand-charcoal/50 dark:text-brand-cream/50 max-w-xs leading-relaxed font-sans">
                            Explore our premium spice & grain lineup to start curating your culinary selection.
                          </p>
                        </div>
                        <button
                          id="cart-empty-cta"
                          onClick={() => {
                            setCartOpen(false);
                            handleNavClick('collections');
                          }}
                          className="mt-2 text-[10px] tracking-widest text-brand-terracotta font-mono-data font-semibold hover:underline flex items-center gap-1"
                        >
                          OPEN CATALOGUE <ArrowRight size={10} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto pr-1">
                        {cartItems.map((item) => (
                          <div 
                            key={item.product.id}
                            className="flex items-center justify-between gap-4 p-3 border border-brand-charcoal/5 dark:border-brand-cream/5 bg-white/40 dark:bg-brand-charcoal/30"
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
                                  <Trash2 size={10} /> REMOVE
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
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-[10px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 uppercase font-mono-data">TOTAL VALUATION</span>
                    <span className="font-mono-data text-xl font-bold text-brand-charcoal dark:text-brand-cream">
                      ${totalPrice}.00 USD
                    </span>
                  </div>

                  <p className="text-[9px] text-brand-charcoal/50 dark:text-brand-cream/50 mb-4 leading-relaxed font-sans">
                    * Simulated checkout. No financial transactions will be made. Requisition will resolve locally to state flags.
                  </p>

                  <div className="flex gap-3">
                    <button
                      id="clear-cart-btn"
                      onClick={clearCart}
                      className="px-4 py-4 border border-brand-charcoal/15 dark:border-brand-cream/15 text-brand-charcoal/60 dark:text-brand-cream/60 hover:text-brand-terracotta hover:border-brand-terracotta text-xs tracking-widest font-semibold cursor-pointer transition-colors duration-200"
                    >
                      RESET
                    </button>
                    <button
                      id="simulate-checkout-btn"
                      onClick={handleSimulateCheckout}
                      className="flex-1 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal hover:bg-brand-terracotta dark:hover:bg-brand-terracotta hover:text-brand-cream dark:hover:text-brand-cream font-semibold py-4 text-center text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      SIMULATE DISPATCH <ArrowRight size={12} />
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
