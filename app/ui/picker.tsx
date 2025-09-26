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

    console.log(`red slots:${redSlots}`)

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
            setBlueSlot(num);
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
        setIsLoading(true);
        const result = await lotteryDraw(redSlots);
        setQueryResult(result ?? null);
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col w-full max-w-2xl bg-white/10 backdrop-blur-lg p-3 sm:p-4 rounded-lg shadow-lg">
            <h2>选择一组号码查询</h2>
            <div className="flex flex-wrap justify-start">
                {redNums.map((num) => (<Ball key={num} num={num} type="red" selected={redSlots.includes(num)} onClick={() => { handleBallClick(num, 'red') }} />))}
            </div>
            <div className="flex flex-wrap justify-start mt-2">
                {blueNums.map((num) => (<Ball key={num} num={num} type="blue" selected={blueSlot === num} onClick={() => { handleBallClick(num, 'blue') }} />))}
            </div>
            <form className="flex flex-col sm:flex-row items-center justify-center border-t border-gray-300 pt-4 mt-4" onSubmit={handleSubmit}>
                <div className="flex flex-wrap justify-start mb-3 sm:mb-0">
                    {redSlots.map((num, index) => (<Ball key={index} num={num} type="red" />))}
                    <Ball num={blueSlot} type="blue" />
                </div>
                <button className="bg-green-600 rounded-sm text-white px-4 py-2 m-2 text-sm sm:text-base disabled:bg-gray-400" type='submit' disabled={isLoading || !redSlots.every(n => n > 0) || blueSlot === 0}>
                    {isLoading ? '查询中...' : '查询'}
                </button>
            </form>
            {queryResult &&
                <div className="mt-4 w-full">
                    <h3 className="text-lg font-bold mb-2 text-center sm:text-left">查询结果:</h3>
                    {queryResult.length > 0 ? (
                        <div className="flex flex-col items-center sm:items-start">
                            {queryResult.map((draw) => (
                                <LotteryDraw key={draw.code} draw={draw} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">该组号码没有中过一等奖或二等奖。</p>
                    )}
                </div>
            }
        </div>
    );
}
