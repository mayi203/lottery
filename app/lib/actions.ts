'use server';

import postgres from 'postgres';
import { Draw } from '@/app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function lotteryDraw(reds: number[]) {
    const redsStr = reds.sort((a, b) => a - b).map(n => n.toString().padStart(2, '0')).join(',');
    try {
        const data = await sql<Draw[]>`
            SELECT *
            FROM double_color_ball
            WHERE red = ${redsStr} ;
        `;
        return data;
    }
    catch (error) {
        console.error('Database Error:', error);
    }
}