import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — King Eyewear" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, total, clear } = useCart();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const shipping = total >= 2000 ? 0 : 99;
  const grand = total + shipping;

  if (items.length === 0) {
    return <div className="container mx-auto px-4 py-20 text-center">Your cart is empty.</div>;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      customer_name: String(fd.get("name")),
      customer_email: String(fd.get("email")),
      customer_phone: String(fd.get("phone")),
      shipping_address: String(fd.get("address")),
      city: String(fd.get("city")),
      postal_code: String(fd.get("postal")),
      items: items as unknown as Record<string, unknown>,
      total: grand,
    };
    const { data, error } = await supabase.from("orders").insert(payload).select("tracking_id").single();
    setBusy(false);
    if (error || !data) { toast.error("Order failed: " + (error?.message ?? "")); return; }
    clear();
    toast.success(`Order placed! Tracking ID: ${data.tracking_id}`);
    nav({ to: "/track", search: { id: data.tracking_id } });
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-semibold">Shipping Details</h2>
          {[
            { n: "name", l: "Full name" },
            { n: "email", l: "Email", type: "email" },
            { n: "phone", l: "Phone", type: "tel" },
            { n: "address", l: "Address" },
            { n: "city", l: "City" },
            { n: "postal", l: "Postal code" },
          ].map((f) => (
            <div key={f.n}>
              <label className="text-sm font-medium">{f.l}</label>
              <input name={f.n} type={f.type || "text"} required
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" />
            </div>
          ))}
          <p className="text-xs text-muted-foreground">Payment: Cash on Delivery (demo). You'll receive a tracking ID after placing the order.</p>
        </div>
        <div className="h-fit rounded-lg border p-6 space-y-3">
          <h2 className="font-display text-xl font-bold">Summary</h2>
          {items.map((i) => (
            <div key={i.id} className="flex justify-between text-sm">
              <span>{i.name} × {i.qty}</span>
              <span>{formatPrice(i.price * i.qty)}</span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
          <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
          <div className="flex justify-between border-t pt-3 font-semibold"><span>Total</span><span>{formatPrice(grand)}</span></div>
          <button disabled={busy} type="submit"
            className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">
            {busy ? "Placing order…" : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
