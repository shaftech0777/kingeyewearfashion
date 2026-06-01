import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/product/$id" params={{ id: product.id }} className="group block">
      <div className="aspect-square overflow-hidden rounded-lg bg-muted">
        <img src={product.image} alt={product.name} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-sm">{product.name}</h3>
        <p className="text-sm text-[var(--gold)] font-semibold mt-1">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
