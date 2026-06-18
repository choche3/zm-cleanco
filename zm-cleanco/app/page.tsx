"use client";
import { ModalProvider } from "@/lib/modal-context";
import Navbar         from "@/components/Navbar";
import Hero           from "@/components/Hero";
import PolicyBanner   from "@/components/PolicyBanner";
import Services       from "@/components/Services";
import RecurringPlans from "@/components/RecurringPlans";
import About          from "@/components/About";
import Reviews        from "@/components/Reviews";
import ServiceArea    from "@/components/ServiceArea";
import Contact        from "@/components/Contact";
import Footer         from "@/components/Footer";
import {
  BookModal,
  QuoteModal,
  PolicyModal,
  ReviewModal,
  RecurringModal,
} from "@/components/Modals";

export default function Home() {
  return (
    <ModalProvider>
      {/* All modals rendered at root so z-index is correct */}
      <BookModal />
      <QuoteModal />
      <PolicyModal />
      <ReviewModal />
      <RecurringModal />

      <Navbar />
      <main>
        <Hero />
        <PolicyBanner />
        <Services />
        <RecurringPlans />
        <About />
        <Reviews />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
    </ModalProvider>
  );
}
