import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Contact from "./components/Contact";

const dictionary = {
  ja: {
    cart: "カート",
    hero_title: "手仕事が生む、日常を豊かにする一本",
    hero_sub: "ナイフ工房HIDEは、伊早坂秀一が一本ずつ鍛え上げる包丁ブランド。素材の良さと研ぎ澄まされた切れ味を世界へ。",
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
    footer_copy: "© 2025 ナイフ工房HIDE | すべての写真・文章の無断転載を禁じます。",
  },
  en: {
    cart: "Cart",
    hero_title: "One handcrafted blade to elevate everyday cooking",
    hero_sub: "HIDE Knife Atelier by Shuichi Isayazaka. Each knife is forged and finished by hand in Japan, made to perform and last.",
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
  },
};

function App() {
  const [lang, setLang] = useState("ja");
  const t = useMemo(() => dictionary[lang], [lang]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <Navbar lang={lang} setLang={setLang} onCartOpen={()=>alert("Cart coming soon") } t={t} />
      <Hero t={t} />
      <Products t={t} />
      <Contact t={t} lang={lang} />
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-white/70">
          <p>{t.footer_copy}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
