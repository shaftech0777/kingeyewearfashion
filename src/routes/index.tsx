import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { product, productImages, formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { ShoppingBag, Truck, Check, Star, Crown, Sparkles, Award } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "King Cartier Rimless Eyewear — King Eyewear Fashion" },
      { name: "description", content: "Luxury rimless gold & rosewood eyewear with photochromic lenses. PKR 1,650 with free delivery across Pakistan." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { add } = useCart();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  function addToCart(buyNow = false) {
    add({ id: product.id, name: product.name, price: product.price, image: product.images[0] }, qty);
    toast.success("Added to cart");
    if (buyNow) nav({ to: "/checkout" });
  }

  return (
    <div className="bg-background">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,168,76,0.25),transparent_60%)]" />
        <div className="container relative mx-auto px-4 py-10 md:py-14 text-center">
          <p className="text-[var(--gold)] tracking-[0.3em] text-[10px] md:text-xs uppercase mb-3">King Eyewear · Luxury Collection</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Crown your <span className="italic text-[var(--gold)]">style</span>.
          </h1>
          <p className="mt-3 text-sm md:text-base opacity-80 max-w-xl mx-auto">
            One masterpiece. Handcrafted gold & rosewood. Photochromic lenses.
          </p>
        </div>
      </section>

      {/* PRODUCT */}
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* GALLERY */}
          <div>
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted ring-1 ring-[var(--gold)]/30 shadow-2xl">
              <img src={productImages[active]} alt={product.name}
                className="h-full w-full object-cover transition-opacity duration-300" />
            </div>
            <div className="mt-4 grid grid-cols-6 gap-2">
              {productImages.map((src, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`aspect-square overflow-hidden rounded-md bg-muted ring-2 transition ${active === i ? "ring-[var(--gold)]" : "ring-transparent hover:ring-[var(--gold)]/40"}`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="lg:pt-2">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]">
              <Crown className="h-3.5 w-3.5" /> King Eyewear Fashion
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight">{product.name}</h2>

            <div className="mt-3 flex items-center gap-2">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
              ))}
              <span className="text-xs text-muted-foreground">(248 reviews)</span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <p className="text-4xl font-bold text-[var(--gold)]">{formatPrice(product.price)}</p>
              <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-green-500/10 text-green-600 px-3 py-1 text-xs font-semibold">
                <Truck className="h-3 w-3" /> Free Delivery
              </span>
            </div>

            <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

            <ul className="mt-6 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 mt-0.5 text-[var(--gold)] shrink-0" /> {h}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center rounded-md border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5">−</button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-2.5">+</button>
              </div>
              <p className="text-xs text-muted-foreground">Cash on Delivery available</p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button onClick={() => addToCart(false)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border-2 border-primary px-6 py-3.5 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition">
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <button onClick={() => addToCart(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[var(--gold)] to-amber-500 px-6 py-3.5 text-sm font-bold text-primary hover:opacity-90 transition shadow-lg">
                <Sparkles className="h-4 w-4" /> Buy Now
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t pt-6">
              <Feature icon={Truck} title="Free Delivery" desc="Pan-Pakistan" />
              <Feature icon={Award} title="Premium Quality" desc="Luxury craft" />
              <Feature icon={Crown} title="Cash on Delivery" desc="Pay on receive" />
            </div>
          </div>
        </div>
      </section>

      {/* BIG GALLERY */}
      <section className="bg-muted/30 py-14">
        <div className="container mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">Crafted in every detail</h3>
          <p className="text-center text-muted-foreground mb-8 text-sm">Indoor clarity. Sunlight tint. Pure luxury.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {productImages.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xl bg-background ring-1 ring-[var(--gold)]/20 group">
                <img src={src} alt="" loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-14 text-center">
        <Crown className="mx-auto h-10 w-10 text-[var(--gold)] mb-3" />
        <h3 className="font-display text-2xl md:text-3xl font-bold">Wear the Crown.</h3>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto text-sm">Only PKR 1,650 — with free delivery anywhere in Pakistan. Cash on Delivery available.</p>
        <button onClick={() => addToCart(true)}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-500 px-8 py-3.5 text-sm font-bold text-primary hover:opacity-90 shadow-lg">
          <Sparkles className="h-4 w-4" /> Order Now — PKR 1,650
        </button>
      </section>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: typeof Crown; title: string; desc: string }) {
  return (
    <div className="text-center">
      <Icon className="mx-auto h-5 w-5 text-[var(--gold)]" />
      <p className="mt-2 text-xs font-semibold">{title}</p>
      <p className="text-[10px] text-muted-foreground">{desc}</p>
    </div>
  );
}
