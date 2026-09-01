"use client";
import { Home, Sparkles, Truck, Building2, CalendarDays, HardHat, Users, CalendarClock, ArrowRight, type LucideIcon } from "lucide-react";
import { SERVICES } from "@/lib/data";

const ICON_MAP: Record<string, LucideIcon> = {
  Home, Sparkles, Truck, Building2, CalendarDays, HardHat, Users, CalendarClock,
};

// Scrolls down to the single Quote CTA that lives in the footer —
// this is the one and only place a quote can be requested on the site.
function scrollToQuote() {
  document.getElementById("quote-cta")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-[0.15em] text-gold uppercase mb-2">
          What We Offer
        </p>
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-dark mb-2">
          Our Services &amp; Pricing
        </h2>
        <p className="text-brand-soft text-[0.95rem] max-w-lg">
          Tailored cleaning for every space across Lusaka and Zambia.
        </p>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((svc) => {
          const Icon = ICON_MAP[svc.icon] ?? Home;
          return (
            <div
              key={svc.id}
              className="relative group bg-white border border-brand-border rounded-2xl p-6 flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Icon — large, gold, top-center on each card */}
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
              <p className="text-brand-soft text-[0.84rem] leading-relaxed text-center mb-5">
                {svc.subtitle}
              </p>

              {/* Fixed pricing — shown directly on the card */}
              {svc.priceTiers ? (
                <div className="mt-auto pt-3 border-t border-brand-border/60 space-y-1.5">
                  {svc.priceTiers.map((t) => (
                    <div key={t.label} className="flex items-center justify-between gap-3 text-[0.8rem]">
                      <span className="text-brand-soft">{t.label}</span>
                      <span className="font-bold text-brand-dark whitespace-nowrap">{t.price}</span>
                    </div>
                  ))}
                  {svc.priceNote && (
                    <p className="text-[0.72rem] text-gold-dark font-semibold pt-1">{svc.priceNote}</p>
                  )}
                </div>
              ) : (
                /* Custom-quote services — no per-card quote trigger.
                   Points down to the single quote request at the bottom of the page. */
                <div className="mt-auto pt-3 border-t border-brand-border/60">
                  <button
                    onClick={scrollToQuote}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="inline-flex items-center gap-1 bg-gold-pale text-gold-dark text-[0.72rem] font-bold px-3 py-1.5 rounded-full tracking-wide">
                      {svc.priceNote ?? "CUSTOM QUOTE"}
                    </span>
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      className="text-brand-soft group-hover:text-gold group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2"
                    />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
