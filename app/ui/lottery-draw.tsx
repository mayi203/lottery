'use client'
import { Draw } from "@/app/lib/definitions";
import Ball from "@/app/ui/ball";
import { useState } from "react";
export default function LotteryDraw({ draw }: { draw: Draw }) {
    const [showDetail, setShowDetail] = useState(false);
    return (
        <div className="flex flex-col">
            <p> {draw.date.toISOString().slice(0, 10)} | 第{draw.code}期</p>
            <div className="flex flex-row">
                {draw.red.split(',').map(item => <Ball num={Number(item)} type="red" />)}
                {<Ball num={Number(draw.blue)} type="blue" />}
            </div>
            <span onClick={() => setShowDetail(!showDetail)}>{showDetail ? '展开' : '收起'}</span>
            {
                showDetail ?? <div>
                    {`sales:${draw.sales} poolmoney:${draw.poolmoney}`}
                </div>
            }
        </div>
    );
}