import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-sunglasses.jpg";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "King Eyewear Fashion — Crown Your Style" },
      { name: "description", content: "Premium sunglasses, prescription eyeglasses, contact lenses & kids eyewear. Shop the King Eyewear collection." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 8);
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden bg-primary text-primary-foreground">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50"
          width={1600} height={900} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/40 to-primary" />
        <div className="container relative mx-auto flex h-full flex-col items-start justify-end px-4 pb-20">
          <p className="text-[var(--gold)] tracking-[0.3em] text-xs uppercase mb-3">King Eyewear · Est. 2015</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold max-w-3xl leading-[1.05]">
            Crown your <span className="italic text-[var(--gold)]">style</span>.
          </h1>
          <p className="mt-5 max-w-xl text-base opacity-85">
            Premium sunglasses, prescription eyeglasses, contact lenses and a vibrant kids collection — crafted for kings & queens.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/category/mens-sunglasses"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-primary hover:opacity-90">
              Shop Men <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/category/womens-sunglasses"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10">
              Shop Women
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-b">
        <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-8 md:grid-cols-3">
          {[
            { icon: Truck, t: "Free Delivery", d: "On orders above ₹2,000 across India" },
            { icon: ShieldCheck, t: "1-Year Warranty", d: "On all frames & sunglasses" },
            { icon: RotateCcw, t: "7-Day Returns", d: "Hassle-free, no questions asked" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-center gap-3">
              <Icon className="h-6 w-6 text-[var(--gold)]" />
              <div>
                <p className="font-semibold text-sm">{t}</p>
                <p className="text-xs text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="group">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img src={c.image} alt={c.title} loading="lazy" width={400} height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="mt-3 text-center text-sm font-medium">{c.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">Featured</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
