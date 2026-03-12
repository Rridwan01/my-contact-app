import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Babalawo Ifawuyi - Consultation & Guidance",
  description:
    "A personal landing page for Babalawo Ifawuyi, offering consultation and guidance services. Connect with me to explore spiritual insights and personalized advice.",
  icons: {
    icon: "/image.png?v=2", // The ?v=2 is the secret cache-buster
    apple: "/image.png?v=2",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
