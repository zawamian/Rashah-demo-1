/**
 * Types definition for Rashah (رشة)
 */

export type ProductSeries = 'grain' | 'spice';

export type ProductCategory = 'Granola' | 'Single Spices' | 'Curated Blends';

export interface Product {
  id: string;
  title: string;
  arabicTitle: string;
  subtitle: string;
  series: ProductSeries;
  category: ProductCategory;
  description: string;
  fullDescription: string;
  price: number;
  weight: string;
  origin: string;
  ingredients: string[];
  image: string;
  featured: boolean;
  notes: string;
  title_ar?: string;
  title_tr?: string;
  subtitle_ar?: string;
  subtitle_tr?: string;
  description_ar?: string;
  description_tr?: string;
  fullDescription_ar?: string;
  fullDescription_tr?: string;
  origin_ar?: string;
  origin_tr?: string;
  ingredients_ar?: string[];
  ingredients_tr?: string[];
  notes_ar?: string;
  notes_tr?: string;
}

export interface InquiryFormInput {
  name: string;
  email: string;
  company: string;
  inquiryType: 'stockist' | 'custom' | 'general';
  message: string;
}

export interface InquiryResponse {
  id: string;
  success: boolean;
  message: string;
}

export type ThemeMode = 'cream' | 'dark';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PageId = 'home' | 'collections' | 'connect' | 'recipes';

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: string;
  title: string;
  title_ar?: string;
  title_tr?: string;
  productId: string;
  tag: string;
  prepTime: string;
  cookTime?: string;
  servings: number;
  ingredients: string[];
  ingredients_ar?: string[];
  ingredients_tr?: string[];
  steps: string[];
  steps_ar?: string[];
  steps_tr?: string[];
  note?: string;
  note_ar?: string;
  note_tr?: string;
  nutrition?: NutritionFacts;
}
