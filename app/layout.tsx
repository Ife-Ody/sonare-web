import { Github } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Sonare | Word Generator",
  description: "Pronounceable and organic words that feel natural.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <div className="flex-1 h-full overflow-y-auto py-3">{children}</div>
        <footer className="border-t py-6 px-4 md:px-8">
          <div className="mx-auto max-w-6xl flex items-center justify-center">
            <Link
              href="https://github.com/Ife-Ody/sonare-web"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-4" />
              <span className="text-sm">View on GitHub</span>
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
