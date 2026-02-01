'use server';

import postgres from 'postgres';
import { Draw, LotteryType, lotteryConfigs } from '@/app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function lotteryDraw(reds: number[], lotteryType: LotteryType = 'double-color') {
    const config = lotteryConfigs[lotteryType];
    const redsStr = reds.sort((a, b) => a - b).map(n => n.toString().padStart(2, '0')).join(',');
    try {
        const data = await sql<Draw[]>`
            SELECT *
            FROM ${sql(config.tableName)}
            WHERE red = ${redsStr} ;
        `;
        return data;
    }
    catch (error) {
        console.error('Database Error:', error);
    }
}

export async function superLottoDraw(reds: number[], blues: number[]) {
    // 大乐透数据库中使用空格分隔
    const redsStr = reds.sort((a, b) => a - b).map(n => n.toString().padStart(2, '0')).join(' ');
    const bluesStr = blues.sort((a, b) => a - b).map(n => n.toString().padStart(2, '0')).join(' ');
    try {
        const data = await sql<Draw[]>`
            SELECT *
            FROM super_lotto
            WHERE red = ${redsStr} AND blue = ${bluesStr};
        `;
        return data;
    }
    catch (error) {
        console.error('Database Error:', error);
    }
}