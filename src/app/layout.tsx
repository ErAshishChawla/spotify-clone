import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NextUiProvider from "@/providers/next-ui-provider";
import Sidebar from "@/components/sidebar";

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
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <NextUiProvider>
          <main
            className="w-screen h-screen bg-black p-2
          grid grid-cols-1 md:grid-cols-[300px_1fr] grid-rows-1 gap-x-2"
          >
            <aside>
              <Sidebar />
            </aside>

            <section className="p-2 bg-neutral-900/90 rounded-md">
              {children}
            </section>
          </main>
        </NextUiProvider>
      </body>
    </html>
  );
}
