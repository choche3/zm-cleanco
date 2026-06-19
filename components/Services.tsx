"use client";
import { Home, Sparkles, Truck, Building2, CalendarDays, HardHat, ChevronRight, type LucideIcon } from "lucide-react";
import { useModal } from "@/lib/modal-context";
import { SERVICES } from "@/lib/data";

const ICON_MAP: Record<string, LucideIcon> = {
  Home, Sparkles, Truck, Building2, CalendarDays, HardHat,
};

export default function Services() {
  const { open } = useModal();

  return (
    <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-[0.15em] text-gold uppercase mb-2">
          What We Offer
        </p>
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-dark mb-2">
          Specialized &amp; Quote Services
        </h2>
        <p className="text-brand-soft text-[0.95rem] max-w-lg">
          Tailored cleaning for every space across Lusaka and Zambia.
        </p>
      </div>

      {/* 3-column grid matching screenshot exactly */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((svc) => {
          const Icon = ICON_MAP[svc.icon] ?? Home;
          return (
            <div
              key={svc.id}
              onClick={() => svc.hasQuote && open("quote", svc.id)}
              className={`relative group bg-white border border-brand-border rounded-2xl p-6 flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${svc.hasQuote ? "cursor-pointer" : ""}`}
            >
              {/* Tiny sparkle decoration top-right (visible on quote cards) */}
              {svc.hasQuote && (
                <Sparkles
                  size={12}
                  strokeWidth={1.5}
                  className="absolute top-4 right-4 text-gold/25"
                />
              )}

              {/* Icon — large, gold, top-center on each card like screenshot */}
              <div className="mb-5 flex justify-center">
                <Icon
                  size={40}
                  strokeWidth={1.3}
                  className="text-gold group-hover:text-gold-dark transition-colors"
                />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-[1rem] text-brand-dark mb-1.5 text-center">
                {svc.title}
              </h3>

              {/* Subtitle */}
              <p className="text-brand-soft text-[0.84rem] leading-relaxed text-center flex-1 mb-5">
                {svc.subtitle}
              </p>

              {/* INSTANT QUOTE pill + chevron — only on quote services */}
              {svc.hasQuote && (
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-border/60">
                  <span className="inline-flex items-center gap-1 bg-gold-pale text-gold-dark text-[0.72rem] font-bold px-3 py-1.5 rounded-full tracking-wide">
                    INSTANT QUOTE
                  </span>
                  <ChevronRight
                    size={16}
                    strokeWidth={2}
                    className="text-brand-soft group-hover:text-gold group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
