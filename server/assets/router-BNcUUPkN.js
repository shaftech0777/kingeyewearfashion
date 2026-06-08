import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useRef } from "react";
import { Crown, ShoppingBag, X, Menu, Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "./server-Dznb2wd8.js";
import { Toaster } from "sonner";
import { z } from "zod";
const appCss = "/assets/styles-D3UYDtFD.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const KEY = "king-eyewear-cart";
function read() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}
function useCart() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(read());
    const h = () => setItems(read());
    window.addEventListener("cart-updated", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("cart-updated", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  const add = useCallback((item, qty = 1) => {
    const cur = read();
    const idx = cur.findIndex((i) => i.id === item.id);
    if (idx >= 0) cur[idx].qty += qty;
    else cur.push({ ...item, qty });
    write(cur);
  }, []);
  const remove = useCallback((id) => {
    write(read().filter((i) => i.id !== id));
  }, []);
  const setQty = useCallback((id, qty) => {
    const cur = read().map((i) => i.id === id ? { ...i, qty: Math.max(1, qty) } : i);
    write(cur);
  }, []);
  const clear = useCallback(() => write([]), []);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return { items, add, remove, setQty, clear, total, count };
}
const nav = [
  { to: "/", label: "Shop" },
  { to: "/track", label: "Track Order" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];
function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex h-16 items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Crown, { className: "h-6 w-6 text-[var(--gold)]" }),
        /* @__PURE__ */ jsx("span", { className: "font-display text-xl font-bold tracking-tight", children: "King Eyewear Fashion" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center gap-6 text-sm", children: nav.map((n) => /* @__PURE__ */ jsx(
        Link,
        {
          to: n.to,
          className: "text-foreground/80 hover:text-foreground transition-colors",
          activeProps: { className: "text-foreground font-medium" },
          children: n.label
        },
        n.to
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/cart", className: "relative p-2", children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "h-5 w-5" }),
          count > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)] text-[10px] font-semibold text-primary-foreground", children: count })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "lg:hidden p-2", onClick: () => setOpen(!open), "aria-label": "Menu", children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) })
      ] })
    ] }),
    open && /* @__PURE__ */ jsx("nav", { className: "lg:hidden border-t bg-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto flex flex-col px-4 py-2", children: nav.map((n) => /* @__PURE__ */ jsx(
      Link,
      {
        to: n.to,
        onClick: () => setOpen(false),
        className: "py-3 text-sm border-b last:border-0",
        children: n.label
      },
      n.to
    )) }) })
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxs("footer", { className: "border-t bg-primary text-primary-foreground mt-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx(Crown, { className: "h-5 w-5 text-[var(--gold)]" }),
          /* @__PURE__ */ jsx("span", { className: "font-display text-lg font-bold", children: "King Eyewear Fashion" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-80", children: "Crown your style. Premium luxury eyewear, handcrafted for kings & queens." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3 text-sm", children: "Quick Links" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm opacity-80", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Shop" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/track", children: "Track Order" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", children: "Contact" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3 text-sm", children: "Contact" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm opacity-80", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
            " 03051544177"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
            " Kingeyewearfashion@gmail.com"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
            " Faisalabad, Punjab, Pakistan"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-white/10 py-4 text-center text-xs opacity-70", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " King Eyewear Fashion. All rights reserved."
    ] })
  ] });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const askKingBot = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("4a9e4e225d88c2cfb9e67c2effb2466038d3dfd47dfbf2d8325249baf2b2404c"));
const SUGGESTIONS = [
  "What's the delivery time?",
  "How do I track my order?",
  "Tell me about this product",
  "Can I open & check before paying?"
];
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: "👑 Welcome to King Eyewear! I'm your style assistant. Ask me about the King Cartier Rimless Eyewear, delivery, order tracking, or payment." }
  ]);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);
  async function send(text) {
    if (!text.trim() || busy) return;
    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const reply = await askKingBot({ data: { messages: next } });
      setMsgs([...next, { role: "assistant", content: reply.text }]);
    } catch (e) {
      setMsgs([...next, { role: "assistant", content: "Sorry, I'm having trouble right now. Please reach us at Kingeyewearfashion@gmail.com or 03051544177." }]);
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen(!open),
        className: "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform",
        "aria-label": "Open chat",
        children: open ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6" })
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-24 right-6 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col rounded-xl border bg-card shadow-2xl", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-center gap-2 border-b p-4", children: [
        /* @__PURE__ */ jsx(Crown, { className: "h-5 w-5 text-[var(--gold)]" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: "King Assistant" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Online · Replies instantly" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
        msgs.map((m, i) => /* @__PURE__ */ jsx("div", { className: m.role === "user" ? "flex justify-end" : "", children: /* @__PURE__ */ jsx("div", { className: `max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`, children: m.content }) }, i)),
        busy && /* @__PURE__ */ jsx("div", { className: "bg-muted rounded-lg px-3 py-2 text-sm w-fit text-muted-foreground", children: "Thinking…" }),
        msgs.length === 1 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-2", children: SUGGESTIONS.map((s) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => send(s),
            className: "text-xs rounded-full border px-3 py-1 hover:bg-muted",
            children: s
          },
          s
        )) }),
        /* @__PURE__ */ jsx("div", { ref: endRef })
      ] }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            send(input);
          },
          className: "flex gap-2 border-t p-3",
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                value: input,
                onChange: (e) => setInput(e.target.value),
                placeholder: "Ask anything…",
                className: "flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: busy || !input.trim(),
                className: "flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-50",
                children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
              }
            )
          ]
        }
      )
    ] })
  ] });
}
const PHONE = "923051544177";
const MESSAGE = "Assalam o Alaikum! I'm interested in King Eyewear Fashion.";
function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Chat on WhatsApp",
      className: "fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl ring-4 ring-[#25D366]/30 hover:scale-110 transition-transform",
      children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "h-7 w-7", fill: "white" }),
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" })
      ]
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This page doesn't exist." }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Go home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong." }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$6 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "King Eyewear Fashion — Premium Sunglasses" },
      { name: "description", content: "Shop premium Men's Cheetah Magic Glasses Free delivery all over the Pakistan. PKR: 1650/" },
      { property: "og:title", content: "King Eyewear Fashion — Premium Sunglasses" },
      { name: "twitter:title", content: "King Eyewear Fashion — Premium Sunglasses" },
      { property: "og:description", content: "Shop premium Men's Cheetah Magic Glasses Free delivery all over the Pakistan. PKR: 1650/" },
      { name: "twitter:description", content: "Shop premium Men's Cheetah Magic Glasses Free delivery all over the Pakistan. PKR: 1650/" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5f3637d4-9966-46e5-9637-9533d20dae67" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5f3637d4-9966-46e5-9637-9533d20dae67" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Inter:wght@400;500;600&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$6.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(SiteFooter, {}),
    /* @__PURE__ */ jsx(WhatsAppButton, {}),
    /* @__PURE__ */ jsx(Chatbot, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-center", richColors: true })
  ] }) });
}
const $$splitComponentImporter$5 = () => import("./track-C0oo2dEn.js");
const search = z.object({
  id: z.string().optional()
});
const Route$5 = createFileRoute("/track")({
  head: () => ({
    meta: [{
      title: "Track Your Order — King Eyewear"
    }]
  }),
  validateSearch: search,
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./contact-ihc5iFIT.js");
const Route$4 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact Us — King Eyewear Fashion"
    }, {
      name: "description",
      content: "Get in touch with King Eyewear Fashion. Email, phone, and store address."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./checkout-Cv234D78.js");
const Route$3 = createFileRoute("/checkout")({
  head: () => ({
    meta: [{
      title: "Checkout — King Eyewear"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./cart-DKEUYAao.js");
const Route$2 = createFileRoute("/cart")({
  head: () => ({
    meta: [{
      title: "Your Cart — King Eyewear"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about-BjqFI9Bf.js");
const Route$1 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About Us — King Eyewear Fashion"
    }, {
      name: "description",
      content: "Learn about King Eyewear Fashion, founded by Mahad Ali in Faisalabad, Punjab, Pakistan."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-0QLylTuH.js");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "King Cartier Rimless Eyewear — King Eyewear Fashion"
    }, {
      name: "description",
      content: "Luxury rimless gold & rosewood eyewear with photochromic lenses. PKR 1,650 with free delivery across Pakistan."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TrackRoute = Route$5.update({
  id: "/track",
  path: "/track",
  getParentRoute: () => Route$6
});
const ContactRoute = Route$4.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$6
});
const CheckoutRoute = Route$3.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$6
});
const CartRoute = Route$2.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$6
});
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$6
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  CartRoute,
  CheckoutRoute,
  ContactRoute,
  TrackRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$5 as R,
  router as r,
  useCart as u
};
