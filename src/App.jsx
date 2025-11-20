import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Cart from "./components/Cart";

const dictionary = {
  en: {
    cart: "Cart",
    brand_title: "HIDE Knife Atelier",
    maker_name: "Hideichi Ihayazaka",
    brand_by: "Handmade in Japan by Hideichi Ihayazaka",
    hero_title: "One handcrafted blade to elevate everyday cooking",
    hero_sub:
      "Each knife is forged and finished by hand in Japan, made to perform and last.",
    shop_now: "View products",
    contact_us: "Contact",
    handmade: "Handmade in Japan",
    products: "Featured products",
    loading: "Loading…",
    add_to_cart: "Add to cart",
    contact_title: "Contact us",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sending: "Sending…",
    sent: "Thanks, your message has been sent.",
    error: "Something went wrong. Please try again.",
    footer_copy: "© 2025 HIDE Knife Atelier | All rights reserved.",
    empty_cart: "Your cart is empty",
    subtotal: "Subtotal",
    place_order: "Place order",
    placing_order: "Placing order…",
    order_success: "Thank you for your order. We'll email a confirmation.",
    order_error: "Something went wrong. Please try again.",
  },
  ja: {
    cart: "カート",
    brand_title: "ナイフ工房 HIDE",
    maker_name: "伊早坂秀一",
    brand_by: "日本の手仕事 — 伊早坂秀一",
    hero_title: "手仕事が生む、日常を豊かにする一本",
    hero_sub:
      "一本ずつ手仕事で鍛え、仕上げる包丁。毎日の台所で、長く、心地よく。",
    shop_now: "商品を見る",
    contact_us: "問い合わせ",
    handmade: "日本の手仕事",
    products: "おすすめ商品",
    loading: "読み込み中…",
    add_to_cart: "カートに入れる",
    contact_title: "お問い合わせ",
    name: "お名前",
    email: "メールアドレス",
    message: "メッセージ",
    send: "送信",
    sending: "送信中…",
    sent: "送信しました。ありがとうございます。",
    error: "エラーが発生しました。しばらくしてからお試しください。",
    footer_copy: "© 2025 ナイフ工房HIDE | 無断転載を禁じます。",
    empty_cart: "カートは空です",
    subtotal: "小計",
    place_order: "注文する",
    placing_order: "送信中…",
    order_success: "ご注文ありがとうございます。確認メールをお送りします。",
    order_error: "エラーが発生しました。もう一度お試しください。",
  },
};

function App() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => dictionary[lang], [lang]);

  // Cart state
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]); // [{sku, title, price, image, quantity}]

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((p) => p.sku === item.sku);
      if (found) {
        return prev.map((p) =>
          p.sku === item.sku ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (sku, qty) => {
    setCart((prev) => prev.map((p) => (p.sku === sku ? { ...p, quantity: qty } : p)));
  };
  const removeItem = (sku) => {
    setCart((prev) => prev.filter((p) => p.sku !== sku));
  };
  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((sum, it) => sum + it.quantity, 0), [cart]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar
        lang={lang}
        setLang={setLang}
        onCartOpen={() => setCartOpen(true)}
        t={t}
        cartCount={cartCount}
      />
      <Hero t={t} />
      <Products t={t} onAddToCart={addToCart} />
      <Contact t={t} lang={lang} />
      <footer className="border-t border-neutral-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-neutral-600">
          <p>{t.footer_copy}</p>
        </div>
      </footer>

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onClear={clearCart}
        t={t}
        lang={lang}
      />
    </div>
  );
}

export default App;
