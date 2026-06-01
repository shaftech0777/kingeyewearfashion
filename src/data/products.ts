import mens from "@/assets/mens-sunglasses.jpg";
import womens from "@/assets/womens-sunglasses.jpg";
import eyeglasses from "@/assets/eyeglasses.jpg";
import kids from "@/assets/kids-glasses.jpg";
import lens from "@/assets/lens.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "mens-sunglasses" | "womens-sunglasses" | "eyeglasses" | "lens" | "kids";
  image: string;
  description: string;
  power?: string; // for eyeglasses
};

export const products: Product[] = [
  // Men's Sunglasses
  { id: "ms-1", name: "Royal Aviator Gold", price: 4999, category: "mens-sunglasses", image: mens, description: "Classic aviator with gold-tone metal frame and UV400 polarized lenses." },
  { id: "ms-2", name: "Wayfarer Noir", price: 3499, category: "mens-sunglasses", image: mens, description: "Iconic wayfarer silhouette in matte black, polycarbonate frame." },
  { id: "ms-3", name: "Sport Shield Pro", price: 5499, category: "mens-sunglasses", image: mens, description: "Wraparound sport shield, anti-glare, perfect for driving." },
  { id: "ms-4", name: "Classic Round Tortoise", price: 3999, category: "mens-sunglasses", image: mens, description: "Vintage round frame with tortoiseshell finish." },

  // Women's Sunglasses
  { id: "ws-1", name: "Cat-Eye Rose", price: 4499, category: "womens-sunglasses", image: womens, description: "Elegant cat-eye in rose acetate with gradient lenses." },
  { id: "ws-2", name: "Oversized Glamour", price: 5299, category: "womens-sunglasses", image: womens, description: "Statement oversized square frames in deep tortoise." },
  { id: "ws-3", name: "Butterfly Bloom", price: 4799, category: "womens-sunglasses", image: womens, description: "Butterfly silhouette with subtle floral temples." },
  { id: "ws-4", name: "Hexagon Minimalist", price: 3899, category: "womens-sunglasses", image: womens, description: "Sleek hexagonal frame in rose gold metal." },

  // Eyeglasses (with prescription power)
  { id: "eg-1", name: "Tortoise Classic", price: 2999, category: "eyeglasses", image: eyeglasses, description: "Full-rim acetate frames. Available for + and − powers.", power: "−6.00 to +6.00" },
  { id: "eg-2", name: "Blue Light Pro", price: 2499, category: "eyeglasses", image: eyeglasses, description: "Blue-light filter lenses for screen use.", power: "−4.00 to +4.00" },
  { id: "eg-3", name: "Titanium Rimless", price: 5999, category: "eyeglasses", image: eyeglasses, description: "Ultra-light titanium rimless frame.", power: "−8.00 to +8.00" },
  { id: "eg-4", name: "Progressive Reader", price: 4999, category: "eyeglasses", image: eyeglasses, description: "Progressive bifocal lenses, single vision option available.", power: "+1.00 to +3.50" },

  // Lens
  { id: "ln-1", name: "Daily Soft Lens (30 pack)", price: 1499, category: "lens", image: lens, description: "Daily disposable lenses, high oxygen permeability." },
  { id: "ln-2", name: "Monthly Lens Pair", price: 999, category: "lens", image: lens, description: "Monthly soft contact lenses, comfortable wear." },
  { id: "ln-3", name: "Colored Lens — Hazel", price: 1799, category: "lens", image: lens, description: "Natural hazel colored monthly lenses." },
  { id: "ln-4", name: "Toric Astigmatism Lens", price: 2299, category: "lens", image: lens, description: "Specially designed for astigmatism correction." },

  // Kids
  { id: "kd-1", name: "Rainbow Flex Frame", price: 1999, category: "kids", image: kids, description: "Flexible, unbreakable kids frame with rainbow accents." },
  { id: "kd-2", name: "Sporty Kids Shades", price: 1499, category: "kids", image: kids, description: "UV-protective sunglasses for active kids." },
  { id: "kd-3", name: "Cartoon Round Frame", price: 1799, category: "kids", image: kids, description: "Adorable round frames in fun colors." },
  { id: "kd-4", name: "Blue Light Kids", price: 1899, category: "kids", image: kids, description: "Blue-light blocking lenses for screen-time protection." },
];

export const categories = [
  { slug: "mens-sunglasses", title: "Men's Sunglasses", image: mens },
  { slug: "womens-sunglasses", title: "Women's Sunglasses", image: womens },
  { slug: "eyeglasses", title: "Eyeglasses (± Power)", image: eyeglasses },
  { slug: "lens", title: "Contact Lenses", image: lens },
  { slug: "kids", title: "Kids Collection", image: kids },
] as const;

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getByCategory = (cat: string) => products.filter((p) => p.category === cat);
export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
