import { createFileRoute, notFound } from "@tanstack/react-router";
import { categories, getByCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const c = categories.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${c?.title ?? "Shop"} — King Eyewear` },
        { name: "description", content: `Shop ${c?.title ?? "eyewear"} at King Eyewear Fashion.` },
      ],
    };
  },
  component: CategoryPage,
  loader: ({ params }) => {
    const c = categories.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { category: c, products: getByCategory(params.slug) };
  },
  notFoundComponent: () => <div className="container mx-auto px-4 py-20 text-center">Category not found.</div>,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();
  return (
    <div className="container mx-auto px-4 py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-2">Collection</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">{category.title}</h1>
      <p className="text-muted-foreground mb-10">{products.length} products</p>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
