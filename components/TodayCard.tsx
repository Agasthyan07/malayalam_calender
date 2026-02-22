import { DailyData } from '@/types/date';
import { formatDate } from '@/lib/dateUtils';
import { Sunrise, Sunset, Star, Calendar, Moon } from 'lucide-react';

export default function TodayCard({ data, showMalayalamLabels = false }: { data: DailyData; showMalayalamLabels?: boolean }) {
    const labels = showMalayalamLabels ? {
        nakshatram: 'നക്ഷത്രം',
        tithi: 'തിഥി',
        sunrise: 'ഉദയം',
        sunset: 'അസ്തമയം',
        rahukalam: 'രാഹുകാലം',
        festival: 'വിശേഷം',
        vratham: 'വ്രതം',
        muhurtham: 'മുഹൂർത്തം',
        islamicFormat: 'ml-IN'
    } : {
        nakshatram: 'Nakshatram',
        tithi: 'Tithi',
        sunrise: 'Sunrise',
        sunset: 'Sunset',
        rahukalam: 'Rahukalam',
        festival: 'FESTIVAL',
        vratham: 'VRATHAM',
        muhurtham: 'MUHURTHAM',
        islamicFormat: 'en-GB'
    };

    // Calculate Islamic Date using standard Intl.DateTimeFormat
    const dateObj = new Date(data.date);
    let islamicDateStr = '';
    try {
        const islamicFormatter = new Intl.DateTimeFormat(labels.islamicFormat, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            calendar: 'islamic-civil'
        });
        islamicDateStr = islamicFormatter.format(dateObj);
    } catch (e) {
        console.error("Failed to format Islamic date", e);
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 max-w-md mx-auto">
            {/* Header with Date */}
            <div className="bg-red-700 text-white p-4 md:p-6 text-center space-y-1">
                <h2 className="text-xs md:text-sm font-medium opacity-90 uppercase tracking-wider">
                    {/* Weekday is usually in English in data, kept as is or could be mapped if needed, but data.weekday is string */}
                    {data.weekday}, {formatDate(data.date)}
                </h2>
                <h1 className="text-3xl md:text-5xl font-bold mt-2">{data.malayalam_date}</h1>
                {islamicDateStr && (
                    <div className="flex items-center justify-center gap-1.5 pt-2 text-red-100 opacity-90 text-xs md:text-sm font-medium">
                        <Moon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span>{islamicDateStr}</span>
                    </div>
                )}
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Panchangam */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600 mb-1 text-xs md:text-sm">
                            <Star className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span>{labels.nakshatram}</span>
                        </div>
                        <p className="font-semibold text-base md:text-lg text-gray-800">{data.nakshatram}</p>
                    </div>
                    <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600 mb-1 text-xs md:text-sm">
                            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span>{labels.tithi}</span>
                        </div>
                        <p className="font-semibold text-base md:text-lg text-gray-800">{data.tithi}</p>
                    </div>
                </div>

                {/* Sun Timings */}
                <div className="flex justify-between items-center border-t border-b border-gray-100 py-3 md:py-4">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 bg-orange-100 rounded-full text-orange-600">
                            <Sunrise className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-gray-600">{labels.sunrise}</p>
                            <p className="text-sm md:text-base font-medium text-gray-800">{data.sunrise}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 bg-purple-100 rounded-full text-purple-600">
                            <Sunset className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-gray-600">{labels.sunset}</p>
                            <p className="text-sm md:text-base font-medium text-gray-800">{data.sunset}</p>
                        </div>
                    </div>
                </div>

                {/* Rahukalam */}
                <div className="bg-red-50 p-3 md:p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-700 font-medium">
                        <span className="uppercase text-[10px] md:text-xs tracking-wider">{labels.rahukalam}</span>
                    </div>
                    <p className="font-bold text-sm md:text-base text-gray-800">{data.rahukalam}</p>
                </div>

                {/* Festival Notice */}
                {(data.festival || data.vratham || data.muhurtham) && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4 space-y-2">
                        {data.festival && (
                            <div className="flex items-start">
                                <span className="bg-amber-100 text-amber-800 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded mr-2 mt-0.5 shrink-0">{labels.festival}</span>
                                <span className="font-medium text-sm md:text-base text-amber-900">{data.festival}</span>
                            </div>
                        )}
                        {data.vratham && (
                            <div className="flex items-start">
                                <span className="bg-green-100 text-green-800 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded mr-2 mt-0.5 shrink-0">{labels.vratham}</span>
                                <span className="font-medium text-sm md:text-base text-green-900">{data.vratham}</span>
                            </div>
                        )}
                        {data.muhurtham && (
                            <div className="flex items-start">
                                <span className="bg-indigo-100 text-indigo-800 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded mr-2 mt-0.5 shrink-0">{labels.muhurtham}</span>
                                <span className="font-medium text-sm md:text-base text-indigo-900">{data.muhurtham}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
