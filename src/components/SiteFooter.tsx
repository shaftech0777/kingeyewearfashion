import { Link } from "@tanstack/react-router";
import { Crown, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Crown className="h-5 w-5 text-[var(--gold)]" />
            <span className="font-display text-lg font-bold">King Eyewear</span>
          </div>
          <p className="text-sm opacity-80">Crown your style. Premium eyewear crafted for kings & queens since 2015.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Shop</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/category/mens-sunglasses">Men's Sunglasses</Link></li>
            <li><Link to="/category/womens-sunglasses">Women's Sunglasses</Link></li>
            <li><Link to="/category/eyeglasses">Eyeglasses</Link></li>
            <li><Link to="/category/lens">Contact Lenses</Link></li>
            <li><Link to="/category/kids">Kids</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Support</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/track">Track Order</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Contact</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> care@kingeyewear.in</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Mumbai, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} King Eyewear Fashion. All rights reserved.
      </div>
    </footer>
  );
}
