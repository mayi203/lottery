import Ball from "@/app/ui/ball";
export function LotteryDrawSkeleton() {
    return (
        <article className="relative m-2 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-[0_30px_90px_-45px_rgba(59,130,246,0.45)] backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.18),transparent_55%)]" aria-hidden />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.15),transparent_60%)]" aria-hidden />
            <div className="relative z-10 flex flex-col gap-4">
                <div className="h-6 w-40 rounded-full bg-white/10" />
                <div className="flex flex-wrap items-center gap-2">
                    {Array.from({ length: 6 }, (_, index) => (
                        <Ball key={`s-red-${index}`} num={0} type="red" />
                    ))}
                    <Ball num={0} type="blue" />
                </div>
                <div className="flex gap-3">
                    <div className="h-4 w-32 rounded-full bg-white/5" />
                    <div className="h-4 w-24 rounded-full bg-white/5" />
                </div>
            </div>
        </article>
    );
}
