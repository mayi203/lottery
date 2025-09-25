'use client'
import { Draw } from "../lib/definitions";
import Ball from "@/app/ui/ball";
import { useState } from "react";
import { lotteryDraw } from "../lib/actions";

export default function Picker() {
    const [selectedReds, setSelectedReds] = useState<number[]>([]);
    const [selectedBlue, setSelectedBlue] = useState<number | null>(null);
    const [queryResult, setQueryResult] = useState<Draw[] | null>(null);
    const redNums = Array.from({ length: 36 }, (_, i) => i + 1);
    const blueNums = Array.from({ length: 12 }, (_, i) => i + 1);

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
        <div className="flex flex-col">
            <div className="flex flex-cow">
                {redNums.map((num) => (<Ball num={num} type="red" selected={selectedReds.includes(num)} onClick={() => { handleBallClick(num, 'red') }} />))}
            </div>
            <div className="flex flex-cow">
                {blueNums.map((num) => (<Ball num={num} type="blue" selected={selectedBlue === num} onClick={() => { handleBallClick(num, 'blue') }} />))}
            </div>
            <form action={async () => {
                const result = await lotteryDraw(selectedReds)
                setQueryResult(result ?? null)
            }}>
                <p>红球: {selectedReds.join(',')}</p>
                <p>蓝球: {selectedBlue}</p>
                {(selectedReds.length == 6 && selectedBlue) && <button type='submit'>查询</button>}
            </form>
        </div>
    );
}
