import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Lineup from './components/Lineup';
import Narrative from './components/Narrative';
import Collections from './components/Collections';
import Connect from './components/Connect';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { CartItem, Product } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const [activePage, setActivePage] = useState<'home' | 'collections' | 'connect'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // High-performance client cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rashah-cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to localStorage elegantly
  useEffect(() => {
    localStorage.setItem('rashah-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Propagated drill-down into custom series filters
  const handleSeriesSelect = (category: 'Granola' | 'Single Spices' | 'Curated Blends') => {
    setSelectedCategory(category);
  };

  const handleNavigateToCollections = () => {
    setActivePage('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-charcoal text-brand-charcoal dark:text-brand-cream selection:bg-brand-terracotta selection:text-brand-cream transition-colors duration-400 font-sans flex flex-col justify-between">
      
      <div>
        {/* Navigation Bar Header */}
        <Header 
          activePage={activePage} 
          setActivePage={setActivePage} 
          setSelectedCategory={setSelectedCategory}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />

        {/* Dynamic Pages / Tabs display backed by premium transition layouts */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div
                key="home-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* 1. Hero Block */}
                <Hero onExploreClick={handleNavigateToCollections} />
                
                {/* 2. The Lineup Featured Grid */}
                <Lineup 
                  onSeriesSelect={handleSeriesSelect} 
                  onNavigateToCollections={handleNavigateToCollections} 
                />
                
                {/* 3. Our Brand Narrative Editorial Block */}
                <Narrative />
              </motion.div>
            )}

            {activePage === 'collections' && (
              <motion.div
                key="collections-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                {/* Curated Provision Products with Top Minimal Filter Bar */}
                <Collections 
                  selectedCategory={selectedCategory} 
                  setSelectedCategory={setSelectedCategory} 
                  addToCart={addToCart}
                  cartItems={cartItems}
                />
              </motion.div>
            )}

            {activePage === 'connect' && (
              <motion.div
                key="connect-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                {/* Stockists and Custom inquiry Form view */}
                <Connect />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Shared Premium Magazine Footer Column */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
