'use client'
import { Draw, PrizeGrade, LotteryType, lotteryConfigs } from "@/app/lib/definitions";
import Ball from "@/app/ui/ball";
import { useState } from "react";

interface LotteryDrawProps {
  draw: Draw;
  lotteryType?: LotteryType;
}

export default function LotteryDraw({ draw, lotteryType = 'double-color' }: LotteryDrawProps) {
    const [showDetail, setShowDetail] = useState(false);
    const prizegrades: PrizeGrade[] = draw.prizegrades as unknown as PrizeGrade[];
    const config = lotteryConfigs[lotteryType];
    
    // 大乐透号码是空格分隔，双色球是逗号分隔
    const redSeparator = lotteryType === 'super-lotto' ? ' ' : ',';
    const blueSeparator = lotteryType === 'super-lotto' ? ' ' : ',';
    
    return (
        <article className="group relative m-2 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-slate-900/75 p-5 shadow-[0_30px_90px_-45px_rgba(59,130,246,0.55)] backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.22),transparent_55%)]" aria-hidden />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_60%)] opacity-90" aria-hidden />

            <div className="relative z-10 flex flex-col gap-4">
                <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-lg font-semibold tracking-wide text-white/95 sm:text-xl">
                            {draw.code} 期 · {draw.date.toISOString().slice(0, 10)}
                        </h3>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">
                            Latest draw overview
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowDetail((prev) => !prev)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-slate-100 transition-all duration-300 hover:border-cyan-300/60 hover:bg-cyan-400/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" aria-hidden />
                        {showDetail ? '收起详情' : '展开详情'}
                    </button>
                </header>

                <div className="flex flex-wrap items-center gap-2">
                    {draw.red.split(redSeparator).map((item) => (
                        <Ball key={Number(item.trim())} num={Number(item.trim())} type="red" />
                    ))}
                    {draw.blue.split(blueSeparator).map((item) => (
                        <Ball key={Number(item.trim())} num={Number(item.trim())} type="blue" />
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-200/80">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400/80" aria-hidden />
                        销售额 {Number(draw.sales).toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                        <span className="h-2 w-2 rounded-full bg-sky-400/80" aria-hidden />
                        奖池 {Number(draw.poolmoney).toLocaleString()}
                    </span>
                </div>

                <div
                    className={`grid overflow-hidden transition-all duration-500 ease-out ${showDetail ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                    <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-slate-200/90 sm:text-sm">
                                <thead className="text-slate-300/70">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium">奖项</th>
                                        <th className="px-3 py-2 text-left font-medium">中奖注数</th>
                                        <th className="px-3 py-2 text-left font-medium">单注奖金</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {prizegrades.slice(0, 3).map((prize) => {
                                        // 处理奖金显示，处理 "---" 等非数字情况
                                        const moneyStr = String(prize.typemoney);
                                        const moneyNum = Number(moneyStr.replace(/,/g, ''));
                                        const moneyDisplay = moneyStr === '---' || isNaN(moneyNum) 
                                            ? '-' 
                                            : `¥ ${moneyNum.toLocaleString()}`;
                                        
                                        // 处理注数显示
                                        const numStr = String(prize.typenum);
                                        const numNum = Number(numStr.replace(/,/g, ''));
                                        const numDisplay = numStr === '---' || isNaN(numNum)
                                            ? '-'
                                            : numNum.toLocaleString();
                                        
                                        return (
                                            <tr key={prize.type}>
                                                <td className="px-3 py-2 text-slate-100/90">{prize.type}</td>
                                                <td className="px-3 py-2 text-slate-100/80">{numDisplay}</td>
                                                <td className="px-3 py-2 text-emerald-200/90">{moneyDisplay}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
