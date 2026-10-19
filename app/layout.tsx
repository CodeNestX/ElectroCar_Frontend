import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const vazirmatn = Vazirmatn({
  // "latin" is needed so English text uses the same font as Persian text
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-vazirmatn",
});

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
      <body className={vazirmatn.variable}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
