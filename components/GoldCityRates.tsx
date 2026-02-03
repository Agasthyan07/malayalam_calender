import React from 'react';

interface CityRateProps {
    rate22k: number;
    rate24k: number;
}

const cities = [
    'Kollam',
    'Thiruvananthapuram',
    'Kochi',
    'Kozhikode',
    'Thrissur',
    'Kannur',
    'Alappuzha',
    'Kottayam',
    'Palakkad',
    'Malappuram'
];

export default function GoldCityRates({ rate22k, rate24k }: CityRateProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mt-8">
            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Gold Price in Major Kerala Cities
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Standardized rates across all districts
                </p>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cities.map((city) => (
                        <div key={city} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <span className="font-medium text-gray-700 dark:text-gray-200">{city}</span>
                            <div className="text-right">
                                <div className="text-sm font-bold text-gray-900 dark:text-gray-100">₹{rate22k.toLocaleString()}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">22K / gm</div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                    * Rates are standardized by AKGSMA and applicable across all these cities. Small variations may exist due to local jeweller changes.
                </p>
            </div>
        </div>
    );
}
