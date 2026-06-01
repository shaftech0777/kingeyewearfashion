import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/data/products";
import { Package, CheckCircle2, Truck, Home } from "lucide-react";
import { z } from "zod";

const search = z.object({ id: z.string().optional() });

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track Your Order — King Eyewear" }] }),
  validateSearch: search,
  component: TrackPage,
});

type Order = {
  tracking_id: string;
  customer_name: string;
  status: string;
  total: number;
  created_at: string;
  shipping_address: string;
  city: string;
  items: Array<{ name: string; qty: number; price: number }>;
};

const STAGES = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

function TrackPage() {
  const { id } = Route.useSearch();
  const [trackingId, setTrackingId] = useState(id ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function lookup(tid: string) {
    if (!tid) return;
    setBusy(true); setErr(""); setOrder(null);
    const { data, error } = await supabase.from("orders").select("*").eq("tracking_id", tid.trim()).maybeSingle();
    setBusy(false);
    if (error || !data) { setErr("Order not found. Please check your tracking ID."); return; }
    setOrder(data as unknown as Order);
  }

  useEffect(() => { if (id) lookup(id); /* eslint-disable-next-line */ }, [id]);

  const stageIdx = order ? Math.max(0, STAGES.indexOf(order.status)) : -1;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Track Your Order</h1>
      <p className="text-muted-foreground mb-8">Enter your King Eyewear tracking ID (starts with KE-).</p>

      <form onSubmit={(e) => { e.preventDefault(); lookup(trackingId); }} className="flex gap-2 mb-8">
        <input value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
          placeholder="e.g. KE-A1B2C3D4E5"
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm" />
        <button disabled={busy} className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50">
          {busy ? "Searching…" : "Track"}
        </button>
      </form>

      {err && <p className="text-destructive text-sm">{err}</p>}

      {order && (
        <div className="rounded-xl border p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs text-muted-foreground">Tracking ID</p>
              <p className="font-mono font-semibold">{order.tracking_id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="font-semibold">{formatPrice(Number(order.total))}</p>
            </div>
          </div>

          <div className="relative flex justify-between mb-8">
            {STAGES.map((s, i) => {
              const done = i <= stageIdx;
              const Icon = i === 0 ? Package : i === 2 ? Truck : i === 4 ? Home : CheckCircle2;
              return (
                <div key={s} className="flex flex-col items-center text-center flex-1">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${done ? "bg-[var(--gold)] text-primary" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className={`mt-2 text-[10px] md:text-xs ${done ? "font-semibold" : "text-muted-foreground"}`}>{s}</p>
                </div>
              );
            })}
          </div>

          <div className="text-sm border-t pt-4 space-y-1">
            <p><span className="text-muted-foreground">Customer:</span> {order.customer_name}</p>
            <p><span className="text-muted-foreground">Ship to:</span> {order.shipping_address}, {order.city}</p>
            <p><span className="text-muted-foreground">Placed:</span> {new Date(order.created_at).toLocaleString()}</p>
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="text-sm font-semibold mb-2">Items</p>
            {order.items?.map((it, i) => (
              <div key={i} className="flex justify-between text-sm py-1">
                <span>{it.name} × {it.qty}</span>
                <span>{formatPrice(it.price * it.qty)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
