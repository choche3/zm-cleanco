"use client";
import { useState } from "react";
import { Star, ChevronRight, PenLine } from "lucide-react";
import { useModal } from "@/lib/modal-context";
import { REVIEWS } from "@/lib/data";

function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          className={i < n ? "fill-gold" : "fill-brand-border"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { open } = useModal();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? REVIEWS : REVIEWS.slice(0, 4);

  return (
    <section id="reviews" className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-gold uppercase mb-2">
            Testimonials
          </p>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-dark">
            Reviews
          </h2>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3">
          {/* Score */}
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-5xl text-brand-dark leading-none">
              5.0
            </span>
            <div>
              <Stars size={18} />
              <p className="text-brand-soft text-xs mt-1">{REVIEWS.length} reviews</p>
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1 text-gold text-sm font-semibold hover:underline"
            >
              {showAll ? "Show less" : "View all"}{" "}
              <ChevronRight size={13} strokeWidth={2.5} />
            </button>
            <span className="text-brand-border text-lg">|</span>
            <button
              onClick={() => open("review")}
              className="flex items-center gap-1.5 text-sm font-semibold text-gold border border-gold px-3 py-1.5 rounded-lg hover:bg-gold-pale transition-colors"
            >
              <PenLine size={13} strokeWidth={2} />
              Write a review
            </button>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {visible.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: r.color }}
              >
                {r.initials}
              </div>
              <div>
                <p className="font-semibold text-brand-dark text-[0.9rem]">{r.name}</p>
                <p className="text-brand-soft text-xs">
                  {r.date} · {r.neighbourhood}
                </p>
              </div>
            </div>
            <Stars />
            <p className="text-brand-mid text-sm leading-relaxed mt-3">{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
