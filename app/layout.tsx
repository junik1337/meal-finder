import type { Metadata } from "next";
import { Ubuntu, Nunito_Sans } from "next/font/google";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "react-hot-toast";
import SplashScreen from "@/components/Splash";

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
  icons: {
    icon: "/images/hero.png",
  },
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
        <SplashScreen>
          <Toaster containerClassName="font-sans" />
          <QueryProvider>{children}</QueryProvider>
        </SplashScreen>
      </body>
    </html>
  );
}
