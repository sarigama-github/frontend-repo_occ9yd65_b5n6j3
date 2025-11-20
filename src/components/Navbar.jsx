import { ShoppingCart, Globe2 } from "lucide-react";

export default function Navbar({ lang, setLang, onCartOpen, t, cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 shadow ring-1 ring-black/5" />
          <div>
            <p className="text-neutral-900 font-semibold tracking-tight">{t.brand_title}</p>
            <p className="text-xs text-neutral-500">{t.brand_by}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "ja" ? "en" : "ja")}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-50 border border-neutral-200 transition"
          >
            <Globe2 className="w-4 h-4" />
            <span className="text-sm">{lang === "ja" ? "EN" : "日本語"}</span>
          </button>
          <button
            onClick={onCartOpen}
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">{t.cart}</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-rose-600 text-white text-xs font-semibold flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
