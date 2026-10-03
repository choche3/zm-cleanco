// ── Types ─────────────────────────────────────────────────────────
export interface Review {
  id: string;
  name: string;
  initials: string;
  neighbourhood: string;
  date: string;
  rating: number;
  body: string;
  color: string;
}

export interface PriceTier {
  label: string;
  price: string;
}

export interface Service {
  id: string;
  icon: string; // lucide icon name
  title: string;
  subtitle: string;
  hasQuote: boolean;        // true = needs a custom quote (e.g. site visit) instead of a fixed price
  priceTiers?: PriceTier[]; // fixed pricing shown directly on the card
  priceNote?: string;       // extra pricing detail, e.g. "+K100 per extra room" or a quote note
}

export interface RecurringPlan {
  id: string;
  icon: string;
  label: string;
  discount: string;
  badge: string;
  saving: string;
}

// ── Reviews ───────────────────────────────────────────────────────
// Client-approved testimonials only — add more here as they come in.
export const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Brian Kaluba",
    initials: "BK",
    neighbourhood: "Woodlands",
    date: "April 2026",
    rating: 5,
    body: "Used them for a move-out clean and the landlord was genuinely impressed. Got my full deposit back! Professional team and great communication throughout via WhatsApp.",
    color: "#C9A84C",
  },
  {
    id: "2",
    name: "Precious Nkonde",
    initials: "PN",
    neighbourhood: "Ibex Hill",
    date: "April 2026",
    rating: 5,
    body: "I run an Airbnb and these guys are lifesavers. Quick turnarounds, excellent attention to detail. My guests always comment on how spotless the place is. 10/10.",
    color: "#7B5EA7",
  },
];

// ── Services ──────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: "standard",
    icon: "Home",
    title: "Standard Cleaning",
    subtitle: "A thorough top-to-bottom clean for everyday upkeep.",
    hasQuote: false,
    priceTiers: [
      { label: "1 Bed House", price: "K1000" },
      { label: "2 Bed House", price: "K1250" },
    ],
    priceNote: "+K100 per extra room",
  },
  {
    id: "deep",
    icon: "Sparkles",
    title: "Deep Cleaning",
    subtitle: "Includes neglected spaces — perfect for first-time clients.",
    hasQuote: false,
    priceTiers: [
      { label: "1 Bed House", price: "K1300" },
      { label: "2 Bed House", price: "K1500" },
    ],
    priceNote: "+K100 per extra room",
  },
  {
    id: "afterevent",
    icon: "Users",
    title: "After-Event Cleaning",
    subtitle: "Fast clean-up after your gathering, whatever the size.",
    hasQuote: false,
    priceTiers: [
      { label: "Small Gathering (10–30 people)", price: "K1250" },
      { label: "Medium Gathering (40–60 people)", price: "K2000" },
      { label: "Large Gathering (70+ people)", price: "K3500" },
    ],
  },
  {
    id: "moveinout",
    icon: "Truck",
    title: "Move-in/out Cleaning",
    subtitle: "Full deep clean for empty homes during moves.",
    hasQuote: true,
  },
  {
    id: "office",
    icon: "Building2",
    title: "Office & Commercial",
    subtitle: "Professional workspace maintenance and disinfection.",
    hasQuote: true,
  },
  {
    id: "airbnb",
    icon: "CalendarClock",
    title: "Airbnb Turnover",
    subtitle: "Fast, hospitality-standard reset for your rentals.",
    hasQuote: true,
  },
  {
    id: "postconstruction",
    icon: "HardHat",
    title: "Post-Construction",
    subtitle: "Full clean after renovations or new builds.",
    hasQuote: true,
    priceNote: "Requires a site visit before a quotation is shared.",
  },
];

// ── Recurring Plans ───────────────────────────────────────────────
export const RECURRING_PLANS: RecurringPlan[] = [
  { id: "weekly",   icon: "Repeat2",      label: "Weekly",    discount: "-20%", badge: "Best Value", saving: "Save K400+/mo" },
  { id: "biweekly", icon: "CalendarClock",label: "Bi-weekly", discount: "-15%", badge: "Popular",    saving: "Save K200+/mo" },
  { id: "monthly",  icon: "Calendar",     label: "Monthly",   discount: "-10%", badge: "Flexible",   saving: "Save K100+/mo" },
];

// ── Service Areas ─────────────────────────────────────────────────
export const SERVICE_AREAS = [
  "Lusaka (All Areas)",
  "Kabulonga",
  "Woodlands",
  "Ibex Hill",
  "Rhodespark",
  "Chelstone",
  "Avondale",
  "Showgrounds",
  "Chilenje",
  "Roma",
  "Kalundu",
  "Chamba Valley",
  "Lilayi",
  "Northmead",
  "Kabwata",
  "+ More",
];

// ── Time Slots ────────────────────────────────────────────────────
export const TIME_SLOTS = [
  "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

// ── Policies ──────────────────────────────────────────────────────
// Single source of truth for the booking & cancellation policy — rendered
// by both PolicyBanner (on-page) and PolicyModal (the "Booking policy →"
// popup). Edit it once here and both stay in sync.
export const POLICIES = [
  {
    title: "Advance booking",
    body: "— cleaning services should be booked at least 7 days before your preferred cleaning date.",
  },
  {
    title: "Booking deposit",
    body: "— a 50% deposit is required to secure and confirm your booking.",
  },
  {
    title: "Cancellations & refunds",
    body: "— your deposit is refundable if you cancel at least 24 hours before your scheduled cleaning time.",
  },
  {
    title: "Late cancellations",
    body: "— cancellations made less than 24 hours before the scheduled cleaning time will result in the booking deposit being non-refundable.",
  },
  {
    title: "Balance payment",
    body: "— the remaining 50% balance is payable on the day of the cleaning service.",
  },
];
