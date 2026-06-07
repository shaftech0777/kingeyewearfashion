import { createFileRoute } from "@tanstack/react-router";
import { Crown, Award, Users, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — King Eyewear Fashion" },
      { name: "description", content: "Learn about King Eyewear Fashion, founded by Mahad Ali in Faisalabad, Punjab, Pakistan." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] mb-3">Our Story</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">About King Eyewear Fashion</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        Founded in 2015 by <strong className="text-foreground">Mr. Rajveer Singh</strong> in the heart of Faisalabad, Punjab, Pakistan,
        King Eyewear Fashion was born from a simple belief — that every person deserves to feel like royalty when they put on their glasses.
      </p>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        What began as a small boutique in Faisalabad has grown into one of Pakistan's most trusted premium eyewear destinations,
        serving over 100,000 customers across the country and abroad. We curate sunglasses, prescription eyeglasses
        (in both positive + and negative − powers), contact lenses, and a vibrant kids' collection — all crafted with
        precision, polished with care, and priced honestly.
      </p>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Crown, n: "9+", l: "Years" },
          { icon: Users, n: "100K+", l: "Customers" },
          { icon: Award, n: "500+", l: "Designs" },
          { icon: Globe, n: "Pan-Pakistan", l: "Delivery" },
        ].map(({ icon: Icon, n, l }) => (
          <div key={l} className="rounded-lg border p-5 text-center">
            <Icon className="mx-auto h-6 w-6 text-[var(--gold)]" />
            <p className="mt-3 font-display text-2xl font-bold">{n}</p>
            <p className="text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl font-bold mt-16 mb-4">Our Promise</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li>• Premium hand-finished frames sourced from Italy, Japan, and India.</li>
        <li>• All prescriptions — single vision, bifocal, progressive, blue-light, and photochromic.</li>
        <li>• 7-day easy returns and a full 1-year warranty on every frame.</li>
        <li>• Free standard delivery across Pakistan on orders above PKR 2,000.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12 mb-4">Owner</h2>
      <div className="rounded-lg border p-6 bg-muted/30">
        <p className="font-semibold text-lg">Rajveer Singh</p>
        <p className="text-sm text-muted-foreground">Founder & CEO, King Eyewear Fashion</p>
        <p className="mt-3 text-sm italic">"Eyewear is the only accessory people look through — and the first thing the world sees on you. That's why we obsess over every detail."</p>
      </div>
    </div>
  );
}
