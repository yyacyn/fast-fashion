"use client"

import { useState } from "react"
import { Menu, X, Heart, Code, Database, Map, Coffee, Plus } from "lucide-react"
import Link from "next/link"
import '../app/globals.css';
import Header from "./header";
import Image from "next/image";
import Footer from "./footer";

export default function CreditsPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <Header />

            {/* Page Header */}
            <div className="bg-gradient-to-b from-[#FFF5EB] to-white py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                        About this Project
                    </h1>
                    <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                        This web app helps users discover and explore clothing stores around Bogor. It comes with useful features like search, category filters, and an interactive map to make finding shops easier. Built with Next.js, Tailwind CSS, OpenStreetMap, Supabase, and Leaflet, the app is designed to be fast, user-friendly, and responsive on all devices.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow bg-white py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Project Team Section */}
                    {/* <section className="mb-16">
                        <div className="flex items-center mb-6">
                            <div className="bg-[var(--primary)] p-2 rounded-md mr-3">
                                <Heart size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">PeDiDi Team</h2>
                        </div>
                        <div className="bg-[var(--accent)] rounded-lg p-6 border border-[var(--border)]">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                                <div className="bg-white p-2 rounded-md shadow-sm border border-[var(--border)] flex flex-col items-center h-auto">
                                    <Image
                                        src="/img/anargyat.png"
                                        alt="Anargyatt"
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover mt-4 text-center"
                                    />
                                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Anargyatt</h3>
                                    <p className="text-[var(--muted-foreground)] mb-4">Project Lead & Designer</p>
                                </div>
                                <div className="bg-white p-2 rounded-md shadow-sm border border-[var(--border)] flex flex-col items-center h-auto">
                                    <Image
                                        src="/img/emiya.png"
                                        alt="Yashin"
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover mt-4 text-center"
                                    />
                                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Yashin</h3>
                                    <p className="text-[var(--muted-foreground)] mb-4">Developer</p>
                                </div>
                                <div className="bg-white p-2 rounded-md shadow-sm border border-[var(--border)] flex flex-col items-center h-auto">
                                    <Image
                                        src="/img/emiya.png"
                                        alt="Yashin"
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover mt-4 text-center"
                                    />
                                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Yashin</h3>
                                    <p className="text-[var(--muted-foreground)] mb-4">Developer</p>
                                </div>
                                <div className="bg-white p-2 rounded-md shadow-sm border border-[var(--border)] flex flex-col items-center lg:col-start-1 lg:col-end-2 lg:justify-self-end w-full">
                                    <Image
                                        src="/img/emiya.png"
                                        alt="Yashin"
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover mt-4 text-center"
                                    />
                                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Yashin</h3>
                                    <p className="text-[var(--muted-foreground)] mb-4">Developer</p>
                                </div>
                                <div className="bg-white p-2 rounded-md shadow-sm border border-[var(--border)] flex flex-col items-center lg:col-start-3 lg:col-end-4 lg:justify-self-start">
                                    <Image
                                        src="/img/emiya.png"
                                        alt="Yashin"
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover mt-4 text-center"
                                    />
                                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Yashin</h3>
                                    <p className="text-[var(--muted-foreground)] mb-4">Developer</p>
                                </div>
                            </div>
                        </div>
                    </section> */}

                    {/* Technologies Section */}
                    <section className="mb-16">
                        <div className="flex items-center mb-6">
                            <div className="bg-[var(--primary)] p-2 rounded-md mr-3">
                                <Code size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">Technologies Used</h2>
                        </div>
                        <div className="bg-[var(--accent)] rounded-lg p-6 border border-[var(--border)]">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-md shadow-sm border border-[var(--border)]">
                                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Frontend</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            Next.js
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            React
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            Tailwind CSS
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            Lucide Icons
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-md shadow-sm border border-[var(--border)]">
                                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Mapping</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            Leaflet
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            React Leaflet
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            OpenStreetMap
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            GeoJSON
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-md shadow-sm border border-[var(--border)]">
                                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Development</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            JavaScript
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            Git & GitHub
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            Vercel & v0
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                                            Supabase
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Sources Section */}
                    <section className="mb-16">
                        <div className="flex items-center mb-6">
                            <div className="bg-[var(--primary)] p-2 rounded-md mr-3">
                                <Database size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">Data Sources</h2>
                        </div>
                        <div className="bg-[var(--accent)] rounded-lg p-6 border border-[var(--border)]">
                            <div className="space-y-4">
                                <div className="bg-white p-6 rounded-md shadow-sm border border-[var(--border)]">
                                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Store Data</h3>
                                    <p className="text-sm text-[var(--foreground)] mb-4">
                                        The information about fashion stores in Bogor is collected from various sources, including:
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2 mt-1.5"></span>
                                            Public business directories and online listings
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2 mt-1.5"></span>
                                            User submissions and community contributions
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2 mt-1.5"></span>
                                            Manual verification and validation processes
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-md shadow-sm border border-[var(--border)]">
                                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Map Data</h3>
                                    <p className="text-sm text-[var(--foreground)] mb-4">Our mapping functionality is powered by:</p>
                                    <div className="flex items-center">
                                        <div className="mr-4">
                                            <Map size={36} className="text-[var(--primary)]" />
                                        </div>
                                        <div>
                                            <p className="font-medium">OpenStreetMap</p>
                                            <p className="text-xs text-[var(--muted-foreground)]">
                                                © OpenStreetMap contributors. OpenStreetMap data is available under the Open Database License.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Special Thanks Section */}
                    {/* <section>
                        <div className="flex items-center mb-6">
                            <div className="bg-[var(--primary)] p-2 rounded-md mr-3">
                                <Coffee size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--foreground)]">Special Thanks</h2>
                        </div>
                        <div className="bg-[var(--accent)] rounded-lg p-6 border border-[var(--border)]">
                            <div className="bg-white p-6 rounded-md shadow-sm border border-[var(--border)]">
                                <p className="text-[var(--foreground)] mb-4">
                                    We would like to express our gratitude to the following individuals and organizations:
                                </p>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2 mt-1.5"></span>
                                        <div>
                                            <p className="font-medium">All Contributors</p>
                                            <p className="text-[var(--muted-foreground)]">
                                                Everyone who contributed to the development and testing of this application.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2 mt-1.5"></span>
                                        <div>
                                            <p className="font-medium">Open Source Community</p>
                                            <p className="text-[var(--muted-foreground)]">
                                                For developing and maintaining the various libraries and tools used in this project.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2 mt-1.5"></span>
                                        <div>
                                            <p className="font-medium">Bogor Fashion Stores</p>
                                            <p className="text-[var(--muted-foreground)]">
                                                For their cooperation and providing information about their businesses.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2 mt-1.5"></span>
                                        <div>
                                            <p className="font-medium">Our Users</p>
                                            <p className="text-[var(--muted-foreground)]">
                                                For using our application and providing valuable feedback to help us improve.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section> */}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}
