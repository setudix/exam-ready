import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import ThemeRegistry from "./ui/dashboard/components/ThemeRegistry";
import Navbar from "./ui/dashboard/navbar/navbar";
import HealthCheck from "./ui/healthcheck/HealthCheck";
import Footer from "./ui/dashboard/components/Footer/Footer";
import { Box } from "@mui/material";

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
            <HealthCheck />
            <Navbar />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >

            {children}
            </Box>
            <Footer />
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
