import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PresentationProvider } from "@/context/PresentationContext";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IOMETE DealBridge — Modern Lakehouse Sales Companion",
  description:
    "Make Complex Technology Easy to Understand, Evaluate & Buy. Human-led sales platform for modern Apache Iceberg lakehouses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-slate-50 font-sans">
        <PresentationProvider>
          <AppShell>{children}</AppShell>
        </PresentationProvider>
      </body>
    </html>
  );
}
