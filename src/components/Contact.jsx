import { useState } from "react";

export default function Contact({ t, lang }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const base = import.meta.env.VITE_BACKEND_URL || "";
      const res = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language: lang }),
      });
      const data = await res.json();
      setStatus(data.status === "ok" ? "success" : "error");
      if (data.status === "ok") setForm({ name: "", email: "", message: "" });
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{t.contact_title}</h2>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-6 bg-white/5 border border-white/10 p-6 rounded-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-1">{t.name}</label>
            <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-1">{t.email}</label>
            <input type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="block text-white/80 text-sm mb-1">{t.message}</label>
          <textarea value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} rows={6} className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500" required />
          <div className="mt-4 flex items-center gap-3">
            <button type="submit" className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">{t.send}</button>
            {status === "loading" && <span className="text-white/70 text-sm">{t.sending}</span>}
            {status === "success" && <span className="text-emerald-300 text-sm">{t.sent}</span>}
            {status === "error" && <span className="text-red-300 text-sm">{t.error}</span>}
          </div>
        </div>
      </form>
    </section>
  );
}
