import React from 'react';

interface NormalCalendarGridProps {
  year: number;
  month: number; // 0-indexed (0 = January)
}

const NormalCalendarGrid: React.FC<NormalCalendarGridProps> = ({ year, month }) => {
  // Get first day of month (0 = Sunday)
  const firstDay = new Date(year, month, 1).getDay();
  // Number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = new Array(7).fill(null);
  let dayCounter = 1;

  // Fill initial empty cells
  for (let i = firstDay; i < 7; i++) {
    week[i] = dayCounter++;
  }
  weeks.push(week);

  while (dayCounter <= daysInMonth) {
    week = new Array(7).fill(null);
    for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
      week[i] = dayCounter++;
    }
    weeks.push(week);
  }

  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-2">
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
        {weekdayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-800 dark:text-gray-200">
        {weeks.map((w, wi) =>
          w.map((d, di) => (
            <div key={`${wi}-${di}`} className="h-8 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded">
              {d ? d : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NormalCalendarGrid;
