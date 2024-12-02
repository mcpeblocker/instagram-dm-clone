import type { Metadata } from "next";
import "./globals.css";
import { description, title } from "@/utils/constants";

export const metadata: Metadata = { title, description };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
