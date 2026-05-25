import { Product } from '../types';

// Let's resolve the actual generated image paths
import heroJarImg from '../assets/images/monolith_jar_hero_1779726349623.png';
import granolaImg from '../assets/images/grain_series_granola_1779726368711.png';
import spiceImg from '../assets/images/spice_series_blend_1779726386735.png';

export const products: Product[] = [
  {
    id: 'rashah-signature-blend',
    title: 'Signature Volcanic Sumac & Wildflower',
    arabicTitle: 'رشة السماق البري المطور',
    subtitle: 'The Monolith Jar',
    series: 'spice',
    category: 'Curated Blends',
    description: 'High-altitude wild-growing sumac collected on volcanic slopes, flaky sea salt, organic dried lemon peel, and crushed red rose berries.',
    fullDescription: 'Our signature blend celebrates the deep sour and citric majesty of native wild sumac. Hand-harvested on volcanic highlands, we crush the berries coarsely and blend them with delicate flakes of sun-evaporated sea salt and dehydrated wildflower petals. An elemental drizzle of citrus oil completes this complex, crimson sprinkle.',
    price: 24,
    weight: '120g',
    origin: 'Anatolian Volcanic Slopes',
    ingredients: ['Volcanic Violet Sumac', 'Flaky Sea Salt', 'Dried Lemon Peel', 'Wildflower Petals', 'Crushed Rose Pink Berries'],
    image: heroJarImg,
    featured: true,
    notes: 'Incredible over organic labneh, heirloom tomato carpaccios, grilled halloumi, or olive oil-drenched flatbreads.'
  },
  {
    id: 'cardamom-rose-pecan-granola',
    title: 'Cardamom Rose Pecan Granola',
    arabicTitle: 'جرانولا الهيل والورد الجوري',
    subtitle: 'Grain Series',
    series: 'grain',
    category: 'Granola',
    description: 'A delicate floral fusion of hand-ground green cardamom, organic Damascus rose buds, toasted pecan halves, and raw maple syrup.',
    fullDescription: 'Crafted in small micro-batches of only fifteen jars at a time, our Grain Series Cardamom Rose Pecan Granola features thick organic rolled oats slowly dehydrated under low temperature. Infused with freshly ground green cardamom pods, toasted buttery pecan halves, and sweet fragrant organic rose buds, this granola delivers a floral, botanical warmth.',
    price: 18,
    weight: '350g',
    origin: 'Handcrafted in Riyadh',
    ingredients: ['Organic Rolled Oats', 'Pecan Halves', 'Freshly Ground Cardamom Portions', 'Organic Flower Honey', 'Damascus Rose Buds', 'Cold-Pressed Coconut Oil'],
    image: granolaImg,
    featured: true,
    notes: 'Best served over cool goat yogurt, layered with organic honeycomb, or enjoyed dry as a desktop snack.'
  },
  {
    id: 'zaatar-premium-artisanal',
    title: 'Royal Thand-Dried Za\'atar',
    arabicTitle: 'الزعتر الملكي الفاخر',
    subtitle: 'Spice Series',
    series: 'spice',
    category: 'Curated Blends',
    description: 'Shade-dried wild thyme leaves, toasted heirloom white sesame seeds, bright tart sumac berries, and high-altitude mineral salt.',
    fullDescription: 'An unparalleled interpretation of a heritage blend. We source wild, broad-leaf thyme from calcareous soils, drying it strictly in the shade to preserve raw green essential oils. Coarsely rubbed and packed with toasted heirloom white sesame seeds and a lavish hand of our signature tart sumac.',
    price: 16,
    weight: '110g',
    origin: 'Hebron Limestone Foothills',
    ingredients: ['Shade-Dried Wild Thyme', 'Toasted Heirloom White Sesame', 'Volcanic Pink Sumac', 'Sea Salt'],
    image: spiceImg,
    featured: false,
    notes: 'Whisk with premium cold-pressed olive oil (Extra Virgin) for dipping, or rub generously onto farm chicken during final roasting.'
  },
  {
    id: 'classic-toasted-maple-granola',
    title: 'Heritage Toasted Maple Granola',
    arabicTitle: 'جرانولا القيقب الكلاسيكية',
    subtitle: 'Grain Series',
    series: 'grain',
    category: 'Granola',
    description: 'Slow-toasted organic pumpkin seeds, crisp organic rolled oats, grade-A pure Canadian dark maple syrup, and sliced almonds.',
    fullDescription: 'The purist’s standard. Devoid of refined sugars, this classic toasted granola relies strictly on grade-A single-source dark maple syrup. Roasted to a rich, dark amber crunch with high-nutrient organic pumpkin seeds, sunflower kernels, and raw slivered almonds, creating a sophisticated woodsy profile with deep vanilla undertone.',
    price: 18,
    weight: '350g',
    origin: 'Handcrafted in Riyadh',
    ingredients: ['Organic Rolled Oats', 'Canadian Grade-A Dark Maple Syrup', 'Slivered Sweet Almonds', 'Organic Pumpkin Seeds', 'Sea Salt Flakes'],
    image: granolaImg, // reuse beautiful premium granola design
    featured: false,
    notes: 'Complements thick almond milk or serves beautifully as a topping on overnight chia oats.'
  },
  {
    id: 'aleppo-smoked-pepper-flakes',
    title: 'Heirloom Aleppo Smoked Pepper',
    arabicTitle: 'رقاقات الفلفل الحلبي المدخن',
    subtitle: 'Spice Series',
    series: 'spice',
    category: 'Single Spices',
    description: 'Sun-cured, oiled Halaby pepper flakes with mild elegant heat, deep fruity sweetness, and delicate hickory woodsmoke finish.',
    fullDescription: 'Also known as Halaby pepper, our Aleppo pepper pods are grown in small family micro-farms, sun-cured for three weeks, deseeded, and then rubbed with high-quality olive oil and a touch of sea salt. We cold-smoke them gently over hickory coals to yield a warm, fragrant flake with fruity, raisin-like sweetness and just a hint of slow heat.',
    price: 15,
    weight: '90g',
    origin: 'Mediterranean Border Hills',
    ingredients: ['Sun-Cured Aleppo Pepper Flakes', 'Cold-Pressed Extra Virgin Olive Oil', 'Mineral Salt'],
    image: spiceImg, // reuse beautiful spice rendering
    featured: true,
    notes: 'Sprinkle directly onto fried free-range eggs, charred broccoli, creamy hummus, or dark chocolate ganache for a luxurious twist.'
  },
  {
    id: 'salted-ochre-sesame-granola',
    title: 'Salted Tahini & Gold Sesame Granola',
    arabicTitle: 'جرانولا الطحينة الملكية بالسمسم',
    subtitle: 'Grain Series',
    series: 'grain',
    category: 'Granola',
    description: 'Creamy cold-pressed sesame tahini, hand-roasted gold sesame seeds, premium farm wildflower honey, halves walnuts, and flaky sea salt.',
    fullDescription: 'A rich savory-leaning granola inspired by traditional confectionery. We saturate organic whole-grain oats in stone-ground sesame paste (tahini), raw desert wildflower honey, and high-oil walnuts. Toasted with pristine white and black sesame seeds until crisp, finished with high-contrast flakes of Celtic sea salt for deep mineral counterpoints.',
    price: 20,
    weight: '350g',
    origin: 'Handcrafted in Riyadh',
    ingredients: ['Organic Rolled Oats', 'Stone-Ground Sesame Tahini', 'Wildflower Desert Honey', 'Hand-Selected Walnut Halves', 'Toasted White Sesame Seeds', 'Flaky Celtic Salt'],
    image: granolaImg,
    featured: false,
    notes: 'Stunning as a savory crunch on parsnip purees, baked sweet potatoes, or contrasting with vanilla bean gelato.'
  },
  {
    id: 'loomi-fermented-black-lime',
    title: 'Sun-Fermented Loomi Black Lime',
    arabicTitle: 'ليمون لومي مفروم ومطحون',
    subtitle: 'Spice Series',
    series: 'spice',
    category: 'Single Spices',
    description: 'Traditional sun-cured whole black limes ground to an intense sour, citrusy, beautifully fermented powder.',
    fullDescription: 'Made by boiling fresh lime citrus fruit in mineral saltwater and leaving them to slow-cure in desert sun sands until they carbonize black. The result is an intensely sour, slightly woodsy, deeply fermented citrus powder that provides instant brightness with earthiness.',
    price: 12,
    weight: '95g',
    origin: 'Salted Desert Basins',
    ingredients: ['Ground Fermented Black Lime'],
    image: heroJarImg,
    featured: false,
    notes: 'An essential dust for seafood risottos, rich white meat stews, spice rubs, or complex vegetable tagines.'
  }
];

// Helper functions for Query system
export const fetchProductsApi = async (categoryFilter?: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!categoryFilter || categoryFilter === 'All') {
        resolve(products);
      } else {
        resolve(products.filter(p => p.category === categoryFilter));
      }
    }, 400); // realistic slight network delay for React Query simulation
  });
};

export const fetchProductByIdApi = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(p => p.id === id));
    }, 200);
  });
};

export const submitInquiryApi = async (inquiryData: any): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Thank you, ${inquiryData.name}. Your stockist inquiry for "${inquiryData.company}" has been logged successfully. The Rashah artisanal team will reach out directly.`
      });
    }, 800);
  });
};
