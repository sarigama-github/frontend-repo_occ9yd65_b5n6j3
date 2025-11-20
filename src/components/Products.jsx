import { useEffect, useState } from "react";

export default function Products({ t }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || "";
        const res = await fetch(`${base}/api/products`);
        const data = await res.json();
        setItems(data);
      } catch (e) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{t.products}</h2>
      {loading && <p className="text-white/70">{t.loading}</p>}
      {error && <p className="text-red-300">{error}</p>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((p) => (
          <article key={p.sku || p._id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <img src={p.image || "/knife-hero.jpg"} alt={p.title} className="w-full h-44 object-cover" />
            <div className="p-4">
              <h3 className="text-white font-medium">{p.title}</h3>
              <p className="text-white/70 text-sm line-clamp-2 mt-1">{p.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-white font-semibold">¥{p.price.toLocaleString()}</span>
                <button className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm">
                  {t.add_to_cart}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
