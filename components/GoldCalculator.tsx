'use client';

import { useState } from 'react';

type GoldRate = {
    date: string;
    gram22: number;
    pavan22: number;
    gram24: number;
};

export default function GoldCalculator({ rate }: { rate: GoldRate }) {
    const [weight, setWeight] = useState<string>('1');
    const [unit, setUnit] = useState<'gram' | 'pavan'>('gram');

    const calculatePrice = () => {
        const w = parseFloat(weight);
        if (isNaN(w)) return 0;

        // Convert to grams for calculation if unit is pavan
        const grams = unit === 'pavan' ? w * 8 : w;
        return grams * rate.gram22;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-yellow-100 dark:border-yellow-900 overflow-hidden">
            {/* Rate Display Header */}
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-gray-800 p-6 text-center border-b border-yellow-100 dark:border-yellow-900">
                <h2 className="text-sm uppercase tracking-wider text-yellow-800 dark:text-yellow-400 font-bold mb-2">
                    TODAY'S KERALA GOLD RATE (22CT)
                </h2>
                <div className="flex justify-center items-end gap-2 text-gray-900 dark:text-white">
                    <span className="text-4xl md:text-5xl font-black">₹{rate.gram22.toLocaleString()}</span>
                    <span className="text-lg font-medium text-gray-500 mb-2">/ gm</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    1 Pavan (8gm) = <span className="font-bold text-gray-900 dark:text-gray-200">₹{rate.pavan22.toLocaleString()}</span>
                </p>
            </div>

            {/* Calculator Section */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    🧮 Calculate Price
                </h3>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Weight</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-lg font-bold focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Unit</label>
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value as 'gram' | 'pavan')}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-medium focus:ring-2 focus:ring-yellow-400 outline-none h-[54px]"
                            >
                                <option value="gram">Gram</option>
                                <option value="pavan">Pavan</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg flex justify-between items-center border border-gray-100 dark:border-gray-800">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Estimated Cost:</span>
                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                            ₹{calculatePrice().toLocaleString()}
                        </span>
                    </div>

                    <p className="text-xs text-gray-400 text-center">
                        * Rates are for 22ct gold. Making charges & GST extra.
                    </p>
                </div>
            </div>
        </div>
    );
}
