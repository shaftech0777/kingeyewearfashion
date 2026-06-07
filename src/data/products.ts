import img10 from "@/assets/product/img-10.jpg.asset.json";
import img11 from "@/assets/product/img-11.jpg.asset.json";
import img12 from "@/assets/product/img-12.jpg.asset.json";
import img13 from "@/assets/product/img-13.jpg.asset.json";
import img14 from "@/assets/product/img-14.jpg.asset.json";
import img15 from "@/assets/product/img-15.jpg.asset.json";

export const productImages = [img11.url, img14.url, img10.url, img13.url, img15.url, img12.url];

export const product = {
  id: "king-cartier-rimless",
  name: "King Cartier Rimless Gold & Wood Eyewear",
  price: 1650,
  images: productImages,
  description:
    "Luxury rimless eyewear featuring a 24K gold-tone metal bridge with signature panther temple detail and premium rosewood arms. Photochromic lenses — clear indoors, tinted in sunlight. Made-in-Italy inspired craftsmanship.",
  highlights: [
    "Rimless square aviator silhouette",
    "Gold-tone metal with rosewood temples",
    "Photochromic lenses (clear → tinted in sunlight)",
    "Lightweight & comfortable all-day fit",
    "Includes premium case & cleaning cloth",
  ],
};

export const formatPrice = (n: number) => `PKR ${n.toLocaleString("en-PK")}`;
