import Picker from "@/app/ui/picker";
import LotteryDraw from "@/app/ui/lottery-draw";
import { fetchLatestDraw } from "@/app/lib/data";
import { LotteryDrawSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import Link from "next/link";

export default async function Home() {
  const latest = await fetchLatestDraw()
  return (
    <div className="font-sans min-h-screen p-4 sm:p-8 bg-gray-200">
      <header className="text-center mb-6 sm:mb-8">
        <h1>双色球中奖号码查询</h1>
        <h3>查询你的双色球号码，在历史上有没有中过奖。数据截止 2013-01-01</h3>
      </header>
      <main className="flex flex-col gap-6 sm:gap-8 items-center">
        <Suspense fallback={<LotteryDrawSkeleton />}>
          <LotteryDraw draw={latest} />
        </Suspense>
        <Picker />
      </main>
      <footer className="mt-8 sm:mt-12 text-center text-sm text-gray-500 border-t border-gray-300 pt-2">
        <Link href="http://xhslink.com/o/3oU37p9IiZz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
          <img src="/xiaohongshu.svg" alt="Xiaohongshu" className="w-8 h-8" />
        </Link>
      </footer>
    </div>
  );
}
