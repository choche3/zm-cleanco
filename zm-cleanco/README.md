# Zm CleanCo. — Next.js Website

A pixel-perfect Next.js 14 recreation of the Laurel's Cleaning Company layout,
fully adapted for **Zm CleanCo.** — a professional cleaning business based in Lusaka, Zambia.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build && npm start
```

---

## 📁 Project Structure

```
zm-cleanco/
├── app/
│   ├── globals.css        ← Tailwind + Google Fonts + animations
│   ├── layout.tsx         ← Root layout + SEO metadata
│   └── page.tsx           ← Main page, assembles all sections
│
├── components/
│   ├── Navbar.tsx         ← Sticky nav with icons, mobile menu, dark mode toggle
│   ├── Hero.tsx           ← Full hero with pro-tip callout + trust badges
│   ├── PolicyBanner.tsx   ← Dismissible booking policy banner
│   ├── Services.tsx       ← 3-col service card grid with Lucide icons + INSTANT QUOTE pills
│   ├── RecurringPlans.tsx ← Recurring plan tiers on dark background
│   ├── About.tsx          ← About text + 2×2 stat grid
│   ├── Reviews.tsx        ← Star-rated review cards + write review button
│   ├── ServiceArea.tsx    ← Area chips + map placeholder card
│   ├── Contact.tsx        ← 3-col contact / quick-book section
│   ├── Footer.tsx         ← Full footer with "Let's grow together" banner
│   └── Modals.tsx         ← All 5 modals (Book wizard, Quote, Policy, Review, Recurring)
│
└── lib/
    ├── data.ts            ← All content data — edit this to customise
    ├── modal-context.tsx  ← Global modal state (React Context)
    └── icons.tsx          ← Icon resolver utility
```

---

## ✅ Features

| Feature | Details |
|---|---|
| **Navbar** | Sticky, scroll-aware shadow; Lucide icons on nav links; share + dark-mode buttons; mobile hamburger |
| **Hero** | Italic gold serif headline; pro-tip callout card; dual CTAs; trust badge chips |
| **Policy Banner** | Dismissible; gold CheckCircle icons; "Okay, got it" button |
| **Services Grid** | 3-column; large gold Lucide icon centered on each card; INSTANT QUOTE pill + ChevronRight |
| **Recurring Plans** | Dark background; 3 plan cards with icons and discount amounts |
| **About** | 2-column layout; 2×2 stat grid with Lucide stat icons |
| **Reviews** | 5-star display; avatar initials with brand colours; show all toggle; write review button |
| **Service Area** | Area chips; map placeholder card |
| **Contact** | 3-column: team info + get-in-touch links + quick-book panel |
| **Footer** | "Let's grow together" CTA banner; 3-column footer; bottom bar |
| **5-Step Book Wizard** | Service select → Frequency → Date & Time → Details → Confirm |
| **Quote Modal** | Full form with service pre-select |
| **Policy Modal** | Detailed policy cards |
| **Review Modal** | Interactive star picker |
| **Recurring Modal** | Plan selector with form |
| **Success Screens** | Gold checkmark + thank you screen after each form submit |
| **Mobile Responsive** | All sections responsive to 375px |
| **TypeScript** | Fully typed throughout |
| **SEO** | Metadata, OG tags, description |

---

## 🎨 Design Tokens

| Token | Value | Usage |
|---|---|---|
| `gold.DEFAULT` | `#C9A84C` | Primary brand, icons, CTAs |
| `gold.light`   | `#E2C06B` | Hover states |
| `gold.dark`    | `#A8862E` | Active/pressed states |
| `gold.pale`    | `#FBF5E6` | Backgrounds, highlights |
| `brand.dark`   | `#1A1A1A` | Headlines, dark bg |
| `brand.mid`    | `#4A4A4A` | Body text |
| `brand.soft`   | `#888888` | Subtitles, labels |
| `brand.border` | `#E8E8E8` | Card borders |

**Fonts:** Playfair Display (italic serif for brand name + headings) + Inter (body)

---

## 🛠 Customisation

### Change business details
Edit `lib/data.ts` — all reviews, services, areas, plans are there.

### Change contact info
Edit `components/Contact.tsx` and `components/Footer.tsx`.

### Connect real booking/email backend
In `components/Modals.tsx`, replace the `setDone(true)` calls with your API fetch,
e.g. posting to a WhatsApp Business API, Airtable, Firebase, or your own endpoint.

### Add a real map
In `components/ServiceArea.tsx`, replace the map placeholder `<div>` with a
Google Maps or Mapbox `<iframe>` embed.

---

Built for Zm CleanCo. — Lusaka, Zambia 🇿🇲
