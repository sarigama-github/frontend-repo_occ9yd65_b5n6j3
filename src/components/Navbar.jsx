import { ShoppingCart, Globe2 } from "lucide-react";

export default function Navbar({ lang, setLang, onCartOpen, t }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/70 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 shadow ring-1 ring-white/20" />
          <div>
            <p className="text-white font-semibold tracking-tight">HIDE Knives</p>
            <p className="text-xs text-white/60">Handmade in Japan</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "ja" ? "en" : "ja")}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
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
          </button>
        </div>
      </div>
    </header>
  );
}
