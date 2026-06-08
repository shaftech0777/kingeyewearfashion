import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-7d2jb-zQ.js";
import { f as formatPrice } from "./products-Du1PDuTS.js";
import { Package, Truck, Home, CheckCircle2 } from "lucide-react";
import { R as Route } from "./router-BNcUUPkN.js";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "./server-Dznb2wd8.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "sonner";
import "zod";
const STAGES = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];
function TrackPage() {
  const {
    id
  } = Route.useSearch();
  const [trackingId, setTrackingId] = useState(id ?? "");
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function lookup(tid) {
    if (!tid) return;
    setBusy(true);
    setErr("");
    setOrder(null);
    const {
      data,
      error
    } = await supabase.from("orders").select("*").eq("tracking_id", tid.trim()).maybeSingle();
    setBusy(false);
    if (error || !data) {
      setErr("Order not found. Please check your tracking ID.");
      return;
    }
    setOrder(data);
  }
  useEffect(() => {
    if (id) lookup(id);
  }, [id]);
  const stageIdx = order ? Math.max(0, STAGES.indexOf(order.status)) : -1;
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12 max-w-3xl", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold mb-2", children: "Track Your Order" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8", children: "Enter your King Eyewear tracking ID (starts with KE-)." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      lookup(trackingId);
    }, className: "flex gap-2 mb-8", children: [
      /* @__PURE__ */ jsx("input", { value: trackingId, onChange: (e) => setTrackingId(e.target.value), placeholder: "e.g. KE-A1B2C3D4E5", className: "flex-1 rounded-md border bg-background px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("button", { disabled: busy, className: "rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50", children: busy ? "Searching…" : "Track" })
    ] }),
    err && /* @__PURE__ */ jsx("p", { className: "text-destructive text-sm", children: err }),
    order && /* @__PURE__ */ jsxs("div", { className: "rounded-xl border p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Tracking ID" }),
          /* @__PURE__ */ jsx("p", { className: "font-mono font-semibold", children: order.tracking_id })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Total" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: formatPrice(Number(order.total)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative flex justify-between mb-8", children: STAGES.map((s, i) => {
        const done = i <= stageIdx;
        const Icon = i === 0 ? Package : i === 2 ? Truck : i === 4 ? Home : CheckCircle2;
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: `flex h-9 w-9 items-center justify-center rounded-full ${done ? "bg-[var(--gold)] text-primary" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("p", { className: `mt-2 text-[10px] md:text-xs ${done ? "font-semibold" : "text-muted-foreground"}`, children: s })
        ] }, s);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm border-t pt-4 space-y-1", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Customer:" }),
          " ",
          order.customer_name
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Ship to:" }),
          " ",
          order.shipping_address,
          ", ",
          order.city
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Placed:" }),
          " ",
          new Date(order.created_at).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t pt-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mb-2", children: "Items" }),
        order.items?.map((it, i) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm py-1", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            it.name,
            " × ",
            it.qty
          ] }),
          /* @__PURE__ */ jsx("span", { children: formatPrice(it.price * it.qty) })
        ] }, i))
      ] })
    ] })
  ] });
}
export {
  TrackPage as component
};
