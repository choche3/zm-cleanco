/**
 * app/api/submit/route.ts
 * ─────────────────────────────────────────────────────────────
 * Single API endpoint that handles ALL four modal submissions:
 *   POST /api/submit  { type: "booking" | "quote" | "review" | "recurring", ...data }
 *
 * Each type writes to its own tab in the Google Sheet:
 *   "Bookings" | "Quotes" | "Reviews" | "Recurring"
 *
 * Why one route for all? Simpler to maintain. The `type` field
 * acts like a post-office sorting code — same door, different shelf.
 * ─────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";
import { appendRow as appendRowFromSheets } from "@/lib/sheets";

// Use the exported appendRow function from the sheets lib
const appendRow = appendRowFromSheets as (sheet: string, row: string[]) => Promise<unknown>;

// ── Timestamp helper ───────────────────────────────────────────
// Every row gets a "Submitted At" column so you can sort by time
// in Google Sheets. Format: "26/06/2026 14:35" (Zambia-friendly)
function timestamp(): string {
  return new Date().toLocaleString("en-GB", {
    timeZone: "Africa/Lusaka",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (!type) {
      return NextResponse.json({ error: "Missing submission type" }, { status: 400 });
    }

    // ── Route to the correct sheet tab based on type ───────────
    switch (type) {

      // ── BOOKING ─────────────────────────────────────────────
      // Tab columns: Submitted At | Service | Frequency | Date | Time | Name | Phone | Address | Notes
      case "booking": {
        const { service, frequency, date, time, name, phone, address, notes } = body;
        if (!service || !date || !time || !name || !phone || !address) {
          return NextResponse.json({ error: "Missing required booking fields" }, { status: 400 });
        }
        await appendRow("Bookings", [
          timestamp(), service, frequency || "one-time",
          date, time, name, phone, address, notes || "",
        ]);
        break;
      }

      // ── QUOTE ────────────────────────────────────────────────
      // Tab columns: Submitted At | First Name | Last Name | Phone | Service | Location | Size | Notes
      case "quote": {
        const { firstName, lastName, phone, service, location, size, notes } = body;
        if (!firstName || !phone || !service || !location) {
          return NextResponse.json({ error: "Missing required quote fields" }, { status: 400 });
        }
        await appendRow("Quotes", [
          timestamp(), firstName, lastName || "",
          phone, service, location, size || "", notes || "",
        ]);
        break;
      }

      // ── REVIEW ───────────────────────────────────────────────
      // Tab columns: Submitted At | Name | Neighbourhood | Rating | Review
      case "review": {
        const { name, neighbourhood, rating, reviewBody } = body;
        if (!name || !neighbourhood || !rating || !reviewBody) {
          return NextResponse.json({ error: "Missing required review fields" }, { status: 400 });
        }
        await appendRow("Reviews", [
          timestamp(), name, neighbourhood,
          String(rating), reviewBody,
        ]);
        break;
      }

      // ── RECURRING ────────────────────────────────────────────
      // Tab columns: Submitted At | Plan | Name | Phone | Address
      case "recurring": {
        const { plan, name, phone, address } = body;
        if (!plan || !name || !phone || !address) {
          return NextResponse.json({ error: "Missing required recurring fields" }, { status: 400 });
        }
        await appendRow("Recurring", [
          timestamp(), plan, name, phone, address,
        ]);
        break;
      }

      default:
        return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }

    // ── Success ────────────────────────────────────────────────
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[/api/submit] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
