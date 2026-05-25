import { Testimonial } from '@/components/ui/circular-testimonials';

export const testimonials: Testimonial[] = [
  {
    quote:
      "The Signature Volcanic Sumac completely transformed the way I cook. I put it on everything — labneh, grilled fish, roasted vegetables. Nothing else comes close to the depth of flavour.",
    name: "Lena M.",
    designation: "Food Stylist, London",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
  },
  {
    quote:
      "I ordered the Cardamom Rose Granola on a whim and now it's the first thing I reach for every morning. The floral warmth is unlike anything you find in a supermarket. Genuinely special.",
    name: "Tariq A.",
    designation: "Chef & Recipe Developer, Dubai",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
  },
  {
    quote:
      "Rashah's Za'atar is the real thing — shade-dried, coarsely rubbed, alive with essential oils. I've been searching for this quality for years. My family goes through a jar a week.",
    name: "Sara K.",
    designation: "Home Cook & Food Writer, Beirut",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop",
  },
  {
    quote:
      "The Loomi Black Lime powder is pure magic. A tiny pinch over a white fish tagine brought the whole dish to life. I've never ordered from a brand twice so fast.",
    name: "Amir S.",
    designation: "Restaurant Owner, Istanbul",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop",
  },
];

// Static per-product ratings used on collection cards
export const productRatings: Record<string, { stars: number; count: number }> = {
  'rashah-signature-blend':      { stars: 5.0, count: 214 },
  'cardamom-rose-pecan-granola': { stars: 4.9, count: 187 },
  'zaatar-premium-artisanal':    { stars: 5.0, count: 163 },
  'classic-toasted-maple-granola':{ stars: 4.8, count: 142 },
  'aleppo-smoked-pepper-flakes': { stars: 4.9, count: 198 },
  'salted-ochre-sesame-granola': { stars: 4.8, count: 109 },
  'loomi-fermented-black-lime':  { stars: 4.9, count: 97  },
};
