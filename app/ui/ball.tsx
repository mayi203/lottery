import { BallProps } from "@/app/lib/definitions";
export default function Ball({ num, type, selected = true, onClick }: BallProps) {
    const isPlaceHolder = !(num > 0)
    if (isPlaceHolder) {
        return (<button className="flex h-12 w-12 m-2 
            justify-center items-center rounded-full 
            backdrop-blur-lg shadow-inner 
            text-gray-400
            border border-white/20 bg-gray-200">
            ？
        </button>);
    }
    const bgColor = selected ?
        type === 'red' ? 'bg-red-800' : 'bg-blue-800' :
        type === 'red' ? 'bg-red-500' : 'bg-blue-500';
    return (
        <button className={`flex h-12 w-12 m-2
            justify-center items-center rounded-full 
            backdrop-blur-lg shadow-lg
            border border-white/20 
            ${bgColor} bg-opacity-90
            text-white/90
            hover:scale-105 hover:shadow-2xl transition-all duration-300`}
            onClick={onClick}>
            {num > 0 && num}
        </button>
    );
}
