import type { Metadata } from "next";
import Picker from "@/app/ui/picker";
import LotteryDraw from "@/app/ui/lottery-draw";
import { fetchLatestDraw } from "@/app/lib/data";
import { lotteryConfigs } from "@/app/lib/definitions";
import { LotteryDrawSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import Link from "next/link";
import LotteryNav from "@/app/ui/lottery-nav";

export const dynamic = "force-dynamic";

const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = envSiteUrl && envSiteUrl.length > 0 ? envSiteUrl : "https://lottery.example.com";

const config = lotteryConfigs['super-lotto'];

export const metadata: Metadata = {
  title: `${config.name}历史开奖号码查询 | 快速验证你的彩票号码是否中过奖`,
  description: config.description,
  keywords: config.keywords,
  alternates: {
    canonical: `${siteUrl}/super-lotto`,
  },
  openGraph: {
    title: `${config.name}历史开奖号码查询 | 快速验证你的彩票号码是否中过奖`,
    description: config.description,
    url: `${siteUrl}/super-lotto`,
    siteName: `${config.name}开奖查询`,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/double-color.png`,
        width: 512,
        height: 512,
        alt: `${config.name}历史开奖号码查询`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.name}历史开奖号码查询 | 快速验证你的彩票号码是否中过奖`,
    description: config.description,
    images: [`${siteUrl}/double-color.png`],
  },
};

async function LatestDrawSection() {
  const latest = await fetchLatestDraw('super-lotto');

  if (!latest) {
    return (
      <div className="flex h-48 w-full max-w-3xl items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-sm text-slate-200/80">
        暂无法获取最新开奖数据，请稍后重试。
      </div>
    );
  }

  return <LotteryDraw draw={latest} lotteryType="super-lotto" />;
}

export default async function SuperLottoPage() {
  const webAppData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${config.name}历史开奖号码查询`,
    url: `${siteUrl}/super-lotto`,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    inLanguage: "zh-CN",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CNY",
    },
    description: config.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/super-lotto?reds={reds}`,
      "query-input": "required name=reds",
    },
    author: {
      "@type": "Organization",
      name: `${config.name}开奖查询`,
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
        name: `如何查询${config.name}历史中奖号码？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `在本页面选择${config.redCount}个${config.redName}（1-${config.redRange}）和${config.blueCount}个${config.blueName}（1-${config.blueRange}），点击查询按钮即可查询该组号码在历史开奖中是否中过一等奖或二等奖。`,
        },
      },
      {
        "@type": "Question",
        name: `${config.name}开奖时间是什么时候？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${config.name}每周一、三、六晚上20:30开奖。本网站会及时更新最新一期开奖结果，包括${config.redName}、${config.blueName}、销售额、奖池金额和各奖项中奖情况。`,
        },
      },
      {
        "@type": "Question",
        name: `${config.name}中奖规则是什么？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${config.name}一等奖需中${config.redCount}个${config.redName}+${config.blueCount}个${config.blueName}，二等奖需中${config.redCount}个${config.redName}+1个${config.blueName}。本工具主要查询一等奖和二等奖的历史中奖记录，帮助您了解号码历史表现。`,
        },
      },
      {
        "@type": "Question",
        name: "这个查询工具收费吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "完全免费。本站提供彩票历史开奖数据查询服务，无需注册、无需付费，输入号码即可立即查询。",
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
          <LotteryNav currentType="super-lotto" />
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {config.name}历史开奖号码查询
          </h1>
          <p className="max-w-2xl text-sm text-slate-300/85 sm:text-base">
            免费在线查询{config.name}彩票号码历史中奖记录。输入{config.redCount}个{config.redName}+{config.blueCount}个{config.blueName}，立即查询是否中过一等奖、二等奖。查看最新开奖结果、奖池金额和中奖详情。
          </p>
        </header>

        <main className="flex flex-1 flex-col items-center gap-8 sm:gap-10">
          <Suspense fallback={<LotteryDrawSkeleton />}>
            <LatestDrawSection />
          </Suspense>
          <Picker lotteryType="super-lotto" />
        </main>

        <footer className="mt-10 flex justify-center border-t border-white/10 pt-6 sm:mt-12">
          <Link
            href="http://xhslink.com/o/3oU37p9IiZz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition-all duration-300 hover:border-emerald-300/60 hover:bg-emerald-400/10 hover:text-white"
          >
            <img src="/xiaohongshu.svg" alt={`小红书关注${config.name}玩法`} className="h-8 w-8 rounded-full border border-white/10" />
            关注更多玩法灵感
          </Link>
        </footer>
      </div>
    </div>
  );
}
