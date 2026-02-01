import type { Metadata, Viewport } from "next";
import { inter } from '@/app/ui/fonts'
import "./globals.css";

const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = envSiteUrl && envSiteUrl.length > 0 ? envSiteUrl : "https://lottery.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "双色球历史开奖号码查询 | 验证你的彩票是否中过奖",
    template: "%s | 双色球开奖查询",
  },
  description: "免费在线双色球历史开奖数据查询平台。支持输入6个红球+1个蓝球号码，查询2013年至今的中奖记录。查看最新开奖结果、奖池金额、中奖注数等详细信息。",
  keywords: [
    "双色球",
    "双色球查询",
    "双色球开奖号码",
    "双色球历史开奖",
    "双色球中奖查询",
    "彩票号码查询",
    "双色球开奖结果",
    "双色球奖池",
    "福利彩票",
    "双色球一等奖",
    "双色球二等奖",
  ],
  icons: {
    icon: "/double-color.png",
    apple: "/double-color.png",
    shortcut: "/double-color.png",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "zh-CN": siteUrl,
    },
  },
  authors: [{ name: "双色球开奖查询", url: siteUrl }],
  creator: "双色球开奖查询",
  publisher: "双色球开奖查询",
  category: "Lottery",
  classification: "彩票查询工具",
  openGraph: {
    title: "双色球历史开奖号码查询 | 验证你的彩票是否中过奖",
    description: "免费在线双色球历史开奖数据查询平台。输入你的彩票号码，查询2013年至今的中奖记录。",
    url: siteUrl,
    siteName: "双色球开奖查询",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/double-color.png",
        width: 512,
        height: 512,
        alt: "双色球历史开奖号码查询工具",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "双色球历史开奖号码查询 | 验证你的彩票是否中过奖",
    description: "免费在线双色球历史开奖数据查询平台。输入你的彩票号码，查询2013年至今的中奖记录。",
    images: ["/double-color.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "origin-when-cross-origin",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  other: {
    "baidu-site-verification": process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || "",
  },
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
