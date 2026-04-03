"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: form }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || "No output received.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className={"text-3xl font-bold mb-2 text-teal-400"}>AI Luxury Gift Guide</h1>
        <p className="text-gray-400 mb-8">Generate luxury travel and experiential gift recommendations</p>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="space-y-3">
          <select value={form.relationship || ""} onChange={e => setForm(f => ({...f, relationship: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Relationship to Recipient</option><option value="self">Gift for Self</option><option value="partner">Partner / Spouse</option><option value="parent">Parent</option><option value="sibling">Sibling</option><option value="friend">Close Friend</option><option value="colleague">Colleague / Boss</option><option value="client">Client / Business</option></select>
          <select value={form.occasionType || ""} onChange={e => setForm(f => ({...f, occasionType: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Occasion Type</option><option value="birthday">Birthday</option><option value="anniversary">Anniversary</option><option value="holiday">Holiday</option><option value="graduation">Graduation</option><option value="wedding">Wedding</option><option value="achievement">Achievement / Promotion</option><option value="just-because">Just Because</option></select>
          <select value={form.budgetRange || ""} onChange={e => setForm(f => ({...f, budgetRange: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Budget Range</option><option value="mid">$100 - $500</option><option value="premium">$500 - $2,000</option><option value="luxury">$2,000 - $10,000</option><option value="ultra-luxury">$10,000+</option></select>
          <textarea placeholder="wine, art, adventure, wellness, food, music..." value={form.recipientInterests || ""} onChange={e => setForm(f => ({...f, recipientInterests: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 h-20" />
          <select value={form.travelStyle || ""} onChange={e => setForm(f => ({...f, travelStyle: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Travel Style</option><option value="adventure">Adventure / Active</option><option value="relaxation">Relaxation / Spa</option><option value="cultural">Cultural / Historical</option><option value="culinary">Culinary / Food-Focused</option><option value="nature">Nature / Wildlife</option><option value="city">City / Urban</option></select>
          <select value={form.adventureVsRelaxation || ""} onChange={e => setForm(f => ({...f, adventureVsRelaxation: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Adventure vs Relaxation Balance</option><option value="adventure">Primarily Adventure</option><option value="relaxation">Primarily Relaxation</option><option value="balanced">Balanced Mix</option></select>
          <select value={form.foodWine || ""} onChange={e => setForm(f => ({...f, foodWine: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Food & Wine Interest</option><option value="high">High Interest / Enthusiast</option><option value="moderate">Moderate Interest</option><option value="low">Low Interest</option></select>
          <select value={form.seasonality || ""} onChange={e => setForm(f => ({...f, seasonality: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Seasonality</option><option value="spring">Spring</option><option value="summer">Summer</option><option value="fall">Fall</option><option value="winter">Winter</option><option value="any">Any Season</option></select>
          </div>
          <button type="submit" disabled={loading}
            className={"w-full py-3 px-6 rounded-lg font-semibold bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white transition"}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
        {error && <div className="p-4 rounded-lg bg-red-900/50 text-red-300">{error}</div>}
        {output && <div className="p-6 rounded-lg bg-gray-800 whitespace-pre-wrap text-gray-200 font-mono text-sm border border-gray-700">{output}</div>}
      </div>
    </div>
  );
}
