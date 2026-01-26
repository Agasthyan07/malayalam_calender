'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
                <div className="flex flex-col">
                    <Link href="/today" className="text-2xl font-bold text-red-700 leading-none">
                        Malayalam Calendar
                    </Link>
                    <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-1">
                        Kerala Time (IST) • Malayalam Calendar
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6">
                    <Link href="/today" className="text-gray-700 hover:text-red-700 font-medium">Today</Link>
                    <Link href="/calendar/2026" className="text-gray-700 hover:text-red-700 font-medium">2026 Calendar</Link>
                    <Link href="/rahu-kalam-today" className="text-gray-700 hover:text-red-700 font-medium">Rahu Kalam</Link>
                    <Link href="/festivals" className="text-gray-700 hover:text-red-700 font-medium">Festivals</Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                    <nav className="flex flex-col p-4 space-y-4">
                        <Link
                            href="/today"
                            className="text-gray-700 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50"
                            onClick={closeMenu}
                        >
                            Today
                        </Link>
                        <Link
                            href="/calendar/2026"
                            className="text-gray-700 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50"
                            onClick={closeMenu}
                        >
                            2026 Calendar
                        </Link>
                        <Link
                            href="/rahu-kalam-today"
                            className="text-gray-700 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50"
                            onClick={closeMenu}
                        >
                            Rahu Kalam
                        </Link>
                        <Link
                            href="/festivals"
                            className="text-gray-700 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50"
                            onClick={closeMenu}
                        >
                            Festivals
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
