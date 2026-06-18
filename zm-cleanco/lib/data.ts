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

export interface Service {
  id: string;
  icon: string; // lucide icon name
  title: string;
  subtitle: string;
  hasQuote: boolean;
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
export const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Thandiwe Mwamba",
    initials: "TM",
    neighbourhood: "Kabulonga",
    date: "May 2026",
    rating: 5,
    body: "Absolutely brilliant service! They came on time, were thorough, and my house has never looked this clean. I've already booked a recurring plan. Highly recommend to anyone in Lusaka!",
    color: "#2E7D4F",
  },
  {
    id: "2",
    name: "Brian Kaluba",
    initials: "BK",
    neighbourhood: "Woodlands",
    date: "April 2026",
    rating: 5,
    body: "Used them for a move-out clean and the landlord was genuinely impressed. Got my full deposit back! Professional team and great communication throughout via WhatsApp.",
    color: "#C9A84C",
  },
  {
    id: "3",
    name: "Precious Nkonde",
    initials: "PN",
    neighbourhood: "Ibex Hill",
    date: "April 2026",
    rating: 5,
    body: "I run an Airbnb and these guys are lifesavers. Quick turnarounds, excellent attention to detail. My guests always comment on how spotless the place is. 10/10.",
    color: "#7B5EA7",
  },
  {
    id: "4",
    name: "Charles Mutale",
    initials: "CM",
    neighbourhood: "Rhodespark",
    date: "March 2026",
    rating: 5,
    body: "We hired them for our office and the results exceeded expectations. Very professional, discreet, and efficient. Will definitely continue using their services.",
    color: "#2980B9",
  },
  {
    id: "5",
    name: "Grace Phiri",
    initials: "GP",
    neighbourhood: "Avondale",
    date: "March 2026",
    rating: 5,
    body: "The deep cleaning was so thorough — they cleaned places I didn't even think to ask for. My home smelled fresh for days. Will be booking monthly going forward.",
    color: "#C0392B",
  },
  {
    id: "6",
    name: "Moses Banda",
    initials: "MB",
    neighbourhood: "Roma",
    date: "February 2026",
    rating: 5,
    body: "Post-construction clean after our renovation was flawless. Every surface was spotless. Reasonable pricing and the team was very respectful of our property.",
    color: "#16A085",
  },
];

// ── Services ──────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: "standard",
    icon: "House",
    title: "Standard Cleaning",
    subtitle: "Included in Every Standard Clean",
    hasQuote: false,
  },
  {
    id: "deep",
    icon: "Sparkles",
    title: "Deep Cleaning",
    subtitle: "Perfect for first-time clients or neglected spaces.",
    hasQuote: true,
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
    icon: "CalendarDays",
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
export const POLICIES = [
  {
    title: "Deposit required",
    body: "to secure your cleaning slot.",
  },
  {
    title: "24-hour cancellation policy",
    body: "— cancellations must be done 24hrs prior to appointment or this might attract a fee.",
  },
  {
    title: "Lateness fee may apply",
    body: "if you are more than 15 minutes late.",
  },
];
