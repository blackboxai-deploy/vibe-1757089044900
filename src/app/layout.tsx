import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgroAssist - Smart Farming Companion",
  description: "Your intelligent agricultural assistant for weather insights, crop recommendations, market rates, and government schemes",
  keywords: "agriculture, farming, weather, crops, market rates, government schemes, AI assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-green-50 to-blue-50`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}