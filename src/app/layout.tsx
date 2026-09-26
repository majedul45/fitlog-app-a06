import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import FitlogProvider from "./context/FitlogContext";
import ToastProvider from "./components/shared/ToastProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Find and track your workouts.",
  icons: {
    icon: "/logo.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <FitlogProvider>
          <Navbar />
          {children}
          <Footer />
          <ToastProvider />
        </FitlogProvider>
      </body>
    </html>
  );
}
