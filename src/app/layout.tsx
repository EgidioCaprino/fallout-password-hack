import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fallout 4 Password Hack",
  description: "Utility for hacking terminals in Fallout 4",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="md:container md:mx-auto">{children}</body>
    </html>
  );
}
