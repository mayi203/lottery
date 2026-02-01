import type { Metadata } from "next";
import Picker from "@/app/ui/picker";
import LotteryDraw from "@/app/ui/lottery-draw";
import { fetchLatestDraw } from "@/app/lib/data";
import { LotteryDrawSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = envSiteUrl && envSiteUrl.length > 0 ? envSiteUrl : "https://lottery.example.com";

export const metadata: Metadata = {
  title: "双色球历史开奖号码查询 | 快速验证你的彩票号码是否中过奖",
  description: "免费在线双色球历史开奖数据查询工具。输入你的6个红球和1个蓝球号码，立即查询2013年至今是否中过一等奖、二等奖。查看最新开奖结果、奖池金额和中奖详情。",
  keywords: ["双色球", "双色球查询", "双色球历史开奖", "双色球中奖查询", "彩票号码查询", "双色球开奖结果", "双色球奖池", "福利彩票"],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "双色球历史开奖号码查询 | 快速验证你的彩票号码是否中过奖",
    description: "免费在线双色球历史开奖数据查询工具。输入你的6个红球和1个蓝球号码，立即查询2013年至今是否中过一等奖、二等奖。查看最新开奖结果、奖池金额。",
    url: siteUrl,
    siteName: "双色球开奖查询",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/double-color.png`,
        width: 512,
        height: 512,
        alt: "双色球历史开奖号码查询",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "双色球历史开奖号码查询 | 快速验证你的彩票号码是否中过奖",
    description: "免费在线双色球历史开奖数据查询工具。输入你的彩票号码，立即查询是否中过奖。",
    images: [`${siteUrl}/double-color.png`],
  },
};

async function LatestDrawSection() {
  const latest = await fetchLatestDraw();

  if (!latest) {
    return (
      <div className="flex h-48 w-full max-w-3xl items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-sm text-slate-200/80">
        暂无法获取最新开奖数据，请稍后重试。
      </div>
    );
  }

  return <LotteryDraw draw={latest} />;
}

export default async function Home() {
  const webAppData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "双色球历史开奖号码查询",
    url: siteUrl,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    inLanguage: "zh-CN",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CNY",
    },
    description: "免费在线双色球历史开奖数据查询工具。输入6个红球和1个蓝球号码，立即查询2013年至今是否中过一等奖、二等奖。查看最新开奖结果、奖池金额和中奖详情。",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?reds={reds}`,
      "query-input": "required name=reds",
    },
    author: {
      "@type": "Organization",
      name: "双色球开奖查询",
      url: siteUrl,
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0],
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "如何查询双色球历史中奖号码？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "在本页面选择6个红球（1-33）和1个蓝球（1-16），点击查询按钮即可查询该组号码在2013年至今是否中过一等奖或二等奖。",
        },
      },
      {
        "@type": "Question",
        name: "双色球开奖时间是什么时候？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "双色球每周二、四、日晚上21:15开奖。本网站会及时更新最新一期开奖结果，包括红球、蓝球、销售额、奖池金额和各奖项中奖情况。",
        },
      },
      {
        "@type": "Question",
        name: "双色球中奖规则是什么？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "双色球一等奖需中6个红球+1个蓝球，二等奖需中6个红球。本工具主要查询一等奖和二等奖的历史中奖记录，帮助您了解号码历史表现。",
        },
      },
      {
        "@type": "Question",
        name: "这个查询工具收费吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "完全免费。本站提供双色球历史开奖数据查询服务，无需注册、无需付费，输入号码即可立即查询。",
        },
      },
    ],
  };
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-1/2 h-96 w-[32rem] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" aria-hidden />
        <div className="absolute bottom-0 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-sky-500/25 blur-3xl" aria-hidden />
        <div className="absolute top-1/3 left-[-12rem] h-80 w-80 rounded-full bg-rose-500/15 blur-[110px]" aria-hidden />
      </div>

      <div className="relative z-10 flex flex-col gap-8 px-4 py-10 sm:px-10 sm:py-16">
        <header className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-200/80">
            Lucky Query Hub
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            双色球历史开奖号码查询
          </h1>
          <p className="max-w-2xl text-sm text-slate-300/85 sm:text-base">
            免费在线查询双色球彩票号码历史中奖记录。输入6个红球+1个蓝球，立即查询2013年至今是否中过一等奖、二等奖。查看最新开奖结果、奖池金额和中奖详情。
          </p>
        </header>

        <main className="flex flex-1 flex-col items-center gap-8 sm:gap-10">
          <Suspense fallback={<LotteryDrawSkeleton />}>
            <LatestDrawSection />
          </Suspense>
          <Picker />
        </main>

        <footer className="mt-10 flex justify-center border-t border-white/10 pt-6 sm:mt-12">
          <Link
            href="http://xhslink.com/o/3oU37p9IiZz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition-all duration-300 hover:border-emerald-300/60 hover:bg-emerald-400/10 hover:text-white"
          >
            <img src="/xiaohongshu.svg" alt="小红书关注双色球玩法" className="h-8 w-8 rounded-full border border-white/10" />
            关注更多玩法灵感
          </Link>
        </footer>
      </div>
    </div>
  );
}
