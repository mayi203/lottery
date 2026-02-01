import postgres from 'postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Draw, LotteryType, lotteryConfigs } from '@/app/lib/definitions'
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchLatestDraw(lotteryType: LotteryType = 'double-color') {
    const config = lotteryConfigs[lotteryType];
    try {
        noStore();
        const data = await sql<Draw[]>`
      SELECT *
      FROM ${sql(config.tableName)}
      ORDER BY date DESC
      LIMIT 1`;
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest draw.');
    }
}
