'use client'

import Link from "next/link";
import { LotteryType, lotteryConfigs } from "@/app/lib/definitions";

interface LotteryNavProps {
  currentType: LotteryType;
}

export default function LotteryNav({ currentType }: LotteryNavProps) {
  const types: LotteryType[] = ['double-color', 'super-lotto'];
  
  return (
    <nav className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
      {types.map((type) => {
        const config = lotteryConfigs[type];
        const isActive = currentType === type;
        const href = type === 'double-color' ? '/' : '/super-lotto';
        
        return (
          <Link
            key={type}
            href={href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {config.name}
          </Link>
        );
      })}
    </nav>
  );
}
