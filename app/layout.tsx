import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: "ElectroCar | دنیای خودروهای برقی",
    template: "%s | ElectroCar",
  },

  description:
    "ElectroCar؛ مجله تخصصی خودروهای برقی، اخبار، مقالات، فناوری، شارژ و معرفی خودروهای الکتریکی.",

  keywords: [
    "خودرو برقی",
    "ماشین برقی",
    "خودروهای الکتریکی",
    "شارژ خودرو برقی",
    "باتری خودرو برقی",
    "ElectroCar",
  ],

  authors: [
    {
      name: "ElectroCar",
    },
  ],

  openGraph: {
    title: "ElectroCar | دنیای خودروهای برقی",
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
