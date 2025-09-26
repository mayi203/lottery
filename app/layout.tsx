import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts'
import "./globals.css";

export const metadata: Metadata = {
  title: "双色球号码查询",
  description: "查询你的双色球号码，在历史上有没有中过奖",
  icons: {
    icon: '/double-color.png'
  },
  openGraph: {
    title: "双色球号码查询",
    description: "查询你的双色球号码，在历史上有没有中过奖",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
