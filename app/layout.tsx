import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akash Bhaskar — Software Developer",
  description:
    "Backend software engineer building scalable APIs with Node.js, NestJS, and TypeScript.",
  icons: {
    icon: "/akash-profile-round.png",
    shortcut: "/akash-profile-round.png",
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
      <body className={`${notoSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
