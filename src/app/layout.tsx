import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NextUiProvider from "@/providers/next-ui-provider";
import ToastProvider from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "A Spotify clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NextUiProvider>{children}</NextUiProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
