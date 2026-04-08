import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akash Bhaskar — Software Developer",
  description:
    "Backend software engineer building scalable APIs with Node.js, NestJS, and TypeScript.",
  icons: {
    icon: "/akash-profile.webp",
    shortcut: "/akash-profile.webp",
    apple: "/akash-profile.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
