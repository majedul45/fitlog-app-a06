import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Plan | FitLog",
};

export default function MyPlanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}