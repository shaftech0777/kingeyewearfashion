import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { u as useCart } from "./router-BNcUUPkN.js";
import { f as formatPrice } from "./products-Du1PDuTS.js";
import { ShoppingBag, Trash2 } from "lucide-react";
import "@tanstack/react-query";
import "react";
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
function CartPage() {
  const {
    items,
    remove,
    setQty,
    total
  } = useCart();
  if (items.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsx(ShoppingBag, { className: "mx-auto h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 font-display text-3xl font-bold", children: "Your cart is empty" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Discover our latest collection." }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-6 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground", children: "Continue Shopping" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold mb-8", children: "Your Cart" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-10 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-4", children: items.map((i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 rounded-lg border p-4", children: [
        /* @__PURE__ */ jsx("img", { src: i.image, alt: "", className: "h-24 w-24 rounded-md object-cover" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: i.name }),
          /* @__PURE__ */ jsx("p", { className: "text-[var(--gold)] font-semibold mt-1", children: formatPrice(i.price) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center rounded-md border", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => setQty(i.id, i.qty - 1), className: "px-3 py-1", children: "−" }),
              /* @__PURE__ */ jsx("span", { className: "w-8 text-center text-sm", children: i.qty }),
              /* @__PURE__ */ jsx("button", { onClick: () => setQty(i.id, i.qty + 1), className: "px-3 py-1", children: "+" })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => remove(i.id), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: formatPrice(i.price * i.qty) })
      ] }, i.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "h-fit rounded-lg border p-6 space-y-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-xl font-bold", children: "Order Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsx("span", { children: formatPrice(total) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Shipping" }),
          /* @__PURE__ */ jsx("span", { className: "text-green-600 font-medium", children: "Free" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-t pt-3 font-semibold", children: [
          /* @__PURE__ */ jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsx("span", { children: formatPrice(total) })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/checkout", className: "block w-full text-center rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground", children: "Proceed to Checkout" })
      ] })
    ] })
  ] });
}
export {
  CartPage as component
};
