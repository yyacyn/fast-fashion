"use client";

import { useState } from "react";
import { Menu, X, Plus, User } from "lucide-react";
import Link from "next/link";
import '../app/globals.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-[var(--border)] sticky top-0 z-[1000]"> {/* Increased z-index */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-end">
                        <Link href="/" className="flex items-end">
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#FFA09B] to-[#FFE6C9] text-transparent bg-clip-text">
                                Fast Fashion
                            </span>
                            <span className="ml-1 text-sm mb-1 text-gray-500">by PeDiDi</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className="text-[var(--foreground)] hover:text-[var(--primary)] px-3 py-2 text-sm font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/locator"
                            className="text-[var(--foreground)] hover:text-[var(--primary)] px-3 py-2 text-sm font-medium"
                        >
                            Find Store
                        </Link>
                        <Link
                            href="/about"
                            className="text-[var(--foreground)] hover:text-[var(--primary)] px-3 py-2 text-sm font-medium"
                        >
                            About
                        </Link>
                        <Link
                            href="/add-store"
                            className="bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] px-4 py-2 rounded-md text-sm font-medium flex items-center"
                        >
                            <Plus size={16} className="mr-1" /> Add Store
                        </Link>
                        <Link
                            href="/admin-login"
                            className="text-[var(--foreground)] hover:text-[var(--primary)] px-3 py-2 text-sm font-medium flex items-center"
                        >
                            <User size={16} className="mr-1" />Admin
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-[var(--foreground)] hover:text-[var(--primary)] focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-[var(--border)]">
                        <Link
                            href="/"
                            className="text-[var(--foreground)] hover:bg-[var(--secondary)] block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/locator"
                            className="text-[var(--foreground)] hover:bg-[var(--secondary)] block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Locator
                        </Link>
                        <Link
                            href="/credits"
                            className="bg-[var(--secondary)] text-[var(--foreground)] block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Credits
                        </Link>
                        <Link
                            href="/add-store"
                            className="bg-[var(--primary)] text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
                        >
                            <Plus size={16} className="mr-1" /> Add Store
                        </Link>
                        <Link
                            href="/admin-login"
                            className="text-[var(--foreground)] hover:text-[var(--primary)] px-3 py-2 text-sm font-medium flex items-center"
                        >
                            <User size={16} className="mr-1" />Admin
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}