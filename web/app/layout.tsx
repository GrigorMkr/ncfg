import type { Metadata } from "next";
import { SmoothAnchor } from "@/shared/ui/SmoothAnchor";
import { PageBackground } from "@/shared/ui/PageBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "НЦФГ — Национальный центр финансовой грамотности",
  description:
    "Более 20 лет реализуем проекты по финансовой грамотности. 30 миллионов участников, 84 региона, программы для компаний и частных лиц.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "НЦФГ — Национальный центр финансовой грамотности",
    description:
      "Более 20 лет реализуем проекты по финансовой грамотности. 30 миллионов участников, 84 региона.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        <PageBackground />
        <SmoothAnchor />
        {children}
      </body>
    </html>
  );
}
