import postgres from 'postgres';
import { Draw } from '@/app/lib/definitions'
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
export async function fetchLatestDraw() {
    try {
        const data = await sql<Draw[]>`
      SELECT *
      FROM double_color_ball
      ORDER BY date DESC
      LIMIT 1`;
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest draw.');
    }
}
