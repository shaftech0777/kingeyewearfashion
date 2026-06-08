import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { p as productImages, a as product, f as formatPrice } from "./products-Du1PDuTS.js";
import { u as useCart } from "./router-BNcUUPkN.js";
import { ArrowLeft, ArrowRight, Crown, Star, Truck, Check, Sparkles, Award } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { toast } from "sonner";
import useEmblaCarousel from "embla-carousel-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import Autoplay from "embla-carousel-autoplay";
import "@tanstack/react-query";
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
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const onSelect = React.useCallback((api2) => {
    if (!api2) {
      return;
    }
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }
    setApi(api);
  }, [api, setApi]);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          ...props,
          children
        }
      )
    }
  );
});
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        ),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute  h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
function ProductPage() {
  const {
    add
  } = useCart();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);
  function buyNow() {
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    }, qty);
    toast.success("Proceeding to checkout");
    nav({
      to: "/checkout"
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-background", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-primary text-primary-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,168,76,0.25),transparent_60%)]" }),
      /* @__PURE__ */ jsxs("div", { className: "container relative mx-auto px-4 py-10 md:py-14 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[var(--gold)] tracking-[0.3em] text-[10px] md:text-xs uppercase mb-3", children: "King Eyewear · Luxury Collection" }),
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-3xl md:text-5xl font-bold leading-tight", children: [
          "Crown your ",
          /* @__PURE__ */ jsx("span", { className: "italic text-[var(--gold)]", children: "style" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm md:text-base opacity-80 max-w-xl mx-auto", children: "One masterpiece. Handcrafted gold & rosewood. Photochromic lenses." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "container mx-auto px-4 py-10 md:py-16", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-10 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Carousel, { opts: {
        loop: true
      }, plugins: [Autoplay({
        delay: 2800,
        stopOnInteraction: false
      })], className: "overflow-hidden rounded-2xl ring-1 ring-[var(--gold)]/30 shadow-2xl", children: [
        /* @__PURE__ */ jsx(CarouselContent, { children: productImages.map((src, i) => /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsx("div", { className: "aspect-square bg-muted", children: /* @__PURE__ */ jsx("img", { src, alt: `${product.name} ${i + 1}`, className: "h-full w-full object-cover" }) }) }, i)) }),
        /* @__PURE__ */ jsx(CarouselPrevious, { className: "left-3" }),
        /* @__PURE__ */ jsx(CarouselNext, { className: "right-3" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:pt-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]", children: [
          /* @__PURE__ */ jsx(Crown, { className: "h-3.5 w-3.5" }),
          " King Eyewear Fashion"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-3xl md:text-4xl font-bold leading-tight", children: product.name }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
          [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" }, i)),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "(248 reviews)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-end gap-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold text-[var(--gold)]", children: formatPrice(product.price) }),
          /* @__PURE__ */ jsxs("span", { className: "mb-1 inline-flex items-center gap-1 rounded-full bg-green-500/10 text-green-600 px-3 py-1 text-xs font-semibold", children: [
            /* @__PURE__ */ jsx(Truck, { className: "h-3 w-3" }),
            " Free Delivery"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-muted-foreground leading-relaxed", children: product.description }),
        /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-2", children: product.highlights.map((h) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 mt-0.5 text-[var(--gold)] shrink-0" }),
          " ",
          h
        ] }, h)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-7 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center rounded-md border", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setQty(Math.max(1, qty - 1)), className: "px-4 py-2.5", children: "−" }),
            /* @__PURE__ */ jsx("span", { className: "w-10 text-center text-sm font-medium", children: qty }),
            /* @__PURE__ */ jsx("button", { onClick: () => setQty(qty + 1), className: "px-4 py-2.5", children: "+" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Cash on Delivery available" })
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: buyNow, className: "mt-5 w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[var(--gold)] via-amber-400 to-amber-500 px-8 py-5 text-lg md:text-xl font-extrabold text-primary uppercase tracking-wider shadow-2xl hover:opacity-95 hover:scale-[1.02] transition-all ring-2 ring-[var(--gold)]/40", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6" }),
          " Buy Now — ",
          formatPrice(product.price)
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-3 gap-3 border-t pt-6", children: [
          /* @__PURE__ */ jsx(Feature, { icon: Truck, title: "Free Delivery", desc: "Pan-Pakistan" }),
          /* @__PURE__ */ jsx(Feature, { icon: Award, title: "Premium Quality", desc: "Luxury craft" }),
          /* @__PURE__ */ jsx(Feature, { icon: Crown, title: "Open & Check", desc: "Pay after check" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-muted/30 py-14", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl md:text-3xl font-bold text-center mb-2", children: "Crafted in every detail" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground mb-8 text-sm", children: "Indoor clarity. Sunlight tint. Pure luxury." }),
      /* @__PURE__ */ jsxs(Carousel, { opts: {
        loop: true,
        align: "start"
      }, plugins: [Autoplay({
        delay: 2200,
        stopOnInteraction: false
      })], className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx(CarouselContent, { children: productImages.map((src, i) => /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3", children: /* @__PURE__ */ jsx("div", { className: "aspect-square overflow-hidden rounded-xl bg-background ring-1 ring-[var(--gold)]/20", children: /* @__PURE__ */ jsx("img", { src, alt: "", loading: "lazy", className: "h-full w-full object-cover" }) }) }, i)) }),
        /* @__PURE__ */ jsx(CarouselPrevious, {}),
        /* @__PURE__ */ jsx(CarouselNext, {})
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "container mx-auto px-4 py-14 text-center", children: [
      /* @__PURE__ */ jsx(Crown, { className: "mx-auto h-10 w-10 text-[var(--gold)] mb-3" }),
      /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl md:text-3xl font-bold", children: "Wear the Crown." }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground max-w-md mx-auto text-sm", children: "Only PKR 1,650 — with free delivery anywhere in Pakistan. Cash on Delivery available." }),
      /* @__PURE__ */ jsxs("button", { onClick: buyNow, className: "mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-500 px-10 py-4 text-base font-bold text-primary hover:opacity-90 shadow-lg", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }),
        " Order Now — PKR 1,650"
      ] })
    ] })
  ] });
}
function Feature({
  icon: Icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx(Icon, { className: "mx-auto h-5 w-5 text-[var(--gold)]" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-semibold", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground", children: desc })
  ] });
}
export {
  ProductPage as component
};
