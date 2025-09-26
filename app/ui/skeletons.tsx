import Ball from "@/app/ui/ball";
export function LotteryDrawSkeleton() {
    return (<div className="flex flex-col bg-white/10 backdrop-blur-lg p-3 sm:p-4 rounded-lg shadow-lg m-2 w-full max-w-2xl">
        <h3> </h3>
        <div className="flex flex-row flex-wrap justify-start">
            {Array.from({ length: 6 }, () => 0).map(item => <Ball key={Number(item)} num={Number(item)} type="red" />)}
            <Ball num={0} type="blue" />
        </div>
    </div>);
}