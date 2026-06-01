import { useEffect, useState, useCallback } from "react";

export type CartItem = { id: string; name: string; price: number; image: string; qty: number };

const KEY = "king-eyewear-cart";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

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

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    const cur = read();
    const idx = cur.findIndex((i) => i.id === item.id);
    if (idx >= 0) cur[idx].qty += qty;
    else cur.push({ ...item, qty });
    write(cur);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const cur = read().map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
    write(cur);
  }, []);

  const clear = useCallback(() => write([]), []);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return { items, add, remove, setQty, clear, total, count };
}
