import { BallProps } from "@/app/lib/definitions";
export default function Ball({ num, type, selected = true, onClick }: BallProps) {
    const isPlaceHolder = !(num > 0)
    if (isPlaceHolder) {
        const borderColor = type === 'red' ? 'border-red-400/20' : 'border-blue-400/20';
        return (<div className={`flex h-10 w-10 sm:h-12 sm:w-12 m-1 sm:m-2 
            justify-center items-center rounded-full 
            backdrop-blur-lg shadow-inner 
            border border-2 ${borderColor}`}>
        </div>);
    }
    const bgColor = selected ?
        type === 'red' ? 'bg-red-800' : 'bg-blue-800' :
        type === 'red' ? 'bg-red-500' : 'bg-blue-500';
    return (
        <button className={`flex h-10 w-10 sm:h-12 sm:w-12 m-1 sm:m-2
            justify-center items-center rounded-full 
            backdrop-blur-lg shadow-lg
            ${bgColor} bg-opacity-90
            text-white/90 text-sm sm:text-base
            hover:scale-105 hover:shadow-2xl transition-all duration-300`}
            onClick={onClick}>
            {num > 0 && num}
        </button>
    );
}
