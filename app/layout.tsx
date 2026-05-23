import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STAYLIK",
  description: "Premium streetwear fashion store",

  openGraph: {
    title: "STAYLIK",
    description: "Premium streetwear fashion store",
    url: "https://staylik-store.vercel.app",
    siteName: "STAYLIK",

    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "STAYLIK Store",
      },
    ],

    locale: "en_US",
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