import { Link } from "@tanstack/react-router";
import { Crown, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Crown className="h-5 w-5 text-[var(--gold)]" />
            <span className="font-display text-lg font-bold">King Eyewear Fashion</span>
          </div>
          <p className="text-sm opacity-80">Crown your style. Premium luxury eyewear, handcrafted for kings & queens.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/track">Track Order</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Contact</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 03051544177</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> Kingeyewearfashion@gmail.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Faisalabad, Punjab, Pakistan</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} King Eyewear Fashion. All rights reserved.
      </div>
    </footer>
  );
}
