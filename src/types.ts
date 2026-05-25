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

