'use client'
import { Draw } from "@/app/lib/definitions";
import LotteryDraw from "@/app/ui/lottery-draw";
import Ball from "@/app/ui/ball";
import { useState } from "react";
import { lotteryDraw } from "@/app/lib/actions";

export default function Picker() {
    const [selectedReds, setSelectedReds] = useState<number[]>([]);
    const [selectedBlue, setSelectedBlue] = useState<number | null>(null);
    const [queryResult, setQueryResult] = useState<Draw[] | null>(null);
    const redNums = Array.from({ length: 33 }, (_, i) => i + 1);
    const blueNums = Array.from({ length: 16 }, (_, i) => i + 1);

    async function handleBallClick(num: number, type: 'red' | 'blue') {
        if (type === 'blue') {
            setSelectedBlue(num);
        } else {
            if (selectedReds.includes(num)) {
                setSelectedReds(selectedReds.filter(n => n !== num))
            } else if (selectedReds.length < 6) {
                setSelectedReds([...selectedReds, num])
            }
        }
    }

    return (
        <div className="flex flex-col w-200 bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg">
            <div className="flex flex-wrap">
                {redNums.map((num) => (<Ball num={num} type="red" selected={selectedReds.includes(num)} onClick={() => { handleBallClick(num, 'red') }} />))}
            </div>
            <div className="flex flex-wrap">
                {blueNums.map((num) => (<Ball num={num} type="blue" selected={selectedBlue === num} onClick={() => { handleBallClick(num, 'blue') }} />))}
            </div>
            <form action={async () => {
                const result = await lotteryDraw(selectedReds)
                setQueryResult(result ?? null)
            }}>
                <p>红球: {selectedReds.sort((a, b) => a - b).join(',')}</p>
                <p>蓝球: {selectedBlue}</p>
                {(selectedReds.length == 6 && selectedBlue) &&
                    <button className="bg-blue-400 rounded-sm p-1" type='submit'>查询</button>}
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
