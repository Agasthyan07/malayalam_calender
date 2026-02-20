import fs from 'fs';
import path from 'path';
import { DailyData } from '@/types/date';

export async function getDailyData(dateStr: string): Promise<DailyData | null> {
    // dateStr format: YYYY-MM-DD
    const [year, month] = dateStr.split('-');
    const filePath = path.join(process.cwd(), 'data', year, `${month}.json`);

    try {
        if (!fs.existsSync(filePath)) return null;
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const monthlyData: DailyData[] = JSON.parse(fileContent);
        return monthlyData.find(d => d.date === dateStr) || null;
    } catch (error) {
        console.error(`Error loading data for ${dateStr}:`, error);
        return null;
    }
}

export async function getMonthData(year: string, month: string): Promise<DailyData[]> {
    const filePath = path.join(process.cwd(), 'data', year, `${month}.json`);
    try {
        if (!fs.existsSync(filePath)) return [];
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error loading month data for ${year}-${month}:`, error);
        return [];
    }
}

export async function getYearData(year: string): Promise<DailyData[]> {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    // Fetch all months in parallel for better performance
    const monthsData = await Promise.all(
        months.map(month => getMonthData(year, month))
    );

    return monthsData.flat();
}

export function formatDate(dateStr: string): string {
    // Input: YYYY-MM-DD
    // Output: DD-MM-YYYY
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
}

export async function getWeekData(startDateStr: string): Promise<DailyData[]> {
    const startDate = new Date(startDateStr);
    const weekData: DailyData[] = [];

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateStr = currentDate.toISOString().split('T')[0];
        const data = await getDailyData(dateStr);
        if (data) {
            weekData.push(data);
        }
    }
    return weekData;
}
