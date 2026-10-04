"use client";
import { useModal } from "@/lib/modal-context";

export default function About() {
  const { open } = useModal();
  return (
    <section id="about" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

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
              href="mailto:mubangateresa@gmail.com"
              className="block text-gold font-medium text-sm mb-4 hover:underline"
            >
              mubangateresa@gmail.com
            </a>
            <button
              onClick={() => open("policy")}
              className="text-gold font-semibold text-sm hover:underline"
            >
              Booking policy →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
