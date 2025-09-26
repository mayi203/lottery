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
    const redNums = Array.from({ length: 33 }, (_, i) => i + 1);
    const blueNums = Array.from({ length: 16 }, (_, i) => i + 1);

    console.log(`red slots:${redSlots}`)

    function sortBall(a: number, b: number) {
        if (a === 0) return 1;   // a 是 0，放后
        if (b === 0) return -1;  // b 是 0，a 放前
        return a - b;
    }

    async function handleBallClick(num: number, type: 'red' | 'blue') {
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

    return (
        <div className="flex flex-col w-200 bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg">
            <div className="flex flex-wrap">
                {redNums.map((num) => (<Ball num={num} type="red" selected={redSlots.includes(num)} onClick={() => { handleBallClick(num, 'red') }} />))}
            </div>
            <div className="flex flex-wrap">
                {blueNums.map((num) => (<Ball num={num} type="blue" selected={blueSlot === num} onClick={() => { handleBallClick(num, 'blue') }} />))}
            </div>
            <form className="flex flex-row border-t border-gray-300" action={async () => {
                const result = await lotteryDraw(redSlots)
                setQueryResult(result ?? null)
            }}>
                {redSlots.map((num, index) => (<Ball key={index} num={num} type="red" />))}
                <Ball num={blueSlot} type="blue" />
                {(redSlots.every(n => n > 0) && blueSlot > 0) &&
                    <button className="bg-green-600 rounded-sm text-white w-16 m-2" type='submit'>查询</button>}
            </form>
            {queryResult &&
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">查询结果:</h3>
                    {queryResult.length > 0 ? (
                        queryResult.map((draw) => (
                            <LotteryDraw key={draw.code} draw={draw} />
                        ))
                    ) : (
                        <p>未找到匹配的开奖数据。</p>
                    )}
                </div>
            }
        </div>
    );
}
