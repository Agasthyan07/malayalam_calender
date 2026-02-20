import { redirect } from 'next/navigation';

type Props = {
    params: Promise<{ year: string, month: string }>;
}

export default async function MonthPage({ params }: Props) {
    const { year, month } = await params;
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();

    redirect(`/malayalam-calendar-${monthName}-${year}`);
}

