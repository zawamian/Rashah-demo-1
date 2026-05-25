import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Plus, Flame, Leaf, Coffee, Wine, Award, Check } from 'lucide-react';
import { Product, CartItem } from '../types';
import { products } from '../data/products';

interface FlavorGuideProps {
  addToCart: (product: Product) => void;
  cartItems: CartItem[];
}

interface ProfileItem {
  id: string;
  name: string;
  arabicName: string;
  subtitle: string;
  category: 'Single Spices' | 'Curated Blends';
  description: string;
  pairings: string[];
  keyNotes: string[];
  ratings: {
    aromatics: number; // percentage
    acidity: number;
    earthiness: number;
    heat: number;
    sweetness: number;
  };
  recommendsProductId: string; // real product ID from products list
  sensoryDescriptors: string;
}

const PROFILE_DATA: ProfileItem[] = [
  {
    id: 'halaby-pepper',
    name: 'Heirloom Aleppo Pepper',
    arabicName: 'الفلفل الحلبي المدخن',
    subtitle: 'Sun-cured & slow cold-smoked over hickory',
    category: 'Single Spices',
    description: 'An exceptionally smooth pepper pulp that preserves native oil content, offering a bright, raisin-like fruity sweet body paired with a gentle, building tongue warmth.',
    pairings: ['Fried free-range eggs on labneh', 'Charred broccoli florets with cold oil', 'Whipped goat cheese crostini', 'Spiced dark chocolate ganache'],
    keyNotes: ['Fruity Citrus', 'Subtle Hickory Smoke', 'Soft Raisin', 'Mild Capsicum warmth'],
    ratings: {
      aromatics: 85,
      acidity: 45,
      earthiness: 55,
      heat: 60,
      sweetness: 40
    },
    recommendsProductId: 'aleppo-smoked-pepper-flakes',
    sensoryDescriptors: 'WARM • FRUITY • BALANCED'
  },
  {
    id: 'volcanic-sumac',
    name: 'Volcanic Wild Violet Sumac',
    arabicName: 'السماق البري الفاخر',
    subtitle: 'High-altitude wild sumac collected on volcanic slopes',
    category: 'Single Spices',
    description: 'A sharp, citric, mineral-dense crimson sprinkle. The volcanic soil gives it a signature tart, saline depth that instantly awakens salivary glands.',
    pairings: ['Heirloom tomatoes sprinkled with olive oil', 'Creamy labneh dipping platters', 'Grilled halloumi cheese layers', 'Crisp fresh flatbreads'],
    keyNotes: ['Volcanic Sour', 'Citric acid spike', 'Mineral salinity', 'Plum undertones'],
    ratings: {
      aromatics: 75,
      acidity: 95,
      earthiness: 65,
      heat: 5,
      sweetness: 20
    },
    recommendsProductId: 'rashah-signature-blend',
    sensoryDescriptors: 'TART • SALINE • VIBRANT'
  },
  {
    id: 'sun-loomi',
    name: 'Fermented Loomi Black Lime',
    arabicName: 'اللومي الأسود الفاخر',
    subtitle: 'Carbonized field limes cured in the hot desert sands',
    category: 'Single Spices',
    description: 'An ancient citrus preservation method that translates fresh green lime juice into a rich, fermented, musky citrus flavor with deep wooden barrel notes.',
    pairings: ['Rich lamb and tomato stews', 'Basmati rice with saffron pillars', 'Oven-roasted whole sea bass', 'Complex root vegetable baking sheets'],
    keyNotes: ['Fermented Musk', 'Concentrated Lime Acid', 'Smoky cedar', 'Umami undertone'],
    ratings: {
      aromatics: 80,
      acidity: 90,
      earthiness: 85,
      heat: 0,
      sweetness: 10
    },
    recommendsProductId: 'loomi-fermented-black-lime',
    sensoryDescriptors: 'EARTHY-CITRUS • MUSKY • ESSENTIAL'
  },
  {
    id: 'royal-zaatar',
    name: 'Royal Hand-Dried Za\'atar',
    arabicName: 'الزعتر الملكي الفاخر',
    subtitle: 'Calcareous wild thyme with white sesame oil infusion',
    category: 'Curated Blends',
    description: 'Our ultimate heritage green blend. Balanced by rich nutty fats, high-oil hand-rolled wild oregano thyme, and premium sharp sumac to balance the oil.',
    pairings: ['Warm sourdough dipped in olive oil', 'Whole roasted free-range organic chicken', 'Fresh cucumber and mint sliced salads', 'Baked flatbread flat dough pastries'],
    keyNotes: ['Pungent Herbaceous', 'Toasted sesame fat', 'Volcanic background zing', 'Spiced pine resin'],
    ratings: {
      aromatics: 95,
      acidity: 60,
      earthiness: 75,
      heat: 5,
      sweetness: 15
    },
    recommendsProductId: 'zaatar-premium-artisanal',
    sensoryDescriptors: 'HERBACEOUS • NUTTY • FRAGRANT'
  },
  {
    id: 'cardamom-rose',
    name: 'Oasis Cardamom & Rose Fusion',
    arabicName: 'الهيل والورد الجوري',
    subtitle: 'Stone-shattered green cardamom with Najdi Damask buds',
    category: 'Curated Blends',
    description: 'A luxurious grain-series blend that unites warm floral camphor and botanical rose aromatics. Dehydrated slowly with sweet syrups for custom, delicate crunch.',
    pairings: ['Warm golden milk lattes', 'Thick organic Greek or goat yogurt', 'Overnight activated chia seeds', 'Dessert fruit skewers in honey syrup'],
    keyNotes: ['Flowery Camphor', 'Sweet desert honeycomb', 'Toasted pecans', 'Damask rose essence'],
    ratings: {
      aromatics: 95,
      acidity: 10,
      earthiness: 35,
      heat: 10,
      sweetness: 80
    },
    recommendsProductId: 'cardamom-rose-pecan-granola',
    sensoryDescriptors: 'FLORAL • WARM • BOTANICAL'
  }
];

export default function FlavorGuide({ addToCart, cartItems }: FlavorGuideProps) {
  const [selectedSubCat, setSelectedSubCat] = useState<'Single Spices' | 'Curated Blends'>('Single Spices');
  const [selectedItem, setSelectedItem] = useState<ProfileItem>(
    PROFILE_DATA.find(item => item.category === 'Single Spices') || PROFILE_DATA[0]
  );
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const filteredItems = PROFILE_DATA.filter(item => item.category === selectedSubCat);

  const handleCategorySwitch = (cat: 'Single Spices' | 'Curated Blends') => {
    setSelectedSubCat(cat);
    const firstOfCat = PROFILE_DATA.find(item => item.category === cat);
    if (firstOfCat) {
      setSelectedItem(firstOfCat);
    }
  };

  // Find corresponding product to fetch pricing/inventory details if available
  const pairedProduct = products.find(p => p.id === selectedItem.recommendsProductId);
  const isInCart = pairedProduct ? cartItems.find(ci => ci.product.id === pairedProduct.id) : null;

  return (
    <div className="mt-20 border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-16 font-sans">
      
      {/* Container Header */}
      <div className="text-center mb-12">
        <span className="font-mono-data text-[10px] tracking-[0.3em] text-brand-ochre uppercase font-bold block mb-2">
          THE PALATE SCIENCE
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-charcoal dark:text-brand-cream">
          Interactive Flavor Profiling
        </h3>
        <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 max-w-xl mx-auto mt-2 leading-relaxed">
          Culinary synergy is born of precise contrast and calibration. Choose a library profile below to explore core flavor notes, sensory evaluations, and curated pairings.
        </p>
      </div>

      {/* Main interactive grid card layout */}
      <div className="bg-brand-cream/50 dark:bg-brand-charcoal/40 border border-brand-charcoal/10 dark:border-brand-cream/10 rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* LEFT COLUMN: Library list controller */}
        <div className="lg:col-span-5 border-r border-brand-charcoal/10 dark:border-brand-cream/10 p-6 sm:p-8 flex flex-col justify-between bg-brand-cream/20 dark:bg-brand-charcoal/20">
          <div>
            {/* Category Toggle buttons */}
            <div className="flex gap-2 mb-6 p-1 bg-brand-charcoal/5 dark:bg-brand-cream/5 rounded">
              <button
                id="toggle-single-spices"
                onClick={() => handleCategorySwitch('Single Spices')}
                className={`flex-1 text-center py-2.5 text-[9px] tracking-widest font-semibold uppercase transition-all duration-300 cursor-pointer ${
                  selectedSubCat === 'Single Spices'
                    ? 'bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal shadow-sm'
                    : 'text-brand-charcoal/50 dark:text-brand-cream/50 hover:text-brand-charcoal dark:hover:text-brand-cream'
                }`}
              >
                SINGLE SPICES
              </button>
              <button
                id="toggle-curated-blends"
                onClick={() => handleCategorySwitch('Curated Blends')}
                className={`flex-1 text-center py-2.5 text-[9px] tracking-widest font-semibold uppercase transition-all duration-300 cursor-pointer ${
                  selectedSubCat === 'Curated Blends'
                    ? 'bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal shadow-sm'
                    : 'text-brand-charcoal/50 dark:text-brand-cream/50 hover:text-brand-charcoal dark:hover:text-brand-cream'
                }`}
              >
                CURATED BLENDS
              </button>
            </div>

            {/* Profile items selector list */}
            <span className="font-mono-data text-[9px] tracking-widest text-brand-ochre uppercase font-bold block mb-3">
              SELECT RAW SPECIMEN ({filteredItems.length})
            </span>
            <div className="flex flex-col gap-2">
              {filteredItems.map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <button
                    id={`profile-selector-${item.id}`}
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left p-4 border transition-all duration-300 cursor-pointer flex justify-between items-center group relative ${
                      isSelected
                        ? 'bg-white dark:bg-brand-charcoal/80 border-brand-terracotta text-brand-charcoal dark:text-brand-cream pl-6'
                        : 'bg-transparent border-brand-charcoal/5 dark:border-brand-cream/5 text-brand-charcoal/70 dark:text-brand-cream/70 hover:border-brand-charcoal/20 dark:hover:border-brand-cream/20 hover:bg-white/40 dark:hover:bg-brand-charcoal/10'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-terracotta" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-bold block">
                          {item.name}
                        </span>
                        <span className="font-serif text-xs italic text-brand-terracotta translate-y-0.5">
                          {item.arabicName}
                        </span>
                      </div>
                      <span className="text-[9px] text-brand-charcoal/50 dark:text-brand-cream/50 font-sans mt-1 block">
                        {item.sensoryDescriptors}
                      </span>
                    </div>
                    <span className={`text-[10px] tracking-widest font-semibold transition-transform duration-300 ${
                      isSelected ? 'text-brand-terracotta translate-x-1' : 'text-brand-charcoal/30 dark:text-brand-cream/30 group-hover:translate-x-1'
                    }`}>
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick aesthetic badge */}
          <div className="mt-8 border-t border-brand-charcoal/5 dark:border-brand-cream/5 pt-4 hidden lg:flex items-center gap-2.5">
            <Award size={16} className="text-brand-terracotta" />
            <span className="text-[9px] tracking-widest font-mono-data text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">
              DECLARED ORGANIC & IRRADIATED FREE
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Viewer Canvas */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.35 }}
              className="flex-grow flex flex-col justify-between h-full"
            >
              <div>
                {/* Header card with name and arabic text */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-4 mb-6">
                  <div>
                    <span className="font-serif text-2xl font-light text-brand-terracotta block">
                      {selectedItem.arabicName}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal dark:text-brand-cream">
                      {selectedItem.name}
                    </h4>
                    <p className="text-[10px] text-brand-ochre font-bold tracking-[0.05em] uppercase font-mono-data mt-1">
                      {selectedItem.subtitle}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-brand-charcoal/5 dark:bg-brand-cream/5 border border-brand-charcoal/10 dark:border-brand-cream/10 text-[9px] tracking-widest text-brand-charcoal/70 dark:text-brand-cream/70 font-bold uppercase rounded self-start sm:self-auto">
                    {selectedItem.category}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-brand-charcoal dark:text-brand-cream italic leading-relaxed mb-6 bg-white/45 dark:bg-brand-charcoal/30 border-l-2 border-brand-ochre p-4">
                  "{selectedItem.description}"
                </p>

                {/* SENSORY SPECTRUM SLIDERS */}
                <div className="mb-6">
                  <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block mb-4 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-brand-terracotta" /> SENSORY COMPASS PROFILES
                  </span>

                  <div className="space-y-4 bg-brand-charcoal/5 dark:bg-brand-cream/5 p-4 rounded border border-brand-charcoal/5">
                    
                    {/* Aromatics */}
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar('aromatics')}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex justify-between items-baseline text-[10px] mb-1.5 font-mono-data">
                        <span className="text-brand-charcoal/70 dark:text-brand-cream/70 transition-colors duration-200 group-hover:text-brand-terracotta">Aromatic Herbaceous Lift</span>
                        <span className="text-brand-terracotta font-bold">{selectedItem.ratings.aromatics}%</span>
                      </div>
                      <div className="h-2 bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedItem.ratings.aromatics}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-brand-ochre rounded-full"
                        />
                        <AnimatePresence>
                          {hoveredBar === 'aromatics' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: -28 }}
                              exit={{ opacity: 0, scale: 0.85, y: -5 }}
                              transition={{ type: "spring", damping: 15, stiffness: 250 }}
                              style={{ left: `${selectedItem.ratings.aromatics}%` }}
                              className="absolute -translate-x-1/2 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[9px] font-mono-data font-semibold px-2.5 py-1 rounded shadow-lg border border-brand-ochre/30 whitespace-nowrap z-30"
                            >
                              {selectedItem.ratings.aromatics}% Lift
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-charcoal dark:border-t-brand-cream" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Acidity */}
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar('acidity')}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex justify-between items-baseline text-[10px] mb-1.5 font-mono-data">
                        <span className="text-brand-charcoal/70 dark:text-brand-cream/70 transition-colors duration-200 group-hover:text-brand-terracotta">Citrus Tang / Acid</span>
                        <span className="text-brand-terracotta font-bold">{selectedItem.ratings.acidity}%</span>
                      </div>
                      <div className="h-2 bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedItem.ratings.acidity}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-yellow-500 rounded-full"
                        />
                        <AnimatePresence>
                          {hoveredBar === 'acidity' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: -28 }}
                              exit={{ opacity: 0, scale: 0.85, y: -5 }}
                              transition={{ type: "spring", damping: 15, stiffness: 250 }}
                              style={{ left: `${selectedItem.ratings.acidity}%` }}
                              className="absolute -translate-x-1/2 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[9px] font-mono-data font-semibold px-2.5 py-1 rounded shadow-lg border border-brand-ochre/30 whitespace-nowrap z-30"
                            >
                              {selectedItem.ratings.acidity}% Acid
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-charcoal dark:border-t-brand-cream" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Earthiness */}
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar('earthiness')}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex justify-between items-baseline text-[10px] mb-1.5 font-mono-data">
                        <span className="text-brand-charcoal/70 dark:text-brand-cream/70 transition-colors duration-200 group-hover:text-brand-terracotta">Earthy Mineral Depth</span>
                        <span className="text-brand-terracotta font-bold">{selectedItem.ratings.earthiness}%</span>
                      </div>
                      <div className="h-2 bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedItem.ratings.earthiness}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-brand-charcoal dark:bg-brand-cream rounded-full"
                        />
                        <AnimatePresence>
                          {hoveredBar === 'earthiness' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: -28 }}
                              exit={{ opacity: 0, scale: 0.85, y: -5 }}
                              transition={{ type: "spring", damping: 15, stiffness: 250 }}
                              style={{ left: `${selectedItem.ratings.earthiness}%` }}
                              className="absolute -translate-x-1/2 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[9px] font-mono-data font-semibold px-2.5 py-1 rounded shadow-lg border border-brand-ochre/30 whitespace-nowrap z-30"
                            >
                              {selectedItem.ratings.earthiness}% Depth
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-charcoal dark:border-t-brand-cream" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Heat */}
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar('heat')}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex justify-between items-baseline text-[10px] mb-1.5 font-mono-data">
                        <span className="text-brand-charcoal/70 dark:text-brand-cream/70 transition-colors duration-200 group-hover:text-brand-terracotta">Capsicum Spark / Heat</span>
                        <span className="text-brand-terracotta font-bold">{selectedItem.ratings.heat}%</span>
                      </div>
                      <div className="h-2 bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedItem.ratings.heat}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-brand-terracotta rounded-full"
                        />
                        <AnimatePresence>
                          {hoveredBar === 'heat' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: -28 }}
                              exit={{ opacity: 0, scale: 0.85, y: -5 }}
                              transition={{ type: "spring", damping: 15, stiffness: 250 }}
                              style={{ left: `${selectedItem.ratings.heat}%` }}
                              className="absolute -translate-x-1/2 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[9px] font-mono-data font-semibold px-2.5 py-1 rounded shadow-lg border border-brand-ochre/30 whitespace-nowrap z-30"
                            >
                              {selectedItem.ratings.heat}% Heat
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-charcoal dark:border-t-brand-cream" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Sweetness */}
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar('sweetness')}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex justify-between items-baseline text-[10px] mb-1.5 font-mono-data">
                        <span className="text-brand-charcoal/70 dark:text-brand-cream/70 transition-colors duration-200 group-hover:text-brand-terracotta">Sweet Raisin/Honey undertone</span>
                        <span className="text-brand-terracotta font-bold">{selectedItem.ratings.sweetness}%</span>
                      </div>
                      <div className="h-2 bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedItem.ratings.sweetness}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-orange-400 rounded-full"
                        />
                        <AnimatePresence>
                          {hoveredBar === 'sweetness' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: -28 }}
                              exit={{ opacity: 0, scale: 0.85, y: -5 }}
                              transition={{ type: "spring", damping: 15, stiffness: 250 }}
                              style={{ left: `${selectedItem.ratings.sweetness}%` }}
                              className="absolute -translate-x-1/2 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[9px] font-mono-data font-semibold px-2.5 py-1 rounded shadow-lg border border-brand-ochre/30 whitespace-nowrap z-30"
                            >
                              {selectedItem.ratings.sweetness}% Sweet
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-charcoal dark:border-t-brand-cream" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                  </div>
                </div>

                {/* BEST PAIRINGS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block mb-2.5 flex items-center gap-1">
                      <Leaf size={11} className="text-emerald-600" /> HERBACEOUS NOTES
                    </span>
                    <ul className="space-y-1.5">
                      {selectedItem.keyNotes.map((note, idx) => (
                        <li key={idx} className="text-xs text-brand-charcoal/80 dark:text-brand-cream/80 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block mb-2.5 flex items-center gap-1">
                      <Coffee size={11} className="text-amber-800" /> RECOMMENDED PAIRINGS
                    </span>
                    <ul className="space-y-1.5">
                      {selectedItem.pairings.map((pair, idx) => (
                        <li key={idx} className="text-xs text-brand-charcoal/80 dark:text-brand-cream/80 flex items-center gap-1.5">
                          <Check size={10} className="text-brand-terracotta stroke-[3]" />
                          {pair}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* DYNAMIC BATCH PROVISION SUGGESTION */}
              {pairedProduct && (
                <div className="border-t border-brand-charcoal/15 dark:border-brand-cream/15 pt-5 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-terracotta/5 dark:bg-brand-terracotta/10 p-4 border border-brand-terracotta/20">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-white dark:bg-brand-charcoal border border-brand-charcoal/10 p-1 flex items-center justify-center overflow-hidden rounded">
                      <img
                        src={pairedProduct.image}
                        alt={pairedProduct.title}
                        className="object-contain max-h-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="block text-[8px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 uppercase font-mono-data">MATCHING STOCK</span>
                      <h5 className="font-serif text-xs font-bold text-brand-charcoal dark:text-brand-cream truncate max-w-[200px]">
                        {pairedProduct.title}
                      </h5>
                      <span className="font-mono-data text-[10px] font-bold text-brand-terracotta block">
                        ${pairedProduct.price}.00 USD • {pairedProduct.weight}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    id={`guide-add-cart-${pairedProduct.id}`}
                    key={`guide-cart-${isInCart?.quantity || 0}`}
                    onClick={() => addToCart(pairedProduct)}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.1, 0.98, 1.02, 1] }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    className="w-full sm:w-auto px-5 py-3 bg-brand-terracotta hover:bg-brand-charcoal dark:hover:bg-brand-cream text-brand-cream dark:hover:text-brand-charcoal text-[9px] font-semibold tracking-widest transition-colors duration-300 cursor-pointer uppercase flex items-center justify-center gap-1.5"
                  >
                    {isInCart ? `ADD MORE (${isInCart.quantity})` : 'ADD THIS MATCH TO BATCH'}
                    <Plus size={11} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
