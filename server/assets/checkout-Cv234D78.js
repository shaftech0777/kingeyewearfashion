import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { u as useCart } from "./router-BNcUUPkN.js";
import { f as formatPrice } from "./products-Du1PDuTS.js";
import { useState, useRef } from "react";
import { s as supabase } from "./client-7d2jb-zQ.js";
import { toast } from "sonner";
import "@tanstack/react-query";
import "lucide-react";
import "./server-Dznb2wd8.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
import "@supabase/supabase-js";
async function createOrder(payload) {
  const request = () => supabase.from("orders").insert(payload).select("tracking_id").single();
  let result = await request();
  const message = result.error?.message ?? "";
  if (message.toLowerCase().includes("schema cache")) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    result = await request();
  }
  return result;
}
function Checkout() {
  const {
    items,
    total,
    clear
  } = useCart();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const submittingRef = useRef(false);
  const shipping = 0;
  const grand = total + shipping;
  if (items.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 text-center", children: "Your cart is empty." });
  }
  async function submit(e) {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      customer_name: String(fd.get("name")),
      customer_email: String(fd.get("email")),
      customer_phone: String(fd.get("phone")),
      shipping_address: String(fd.get("address")),
      city: String(fd.get("city")),
      postal_code: String(fd.get("postal")),
      items,
      total: grand
    };
    const {
      data,
      error
    } = await createOrder(payload);
    setBusy(false);
    if (error || !data) {
      submittingRef.current = false;
      toast.error("Order failed. Please try again or WhatsApp us.");
      return;
    }
    try {
      const itemsText = items.map((i) => `• ${i.name} × ${i.qty} — ${formatPrice(i.price * i.qty)}`).join("\n");
      await fetch("https://formsubmit.co/ajax/Kingeyewearfashion@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _subject: `New Order ${data.tracking_id} — ${payload.customer_name}`,
          _template: "table",
          tracking_id: data.tracking_id,
          customer_name: payload.customer_name,
          customer_email: payload.customer_email,
          customer_phone: payload.customer_phone,
          shipping_address: `${payload.shipping_address}, ${payload.city} ${payload.postal_code}`,
          items: itemsText,
          total: formatPrice(grand),
          message: `New order placed by ${payload.customer_name}. Please process and dispatch.`
        })
      });
    } catch (e2) {
      console.error("Email notify failed", e2);
    }
    clear();
    submittingRef.current = false;
    toast.success(`Order placed! Tracking ID: ${data.tracking_id}`);
    nav({
      to: "/track",
      search: {
        id: data.tracking_id
      }
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold mb-8", children: "Checkout" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid gap-10 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Shipping Details" }),
        [{
          n: "name",
          l: "Full name"
        }, {
          n: "email",
          l: "Email (Optional)",
          type: "email",
          optional: true
        }, {
          n: "phone",
          l: "Phone",
          type: "tel"
        }, {
          n: "address",
          l: "Address"
        }, {
          n: "city",
          l: "City"
        }, {
          n: "postal",
          l: "Postal code"
        }].map((f) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: f.l }),
          /* @__PURE__ */ jsx("input", { name: f.n, type: f.type || "text", required: !f.optional, className: "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" })
        ] }, f.n)),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Payment: Cash on Delivery (demo). You'll receive a tracking ID after placing the order. Order confirmation will be sent to Kingeyewearfashion@gmail.com." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "h-fit rounded-lg border p-6 space-y-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-xl font-bold", children: "Summary" }),
        items.map((i) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            i.name,
            " × ",
            i.qty
          ] }),
          /* @__PURE__ */ jsx("span", { children: formatPrice(i.price * i.qty) })
        ] }, i.id)),
        /* @__PURE__ */ jsxs("div", { className: "border-t pt-3 flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsx("span", { children: formatPrice(total) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Shipping" }),
          /* @__PURE__ */ jsx("span", { children: "Free" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-t pt-3 font-semibold", children: [
          /* @__PURE__ */ jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsx("span", { children: formatPrice(grand) })
        ] }),
        /* @__PURE__ */ jsx("button", { disabled: busy, type: "submit", className: "w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50", children: busy ? "Placing order…" : "Place Order" })
      ] })
    ] })
  ] });
}
export {
  Checkout as component
};
