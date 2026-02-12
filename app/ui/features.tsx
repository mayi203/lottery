import { ChartBarIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const features = [
    {
        name: '实时同步开奖',
        description: '与官方数据源毫秒级同步，确保您第一时间获取最新的双色球与大乐透开奖结果。',
        icon: ClockIcon,
    },
    {
        name: '历史数据验证',
        description: '基于海量历史数据库，一键验证您的号码是否命中过往大奖，助您科学选号。',
        icon: ChartBarIcon,
    },
    {
        name: '隐私安全保护',
        description: '无需注册登录，所有查询均在本地加密处理，完全保护您的选号隐私与使用记录。',
        icon: ShieldCheckIcon,
    },
];

export default function Features() {
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-emerald-400">更智能的选号工具</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        数据驱动，科学验证
                    </p>
                    <p className="mt-6 text-lg leading-8 text-slate-300">
                        摒弃盲目猜测，使用专业工具分析号码走势。我们提供全方位的历史数据支持，让您的每一次选择都有据可依。
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                    <feature.icon className="h-5 w-5 flex-none text-emerald-400" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
