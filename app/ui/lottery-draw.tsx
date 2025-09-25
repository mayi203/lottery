'use client'
import { Draw, PrizeGrade } from "@/app/lib/definitions";
import Ball from "@/app/ui/ball";
import { useState } from "react";
export default function LotteryDraw({ draw }: { draw: Draw }) {
    const [showDetail, setShowDetail] = useState(false);
    console.log(draw.prizegrades);
    const prizegrades: PrizeGrade[] = draw.prizegrades as unknown as PrizeGrade[];
    console.log(prizegrades);
    return (
        <div className="flex flex-col bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg m-2">
            <p> {draw.date.toISOString().slice(0, 10)} | 第{draw.code}期</p>
            <div className="flex flex-row">
                {draw.red.split(',').map(item => <Ball num={Number(item)} type="red" />)}
                {<Ball num={Number(draw.blue)} type="blue" />}
            </div>
            <span onClick={() => setShowDetail(!showDetail)}>{showDetail ? '收起' : '展开'}</span>
            {
                showDetail &&
                <div className="flex flex-col bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg m-2">
                    <table>
                        <thead>
                            <tr>
                                <th>奖项</th>
                                <th>中奖注数</th>
                                <th>单注奖金</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prizegrades.slice(0,6).map((prize) => (
                                <tr key={prize.type}>
                                    <td>{prize.type}等奖</td>
                                    <td>{prize.typenum}</td>
                                    <td>{prize.typemoney}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {`销售额:${draw.sales} 奖池:${draw.poolmoney}`}
                </div>
            }
        </div>
    );
}