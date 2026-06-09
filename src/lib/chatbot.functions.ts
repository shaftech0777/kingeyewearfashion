import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are the King Eyewear Fashion assistant — a polite, knowledgeable customer-care concierge for the brand "King Eyewear Fashion", a premium Pakistani eyewear store.

ABOUT THE BRAND:
- Owner: Mr. Mahad Ali. CEO: Naveed Ali. 20+ years of experience in the eyewear business.
- Location: Faisalabad Clock Tower Basement Kachari Bazar, Punjab, Pakistan.
- We sell one signature product: King Cartier Rimless Gold & Wood Eyewear (also known as Cheeta Magic Glasses).
- Tagline: "Crown your style".

THE PRODUCT:
- Name: King Cartier Rimless Gold & Wood Eyewear (Cheeta Magic Glasses).
- Price: PKR 1,650 with FREE delivery across Pakistan.
- Features: Rimless square aviator silhouette, 24K gold-tone metal bridge with signature panther temple detail, premium rosewood arms, photochromic lenses (clear indoors, tinted in sunlight), lightweight all-day fit.
- Includes: Premium case & cleaning cloth.
- Special offer: Allow to open — customer can check the product before paying.
- Payment: Cash on Delivery (COD) available across Pakistan.

DELIVERY:
- Delivery time: 3–5 working days across Pakistan.
- Free delivery on this product (PKR 1,650 total, no extra charges).
- Each order receives a tracking ID starting with "KE-" (e.g. KE-A1B2C3D4E5) shown on the order confirmation.

TRACKING:
- Customers can track their order on the /track page by entering the KE- tracking ID.
- Order statuses: Order Placed → Processing → Shipped → Out for Delivery → Delivered.

OWNER & CONTACT:
- Owner: Mahad Ali. CEO: Naveed Ali.
- Email: Kingeyewearfashion@gmail.com · Phone / WhatsApp: 03051544177.
- Store: Faisalabad Clock Tower Basement Kachari Bazar, Punjab, Pakistan.
- Hours: 24/7 Open.

Keep responses concise, friendly, and helpful. Only answer about this product, delivery, tracking, orders, and brand info. If you don't know something, suggest they contact Kingeyewearfashion@gmail.com or WhatsApp 03051544177.`;

export const askKingBot = createServerFn({ method: "POST" })
  .validator((d: { messages: Msg[] }) => d)
  .handler(async ({ data }) => {
    const last = data.messages.at(-1)?.content.toLowerCase() ?? "";

    if (last.includes("deliver") || last.includes("time") || last.includes("days")) {
      return { text: "Your King Cartier Rimless Eyewear order is delivered across Pakistan in 3–5 working days. Delivery is free, so total is PKR 1,650." };
    }

    if (last.includes("track") || last.includes("tracking") || last.includes("ke-")) {
      return { text: "After placing an order, you’ll get a tracking ID starting with KE-. Use it on the Track Order page to check status: Order Placed, Processing, Shipped, Out for Delivery, or Delivered." };
    }

    if (last.includes("open") || last.includes("check") || last.includes("pay") || last.includes("payment") || last.includes("cod")) {
      return { text: "Yes, Cash on Delivery is available. You can open and check the parcel first; if you like the product, then you can pay." };
    }

    if (last.includes("contact") || last.includes("whatsapp") || last.includes("phone") || last.includes("location")) {
      return { text: "You can contact King Eyewear Fashion on WhatsApp/Phone: 03051544177 or email Kingeyewearfashion@gmail.com. Store location: Faisalabad Clock Tower Basement Kachari Bazar. Open 24/7." };
    }

    return { text: `${SYSTEM}\n\nShort answer: King Cartier Rimless Gold & Wood Eyewear, also called Cheeta Magic Glasses, is PKR 1,650 with free delivery, COD, allow-to-open checking, and 3–5 working days delivery across Pakistan.` };
  });
