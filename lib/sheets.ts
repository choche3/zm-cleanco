// export {};
// import { GoogleSpreadsheet } from 'google-spreadsheet';

// const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
// const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
// const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

// /**
//  * lib/sheets.ts
//  * ─────────────────────────────────────────────────────────────
//  * Reusable helper to append a row to any tab in the Radiant Rose
//  * Cleaning Services Google Sheet, using a Service Account for auth.
//  *
//  * Think of this file like a "delivery driver" — any part of
//  * the app hands it a package (row data) and a destination
//  * (sheet tab name), and it delivers it to Google Sheets.
//  * ─────────────────────────────────────────────────────────────
//  */

// const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";

// let doc: GoogleSpreadsheet | null = null;

// async function getDoc() {

// // ── 1. Get a short-lived access token from Google ──────────────
// // Google uses OAuth2. Our Service Account has a private key.
// // We sign a JWT with it, swap it for a Bearer token, then use
// // that token on every Sheets API call. Token lasts 1 hour.
// async function getAccessToken(): Promise<string> {
//   const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
//   const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || "";

//   const now = Math.floor(Date.now() / 1000);
//   const claim = {
//     iss: clientEmail,
//     scope: "https://www.googleapis.com/auth/spreadsheets",
//     aud: "https://oauth2.googleapis.com/token",
//     exp: now + 3600,
//     iat: now,
//   };

//   // Build JWT header.payload (base64url encoded)
//   const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }))
//     .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
//   const payload = btoa(JSON.stringify(claim))
//     .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

//   const signingInput = `${header}.${payload}`;

//   // Import the private key and sign
//   const keyData = privateKey
//     .replace("-----BEGIN PRIVATE KEY-----", "")
//     .replace("-----END PRIVATE KEY-----", "")
//     .replace(/\s/g, "");

//   const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));

//   const cryptoKey = await crypto.subtle.importKey(
//     "pkcs8",
//     binaryKey.buffer,
//     { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
//     false,
//     ["sign"]
//   );

//   const signature = await crypto.subtle.sign(
//     "RSASSA-PKCS1-v1_5",
//     cryptoKey,
//     new TextEncoder().encode(signingInput)
//   );

//   const sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
//     .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

//   const jwt = `${signingInput}.${sig}`;

//   // Exchange JWT for access token
//   const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: new URLSearchParams({
//       grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
//       assertion: jwt,
//     }),
//   });

//   const tokenData = await tokenRes.json();
//   if (!tokenData.access_token) {
//     throw new Error(`Failed to get access token: ${JSON.stringify(tokenData)}`);
//   }
//   return tokenData.access_token;
// }

// // ── 2. Append a row to a named sheet tab ──────────────────────
// export async function appendRow(
//   sheetTab: string,   // e.g. "Bookings", "Quotes"
//   values: string[]    // the column values for this row
// ): Promise<void> {
//   const spreadsheetId = process.env.GOOGLE_SHEET_ID;
//   if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID env var is missing");

//   const token = await getAccessToken();

//   const range = `${sheetTab}!A1`; // Google figures out the next empty row

//   const res = await fetch(
//     `${SHEETS_API}/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         values: [values], // 2D array — one row, N columns
//       }),
//     }
//   );

//   if (!res.ok) {
//     const err = await res.text();
//     throw new Error(`Sheets API error (${res.status}): ${err}`);
//   }
// }

//   if (!doc) {
//     // Provide service account creds to the constructor to satisfy typings
//     doc = new GoogleSpreadsheet(SHEET_ID, {
//       client_email: SERVICE_ACCOUNT_EMAIL,
//       private_key: PRIVATE_KEY,
//     } as any);

//     // load spreadsheet metadata
//     await doc.loadInfo();
//   }
//   return doc;
// }

// export async function appendToSheet(sheetName: string, rowData: any) {
//   try {
//     const doc = await getDoc();
//     let sheet = doc.sheetsByTitle[sheetName];
    
//     if (!sheet) {
//       sheet = await doc.addSheet({ title: sheetName });
//     }
    
//     await sheet.addRow(rowData);
//     return true;
//   } catch (error) {
//     console.error('Google Sheets error:', error);
//     throw error;
//   }
// }

const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";

async function getAccessToken(): Promise<string> {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || "";

  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const payload = btoa(JSON.stringify(claim))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const signingInput = `${header}.${payload}`;

  const keyData = privateKey
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const jwt = `${signingInput}.${sig}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    throw new Error(`Failed to get access token: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}

export async function appendRow(
  sheetTab: string,
  values: string[]
): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID env var is missing");

  const token = await getAccessToken();
  const range = `${sheetTab}!A1`;

  const res = await fetch(
    `${SHEETS_API}/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [values] }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sheets API error (${res.status}): ${err}`);
  }
}