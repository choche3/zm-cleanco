"use client";
import { Users, Star, CalendarCheck, ThumbsUp } from "lucide-react";
import { useModal } from "@/lib/modal-context";

const STATS = [
  { Icon: Users,         num: "200+", label: "Happy Clients",    sub: "across Lusaka"      },
  { Icon: Star,          num: "5.0",  label: "Average Rating",   sub: "from our customers" },
  { Icon: CalendarCheck, num: "3+",   label: "Years of Service", sub: "trusted in Zambia"  },
  { Icon: ThumbsUp,      num: "100%", label: "Satisfaction",     sub: "Guaranteed"          },
];

export default function About() {
  const { open } = useModal();
  return (
    <section id="about" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Text */}
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-gold uppercase mb-2">About Us</p>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-dark mb-5">
              About <span className="italic text-gold">Radiant Rose</span> Cleaning Services
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              At Radiant Rose Cleaning Services, our goal is to provide professional, reliable
              cleaning that makes your space shine across Lusaka and Zambia. We&apos;re committed
              to delivering spotless, radiant results for every occasion. ✨
            </p>
            <p className="text-brand-mid leading-relaxed mb-5">
              Our team is fully vetted, trained, and equipped with quality, safe cleaning
              products. We treat your home and business with the same care we would give our own.
            </p>
            <a
              href="mailto:info@radiantrosecleaning.co.zm"
              className="block text-gold font-medium text-sm mb-4 hover:underline"
            >
              info@radiantrosecleaning.co.zm
            </a>
            <button
              onClick={() => open("policy")}
              className="text-gold font-semibold text-sm hover:underline"
            >
              Booking policy →
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-px bg-brand-border rounded-2xl overflow-hidden">
            {STATS.map(({ Icon, num, label, sub }) => (
              <div key={label} className="bg-white p-7 flex flex-col gap-2">
                <Icon size={20} strokeWidth={1.6} className="text-gold" />
                <div className="font-serif font-bold text-[2.2rem] text-brand-dark leading-none">
                  {num}
                </div>
                <div>
                  <p className="font-semibold text-[0.88rem] text-brand-dark">{label}</p>
                  <p className="text-brand-soft text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
