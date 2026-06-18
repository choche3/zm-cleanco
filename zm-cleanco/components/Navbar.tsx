"use client";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Star, Zap, Phone, Share2, Sun, Moon } from "lucide-react";
import { useModal } from "@/lib/modal-context";

const NAV_LINKS = [
  { label: "Services", href: "#services", Icon: Sparkles },
  { label: "About",    href: "#about",    Icon: Star },
  { label: "Reviews",  href: "#reviews",  Icon: Zap },
  { label: "Contact",  href: "#contact",  Icon: Phone },
];

export default function Navbar() {
  const { open } = useModal();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [darkMode, setDarkMode]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-md" : "shadow-sm"
        } border-b border-brand-border`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
            {/* Square logo mark — matches the original's rounded-square badge */}
            <div className="w-[46px] h-[46px] rounded-xl border-2 border-gold bg-gold-pale flex flex-col items-center justify-center leading-none">
              <span className="font-serif font-bold text-gold text-[11px] tracking-tight">ZM</span>
              <span className="font-serif font-bold text-gold text-[9px] tracking-widest mt-0.5">CO.</span>
            </div>
            <div className="flex flex-col">
              {/* Italic serif brand name — matches Laurel's italic gold style */}
              <span className="font-serif italic font-semibold text-[1.15rem] leading-tight">
                <span className="text-gold">Zm</span>
                <span className="text-gold-dark"> CleanCo.</span>
              </span>
              <span className="text-[0.65rem] text-brand-soft font-medium tracking-widest uppercase">
                Professional &amp; Reliable
              </span>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[0.88rem] font-medium text-brand-mid hover:text-gold hover:bg-gold-pale transition-colors"
              >
                <Icon size={14} strokeWidth={1.8} className="text-brand-soft" />
                {label}
              </a>
            ))}
          </nav>

          {/* ── Desktop right actions ── */}
          <div className="hidden md:flex items-center gap-2">
            <button
              aria-label="Share"
              className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-soft hover:text-gold hover:border-gold transition-colors"
            >
              <Share2 size={15} strokeWidth={1.8} />
            </button>
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-soft hover:text-gold hover:border-gold transition-colors"
            >
              {darkMode ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gold-pale transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen
              ? <X    size={22} className="text-brand-dark" />
              : <Menu size={22} className="text-brand-dark" />}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-brand-border anim-menu">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-brand-mid hover:text-gold hover:bg-gold-pale transition-colors font-medium"
                >
                  <Icon size={16} strokeWidth={1.8} className="text-gold" />
                  {label}
                </a>
              ))}
              <div className="border-t border-brand-border mt-2 pt-3 flex gap-2">
                <button
                  onClick={() => { open("quote"); setMenuOpen(false); }}
                  className="flex-1 border-2 border-gold text-gold font-semibold py-2.5 rounded-xl text-sm hover:bg-gold-pale transition-colors"
                >
                  Get a Quote
                </button>
                <button
                  onClick={() => { open("book"); setMenuOpen(false); }}
                  className="flex-1 bg-gold text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-gold-dark transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-[68px]" />
    </>
  );
}
