import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";
import { Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — King Eyewear" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQty, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Discover our latest collection.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((i) => (
            <div key={i.id} className="flex gap-4 rounded-lg border p-4">
              <img src={i.image} alt="" className="h-24 w-24 rounded-md object-cover" />
              <div className="flex-1">
                <h3 className="font-medium">{i.name}</h3>
                <p className="text-[var(--gold)] font-semibold mt-1">{formatPrice(i.price)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-md border">
                    <button onClick={() => setQty(i.id, i.qty - 1)} className="px-3 py-1">−</button>
                    <span className="w-8 text-center text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} className="px-3 py-1">+</button>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="font-semibold">{formatPrice(i.price * i.qty)}</p>
            </div>
          ))}
        </div>
        <div className="h-fit rounded-lg border p-6 space-y-3">
          <h2 className="font-display text-xl font-bold">Order Summary</h2>
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
          <div className="flex justify-between text-sm"><span>Shipping</span><span>{total >= 2000 ? "Free" : formatPrice(99)}</span></div>
          <div className="flex justify-between border-t pt-3 font-semibold"><span>Total</span><span>{formatPrice(total + (total >= 2000 ? 0 : 99))}</span></div>
          <Link to="/checkout" className="block w-full text-center rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
