import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import ThemeRegistry from "./ui/dashboard/components/ThemeRegistry";
import Navbar from "./ui/dashboard/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExamReady [DU-YIIT]",
  description: "App for Therap Javafest 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeRegistry>
            <Navbar />
            {children}
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
