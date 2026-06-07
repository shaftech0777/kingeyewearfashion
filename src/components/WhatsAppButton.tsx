import { MessageCircle } from "lucide-react";

const PHONE = "923051544177"; // intl format without + (PK)
const MESSAGE = "Assalam o Alaikum! I'm interested in King Eyewear Fashion.";

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl ring-4 ring-[#25D366]/30 hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />
    </a>
  );
}
