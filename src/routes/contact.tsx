import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — King Eyewear Fashion" },
      { name: "description", content: "Get in touch with King Eyewear Fashion. Email, phone, and store address." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] mb-3">Get in touch</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Contact Us</h1>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          {[
            { icon: Mail, l: "Email", v: "Kingeyewearfashion@gmail.com" },
            { icon: Phone, l: "Phone / WhatsApp", v: "03051544177" },
            { icon: MapPin, l: "Flagship Store", v: "Shop 203, D-Ground, Faisalabad, Punjab, Pakistan" },
            { icon: Clock, l: "Hours", v: "Mon–Sat · 10:00 AM – 9:00 PM" },
          ].map(({ icon: Icon, l, v }) => (
            <div key={l} className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)]/20 text-[var(--gold)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{l}</p>
                <p className="font-medium">{v}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll get back to you within 24 hours."); (e.currentTarget as HTMLFormElement).reset(); }}
          className="rounded-lg border p-6 space-y-4">
          <h2 className="font-display text-xl font-bold">Send us a message</h2>
          <input required name="name" placeholder="Your name" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
          <input required type="email" name="email" placeholder="Email" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
          <input name="subject" placeholder="Subject" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
          <textarea required name="message" placeholder="Message" rows={5} className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
          <button className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground">Send Message</button>
        </form>
      </div>
    </div>
  );
}
