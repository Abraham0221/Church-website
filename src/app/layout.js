import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Iglesia Adventista McAllen Norte",
    template: "%s | McAllen North SDA Church",
  },
  description:
    "McAllen North Seventh-day Adventist Church - A place of worship, community, and hope in McAllen, Texas.",
  icons: {
    icon: "/adventist-logo.png",
    apple: "/adventist-logo.png",
  },
};

export default function RootLayout({ children }) {
  // #region agent log
  fetch("http://127.0.0.1:7460/ingest/892f813f-23dc-4954-abe3-e90284d8d110", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "423d15",
    },
    body: JSON.stringify({
      sessionId: "423d15",
      runId: "initial",
      hypothesisId: "H4",
      location: "src/app/layout.js:RootLayout",
      message: "Root layout metadata icon configuration",
      data: { icon: metadata?.icons?.icon, apple: metadata?.icons?.apple },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
