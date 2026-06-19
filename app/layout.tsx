import type { Metadata } from "next";
// @ts-ignore: Allow side-effect import of CSS without type declarations
import "./globals.css";

export const metadata: Metadata = {
  title: "Zm CleanCo. – Professional Cleaning in Lusaka & Zambia",
  description:
    "Professional residential and commercial cleaning services across Lusaka and Zambia. Book instantly with our modern platform. Reliable, Professional, Spotless.",
  keywords:
    "cleaning services, Lusaka, Zambia, residential cleaning, commercial cleaning, house cleaning, office cleaning",
  openGraph: {
    title: "Zm CleanCo. – Professional Cleaning in Lusaka & Zambia",
    description:
      "Professional residential and commercial cleaning services across Lusaka and Zambia.",
    locale: "en_ZM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
