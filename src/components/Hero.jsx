import { motion } from "framer-motion";

export default function Hero({ t }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_50%)]" />
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            {t.hero_title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-white/80 text-lg"
          >
            {t.hero_sub}
          </motion.p>
          <div className="mt-8 flex gap-3">
            <a href="#products" className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition">
              {t.shop_now}
            </a>
            <a href="#contact" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
              {t.contact_us}
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative"
        >
          <img src="/knife-hero.jpg" alt="HIDE Handmade Knife" className="w-full rounded-xl border border-white/10 shadow-2xl" />
          <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-emerald-950 text-xs font-semibold px-3 py-1 rounded-md">
            {t.handmade}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
