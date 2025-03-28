import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ben's Deep Research Prompts",
  description: "Generate professional research prompts for deep analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen`}>
        <div className="min-h-screen max-w-6xl mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
} 