import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Seu Nome — Desenvolvedor, Designer & Growth Marketer",
    template: "%s | Seu Nome",
  },
  description:
    "Portfólio multiverso de um profissional híbrido. Desenvolvedor Full Stack, Designer Visual e Growth Marketer.",
  keywords: [
    "desenvolvedor",
    "designer",
    "growth marketing",
    "full stack",
    "react",
    "next.js",
    "portfólio",
  ],
  authors: [{ name: "Seu Nome" }],
  creator: "Seu Nome",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seusite.com",
    title: "Seu Nome — Desenvolvedor, Designer & Growth Marketer",
    description:
      "Um portfólio que muda de universo. Explore 5 dimensões visuais do mesmo profissional.",
    siteName: "Portfolio Multiverse",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Multiverse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seu Nome — Portfolio Multiverse",
    description: "Um portfólio com 5 universos visuais. Mude o tema e surpreenda-se.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#080C14" },
    { media: "(prefers-color-scheme: light)", color: "#080C14" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ── SCRIPT ANTI-FOUC ────────────────────────────────────────────────────────
// Injetado ANTES do React hidratar — previne flash de tema errado.
const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('portfolio-theme');
      var valid = ['default','retro2000','western','cyberpunk','arcade'];
      if (saved && valid.includes(saved)) {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch (_) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      data-theme="default"
      suppressHydrationWarning
    >
      <head>
        {/* Script anti-FOUC: executa antes do React */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* Preload de fontes críticas */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload de sons */}
        <link rel="preload" href="/sounds/transition.mp3" as="audio" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}