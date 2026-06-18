"use client";
import { Mail, Clock, Phone, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import { useModal } from "@/lib/modal-context";

export default function Contact() {
  const { open } = useModal();

  return (
    <section id="contact" className="bg-white border-t border-brand-border py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Col 1: Team card ── */}
          <div>
            {/* Logo + name */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl border-2 border-gold bg-gold-pale flex flex-col items-center justify-center leading-none">
                <span className="font-serif font-bold text-gold text-[11px]">ZM</span>
                <span className="font-serif font-bold text-gold text-[9px] tracking-widest mt-0.5">CO.</span>
              </div>
              <div>
                <p className="font-serif italic font-semibold text-[1rem] text-brand-dark leading-tight">
                  <span className="text-gold">Zm</span> CleanCo.
                </p>
                <p className="text-xs text-brand-soft">Lusaka, Zambia</p>
              </div>
            </div>

            {/* Live status */}
            <div className="flex items-center gap-2 mb-4">
              <span className="status-dot" />
              <span className="text-green-600 font-semibold text-sm">Open</span>
              <span className="text-brand-soft text-sm">• Closes at 6 PM</span>
            </div>

            {/* Info rows */}
            <ul className="space-y-2.5 text-sm text-brand-mid mb-6">
              {[
                { Icon: MapPin,  label: "Serving Lusaka & Surrounding Areas",  href: null },
                { Icon: Mail,    label: "info@zmcleanco.co.zm",                href: "mailto:info@zmcleanco.co.zm" },
                { Icon: Phone,   label: "+260 97X XXX XXX",                    href: "tel:+260970000000" },
                { Icon: Clock,   label: "Monday–Saturday, 7am–6pm",            href: null },
              ].map(({ Icon, label, href }) => (
                <li key={label} className="flex items-start gap-2.5">
                  <Icon size={14} strokeWidth={1.8} className="text-brand-soft mt-0.5 flex-shrink-0" />
                  {href
                    ? <a href={href} className="text-gold hover:underline">{label}</a>
                    : <span>{label}</span>}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => open("book")}
                className="bg-gold hover:bg-gold-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Book Standard Clean
              </button>
              <button
                onClick={() => open("quote")}
                className="border-2 border-gold text-gold text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gold-pale transition-colors"
              >
                Get Instant Quote
              </button>
            </div>
          </div>

          {/* ── Col 2: Get in touch ── */}
          <div className="bg-gold-pale rounded-2xl p-6">
            <h3 className="font-serif font-bold text-lg text-brand-dark mb-5">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3 mb-5">
              <a
                href="mailto:info@zmcleanco.co.zm"
                className="flex items-center gap-3 bg-white border border-brand-border rounded-xl px-4 py-3.5 hover:border-gold transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-gold-pale flex items-center justify-center flex-shrink-0">
                  <Mail size={16} strokeWidth={1.8} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-dark group-hover:text-gold transition-colors">
                    Email us
                  </p>
                  <p className="text-xs text-brand-soft">info@zmcleanco.co.zm</p>
                </div>
              </a>
              <a
                href="https://wa.me/260975229684"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white border border-brand-border rounded-xl px-4 py-3.5 hover:border-gold transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-gold-pale flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={16} strokeWidth={1.8} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-dark group-hover:text-gold transition-colors">
                    WhatsApp us
                  </p>
                  <p className="text-xs text-brand-soft">Quick replies, 7am–6pm</p>
                </div>
              </a>
            </div>

            <div className="border-t border-gold/20 pt-4">
              <p className="text-xs font-bold text-brand-soft uppercase tracking-widest mb-1.5">
                Operating Hours
              </p>
              <p className="text-sm text-brand-mid">Monday–Saturday, 7am–6pm</p>
            </div>
          </div>

          {/* ── Col 3: Quick Book ── */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-brand-dark mb-1.5">Quick Book</h3>
            <p className="text-sm text-brand-soft mb-5">
              Ready to book your cleaning service? Choose from our available time slots.
            </p>

            <div className="flex flex-col gap-3 mb-5">
              <button
                onClick={() => open("book")}
                className="w-full bg-gold hover:bg-gold-dark text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
              >
                Select Date &amp; Time
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full border-2 border-brand-border text-brand-mid font-semibold py-3 rounded-xl hover:border-gold hover:text-gold transition-colors"
              >
                View All Services
              </button>
            </div>

            <ul className="space-y-2 mb-5">
              {["Free consultation", "Flexible scheduling", "100% satisfaction guarantee"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-brand-soft">
                    <CheckCircle size={14} strokeWidth={2} className="text-gold flex-shrink-0" />
                    {item}
                  </li>
                )
              )}
            </ul>

            <p className="text-center text-xs text-brand-soft">
              Insured • Background-Checked • 100% Satisfaction Guaranteed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
