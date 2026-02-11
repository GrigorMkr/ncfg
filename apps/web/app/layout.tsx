import type { Metadata } from "next";
import { SmoothAnchor } from "@/shared/ui/SmoothAnchor";
import { PageBackground } from "@/shared/ui/PageBackground";
import { ThemeProvider } from "@/shared/ui/ThemeProvider";
import { LanguageProvider } from "@/shared/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "NCFL — National Center for Financial Literacy",
  description:
    "Over 20 years of financial literacy projects. 30 million participants, 84 regions, programs for companies and individuals.",
  openGraph: {
    title: "NCFL — National Center for Financial Literacy",
    description:
      "Over 20 years of financial literacy projects. 30 million participants, 84 regions.",
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
    <html lang="ru" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <PageBackground />
            <SmoothAnchor />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
