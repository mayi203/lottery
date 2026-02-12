import { LotteryType } from "@/app/lib/definitions";

interface StatsProps {
    lotteryType?: LotteryType;
}

export default function Stats({ lotteryType = 'double-color' }: StatsProps) {
    const startYear = lotteryType === 'super-lotto' ? '2007' : '2013';

    const stats = [
        { id: 1, name: '累计查询次数', value: '10万+' },
        { id: 2, name: '收录开奖历史', value: `${startYear}年至今` },
        { id: 3, name: '数据更新速度', value: '< 1分钟' },
        { id: 4, name: '服务稳定性', value: '99.9%' },
    ];

    return (
        <div className="bg-slate-900/50 py-12 sm:py-16 backdrop-blur-sm border-y border-white/5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-slate-400">{stat.name}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
