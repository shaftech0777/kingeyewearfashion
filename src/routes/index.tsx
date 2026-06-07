import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { product, productImages, formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { Truck, Check, Star, Crown, Sparkles, Award } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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

  function buyNow() {
    add({ id: product.id, name: product.name, price: product.price, image: product.images[0] }, qty);
    toast.success("Proceeding to checkout");
    nav({ to: "/checkout" });
  }

  return (
    <div className="bg-background">
      {/* HERO */}
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
          {/* GALLERY — AUTOPLAY SLIDER */}
          <div>
            <Carousel
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 2800, stopOnInteraction: false })]}
              className="overflow-hidden rounded-2xl ring-1 ring-[var(--gold)]/30 shadow-2xl"
            >
              <CarouselContent>
                {productImages.map((src, i) => (
                  <CarouselItem key={i}>
                    <div className="aspect-square bg-muted">
                      <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3" />
              <CarouselNext className="right-3" />
            </Carousel>
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

            {/* BIG BUY NOW BUTTON */}
            <button
              onClick={buyNow}
              className="mt-5 w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[var(--gold)] via-amber-400 to-amber-500 px-8 py-5 text-lg md:text-xl font-extrabold text-primary uppercase tracking-wider shadow-2xl hover:opacity-95 hover:scale-[1.02] transition-all ring-2 ring-[var(--gold)]/40"
            >
              <Sparkles className="h-6 w-6" /> Buy Now — {formatPrice(product.price)}
            </button>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t pt-6">
              <Feature icon={Truck} title="Free Delivery" desc="Pan-Pakistan" />
              <Feature icon={Award} title="Premium Quality" desc="Luxury craft" />
              <Feature icon={Crown} title="Open & Check" desc="Pay after check" />
            </div>
          </div>
        </div>
      </section>

      {/* BIG SLIDESHOW */}
      <section className="bg-muted/30 py-14">
        <div className="container mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">Crafted in every detail</h3>
          <p className="text-center text-muted-foreground mb-8 text-sm">Indoor clarity. Sunlight tint. Pure luxury.</p>
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 2200, stopOnInteraction: false })]}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent>
              {productImages.map((src, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="aspect-square overflow-hidden rounded-xl bg-background ring-1 ring-[var(--gold)]/20">
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-14 text-center">
        <Crown className="mx-auto h-10 w-10 text-[var(--gold)] mb-3" />
        <h3 className="font-display text-2xl md:text-3xl font-bold">Wear the Crown.</h3>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto text-sm">Only PKR 1,650 — with free delivery anywhere in Pakistan. Cash on Delivery available.</p>
        <button onClick={buyNow}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-500 px-10 py-4 text-base font-bold text-primary hover:opacity-90 shadow-lg">
          <Sparkles className="h-5 w-5" /> Order Now — PKR 1,650
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
