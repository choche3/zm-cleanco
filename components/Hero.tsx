"use client";
import { Sparkles, Clock, ShieldCheck } from "lucide-react";
import { useModal } from "@/lib/modal-context";

export default function Hero() {
  const { open } = useModal();
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle warm gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-pale/60 via-white to-white pointer-events-none" />
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/6 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32 flex flex-col items-center text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 bg-gold-pale border border-gold/30 text-gold-dark text-xs font-bold px-4 py-1.5 rounded-full mb-7 tracking-widest uppercase">
          🇿🇲 Proudly Zambian
        </div>

        {/* Main headline */}
        <h1 className="font-serif font-bold text-brand-dark leading-[1.1] mb-4">
          <span className="block text-5xl sm:text-6xl lg:text-7xl">Your Home,</span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl italic text-gold mt-1">Spotless.</span>
        </h1>

        <p className="text-brand-mid text-lg md:text-xl max-w-lg mb-7 leading-relaxed">
          Professional residential &amp; commercial cleaning across Lusaka and surrounding areas.
        </p>

        {/* Pro tip callout — matches original */}
        <div className="flex items-start gap-3 bg-white border border-brand-border border-l-4 border-l-gold rounded-xl px-5 py-3.5 mb-8 max-w-md text-sm text-brand-mid shadow-sm w-full">
          <span className="text-base mt-0.5">💡</span>
          <p>
            <strong className="text-brand-dark">Pro Tip:</strong> We recommend a{" "}
            <strong className="text-gold">Deep Cleaning</strong> for your first visit!
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => open("book")}
            className="bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-[0.95rem]"
          >
            Book a Cleaning
          </button>
          <button
            onClick={() => open("recurring")}
            className="bg-white hover:bg-gold-pale border-2 border-gold text-gold font-semibold px-8 py-3.5 rounded-xl transition-all text-[0.95rem]"
          >
            Recurring Plans
          </button>
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-brand-soft font-medium">
          {[
            { Icon: Sparkles,    label: "Professional service" },
            { Icon: Clock,       label: "24-7 Availability" },
            { Icon: ShieldCheck, label: "Vetted & Insured" },
          ].map(({ Icon, label }) => (
            <span key={label} className="flex items-center gap-2">
              <Icon size={15} strokeWidth={1.8} className="text-gold" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
