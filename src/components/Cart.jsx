import { useMemo, useState } from "react";
import { X, Trash2 } from "lucide-react";

export default function Cart({ open, onClose, items, onUpdateQty, onRemove, onClear, t, lang }) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    notes: "",
  });

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  );

  const nf = useMemo(
    () => new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }),
    []
  );

  const checkout = async (e) => {
    e.preventDefault();
    if (!items.length) return;
    setSubmitting(true);
    setStatus(null);
    try {
      const base = import.meta.env.VITE_BACKEND_URL || "";
      const payload = {
        items: items.map((it) => ({ sku: it.sku, quantity: it.quantity, price: it.price })),
        customer,
        currency: "JPY",
        language: lang,
      };
      const res = await fetch(`${base}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status === "ok") {
        setStatus("success");
        onClear();
      } else {
        setStatus("error");
      }
    } catch (e) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl border-l border-neutral-200 transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">{t.cart}</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-neutral-100">
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[45%]">
          {items.length === 0 && (
            <p className="text-neutral-500 text-sm">{lang === "ja" ? "カートは空です" : "Your cart is empty"}</p>
          )}
          {items.map((it) => (
            <div key={it.sku} className="flex gap-3 border border-neutral-200 rounded-lg p-3">
              <img src={it.image || "/knife-hero.jpg"} alt={it.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">{it.title}</p>
                <p className="text-sm text-neutral-600">{nf.format(it.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQty(it.sku, Math.max(1, it.quantity - 1))}
                    className="px-2 py-1 rounded border border-neutral-300 hover:bg-neutral-100"
                  >
                    -
                  </button>
                  <span className="text-sm w-8 text-center">{it.quantity}</span>
                  <button
                    onClick={() => onUpdateQty(it.sku, it.quantity + 1)}
                    className="px-2 py-1 rounded border border-neutral-300 hover:bg-neutral-100"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemove(it.sku)}
                    className="ml-auto inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" /> {lang === "ja" ? "削除" : "Remove"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary + Checkout */}
        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-600">{lang === "ja" ? "小計" : "Subtotal"}</span>
            <span className="text-base font-semibold text-neutral-900">{nf.format(subtotal)}</span>
          </div>

          <form onSubmit={checkout} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder={lang === "ja" ? "お名前" : "Name"}
                className="col-span-2 rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="col-span-2 rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                required
              />
              <input
                placeholder={lang === "ja" ? "住所" : "Address"}
                className="col-span-2 rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                required
              />
              <input
                placeholder={lang === "ja" ? "市区町村" : "City"}
                className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={customer.city}
                onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                required
              />
              <input
                placeholder={lang === "ja" ? "国" : "Country"}
                className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={customer.country}
                onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                required
              />
              <textarea
                placeholder={lang === "ja" ? "ご要望・備考" : "Notes"}
                className="col-span-2 rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={submitting || items.length === 0}
              className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 disabled:opacity-60"
            >
              {submitting ? (lang === "ja" ? "送信中…" : "Placing order…") : (lang === "ja" ? "注文する" : "Place order")}
            </button>

            {status === "success" && (
              <p className="text-emerald-600 text-sm">
                {lang === "ja" ? "ご注文ありがとうございます。確認メールをお送りします。" : "Thank you for your order. We'll email a confirmation."}
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-sm">
                {lang === "ja" ? "エラーが発生しました。もう一度お試しください。" : "Something went wrong. Please try again."}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
