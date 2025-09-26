import { BallProps } from "@/app/lib/definitions";

export default function Ball({ num, type, selected = true, onClick }: BallProps) {
    const isPlaceHolder = !(num > 0);
    const palette = type === 'red'
        ? {
            accent: 'from-rose-500 to-red-500',
            border: 'border-rose-300/40',
            hover: 'hover:border-rose-300/80 hover:bg-rose-400/10',
            text: 'text-rose-100',
            idleText: 'text-rose-200/70',
            glow: 'shadow-[0_10px_30px_-15px_rgba(244,63,94,0.95)]',
        }
        : {
            accent: 'from-sky-400 to-blue-500',
            border: 'border-sky-300/40',
            hover: 'hover:border-sky-300/80 hover:bg-sky-400/10',
            text: 'text-sky-100',
            idleText: 'text-sky-200/70',
            glow: 'shadow-[0_10px_30px_-15px_rgba(14,165,233,0.9)]',
        };

    if (isPlaceHolder) {
        return (
            <div
                className={`m-1 flex h-10 w-10 items-center justify-center rounded-full border border-dashed ${palette.border} bg-white/5 backdrop-blur-md sm:m-2 sm:h-12 sm:w-12`}
            />
        );
    }

    const base = `group relative m-1 flex h-10 w-10 items-center justify-center rounded-full border ${palette.border} text-sm font-semibold transition-all duration-300 sm:m-2 sm:h-12 sm:w-12 sm:text-base`;
    const active = `bg-gradient-to-br ${palette.accent} text-white shadow-lg ${palette.glow}`;
    const inactive = `bg-white/10 ${palette.idleText} ${palette.hover}`;

    return (
        <button
            className={`${base} ${selected ? active : inactive} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/80 active:scale-95`}
            onClick={onClick}
            type="button"
        >
            <span className="translate-y-0.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                {num > 0 && num}
            </span>
        </button>
    );
}
