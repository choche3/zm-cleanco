"use client";

import { useEffect, useRef, useState } from "react";
import {
  X, CheckCircle, Star, ChevronRight, ShieldCheck,
  Home, Sparkles, Truck, Building2, CalendarDays, HardHat,
  Repeat2, CalendarClock, Calendar,
  type LucideIcon,
} from "lucide-react";
import { useModal } from "@/lib/modal-context";
import { SERVICES, RECURRING_PLANS, TIME_SLOTS } from "@/lib/data";

/* ─────────────────────────────────────────────────────────────
   Shared primitives
───────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Home, Sparkles, Truck, Building2, CalendarDays, HardHat,
};
const PLAN_ICONS: Record<string, LucideIcon> = {
  Repeat2, CalendarClock, Calendar,
};

function Overlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/45 anim-modal-bg"
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      {children}
    </div>
  );
}

function ModalBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl w-full max-w-[560px] max-h-[92vh] flex flex-col shadow-2xl anim-modal overflow-hidden">
      {children}
    </div>
  );
}

function ModalHead({ title, subtitle, onClose }: { title: string; subtitle?: string; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-brand-border flex-shrink-0">
      <div>
        <h2 className="font-serif font-bold text-xl text-brand-dark">{title}</h2>
        {subtitle && <p className="text-sm text-brand-soft mt-0.5">{subtitle}</p>}
      </div>
      <button
        onClick={onClose}
        className="p-1.5 rounded-lg text-brand-soft hover:bg-gold-pale hover:text-gold transition-colors mt-0.5 flex-shrink-0"
      >
        <X size={18} />
      </button>
    </div>
  );
}

function ModalBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto modal-scroll px-6 py-5">
      {children}
    </div>
  );
}

function ModalFoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-t border-brand-border flex-shrink-0 bg-white">
      {children}
    </div>
  );
}

/* 5-step stepper — matches screenshot exactly */
function Stepper({ step, total = 5 }: { step: number; total?: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-7">
      {Array.from({ length: total }).map((_, i) => {
        const n = i + 1;
        const active = n === step;
        const done   = n < step;
        return (
          <div key={n} className="flex items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                active
                  ? "bg-gold border-gold text-white shadow-md shadow-gold/30"
                  : done
                  ? "bg-gold/15 border-gold/40 text-gold"
                  : "bg-white border-brand-border text-brand-soft"
              }`}
            >
              {done ? <CheckCircle size={15} strokeWidth={2.5} /> : n}
            </div>
            {n < total && (
              <div className={`w-10 sm:w-14 h-px ${done ? "bg-gold/40" : "bg-brand-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* Field helpers */
const inp = "w-full px-3.5 py-2.5 border-2 border-brand-border rounded-xl text-sm text-brand-dark bg-brand-bg focus:outline-none focus:border-gold transition-colors";
const sel = inp + " appearance-none cursor-pointer";

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-brand-dark mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function GoldBtn({ label, disabled, onClick, type = "button" }: {
  label: string; disabled?: boolean; onClick?: () => void; type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-gold hover:bg-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-sm"
    >
      {label}
    </button>
  );
}

function OutlineBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border-2 border-brand-border text-brand-mid font-semibold py-3.5 rounded-xl hover:border-gold hover:text-gold transition-colors text-sm"
    >
      {label}
    </button>
  );
}

function SuccessView({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center py-10 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-gold-pale flex items-center justify-center mb-4">
        <CheckCircle size={32} strokeWidth={1.8} className="text-gold" />
      </div>
      <h3 className="font-serif font-bold text-xl text-brand-dark mb-2">Thank you!</h3>
      <p className="text-brand-soft text-sm max-w-xs mb-7">{msg}</p>
      <button
        onClick={onClose}
        className="bg-gold hover:bg-gold-dark text-white font-semibold px-10 py-3 rounded-xl transition-colors"
      >
        Done
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BOOK MODAL — 5-step wizard
───────────────────────────────────────────────────────────── */
export function BookModal() {
  const { modal, close } = useModal();
  const [step, setStep]           = useState(1);
  const [done, setDone]           = useState(false);
  const [service, setService]     = useState("");
  const [freq, setFreq]           = useState("one-time");
  const [date, setDate]           = useState("");
  const [time, setTime]           = useState("");
  const [name, setName]           = useState("");
  const [phone, setPhone]         = useState("");
  const [address, setAddress]     = useState("");
  const [notes, setNotes]         = useState("");

  const reset = () => {
    setStep(1); setDone(false); setService(""); setFreq("one-time");
    setDate(""); setTime(""); setName(""); setPhone(""); setAddress(""); setNotes("");
  };

  if (modal !== "book") return null;

  const handleClose = () => { close(); reset(); };

  if (done) {
    return (
      <Overlay onClose={handleClose}>
        <ModalBox>
          <ModalHead title="Booking Confirmed" onClose={handleClose} />
          <ModalBody>
            <SuccessView
              msg="Your booking is confirmed! We'll send a WhatsApp confirmation shortly. See you soon! 🧹"
              onClose={handleClose}
            />
          </ModalBody>
        </ModalBox>
      </Overlay>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  const FREQS = [
    { id: "one-time",  Icon: CalendarDays,  label: "One-time",  sub: "Single clean"  },
    { id: "weekly",    Icon: Repeat2,       label: "Weekly",    sub: "Save 20%"      },
    { id: "biweekly",  Icon: CalendarClock, label: "Bi-weekly", sub: "Save 15%"      },
    { id: "monthly",   Icon: Calendar,      label: "Monthly",   sub: "Save 10%"      },
  ];

  return (
    <Overlay onClose={handleClose}>
      <ModalBox>
        <ModalHead
          title="Book Your Cleaning Service"
          subtitle={`Step ${step} of 5`}
          onClose={handleClose}
        />
        <ModalBody>
          <Stepper step={step} />

          {/* ── Step 1: Select Service ── */}
          {step === 1 && (
            <div className="anim-fade-up">
              <p className="font-semibold text-brand-dark mb-4">Select Your Service</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((svc) => {
                  const SvcIcon = ICON_MAP[svc.icon] ?? Home;
                  const active = service === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => setService(svc.id)}
                      className={`relative flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 text-center transition-all ${
                        active
                          ? "border-gold bg-gold-pale"
                          : "border-brand-border bg-white hover:border-gold/40"
                      }`}
                    >
                      {svc.hasQuote && (
                        <Sparkles size={11} strokeWidth={1.5} className="absolute top-2.5 right-2.5 text-gold/30" />
                      )}
                      <SvcIcon
                        size={34}
                        strokeWidth={1.3}
                        className={active ? "text-gold" : "text-gold/55"}
                      />
                      <div>
                        <p className={`font-semibold text-sm ${active ? "text-gold" : "text-brand-dark"}`}>
                          {svc.title}
                        </p>
                        <p className="text-brand-soft text-xs mt-0.5 line-clamp-2 leading-relaxed">
                          {svc.subtitle}
                        </p>
                      </div>
                      {svc.hasQuote && (
                        <span className={`inline-flex items-center gap-1 text-[0.7rem] font-bold px-2.5 py-1 rounded-full ${
                          active ? "bg-gold text-white" : "bg-gold-pale text-gold-dark"
                        }`}>
                          INSTANT QUOTE <ChevronRight size={9} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 2: Frequency ── */}
          {step === 2 && (
            <div className="anim-fade-up">
              <p className="font-semibold text-brand-dark mb-4">How often?</p>
              <div className="grid grid-cols-2 gap-3">
                {FREQS.map(({ id, Icon: FreqIcon, label, sub }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFreq(id)}
                    className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all ${
                      freq === id
                        ? "border-gold bg-gold-pale"
                        : "border-brand-border bg-white hover:border-gold/40"
                    }`}
                  >
                    <FreqIcon size={26} strokeWidth={1.4} className={freq === id ? "text-gold" : "text-gold/55"} />
                    <span className={`font-semibold text-sm ${freq === id ? "text-gold" : "text-brand-dark"}`}>{label}</span>
                    <span className="text-xs text-brand-soft">{sub}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 3: Date & Time ── */}
          {step === 3 && (
            <div className="anim-fade-up">
              <F label="Preferred Date">
                <input
                  className={inp}
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </F>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">Preferred Time</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`py-2 px-1 rounded-lg text-xs font-semibold border-2 transition-all ${
                        time === t
                          ? "border-gold bg-gold-pale text-gold"
                          : "border-brand-border text-brand-mid hover:border-gold/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 4: Your Details ── */}
          {step === 4 && (
            <div className="anim-fade-up">
              <F label="Full Name">
                <input className={inp} placeholder="e.g. Chanda Mwale" value={name} onChange={(e) => setName(e.target.value)} />
              </F>
              <F label="WhatsApp Number">
                <input className={inp} type="tel" placeholder="+260 97X XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </F>
              <F label="Property Address">
                <input className={inp} placeholder="Plot / Street, Neighbourhood, Lusaka" value={address} onChange={(e) => setAddress(e.target.value)} />
              </F>
              <F label="Special Instructions (optional)">
                <textarea className={inp + " resize-none"} rows={2} placeholder="Gate code, pets, areas to focus on…" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </F>
            </div>
          )}

          {/* ── Step 5: Confirm ── */}
          {step === 5 && (
            <div className="anim-fade-up">
              <p className="font-semibold text-brand-dark mb-4">Confirm Your Booking</p>
              <div className="bg-gold-pale border border-gold/15 rounded-xl p-5 mb-4 space-y-2.5 text-sm">
                {[
                  { l: "Service",   v: SERVICES.find((s) => s.id === service)?.title },
                  { l: "Frequency", v: FREQS.find((f) => f.id === freq)?.label },
                  { l: "Date",      v: date },
                  { l: "Time",      v: time },
                  { l: "Name",      v: name },
                  { l: "Phone",     v: phone },
                  { l: "Address",   v: address },
                ]
                  .filter((r) => r.v)
                  .map(({ l, v }) => (
                    <div key={l} className="flex justify-between gap-4">
                      <span className="text-brand-soft">{l}</span>
                      <span className="text-brand-dark font-semibold text-right">{v}</span>
                    </div>
                  ))}
              </div>
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-4 text-xs text-amber-800">
                <ShieldCheck size={14} className="mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span><strong>Note:</strong> A deposit is required to confirm. Payment details will be sent via WhatsApp after submission.</span>
              </div>
            </div>
          )}
        </ModalBody>

        {/* Footer nav */}
        <ModalFoot>
          <div className={`flex gap-3 ${step === 1 ? "" : ""}`}>
            {step > 1 && (
              <OutlineBtn label="← Back" onClick={() => setStep(step - 1)} />
            )}
            {step < 5 ? (
              <GoldBtn
                label="Next Step"
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !service) ||
                  (step === 3 && (!date || !time)) ||
                  (step === 4 && (!name || !phone || !address))
                }
              />
            ) : (
              <GoldBtn label="Confirm Booking" onClick={() => setDone(true)} />
            )}
          </div>
        </ModalFoot>
      </ModalBox>
    </Overlay>
  );
}

/* ─────────────────────────────────────────────────────────────
   QUOTE MODAL
───────────────────────────────────────────────────────────── */
export function QuoteModal() {
  const { modal, close, preService } = useModal();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "",
    service: preService || "deep", location: "", size: "", notes: "",
  });

  useEffect(() => {
    if (preService) setForm((f) => ({ ...f, service: preService }));
  }, [preService]);

  if (modal !== "quote") return null;

  const handleClose = () => { close(); setDone(false); };

  if (done) {
    return (
      <Overlay onClose={handleClose}>
        <ModalBox>
          <ModalHead title="Quote Requested" onClose={handleClose} />
          <ModalBody>
            <SuccessView msg="We'll get back to you within the hour. Check your WhatsApp!" onClose={handleClose} />
          </ModalBody>
        </ModalBox>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={handleClose}>
      <ModalBox>
        <ModalHead title="Get an Instant Quote" subtitle="We'll reply within the hour." onClose={handleClose} />
        <ModalBody>
          <form id="qform" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <div className="grid grid-cols-2 gap-3">
              <F label="First Name">
                <input className={inp} placeholder="Chanda" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
              </F>
              <F label="Last Name">
                <input className={inp} placeholder="Mwale" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
              </F>
            </div>
            <F label="Phone / WhatsApp">
              <input className={inp} type="tel" placeholder="+260 97X XXX XXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </F>
            <F label="Service Type">
              <select className={sel} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </F>
            <F label="Location / Neighbourhood">
              <input className={inp} placeholder="e.g. Kabulonga, Lusaka" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </F>
            <F label="Property Size">
              <select className={sel} value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}>
                <option value="">Select size…</option>
                <option>Studio / 1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3 Bedrooms</option>
                <option>4+ Bedrooms</option>
                <option>Commercial Space</option>
              </select>
            </F>
            <F label="Notes (optional)">
              <textarea className={inp + " resize-none"} rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any special instructions…" />
            </F>
          </form>
        </ModalBody>
        <ModalFoot>
          <GoldBtn label="Request My Quote →" type="submit" onClick={() => setDone(true)} />
        </ModalFoot>
      </ModalBox>
    </Overlay>
  );
}

/* ─────────────────────────────────────────────────────────────
   POLICY MODAL
───────────────────────────────────────────────────────────── */
export function PolicyModal() {
  const { modal, close } = useModal();
  if (modal !== "policy") return null;

  const items = [
    { t: "Deposit required",           b: "A deposit is required to secure your cleaning slot." },
    { t: "24-hour cancellation policy",b: "Cancellations must be made at least 24 hours prior to your appointment, or a fee may apply." },
    { t: "Lateness fee may apply",     b: "If you are more than 15 minutes late, a lateness fee may be charged." },
    { t: "Access to property",         b: "Please ensure access is available at the agreed time, or leave clear instructions." },
  ];

  return (
    <Overlay onClose={close}>
      <ModalBox>
        <ModalHead title="Our Booking Policy" subtitle="Please read before your first booking." onClose={close} />
        <ModalBody>
          <div className="space-y-3 mb-5">
            {items.map((it) => (
              <div key={it.t} className="flex gap-3 bg-gold-pale border border-gold/12 rounded-xl p-4">
                <CheckCircle size={16} strokeWidth={2} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-brand-dark text-sm">{it.t}</p>
                  <p className="text-brand-mid text-sm mt-0.5 leading-relaxed">{it.b}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-brand-soft text-center">
            We respect your time — thank you for respecting ours. 🙏
          </p>
        </ModalBody>
        <ModalFoot>
          <GoldBtn label="Okay, got it" onClick={close} />
        </ModalFoot>
      </ModalBox>
    </Overlay>
  );
}

/* ─────────────────────────────────────────────────────────────
   WRITE REVIEW MODAL
───────────────────────────────────────────────────────────── */
export function ReviewModal() {
  const { modal, close } = useModal();
  const [done, setDone]   = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover]   = useState(0);
  const [name, setName]     = useState("");
  const [loc, setLoc]       = useState("");
  const [body, setBody]     = useState("");

  if (modal !== "review") return null;
  const handleClose = () => { close(); setDone(false); };

  if (done) {
    return (
      <Overlay onClose={handleClose}>
        <ModalBox>
          <ModalHead title="Review Submitted" onClose={handleClose} />
          <ModalBody>
            <SuccessView msg="Thank you! Your review means the world to us. We'll publish it shortly. ⭐" onClose={handleClose} />
          </ModalBody>
        </ModalBox>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={handleClose}>
      <ModalBox>
        <ModalHead title="Write a Review" subtitle="Share your experience with Zm CleanCo." onClose={handleClose} />
        <ModalBody>
          {/* Star picker */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-brand-dark mb-2">Your Rating</label>
            <div className="flex gap-1.5 items-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(s)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    size={30}
                    strokeWidth={0}
                    className={(hover || rating) >= s ? "fill-gold" : "fill-brand-border"}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-brand-soft">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent!"][hover || rating]}
              </span>
            </div>
          </div>
          <F label="Your Name">
            <input className={inp} placeholder="e.g. Thandiwe Mwamba" value={name} onChange={(e) => setName(e.target.value)} required />
          </F>
          <F label="Neighbourhood / Area">
            <input className={inp} placeholder="e.g. Kabulonga, Lusaka" value={loc} onChange={(e) => setLoc(e.target.value)} required />
          </F>
          <F label="Your Review">
            <textarea className={inp + " resize-none"} rows={4} placeholder="Tell us about your experience…" value={body} onChange={(e) => setBody(e.target.value)} required minLength={20} />
          </F>
        </ModalBody>
        <ModalFoot>
          <GoldBtn label="Submit Review →" onClick={() => body.length >= 20 && name && loc ? setDone(true) : undefined} />
        </ModalFoot>
      </ModalBox>
    </Overlay>
  );
}

/* ─────────────────────────────────────────────────────────────
   RECURRING PLAN MODAL
───────────────────────────────────────────────────────────── */
export function RecurringModal() {
  const { modal, close } = useModal();
  const [done, setDone]     = useState(false);
  const [plan, setPlan]     = useState("biweekly");
  const [name, setName]     = useState("");
  const [phone, setPhone]   = useState("");
  const [address, setAddress] = useState("");

  if (modal !== "recurring") return null;
  const handleClose = () => { close(); setDone(false); };

  if (done) {
    return (
      <Overlay onClose={handleClose}>
        <ModalBox>
          <ModalHead title="Plan Selected!" onClose={handleClose} />
          <ModalBody>
            <SuccessView msg="Our team will confirm your schedule and pricing via WhatsApp. 🎉" onClose={handleClose} />
          </ModalBody>
        </ModalBox>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={handleClose}>
      <ModalBox>
        <ModalHead title="Recurring Cleaning Plans" subtitle="Lock in savings. Cancel anytime." onClose={handleClose} />
        <ModalBody>
          {/* Plan selector */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {RECURRING_PLANS.map((p) => {
              const PIcon = PLAN_ICONS[p.icon] ?? Repeat2;
              const active = plan === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlan(p.id)}
                  className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all ${
                    active ? "border-gold bg-gold-pale" : "border-brand-border bg-white hover:border-gold/40"
                  }`}
                >
                  <PIcon size={22} strokeWidth={1.4} className={active ? "text-gold" : "text-gold/55"} />
                  <span className={`font-serif font-bold text-2xl ${active ? "text-gold" : "text-brand-dark"}`}>
                    {p.discount}
                  </span>
                  <span className={`font-semibold text-sm ${active ? "text-gold" : "text-brand-dark"}`}>
                    {p.label}
                  </span>
                  <span className="text-brand-soft text-xs">{p.saving}</span>
                </button>
              );
            })}
          </div>

          <F label="Full Name">
            <input className={inp} placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
          </F>
          <F label="WhatsApp Number">
            <input className={inp} type="tel" placeholder="+260 97X XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </F>
          <F label="Property Address">
            <input className={inp} placeholder="Plot / Street, Neighbourhood, Lusaka" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </F>

          <div className="bg-gold-pale rounded-xl p-4 text-sm text-brand-mid">
            <strong className="text-brand-dark">
              {RECURRING_PLANS.find((p) => p.id === plan)?.label} plan selected
            </strong>{" "}
            — Your discount applies automatically. We&apos;ll confirm your preferred day via WhatsApp.
          </div>
        </ModalBody>
        <ModalFoot>
          <GoldBtn
            label="Start My Recurring Plan →"
            onClick={() => name && phone && address ? setDone(true) : undefined}
          />
        </ModalFoot>
      </ModalBox>
    </Overlay>
  );
}
