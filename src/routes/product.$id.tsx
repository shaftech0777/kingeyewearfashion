import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { getProduct, formatPrice, products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { ShoppingBag, Check, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = getProduct(params.id);
    return {
      meta: [
        { title: `${p?.name ?? "Product"} — King Eyewear` },
        { name: "description", content: p?.description ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => <div className="container mx-auto px-4 py-20 text-center">Product not found.</div>,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);
  const [power, setPower] = useState("");

  const isEyeglass = product.category === "eyeglasses";
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  function addToCart(buyNow = false) {
    add({ id: product.id, name: product.name + (power ? ` (${power})` : ""), price: product.price, image: product.image }, qty);
    toast.success("Added to cart");
    if (buyNow) nav({ to: "/checkout" });
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-xl bg-muted">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" width={800} height={800} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--gold)]">King Eyewear</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="mt-3 text-2xl font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

          {isEyeglass && (
            <div className="mt-6">
              <label className="text-sm font-medium">Prescription power (e.g. −2.50 or +1.25)</label>
              <input value={power} onChange={(e) => setPower(e.target.value)}
                placeholder="Enter your power, or leave blank"
                className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm" />
              <p className="mt-1 text-xs text-muted-foreground">Range: {product.power}. Both + and − powers supported.</p>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-md border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2">−</button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2">+</button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => addToCart(false)}
              className="inline-flex items-center gap-2 rounded-md border border-primary px-6 py-3 text-sm font-semibold hover:bg-primary hover:text-primary-foreground">
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            <button onClick={() => addToCart(true)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Buy Now
            </button>
          </div>

          <ul className="mt-8 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-[var(--gold)]" /> Free delivery above ₹2,000</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--gold)]" /> 1-year warranty</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--gold)]" /> 7-day easy return</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-6"><Link to="/category/$slug" params={{ slug: product.category }} className="text-sm underline">View all</Link></div>
        </section>
      )}
    </div>
  );
}
