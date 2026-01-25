import { DailyData } from '@/types/date';
import { formatDate } from '@/lib/dateUtils';
import { Sunrise, Sunset, Star, Calendar } from 'lucide-react';

export default function TodayCard({ data }: { data: DailyData }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 max-w-md mx-auto">
            {/* Header with Date */}
            <div className="bg-red-700 text-white p-6 text-center">
                <h2 className="text-sm font-medium opacity-90 uppercase tracking-wider">{data.weekday}, {formatDate(data.date)}</h2>
                <h1 className="text-4xl font-bold mt-2">{data.malayalam_date}</h1>
            </div>

            <div className="p-6 space-y-6">
                {/* Panchangam */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 mb-1 text-sm">
                            <Star className="w-4 h-4" />
                            <span>Nakshatram</span>
                        </div>
                        <p className="font-semibold text-lg text-gray-800">{data.nakshatram}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-500 mb-1 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>Tithi</span>
                        </div>
                        <p className="font-semibold text-lg text-gray-800">{data.tithi}</p>
                    </div>
                </div>

                {/* Sun Timings */}
                <div className="flex justify-between items-center border-t border-b border-gray-100 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                            <Sunrise className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Sunrise</p>
                            <p className="font-medium text-gray-800">{data.sunrise}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                            <Sunset className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Sunset</p>
                            <p className="font-medium text-gray-800">{data.sunset}</p>
                        </div>
                    </div>
                </div>

                {/* Rahukalam */}
                <div className="bg-red-50 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-700 font-medium">
                        <span className="uppercase text-xs tracking-wider">Rahukalam</span>
                    </div>
                    <p className="font-bold text-gray-800">{data.rahukalam}</p>
                </div>

                {/* Festival Notice */}
                {(data.festival || data.vratham) && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        {data.festival && (
                            <div className="mb-2 last:mb-0">
                                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded mr-2">FESTIVAL</span>
                                <span className="font-medium text-amber-900">{data.festival}</span>
                            </div>
                        )}
                        {data.vratham && (
                            <div className="last:mb-0">
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded mr-2">VRATHAM</span>
                                <span className="font-medium text-green-900">{data.vratham}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
