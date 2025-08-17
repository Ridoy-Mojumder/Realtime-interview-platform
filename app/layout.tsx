import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

const monaMono = Mona_Sans({
  variable: "--font-mona-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Realtime Interview Platform",
  description: "A platform for conducting and practicing realtime interviews with AI integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.variable} ${monaMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
