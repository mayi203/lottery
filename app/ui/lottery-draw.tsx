'use client'
import { Draw, PrizeGrade } from "@/app/lib/definitions";
import Ball from "@/app/ui/ball";
import { useState } from "react";
export default function LotteryDraw({ draw }: { draw: Draw }) {
    const [showDetail, setShowDetail] = useState(false);
    const prizegrades: PrizeGrade[] = draw.prizegrades as unknown as PrizeGrade[];
    return (
        <div className="flex flex-col bg-white/90 backdrop-blur-lg p-3 sm:p-4 rounded-lg shadow-lg m-2 w-full max-w-2xl">
            <h3> {draw.date.toISOString().slice(0, 10)} | {draw.code}期</h3>
            <div className="flex flex-row flex-wrap justify-start">
                {draw.red.split(',').map(item => <Ball key={Number(item)} num={Number(item)} type="red" />)}
                {<Ball num={Number(draw.blue)} type="blue" />}
            </div>
            <span className="text-blue-500 ml-auto text-sm sm:text-base cursor-pointer" onClick={() => setShowDetail(!showDetail)}>{showDetail ? '收起' : '详情'}</span>
            {
                showDetail &&
                <div className="flex flex-col bg-gray-200/50 backdrop-blur-lg p-3 sm:p-4 m-2 mt-4 w-full">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm sm:text-base">
                            <thead>
                                <tr>
                                    <th className="text-left p-2">奖项</th>
                                    <th className="text-left p-2">中奖注数</th>
                                    <th className="text-left p-2">单注奖金</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prizegrades.slice(0, 3).map((prize) => {
                                    return (
                                        <tr key={prize.type}>
                                            <td className="p-2">{prize.type}等奖</td>
                                            <td className="p-2">{Number(prize.typenum).toLocaleString()}</td>
                                            <td className="p-2">{Number(prize.typemoney).toLocaleString()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs sm:text-sm mt-2">{`销售额: ${Number(draw.sales).toLocaleString()}`}</p>
                    <p className="text-xs sm:text-sm mt-2">{`奖池: ${Number(draw.poolmoney).toLocaleString()}`}</p>
                </div>
            }
        </div>
    );
}
