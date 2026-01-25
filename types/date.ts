export interface DailyData {
  date: string; // YYYY-MM-DD
  weekday: string;
  malayalam_date: string; // e.g., "മകരം 11"
  nakshatram: string; // e.g., "തിരുവാതിര"
  tithi: string; // e.g., "ദ്വിതീയ"
  sunrise: string; // e.g., "06:45"
  sunset: string; // e.g., "18:32"
  rahukalam: string; // e.g., "15:00 - 16:30"
  festival: string | null;
  vratham: string | null;
}
