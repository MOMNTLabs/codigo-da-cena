import type { Metadata } from "next";
import "./globals.css";

const publicDomain = process.env.RAILWAY_PUBLIC_DOMAIN;

export const metadata: Metadata = {
  title: "Código da Cena — Desenvolvimento de carreira para DJs",
  description: "Programa presencial de desenvolvimento de carreira para DJs na Grande Vitória.",
  metadataBase: new URL(
    publicDomain ? `https://${publicDomain}` : "http://localhost:3000",
  ),
  openGraph: {
    title: "Código da Cena — Desenvolvimento de carreira para DJs",
    description: "Programa presencial de desenvolvimento de carreira para DJs na Grande Vitória.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Código da Cena — Desenvolvimento de carreira para DJs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Código da Cena — Desenvolvimento de carreira para DJs",
    description: "Programa presencial de desenvolvimento de carreira para DJs na Grande Vitória.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
