'use client'
import { Draw } from "@/app/lib/definitions";
import LotteryDraw from "@/app/ui/lottery-draw";
import Ball from "@/app/ui/ball";
import { useState } from "react";
import { lotteryDraw } from "@/app/lib/actions";

export default function Picker() {
    const [redSlots, setRedSlots] = useState<(number)[]>(Array(6).fill(0));
    const [blueSlot, setBlueSlot] = useState<number>(0);
    const [queryResult, setQueryResult] = useState<Draw[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const redNums = Array.from({ length: 33 }, (_, i) => i + 1);
    const blueNums = Array.from({ length: 16 }, (_, i) => i + 1);
    const selectedRedCount = redSlots.filter((n) => n > 0).length;
    const readyToSubmit = selectedRedCount === 6 && blueSlot !== 0;

    function sortBall(a: number, b: number) {
        if (a === 0) return 1;   // a 是 0，放后
        if (b === 0) return -1;  // b 是 0，a 放前
        return a - b;
    }

    function handleBallClick(num: number, type: 'red' | 'blue') {
        if (isLoading) {
            return
        }
        if (queryResult) {
            setQueryResult(null)
        }
        if (type === 'blue') {
            setBlueSlot((prev) => (prev === num ? 0 : num));
        } else {
            if (redSlots.includes(num)) {
                const newSlots = redSlots.filter(n => n !== num);
                while (newSlots.length < 6) newSlots.push(0);
                setRedSlots(newSlots.sort(sortBall));
            } else {
                const index = redSlots.findIndex(slot => slot === 0);
                if (index !== -1) {
                    const newSlots = [...redSlots];
                    newSlots[index] = num;
                    setRedSlots(newSlots.sort(sortBall));
                }
            }
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!readyToSubmit || isLoading) {
            return;
        }
        setIsLoading(true);
        const result = await lotteryDraw(redSlots);
        setQueryResult(result ?? null);
        setIsLoading(false);
    }

    return (
        <section className="relative flex w-full justify-center py-6 sm:py-10">
            <div className="absolute -top-16 left-8 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" aria-hidden />
            <div className="absolute -bottom-20 right-0 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden />

            <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-slate-900/70 shadow-[0_35px_120px_-40px_rgba(6,182,212,0.65)] backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-1">
                <div
                    className="pointer-events-none absolute inset-0 opacity-90"
                    aria-hidden
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(34,197,94,0.28),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(6,182,212,0.24),transparent_60%),radial-gradient(circle_at_50%_105%,rgba(147,197,253,0.18),transparent_70%)]" />
                </div>

                <div className="relative z-10 px-5 pb-6 pt-7 sm:px-8 sm:pb-8">
                    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">选号查询助手</h2>
                            <p className="mt-2 max-w-md text-sm text-slate-300/80">
                                精选 6 个红球与 1 个蓝球，即可快速检索以往的大奖记录。
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium">
                            <span
                                className={`inline-flex items-center justify-center rounded-full border px-3 py-1.5 transition-all duration-500 ${selectedRedCount < 6
                                    ? 'border-rose-400/60 bg-rose-500/10 text-rose-200 animate-pulse'
                                    : 'border-emerald-400/50 bg-emerald-500/10 text-emerald-100 shadow-[0_0_20px_-10px_rgba(16,185,129,0.8)]'}`}
                            >
                                红球 {selectedRedCount}/6
                            </span>
                            <span
                                className={`inline-flex items-center justify-center rounded-full border px-3 py-1.5 transition-all duration-500 ${blueSlot === 0
                                    ? 'border-sky-300/40 bg-sky-500/10 text-sky-100/70'
                                    : 'border-sky-300/80 bg-sky-500/15 text-sky-100 shadow-[0_0_18px_-10px_rgba(14,165,233,0.8)]'}`}
                            >
                                篮球 {blueSlot === 0 ? '未选择' : `已选 ${blueSlot}`}
                            </span>
                        </div>
                    </header>

                    <div className="mt-6 space-y-5">
                        <section className="rounded-2xl border border-rose-400/20 bg-rose-500/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                            <div className="flex items-center justify-between text-sm text-rose-100/90">
                                <span className="font-medium">红球区</span>
                                <span className="text-xs text-rose-100/70">单次最多可选 6 个号码</span>
                            </div>
                            <div className="mt-3 flex flex-wrap justify-start">
                                {redNums.map((num) => (
                                    <Ball
                                        key={num}
                                        num={num}
                                        type="red"
                                        selected={redSlots.includes(num)}
                                        onClick={() => {
                                            handleBallClick(num, 'red');
                                        }}
                                    />
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-sky-400/20 bg-sky-500/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                            <div className="flex items-center justify-between text-sm text-sky-100/90">
                                <span className="font-medium">蓝球区</span>
                                <span className="text-xs text-sky-100/70">可选择或取消一个号码</span>
                            </div>
                            <div className="mt-3 flex flex-wrap justify-start">
                                {blueNums.map((num) => (
                                    <Ball
                                        key={num}
                                        num={num}
                                        type="blue"
                                        selected={blueSlot === num}
                                        onClick={() => {
                                            handleBallClick(num, 'blue');
                                        }}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    <form
                        className="mt-8 flex flex-col gap-5 rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-wrap items-center justify-start">
                            {redSlots.map((num, index) => (
                                <Ball key={index} num={num} type="red" />
                            ))}
                            <Ball num={blueSlot} type="blue" />
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-slate-300/80">
                                核对所选号码后即可查询，支持重新选择快速检索历史记录。
                            </p>
                            <button
                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_20px_45px_-25px_rgba(16,185,129,0.9)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_25px_60px_-25px_rgba(45,212,191,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                                type="submit"
                                disabled={!readyToSubmit || isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" aria-hidden />
                                        查询中...
                                    </span>
                                ) : (
                                    '开始查询'
                                )}
                            </button>
                        </div>
                    </form>

                    {queryResult && (
                        <div
                            className="mt-8 w-full rounded-2xl border border-white/10 bg-white/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300"
                            aria-live="polite"
                        >
                            <h3 className="text-lg font-semibold text-white">查询结果</h3>
                            {queryResult.length > 0 ? (
                                <div className="mt-4 flex flex-col items-center gap-3 text-slate-100 sm:items-start">
                                    {queryResult.map((draw) => (
                                        <LotteryDraw key={draw.code} draw={draw} />
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-slate-300/80">该组号码暂未查询到一等奖或二等奖记录。</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
