import type { Metadata } from "next";
import { Ubuntu, Nunito_Sans } from "next/font/google";
import QueryProvider from "@/providers/query-provider";

import "./globals.css";

const geistSans = Ubuntu({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meal Finder",
  description:
    "Discover and explore a variety of delicious meal options tailored to your dietary preferences and cravings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${nunitoSans.variable} font-mono antialiased bg-green text-white`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
