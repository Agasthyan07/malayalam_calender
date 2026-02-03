'use client';

import { useState } from 'react';
import JsonLd from './JsonLd';

type FAQItem = {
    question: string;
    answer: string;
};

type FAQProps = {
    items: FAQItem[];
};

export default function FAQ({ items }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    return (
        <section className="my-8">
            <JsonLd data={jsonLd} />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 px-2">
                Frequently Asked Questions
            </h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center group bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-semibold text-gray-800 dark:text-gray-200 text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {item.question}
                            </span>
                            <span
                                className={`ml-4 transform transition-transform duration-200 text-gray-400 group-hover:text-indigo-500 ${openIndex === index ? 'rotate-180' : ''
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </button>
                        <div
                            className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700/50">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
