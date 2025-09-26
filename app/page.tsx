import Picker from "@/app/ui/picker";
import LotteryDraw from "@/app/ui/lottery-draw";
import { fetchLatestDraw } from "@/app/lib/data";
import { LotteryDrawSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import Link from "next/link";

export default async function Home() {
  const latest = await fetchLatestDraw()
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
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
            双色球历史中奖号码查询
          </h1>
          <p className="max-w-2xl text-sm text-slate-300/85 sm:text-base">
            快速输入你关注的号码组合，立即查看 2013-01-01 以来的中奖记录，掌握每一次幸运的足迹。
          </p>
        </header>

        <main className="flex flex-1 flex-col items-center gap-8 sm:gap-10">
          <Suspense fallback={<LotteryDrawSkeleton />}>
            <LotteryDraw draw={latest} />
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
            <img src="/xiaohongshu.svg" alt="Xiaohongshu" className="h-8 w-8 rounded-full border border-white/10" />
            关注更多玩法灵感
          </Link>
        </footer>
      </div>
    </div>
  );
}
