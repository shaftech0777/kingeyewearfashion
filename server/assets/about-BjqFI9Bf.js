import { jsxs, jsx } from "react/jsx-runtime";
import { Crown, Users, Award, Globe } from "lucide-react";
function About() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-16 max-w-4xl", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-[var(--gold)] mb-3", children: "Our Story" }),
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-6", children: "About King Eyewear Fashion" }),
    /* @__PURE__ */ jsxs("p", { className: "text-lg text-muted-foreground leading-relaxed", children: [
      "Founded by ",
      /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Mr. Mahad Ali" }),
      " in the heart of Faisalabad, Punjab, Pakistan, King Eyewear Fashion was born from a simple belief — that every person deserves to feel like royalty when they put on their glasses."
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: "What began as a small boutique in Faisalabad has grown into one of Pakistan's most trusted premium eyewear destinations, serving over 100,000 customers across the country and abroad. We curate sunglasses, prescription eyeglasses (in both positive + and negative − powers), contact lenses, and a vibrant kids' collection — all crafted with precision, polished with care, and priced honestly." }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-2 md:grid-cols-4 gap-6", children: [{
      icon: Crown,
      n: "20+",
      l: "Years Experience"
    }, {
      icon: Users,
      n: "100K+",
      l: "Customers"
    }, {
      icon: Award,
      n: "500+",
      l: "Designs"
    }, {
      icon: Globe,
      n: "Pan-Pakistan",
      l: "Delivery"
    }].map(({
      icon: Icon,
      n,
      l
    }) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-5 text-center", children: [
      /* @__PURE__ */ jsx(Icon, { className: "mx-auto h-6 w-6 text-[var(--gold)]" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 font-display text-2xl font-bold", children: n }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: l })
    ] }, l)) }),
    /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold mt-16 mb-4", children: "Our Promise" }),
    /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsx("li", { children: "• Premium hand-finished frames sourced from Italy, Japan, and India." }),
      /* @__PURE__ */ jsx("li", { children: "• All prescriptions — single vision, bifocal, progressive, blue-light, and photochromic." }),
      /* @__PURE__ */ jsx("li", { children: "• 7-day easy returns and a full 1-year warranty on every frame." }),
      /* @__PURE__ */ jsx("li", { children: "• Free standard delivery across Pakistan on orders above PKR 2,000." })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold mt-12 mb-4", children: "Our Team" }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-6 bg-muted/30", children: [
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: "Mahad Ali" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Owner, King Eyewear Fashion" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "CEO: Naveed Ali" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm italic", children: `"Eyewear is the only accessory people look through — and the first thing the world sees on you. That's why we obsess over every detail."` })
    ] })
  ] });
}
export {
  About as component
};
