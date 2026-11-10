import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: "Voltinou | دنیای خودروهای برقی",
    template: "%s | Voltinou",
  },

  description:
    "Voltinou؛ مجله تخصصی خودروهای برقی، اخبار، مقالات، فناوری، شارژ و معرفی خودروهای الکتریکی.",

  keywords: [
    "خودرو برقی",
    "ماشین برقی",
    "خودروهای الکتریکی",
    "شارژ خودرو برقی",
    "باتری خودرو برقی",
    "Voltinou",
  ],

  authors: [
    {
      name: "Voltinou",
    },
  ],

  openGraph: {
    title: "Voltinou | دنیای خودروهای برقی",
    description:
      "اخبار، مقالات، فناوری و معرفی خودروهای برقی.",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
