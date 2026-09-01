"use client";
import Image from "next/image";
import { Mail, Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { useModal } from "@/lib/modal-context";

const FOOTER_AREAS = [
  "Lusaka", "Kabulonga", "Woodlands", "Ibex Hill",
  "Rhodespark", "Chelstone", "Avondale", "Roma", "+ More",
];

export default function Footer() {
  const { open } = useModal();
  return (
    <footer className="bg-brand-dark text-white">
      {/* Grow together banner */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-gold uppercase mb-1">
              Partner With Us
            </p>
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-white">
              Let&apos;s grow together
            </h3>
            <p className="text-white/50 text-sm mt-1 max-w-sm">
              Get more customers 24/7 with professional cleaning services across Lusaka.
            </p>
          </div>
          <button
            onClick={() => open("book")}
            className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg flex-shrink-0"
          >
            Get Started <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/radiant-rose-icon.png"
              alt="Radiant Rose Cleaning Services"
              width={40}
              height={44}
              className="w-10 h-auto flex-shrink-0"
            />
            <div>
              <p className="font-serif italic font-semibold text-white text-[1rem]">
                Radiant Rose <span className="text-gold">Cleaning Services</span>
              </p>
              <p className="text-white/40 text-[0.65rem] tracking-widest uppercase">
                Excellence In Every Clean
              </p>
            </div>
          </div>
          <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-5">
            Professional residential and commercial cleaning across Lusaka and Zambia.
            Reliable, spotless, and proudly Zambian. 🇿🇲
          </p>
          <div className="flex flex-wrap gap-2">
            {["Insured", "Vetted Staff", "100% Guaranteed"].map((b) => (
              <span
                key={b}
                className="bg-white/6 border border-white/10 text-white/40 text-xs px-3 py-1 rounded-full"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Service Areas */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Service Areas</h4>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
            {FOOTER_AREAS.map((a) => (
              <li key={a} className="text-white/45 text-sm hover:text-white/70 transition-colors">
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Contact Info</h4>
          <ul className="space-y-3 mb-6">
            {[
              { Icon: Mail,   text: "info@radiantrosecleaning.co.zm", href: "mailto:info@radiantrosecleaning.co.zm" },
              { Icon: Phone,  text: "+260 97X XXX XXX",     href: "tel:+260970000000" },
              { Icon: Clock,  text: "Mon–Sat, 7am–6pm",     href: null },
              { Icon: MapPin, text: "Lusaka, Zambia",        href: null },
            ].map(({ Icon, text, href }) => (
              <li key={text} className="flex items-center gap-2.5 text-sm text-white/45">
                <Icon size={14} strokeWidth={1.8} className="text-gold/70 flex-shrink-0" />
                {href
                  ? <a href={href} className="hover:text-white/75 transition-colors">{text}</a>
                  : <span>{text}</span>}
              </li>
            ))}
          </ul>
          <div id="quote-cta" className="flex flex-col gap-2 scroll-mt-24">
            {/* The one and only quote request on the site — for services
                that need a custom price (e.g. post-construction, which
                requires a site visit before a quotation is shared). */}
            <button
              onClick={() => open("quote")}
              className="text-center border border-gold text-gold text-sm font-semibold py-2.5 rounded-xl hover:bg-gold hover:text-white transition-all"
            >
              Request a Quote →
            </button>
            <button
              onClick={() => open("book")}
              className="text-center bg-gold hover:bg-gold-dark text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              Book Now →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-4 sm:px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/28 text-xs">
            © 2026 Radiant Rose Cleaning Services. All rights reserved. | Lusaka, Zambia
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" className="text-white/28 text-xs hover:text-white/50 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
