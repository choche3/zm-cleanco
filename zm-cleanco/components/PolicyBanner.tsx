"use client";
import { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import { POLICIES } from "@/lib/data";

export default function PolicyBanner() {
  const [gone, setGone] = useState(false);
  if (gone) return null;

  return (
    <section id="policy" className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="relative bg-white border border-brand-border rounded-2xl p-7 md:p-9 shadow-sm">
        {/* Close */}
        <button
          onClick={() => setGone(true)}
          className="absolute top-4 right-4 text-brand-soft hover:text-brand-dark transition-colors"
        >
          <X size={18} />
        </button>

        <h2 className="font-serif font-bold text-2xl text-brand-dark mb-5">
          Our Booking Policy
        </h2>

        <ul className="space-y-3.5 mb-6">
          {POLICIES.map((p) => (
            <li key={p.title} className="flex items-start gap-3 text-[0.93rem] text-brand-mid">
              <CheckCircle
                size={17}
                strokeWidth={2}
                className="text-gold mt-0.5 flex-shrink-0"
              />
              <span>
                <strong className="text-brand-dark">{p.title}</strong> {p.body}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-brand-soft mb-6">
          We respect your time — thank you for respecting ours.
        </p>

        <button
          onClick={() => setGone(true)}
          className="bg-gold hover:bg-gold-dark text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Okay, got it
        </button>
      </div>
    </section>
  );
}
