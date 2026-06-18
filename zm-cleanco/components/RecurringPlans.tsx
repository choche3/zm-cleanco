"use client";
import { Repeat2, CalendarClock, Calendar, type LucideIcon } from "lucide-react";
import { useModal } from "@/lib/modal-context";
import { RECURRING_PLANS } from "@/lib/data";

const PLAN_ICONS: Record<string, LucideIcon> = {
  Repeat2, CalendarClock, Calendar,
};

export default function RecurringPlans() {
  const { open } = useModal();
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
      <div className="bg-brand-dark rounded-3xl p-8 md:p-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-center justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-gold uppercase mb-2">Special Offer</p>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-white mb-3">
              Consistent Clean,<br />Constant Savings
            </h2>
            <p className="text-white/60 text-[0.95rem] max-w-md">
              Save up to 20% on every clean when you subscribe to a recurring plan.
              Perfect for busy families and professionals in Lusaka.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => open("recurring")}
              className="bg-gold hover:bg-gold-dark text-white font-semibold px-7 py-3 rounded-xl transition-all text-sm shadow-lg"
            >
              Recurring Cleaning
            </button>
            <button
              onClick={() => open("book")}
              className="bg-white/10 border border-white/20 hover:bg-white/18 text-white font-semibold px-7 py-3 rounded-xl transition-all text-sm"
            >
              Book This Service
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RECURRING_PLANS.map((plan) => {
            const Icon = PLAN_ICONS[plan.icon] ?? Repeat2;
            return (
              <button
                key={plan.id}
                onClick={() => open("recurring")}
                className="group bg-white/8 border border-white/12 rounded-2xl p-6 text-center hover:bg-white/15 transition-all"
              >
                <Icon size={26} strokeWidth={1.4} className="text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-serif font-bold text-4xl text-gold mb-1">{plan.discount}</div>
                <div className="text-white font-semibold text-base mb-2">{plan.label}</div>
                <div className="inline-block bg-gold text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  {plan.badge}
                </div>
                <p className="text-white/40 text-xs">{plan.saving}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
