const url$5 = "/__l5e/assets-v1/82eaff75-25de-473d-b50a-04e0dae93b82/product-10.jpg";
const img10 = {
  url: url$5
};
const url$4 = "/__l5e/assets-v1/02e5b322-9f9d-41bc-902a-e1260be3300c/product-11.jpg";
const img11 = {
  url: url$4
};
const url$3 = "/__l5e/assets-v1/e0c17460-dd5e-45b8-b647-17d1e9594205/product-12.jpg";
const img12 = {
  url: url$3
};
const url$2 = "/__l5e/assets-v1/52e51aca-5e89-4015-8771-16feb48f42dc/product-13.jpg";
const img13 = {
  url: url$2
};
const url$1 = "/__l5e/assets-v1/672a3f9f-f0d9-43c3-856f-a46a571145f2/product-14.jpg";
const img14 = {
  url: url$1
};
const url = "/__l5e/assets-v1/87dc1068-b57e-4935-873b-7025ec5ac010/product-15.jpg";
const img15 = {
  url
};
const productImages = [img11.url, img14.url, img10.url, img13.url, img15.url, img12.url];
const product = {
  id: "king-cartier-rimless",
  name: "King Cartier Rimless Gold & Wood Eyewear",
  price: 1650,
  images: productImages,
  description: "Luxury rimless eyewear featuring a 24K gold-tone metal bridge with signature panther temple detail and premium rosewood arms. Photochromic lenses — clear indoors, tinted in sunlight. Made-in-Italy inspired craftsmanship. Also known as Cheeta Magic Glasses.",
  highlights: [
    "Rimless square aviator silhouette",
    "Gold-tone metal with rosewood temples",
    "Photochromic lenses (clear → tinted in sunlight)",
    "Lightweight & comfortable all-day fit",
    "Includes premium case & cleaning cloth",
    "Allow to open — check before you pay"
  ]
};
const formatPrice = (n) => `PKR ${n.toLocaleString("en-PK")}`;
export {
  product as a,
  formatPrice as f,
  productImages as p
};
