import type { Metadata } from "next";
import Picker from "@/app/ui/picker";
import LotteryDraw from "@/app/ui/lottery-draw";
import { fetchLatestDraw } from "@/app/lib/data";
import { lotteryConfigs } from "@/app/lib/definitions";
import { LotteryDrawSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import Link from "next/link";
import LotteryNav from "@/app/ui/lottery-nav";
import Features from "@/app/ui/features";
import Stats from "@/app/ui/stats";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] translate-x-1/3 translate-y-1/3 rounded-full bg-sky-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-0 h-[25rem] w-[25rem] -translate-x-1/3 -translate-y-1/2 rounded-full bg-rose-500/10 blur-[100px]" />
      </div>

      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <span className="text-xl font-bold tracking-tight text-white">
            Lottery<span className="text-emerald-400">Hub</span>
          </span>
          <LotteryNav currentType="super-lotto" />
        </div>
      </header>

      <main className="relative z-10 flex flex-col pt-24">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex animate-fade-in items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 items-center justify-center">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400 absolute inline-flex opacity-75"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 relative inline-flex"></span>
              </span>
              数据同步更新中
            </div>

            <h1 className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
              {config.name}历史开奖查询
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              专业的数据分析工具，助您快速验证号码历史表现。
              <br className="hidden sm:inline" />
              包含一等奖、二等奖中奖记录查询，完全免费。
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#picker"
                className="group flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                立即开始查询
                <ArrowDownIcon className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
              <Link href="#latest" className="text-sm font-semibold leading-6 text-white hover:text-emerald-400 transition-colors">
                查看最新开奖 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <Stats lotteryType="super-lotto" />

        {/* Latest Draw & Picker Section */}
        <div id="latest" className="scroll-mt-28 bg-slate-900/40 py-20 border-y border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center gap-12">
              <div className="w-full max-w-3xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                  <h2 className="text-sm font-medium uppercase tracking-wider text-slate-400">最新一期</h2>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                </div>
                <Suspense fallback={<LotteryDrawSkeleton />}>
                  <LatestDrawSection />
                </Suspense>
              </div>

              <div id="picker" className="w-full scroll-mt-32">
                <Picker lotteryType="super-lotto" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <Features />

        {/* FAQ Section */}
        <section className="bg-slate-900/30 py-24 sm:py-32 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">常见问题</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                关于{config.name}查询工具的常见疑问解答
              </p>
            </div>

            <dl className="mx-auto mt-16 max-w-2xl space-y-8 divide-y divide-white/10">
              {faqData.mainEntity.map((faq, index) => (
                <div key={index} className="pt-8">
                  <dt className="text-base font-semibold leading-7 text-white">
                    {faq.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-slate-400">
                    {faq.acceptedAnswer.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-6 md:flex-row lg:px-8">
          <p className="text-xs leading-5 text-slate-400">
            &copy; {new Date().getFullYear()} LotteryHub. All rights reserved. 理性购彩，量力而行。
          </p>
          <Link
            href="http://xhslink.com/o/3oU37p9IiZz"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-200"
          >
            <img src="/xiaohongshu.svg" alt="小红书" className="h-5 w-5 rounded-full opacity-80 transition-opacity group-hover:opacity-100" />
            <span>关注更多玩法灵感</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
