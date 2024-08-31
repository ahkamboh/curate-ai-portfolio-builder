import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

// Replace with your actual image URL for better social sharing visuals
const imageUrl = "https://curateai.online/curateai.png";

export const metadata: Metadata = {
  title: {
    default: "Curate.ai | Your AI-Powered Portfolio Builder",
    template: "%s | Curate.ai",
  },
  description:
    "Effortlessly create stunning portfolios with Curate.ai, the AI-powered platform designed to enhance your professional branding.",
  keywords:
    "Curate.ai, Portfolio Builder, AI Portfolio, Professional Portfolio, Portfolio Templates, Curate AI",
  openGraph: {
    title: "Curate.ai | Your AI-Powered Portfolio Builder",
    description:
      "Effortlessly create stunning portfolios with Curate.ai, the AI-powered platform designed to enhance your professional branding.",
    url: "https://curateai.online",
    type: "website",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Curate.ai - Your AI-Powered Portfolio Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curate.ai | Your AI-Powered Portfolio Builder",
    description:
      "Effortlessly create stunning portfolios with Curate.ai, the AI-powered platform designed to enhance your professional branding.",
    images: [imageUrl],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
        variables: { colorPrimary: "#fa0053" },
      }}
    >
      <html lang="en">
        
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}


