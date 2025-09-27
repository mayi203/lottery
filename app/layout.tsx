import type { Metadata, Viewport } from "next";
import { inter } from '@/app/ui/fonts'
import "./globals.css";

const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = envSiteUrl && envSiteUrl.length > 0 ? envSiteUrl : "https://lottery.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "双色球号码查询",
    template: "%s | 双色球号码查询",
  },
  description: "查询你的双色球号码，在历史上有没有中过奖",
  keywords: [
    "双色球",
    "双色球开奖号码",
    "双色球历史查询",
    "福利彩票",
    "中奖号码查询",
    "双色球开奖数据",
  ],
  icons: {
    icon: "/double-color.png",
    apple: "/double-color.png",
    shortcut: "/double-color.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
    },
  },
  authors: [{ name: "双色球号码查询" }],
  creator: "双色球号码查询团队",
  publisher: "双色球号码查询团队",
  category: "Lottery",
  openGraph: {
    title: "双色球号码查询",
    description: "查询你的双色球号码，在历史上有没有中过奖",
    url: siteUrl,
    siteName: "双色球号码查询",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/double-color.png",
        width: 512,
        height: 512,
        alt: "双色球号码查询封面图",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "双色球号码查询",
    description: "查询你的双色球号码，在历史上有没有中过奖",
    images: ["/double-color.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
