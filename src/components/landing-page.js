"use client"

import { useState } from "react"
import { Menu, X, MapPin, Plus, Star, Search, ChevronRight, Heart, Map } from "lucide-react"
import Link from "next/link"
import '../app/globals.css';
import Header from "./header";
import Image from "next/image";
import Footer from "./footer";

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-[#FFF5EB] to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="md:flex md:items-center md:space-x-8">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight">
                                Discover Fashion Stores in{" "}
                                <span className="bg-gradient-to-r from-[#FFA09B] to-[#FFE6C9] text-transparent bg-clip-text">
                                    Bogor
                                </span>
                            </h1>
                            <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-lg">
                                Find the best clothing stores near you with our interactive map and comprehensive directory.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link
                                    href="/locator"
                                    className="bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] px-6 py-3 rounded-md text-base font-medium flex items-center justify-center"
                                >
                                    <MapPin size={18} className="mr-2" /> Find Stores
                                </Link>
                                <Link
                                    href="/add-store"
                                    className="bg-white text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--secondary)] px-6 py-3 rounded-md text-base font-medium flex items-center justify-center"
                                >
                                    <Plus size={18} className="mr-2" /> Add Your Store
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative">
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                                <div className="bg-[var(--secondary)] h-full w-full flex items-center justify-center">
                                    <Image
                                        src="/img/ss.png"
                                        alt="Fashion store map"
                                        width={600}
                                        height={400}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-[var(--border)]">
                                <div className="flex items-center">
                                    <div className="bg-[var(--primary)] rounded-full p-2 mr-3">
                                        <MapPin size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--foreground)]">8+ Fashion Stores</p>
                                        <p className="text-sm text-[var(--muted-foreground)]">In Bogor Area</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[var(--foreground)]">Discover the Best Fashion Stores in Bogor</h2>
                        <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                            Our platform helps you find the perfect clothing stores based on your preferences and location.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-[var(--accent)] rounded-lg p-6 transition-transform hover:scale-105">
                            <div className="bg-[var(--primary)] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <Search size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Search & Filter</h3>
                            <p className="text-[var(--muted-foreground)]">
                                Find stores by name, location, or filter by categories like men's, women's, or children's clothing.
                            </p>
                            <Link
                                href="/locator"
                                className="mt-4 inline-flex items-center text-[var(--primary)] hover:text-[var(--primary-hover)]"
                            >
                                Try it now <ChevronRight size={16} className="ml-1" />
                            </Link>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-[var(--accent)] rounded-lg p-6 transition-transform hover:scale-105">
                            <div className="bg-[var(--primary)] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <Map size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Interactive Map</h3>
                            <p className="text-[var(--muted-foreground)]">
                                Explore stores on our interactive map to find the closest options to your current location.
                            </p>
                            <Link
                                href="/locator"
                                className="mt-10 inline-flex items-center text-[var(--primary)] hover:text-[var(--primary-hover)]"
                            >
                                View map <ChevronRight size={16} className="ml-1" />
                            </Link>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-[var(--accent)] rounded-lg p-6 transition-transform hover:scale-105">
                            <div className="bg-[var(--primary)] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <Heart size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Curated Selection</h3>
                            <p className="text-[var(--muted-foreground)]">
                                Discover hand-picked fashion stores with detailed information about their offerings and specialties.
                            </p>
                            <Link
                                href="/locator"
                                className="mt-4 inline-flex items-center text-[var(--primary)] hover:text-[var(--primary-hover)]"
                            >
                                Explore stores <ChevronRight size={16} className="ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Stores Section */}
            {/* <section className="py-16 bg-[var(--background)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[var(--foreground)]">Popular Fashion Stores</h2>
                            <p className="mt-2 text-[var(--muted-foreground)]">Discover the most visited stores in Bogor</p>
                        </div>
                        <Link
                            href="/locator"
                            className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium flex items-center"
                        >
                            View all <ChevronRight size={16} className="ml-1" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-[var(--border)] hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-[var(--secondary)] relative">
                                <img
                                    src="/placeholder.svg?height=200&width=400"
                                    alt="Ramayana Department Store"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-[var(--primary)] text-white px-2 py-1 rounded-md text-xs font-medium">
                                    Popular
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-[var(--foreground)]">Ramayana Department Store</h3>
                                <p className="text-sm text-[var(--muted-foreground)] mb-2">Jl. Pajajaran No.10, Bogor</p>
                                <div className="flex items-center mb-3">
                                    <div className="flex text-yellow-400">
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} className="text-gray-300" />
                                    </div>
                                    <span className="text-xs text-[var(--muted-foreground)] ml-1">(42 reviews)</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    <span className="bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-1 rounded-md text-xs">
                                        Men's
                                    </span>
                                    <span className="bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-1 rounded-md text-xs">
                                        Women's
                                    </span>
                                    <span className="bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-1 rounded-md text-xs">
                                        Children's
                                    </span>
                                </div>
                                <Link
                                    href="/locator"
                                    className="mt-2 w-full bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                                >
                                    <MapPin size={16} className="mr-1" /> View on Map
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-[var(--border)] hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-[var(--secondary)] relative">
                                <img
                                    src="/placeholder.svg?height=200&width=400"
                                    alt="Matahari Department Store"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-[var(--foreground)]">Matahari Department Store</h3>
                                <p className="text-sm text-[var(--muted-foreground)] mb-2">Botani Square Mall, Jl. Pajajaran, Bogor</p>
                                <div className="flex items-center mb-3">
                                    <div className="flex text-yellow-400">
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                    <span className="text-xs text-[var(--muted-foreground)] ml-1">(78 reviews)</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    <span className="bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-1 rounded-md text-xs">
                                        Men's
                                    </span>
                                    <span className="bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-1 rounded-md text-xs">
                                        Women's
                                    </span>
                                    <span className="bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-1 rounded-md text-xs">
                                        Accessories
                                    </span>
                                </div>
                                <Link
                                    href="/locator"
                                    className="mt-2 w-full bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                                >
                                    <MapPin size={16} className="mr-1" /> View on Map
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-[var(--border)] hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-[var(--secondary)] relative">
                                <img
                                    src="/placeholder.svg?height=200&width=400"
                                    alt="Uniqlo Bogor"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-[var(--primary)] text-white px-2 py-1 rounded-md text-xs font-medium">
                                    New
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-[var(--foreground)]">Uniqlo Bogor</h3>
                                <p className="text-sm text-[var(--muted-foreground)] mb-2">Bogor Trade Mall, Jl. Ir. H. Juanda</p>
                                <div className="flex items-center mb-3">
                                    <div className="flex text-yellow-400">
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} className="text-gray-300" />
                                    </div>
                                    <span className="text-xs text-[var(--muted-foreground)] ml-1">(36 reviews)</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    <span className="bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-1 rounded-md text-xs">
                                        Men's
                                    </span>
                                    <span className="bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-1 rounded-md text-xs">
                                        Women's
                                    </span>
                                    <span className="bg-[var(--secondary)] text-[var(--secondary-foreground)] px-2 py-1 rounded-md text-xs">
                                        Unisex
                                    </span>
                                </div>
                                <Link
                                    href="/locator"
                                    className="mt-2 w-full bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                                >
                                    <MapPin size={16} className="mr-1" /> View on Map
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-[#FFA09B] to-[#FFE6C9]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Own a Fashion Store in Bogor?</h2>
                    <p className="text-white text-lg max-w-2xl mx-auto mb-8">
                        Add your store to our directory and reach more customers. It's free and only takes a few minutes.
                    </p>
                    <Link
                        href="/add-store"
                        className="bg-white text-[var(--primary)] hover:bg-[var(--secondary)] px-8 py-3 rounded-md text-base font-medium inline-flex items-center"
                    >
                        <Plus size={18} className="mr-2" /> Add Your Store
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <Footer/>
        </div>
    )
}
