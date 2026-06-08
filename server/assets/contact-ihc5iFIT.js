import { jsxs, jsx } from "react/jsx-runtime";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
function Contact() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-16 max-w-5xl", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-[var(--gold)] mb-3", children: "Get in touch" }),
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-8", children: "Contact Us" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-5", children: [{
        icon: Mail,
        l: "Email",
        v: "Kingeyewearfashion@gmail.com"
      }, {
        icon: Phone,
        l: "Phone / WhatsApp",
        v: "03051544177"
      }, {
        icon: MapPin,
        l: "Flagship Store",
        v: "Faisalabad Clock Tower Basement Kachari Bazar"
      }, {
        icon: Clock,
        l: "Hours",
        v: "24/7 Open"
      }].map(({
        icon: Icon,
        l,
        v
      }) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)]/20 text-[var(--gold)]", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: l }),
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: v })
        ] })
      ] }, l)) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        toast.success("Message sent! We'll get back to you within 24 hours.");
        e.currentTarget.reset();
      }, className: "rounded-lg border p-6 space-y-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-xl font-bold", children: "Send us a message" }),
        /* @__PURE__ */ jsx("input", { required: true, name: "name", placeholder: "Your name", className: "w-full rounded-md border bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsx("input", { required: true, type: "email", name: "email", placeholder: "Email", className: "w-full rounded-md border bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsx("input", { name: "subject", placeholder: "Subject", className: "w-full rounded-md border bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsx("textarea", { required: true, name: "message", placeholder: "Message", rows: 5, className: "w-full rounded-md border bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsx("button", { className: "w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground", children: "Send Message" })
      ] })
    ] })
  ] });
}
export {
  Contact as component
};
