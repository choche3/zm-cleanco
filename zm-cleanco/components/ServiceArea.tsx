"use client";
import { MapPin } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/data";

export default function ServiceArea() {
  return (
    <section className="bg-gold-pale py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start justify-between">

          {/* Left */}
          <div className="flex-1 max-w-2xl">
            <p className="text-xs font-bold tracking-[0.15em] text-gold uppercase mb-2">Coverage</p>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-dark mb-3">
              Service Area
            </h2>
            <p className="text-brand-mid text-[0.95rem] mb-6">
              We proudly serve Lusaka and surrounding towns across Zambia.
            </p>

            {/* Area chips */}
            <div className="flex flex-wrap gap-2.5 mb-5">
              {SERVICE_AREAS.map((area, i) => (
                <span
                  key={area}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    i === 0
                      ? "bg-gold text-white border-gold"
                      : "bg-white text-brand-mid border-brand-border hover:border-gold hover:text-gold"
                  }`}
                >
                  {area}
                </span>
              ))}
            </div>

            <p className="flex items-start gap-2 text-sm text-brand-soft">
              <MapPin size={15} strokeWidth={1.8} className="text-gold mt-0.5 flex-shrink-0" />
              Free estimates available for all Lusaka locations. WhatsApp us for areas outside Lusaka.
            </p>
          </div>

          {/* Map placeholder card */}
          <div className="bg-white rounded-2xl border border-brand-border shadow-sm p-6 w-full lg:w-72 flex-shrink-0">
            <div className="bg-gold-pale rounded-xl h-40 flex flex-col items-center justify-center mb-4 border border-gold/10">
              <MapPin size={32} strokeWidth={1.3} className="text-gold mb-2" />
              <p className="text-gold font-semibold text-sm">Greater Lusaka Area</p>
              <p className="text-brand-soft text-xs mt-0.5">Zambia</p>
            </div>
            <p className="font-semibold text-sm text-brand-dark mb-1">Lusaka &amp; Surrounds</p>
            <p className="text-brand-soft text-xs leading-relaxed">
              Kabulonga • Woodlands • Ibex Hill • Rhodespark • Chelstone • Avondale • Roma • + More
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
